import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Panier.css';

export default function Panier() {
  const [locations, setLocations] = useState([]);
  const [jeux, setJeux] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [purchaseValidated, setPurchaseValidated] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const utilisateurID = localStorage.getItem('UtilisateurID'); // Renommé UtilisateurID à utilisateurID
  // Ajout d'une constante panier manquante
  const [panier, setPanier] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePurchaseValidation = async () => {
    const newTotalAmount = locations.reduce((total, location) => {
      const dateDebut = new Date(location.DateDebut);
      const dateFin = new Date(location.DateFin);
      const days = Math.ceil((dateFin - dateDebut) / (1000 * 60 * 60 * 24));
      return total + days * location.Prix;
    }, 0);

    setTotalAmount(newTotalAmount);
    setPurchaseValidated(true);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`http://localhost:3002/location/users/${utilisateurID}`);
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          console.error("L'ID de l'utilisateur n'est pas disponible ou n'est pas valide.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des emplacements:", error);
      }
    };

    const removeFromPanier = (jeuId) => {
      console.log('Removing jeu with ID:', jeuId);
      fetch(`http://localhost:3002/api/panier/${jeuId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response after removal:', data);
          setPanier((prevPanier) => prevPanier.filter((jeu) => jeu.JeuxID !== jeuId));
        })
        .catch((error) => console.error(error));
    };

    const removeAllFromPanier = () => {
      // Envoie une requête DELETE pour vider entièrement le panier dans la base de données
      fetch('http://localhost:3002/api/panier', {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          // Met à jour l'état local du panier après la suppression
          setPanier([]);
        })
        .catch((error) => console.error(error));
    };

    const fetchJeux = async () => {
      try {
        const response = await fetch('http://localhost:3002/jeux');
        if (response.ok) {
          const data = await response.json();
          setJeux(data);
        } else {
          throw new Error('Échec de la récupération des données de jeux');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de jeux:', error);
      }
    };

    fetchLocations();
    fetchJeux();
  }, [utilisateurID]);

  return (
    <div className="Body">
      <div className="header">
        <h1>GAMING HUB</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un jeu"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/2618/2618988.png" alt="Logo Manette" />
        </div>
      </div>
      <div className="locations-list">
        <h2>Locations</h2>
        {purchaseValidated ? (
          <>
            <h1>Achat validé! Montant total: {totalAmount} $</h1>
            <div>
              <Link to="/Accueil">
                <button type="button">Retour à l'accueil</button>
              </Link>
              <Link to="/avis">{/* <button type="button">Voir/Laisser des avis</button> */}</Link>
            </div>
          </>
        ) : (
          <ul>
            {locations.map((location, index) => {
              const jeu = jeux.find((j) => j.JeuxID === location.JeuxID);
              const dateDebut = new Date(location.DateDebut);
              const dateFin = new Date(location.DateFin);
              const days = Math.ceil((dateFin - dateDebut) / (1000 * 60 * 60 * 24));
              const totalPrice = days * location.Prix;

              return (
                <li className="carr" key={index} style={{ backgroundImage: `url(${jeu && jeu.lien_image})` }}>
                  {jeu && (
                    <>
                      <h1 className="title"> {jeu.Titre}</h1>
                      <p>Date de début: {dateDebut.toLocaleDateString()}</p>
                      <p>Date de fin: {dateFin.toLocaleDateString()}</p>
                      <p>Prix total: {totalPrice} $</p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {!purchaseValidated && <button onClick={handlePurchaseValidation}>Valider les achats</button>}
      </div>
    </div>
  );
}
