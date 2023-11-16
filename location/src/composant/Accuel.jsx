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

//   const addToCart = (jeuId) => {
//     // Ici, vous pouvez implémenter la logique pour ajouter le jeu au panier
//     console.log(`Jeu ajouté au panier: ${jeuId}`);
//   };

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
import './Accueil.css';

const Accueil = () => {
  const [jeux, setJeux] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/jeux')
      .then((response) => response.json())
      .then((data) => setJeux(data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (jeuId) => {
    // Envoie une requête POST pour ajouter le jeu à la table "louer"
    fetch('http://localhost:3002/louer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ JeuxID: jeuId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gère la réponse si nécessaire
        console.log('Jeu ajouté à la table louer:', data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Liste des jeux</h1>
      <div className="jeux-container">
        {jeux.map((jeu) => (
          <div key={jeu.JeuxID} className="jeu-bulle">
            <h2>{jeu.Titre}</h2>
            <p>{jeu.Description}</p>
            <p>Note moyenne : {jeu.NoteMoyenne}</p>
            <p>Prix : {jeu.Prix} $</p>
            <button onClick={() => addToCart(jeu.JeuxID)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accueil;
