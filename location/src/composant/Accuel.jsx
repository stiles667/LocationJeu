import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css'; 

const Accueil = () => {
  const [jeux, setJeux] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3002/api/jeux')
      .then((response) => response.json())
      .then((data) => setJeux(data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (jeuId) => {
    console.log(`Jeu ajouté au panier: ${jeuId}`);
  };

  const displayGameOverlay = (jeu) => {
    setSelectedGame(jeu);
  };

  const closeOverlay = () => {
    setSelectedGame(null);
  };

  const displayGames = () => {
    const displayedGames = jeux.slice(startIndex, startIndex + 6);
    return displayedGames.map((jeu) => (
      <div key={jeu.JeuxID} className="jeu-bulle" onClick={() => displayGameOverlay(jeu)}>
        <h2>{jeu.Titre}</h2>
        <p>Note moyenne : {jeu.NoteMoyenne}</p>
        <p>Prix : {jeu.Prix} $</p>
        <button onClick={() => addToCart(jeu.JeuxID)}>Ajouter au panier</button>
      </div>
    ));
  };

  const handleNext = () => {
    if (startIndex + 6 < jeux.length) {
      setStartIndex(startIndex + 6);
    }
  };

  const handlePrevious = () => {
    if (startIndex - 6 >= 0) {
      setStartIndex(startIndex - 6);
    }
  };

  return (
    <div className='Body'>
      <div className="header">
        <div className="logo">
          <img src="https://pbs.twimg.com/profile_images/1641935230251532297/CaKypRr__400x400.jpg" alt="Logo Manette" />
        </div>
        <div className="top-right-link">
          <Link to="/panier">
            <img src="https://cdn-icons-png.flaticon.com/512/126/126083.png" alt="Logo Panier" />
          </Link>
        </div>
      </div>
      <div className='ListeDejeux'>
        <h1>Liste des jeux</h1>
        <div className="jeux-container">{displayGames()}</div>
        <div className="pagination-buttons">
          <button onClick={handlePrevious}>Précédent</button>
          <button onClick={handleNext}>Suivant</button>
        </div>
      </div>

     
      {selectedGame && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGame.Titre}</h2>
            <p>Description : {selectedGame.Description}</p>
            <p>Note moyenne : {selectedGame.NoteMoyenne}</p>
            <p>Prix : {selectedGame.Prix} $</p>
            <button onClick={closeOverlay}>Fermer </button> {/* Bouton pour fermer les infos */}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Accueil;
