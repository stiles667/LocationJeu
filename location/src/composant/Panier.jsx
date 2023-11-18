import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Panier.css";

export default function Panier() {
  const [locations, setLocations] = useState([]);
  const [jeux, setJeux] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [purchaseValidated, setPurchaseValidated] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const UtilisateurID = localStorage.getItem("UtilisateurID");

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
        const response = await fetch(`http://localhost:3002/location/users/${UtilisateurID}`);
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchJeux = async () => {
      try {
        const response = await fetch("http://localhost:3002/jeux");
        if (response.ok) {
          const data = await response.json();
          setJeux(data);
        } else {
          throw new Error("Failed to fetch jeux data");
        }
      } catch (error) {
        console.error("Error fetching jeux data:", error);
      }
    };

    fetchLocations();
    fetchJeux();
  }, [UtilisateurID]);

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
              <Link to="/avis">
                {/* <button type="button">Voir/Laisser des avis</button> */}
              </Link>
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
        {!purchaseValidated && (
          <button onClick={handlePurchaseValidation}>Valider les achats</button>
        )}
      </div>
    </div>
  );
}
