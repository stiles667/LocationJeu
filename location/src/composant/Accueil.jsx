import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css'; 

const Accueil = () => {
  const [jeux, setJeux] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const userID = localStorage.getItem('UtilisateurID');
  useEffect(() => {
    fetch('http://localhost:3002/jeux')
      .then((response) => response.json())
      .then((data) => setJeux(data))
      .catch((error) => console.error(error));
  }, []);

  const displayGameOverlay = (jeu) => {
    setSelectedGame(jeu);
  };

  const closeOverlay = () => {
    setSelectedGame(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = jeux.filter((jeu) =>
    jeu.Titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayFilteredGames = () => {
    const displayedGames = filteredGames.slice(startIndex, startIndex + 6);
    return displayedGames.map((jeu) => (
      <div key={jeu.JeuxID} className="jeu-bulle">
        <h2>{jeu.Titre}</h2>
        <p>Note moyenne : {jeu.NoteMoyenne}</p>
        <p>Prix : {jeu.Prix} $</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/70/70310.png"
          alt="Info"
          onClick={() => displayGameOverlay(jeu)}
          className="info-icon"
        />
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
  
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleLouerClick = async () => {
    
      try {
        const jeuxid = selectedGame.JeuxID;
       
        const UtilisateurID = userID; 
  

      const response = await fetch('http://localhost:3002/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jeuxid,
          UtilisateurID,
          dateDebut: startDate,
          dateFin: returnDate,
        }),
      });

      if (response.ok) {
        console.log(`Paiement réussi pour le jeu avec l'ID ${jeuxid}`);
        setSelectedGame(null);
        setStartDate(null);
        setReturnDate(null);
      } else {
        console.error('Erreur lors du paiement :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors du paiement :', error);
    }
  };


  return (
    <div className='Body'>
      <div className="header">
        <div className="logo">
          <img src="https://pbs.twimg.com/profile_images/1641935230251532297/CaKypRr__400x400.jpg" alt="Logo Manette" />
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
          <Link to="/Panier">
            
            <img src="https://cdn-icons-png.flaticon.com/512/126/126083.png" alt="Logo Panier" />
            
          </Link>
        </div>
        <div className='Deconnexion'>
          <Link to="/">
            <img src="https://cdn-icons-png.flaticon.com/512/126/126486.png" alt="Logo Deconnexion" />
          </Link>

        </div>
      </div>
      <div className='ListeDejeux'>
        <h1>Liste des jeux</h1>
        <div className="jeux-container">{displayFilteredGames()}</div>
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
           
            <input
              type="date"
              placeholder="Date de début"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              placeholder="Date de retour"
              value={returnDate}
              onChange={handleReturnDateChange}
            />
            <button onClick={closeOverlay}><img src="https://cdn.icon-icons.com/icons2/894/PNG/512/Close_Icon_icon-icons.com_69144.png" alt="Fermer" /></button>
            <button onClick={handleLouerClick }><img src="https://cdn-icons-png.flaticon.com/512/57/57493.png" alt="louer" /></button>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default Accueil;
