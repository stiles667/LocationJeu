import React, { useState, useEffect } from 'react';
import './panier.css';

export default function Panier() {
  const [Panier, setPanier] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPanier = localStorage.getItem('Panier');
    if (storedPanier) {
      setPanier(JSON.parse(storedPanier));
    }
  }, []);

  const removeFromPanier = (index) => {
    const updatedPanier = [...Panier];
    updatedPanier.splice(index, 1);
    setPanier(updatedPanier);
    localStorage.setItem('Panier', JSON.stringify(updatedPanier));
  };

  const removeAllFromPanier = () => {
    setPanier([]);
    localStorage.removeItem('Panier'); 
  };

  
  const filteredPanier = Panier.filter((Jeux) =>
    Jeux.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Votre Panier:</h1>
      <div className="nav-bar">
        <input
          type="text"
          placeholder="Chercher un Jeux..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
        
      </div>
      <button onClick={removeAllFromPanier} className="remove-all-button">Remove All</button>
      
      <div className="Panier">
        {filteredPanier.map((Jeux, index) => (
          <div key={index} className="Panier-card">
            <p>{Jeux.name}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/Jeux/${Jeux.id}.png`}
              alt={Jeux.name}
            />
            <button onClick={() => removeFromPanier(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
