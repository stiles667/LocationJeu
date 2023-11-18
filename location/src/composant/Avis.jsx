import React, { useState, useEffect } from 'react';

const Avis = () => {
  const [avisData, setAvisData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les avis depuis le serveur
    const fetchAvisData = async () => {
      try {
        const response = await fetch('http://localhost:3002/commentaire');
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        console.log('Données d\'avis récupérées :', data);
        setAvisData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error);
      }
    };

    // Appel de la fonction pour récupérer les avis lors du montage du composant
    fetchAvisData();
  }, []);

  return (
    <div>
      <h2>Avis et Commentaires</h2>
      <ul>
        {avisData.map((avis) => (
          <li key={avis.AvisID}>
            <p>Commentaire : {avis.Commentaire}</p>
            <p>Note : {avis.Note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Avis;
