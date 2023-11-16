import React, { useState, useEffect } from 'react';
import './panier.css';

export default function Panier() {
  const [panier, setPanier] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Récupère les jeux du panier depuis la base de données
    fetch('http://localhost:3002/api/panier')
      .then((response) => response.json())
      .then((data) => {
        setPanier(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const removeFromPanier = (jeuId) => {
    // Envoie une requête DELETE pour retirer le jeu du panier dans la base de données
    fetch(`http://localhost:3002/api/panier/${jeuId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Met à jour l'état local du panier après la suppression
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

  const filteredPanier = panier.filter((jeu) =>
    jeu.Titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Votre Panier:</h1>
      <div className="nav-bar">
        <input
          type="text"
          placeholder="Chercher un Jeu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button onClick={removeAllFromPanier} className="remove-all-button">
        Remove All
      </button>
      <div className="Panier">
        {filteredPanier.map((jeu) => (
          <div key={jeu.JeuxID} className="Panier-card">
            <p>{jeu.Titre}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/Jeux/${jeu.JeuxID}.png`}
              alt={jeu.Titre}
            />
            <button onClick={() => removeFromPanier(jeu.JeuxID)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
