// // import React, { useState, useEffect } from 'react';
// // import './Accueil.css';

// // const Accueil = () => {
// //   const [jeux, setJeux] = useState([]);

// //   useEffect(() => {
// //     fetch('http://localhost:3002/api/jeux')
// //       .then((response) => response.json())
// //       .then((data) => setJeux(data))
// //       .catch((error) => console.error(error));
// //   }, []);

// //   const addToCart = (jeuId) => {
// //     // Ici, vous pouvez implémenter la logique pour ajouter le jeu au panier
// //     console.log(`Jeu ajouté au panier: ${jeuId}`);
// //   };

// //   return (
// //     <div>
// //       <h1>Liste des jeux</h1>
// //       <div className="jeux-container">
// //         {jeux.map((jeu) => (
// //           <div key={jeu.JeuxID} className="jeu-bulle">
// //             <h2>{jeu.Titre}</h2>
// //             <p>{jeu.Description}</p>
// //             <p>Note moyenne : {jeu.NoteMoyenne}</p>
// //             <p>Prix : {jeu.Prix} $</p>
// //             <button onClick={() => addToCart(jeu.JeuxID)}>Ajouter au panier</button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Accueil;

// import React, { useState, useEffect } from 'react';
// import './Accueil.css';

// const Accueil = () => {
//   const [jeux, setJeux] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3002/api/jeux')
//       .then((response) => response.json())
//       .then((data) => setJeux(data))
//       .catch((error) => console.error(error));
//   }, []);

  // const addToCart = (jeuId) => {
  //   // Envoie une requête POST pour ajouter le jeu à la table "locations"
  //   fetch('http://localhost:3002/locations', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ JeuxID: jeuId }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Gère la réponse si nécessaire
  //       console.log('Jeu ajouté à la table locations:', data);
  //     })
  //     .catch((error) => console.error(error));
  // };

//   return (
//     <div>
//       <h1>Liste des jeux</h1>
//       <div className="jeux-container">
//         {jeux.map((jeu) => (
//           <div key={jeu.JeuxID} className="jeu-bulle">
//             <h2>{jeu.Titre}</h2>
//             <p>{jeu.Description}</p>
//             <p>Note moyenne : {jeu.NoteMoyenne}</p>
//             <p>Prix : {jeu.Prix} $</p>
//             <button onClick={() => addToCart(jeu.JeuxID)}>Ajouter au panier</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Accueil;
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
    // Récupère la date actuelle
    const currentDate = new Date().toISOString().split('T')[0];
  
    // Récupère l'UtilisateurID depuis ton système d'authentification
    const utilisateurId = // Ajoute ici la logique pour obtenir l'UtilisateurID;
  
    // Envoie une requête POST pour ajouter la location à la table "Locations"
    fetch('http://localhost:3002/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        JeuxID: jeuId,
        DateDebut: currentDate,
        UtilisateurID: utilisateurId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gère la réponse si nécessaire
        console.log('Jeu ajouté à la table locations:', data);
      })
      .catch((error) => console.error(error));
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
