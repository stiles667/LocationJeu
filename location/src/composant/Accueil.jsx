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
  const [selectedGameDetails, setSelectedGameDetails] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const selectedGameId = 'Jeuxid';  // Cela semble inutilisé, vous pouvez le supprimer si nécessaire

  useEffect(() => {
    const UtilisateurID = localStorage.getItem('UtilisateurID');

    fetch(`http://localhost:3002/Commentaire/Users/${UtilisateurID}`)
      .then(response => response.json())
      .then(data => setUserComments(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3002/jeux')
      .then((response) => response.json())
      .then((data) => setJeux(data))
      .catch((error) => console.error(error));
  }, []);

  
  useEffect(() => {
    if (selectedGame) {
      fetch(`http://localhost:3002/jeux/${selectedGame.JeuxID}/commentaires`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setUserComments(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedGame]);
       

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
      <div key={jeu.JeuxID} className="jeu-bulle" style={{ backgroundImage: `url(${jeu.lien_image})` }}>
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

  const louerJeu = async () => {
    try {
      if (startDate && returnDate && selectedGame) {
        const userId = localStorage.getItem('UtilisateurID');

        if (userId) {
          const locationData = {
            jeuxID: selectedGame.JeuxID,
            DateDebut: startDate,
            DateFin: returnDate,
            UtilisateurID: userId,
          };

          console.log(locationData);

          const response = await fetch('http://localhost:3002/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(locationData),
          });

          if (response.ok) {
            console.log('Jeu loué avec succès !');
          } else {
            console.error('Erreur lors de la location du jeu.');
          }
        } else {
          console.error("L'ID de l'utilisateur n'est pas disponible dans le localStorage.");
        }
      } else {
        console.error('Veuillez sélectionner un jeu et des dates valides.');
      }
    } catch (error) {
      console.error('Une erreur est survenue : ', error);
    }
  };
  return (
    <div className="Body">
      <div className="header">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/2618/2618988.png" alt="Logo Manette" />
        </div>
        <h1 className="name">GAMING HUB</h1>
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
        <div className="Deconnexion">
          <Link to="/">
            <img src="https://cdn-icons-png.flaticon.com/512/4400/4400629.png" alt="Logo Deconnexion" />
          </Link>
        </div>
      </div>
      <div className="ListeDejeux">
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
            <h1>{selectedGame.Titre}</h1>
            <p>Description : {selectedGame.Description}</p>
            <p>Note moyenne : {selectedGame.NoteMoyenne}</p>
            <p>Prix : {selectedGame.Prix} $</p>
            <div className="commentaires">
              {userComments.map((commentaire) => (
                <div key={commentaire.CommentaireID}>
                  <p>commentaire :{commentaire.Commentaire}</p>
                  
                </div>
              ))}
            </div>
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
            <button onClick={louerJeu}><img src="https://cdn-icons-png.flaticon.com/512/57/57493.png" alt="louer" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accueil;
