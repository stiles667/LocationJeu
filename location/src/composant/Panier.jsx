import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Panier.css";

export default function Panier() {
  const [locations, setLocations] = useState([]);
  const [jeux, setJeux] = useState([]); // Added state for jeux
  const [searchTerm, setSearchTerm] = useState("");
  const [purchaseValidated, setPurchaseValidated] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePurchaseValidation = () => {
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
        const response = await fetch("http://localhost:3002/locations");
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
    fetchJeux(); // Fetch jeux data
  }, []);

  return (
    <div className="Body">
      <div className="header">
        <div className="logo">
          <Link to="/Accueil">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2948/2948025.png"
              alt="Logo Accueil"
            />
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un jeu"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="top-right-link">
          <Link to="/panier">
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126083.png"
              alt="Logo Panier"
            />
          </Link>
        </div>
        <div className="Deconnexion">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126486.png"
              alt="Logo Deconnexion"
            />
          </Link>
        </div>
      </div>

      <div className="locations-list">
        <h2>Locations</h2>
        {purchaseValidated ? (
          <h1>Achat validé! Montant total: {totalAmount} $</h1>
        ) : (
          <ul>
            {locations.map((location, index) => {
              const jeu = jeux.find((j) => j.JeuxID === location.JeuxID);
              const dateDebut = new Date(location.DateDebut);
              const dateFin = new Date(location.DateFin);
              const days = Math.ceil((dateFin - dateDebut) / (1000 * 60 * 60 * 24));
              const totalPrice = days * location.Prix;

              return (
                <li key={index} style={{ backgroundImage: `url(${jeu && jeu.lien_image})` }}>
                  {jeu && (
                    <>
                      <p>Nom du jeu: {location.Titre}</p>
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
