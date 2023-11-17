import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './panier.css'; 
export default function Panier() {
    // const [searchTerm, setSearchTerm] = React.useState('');
    
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
        console.log('Removing jeu with ID:', jeuId);
        fetch(`http://localhost:3002/api/panier/${jeuId}`, {
        method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response after removal:', data);
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
        jeu.Titre && jeu.Titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='Body'>
            <div className="header">
                <div className="logo">
                    {/* Logo redirigeant vers la page d'accueil */}
                    <Link to="/Accueil">
                        <img src="https://cdn-icons-png.flaticon.com/512/2948/2948025.png" alt="Logo Accueil" />
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
                        <img src="https://cdn-icons-png.flaticon.com/512/126/126083.png" alt="Logo Panier" />
                    </Link>
                </div>
                <div className='Deconnexion'>
                    <Link to="/">
                        <img src="https://cdn-icons-png.flaticon.com/512/126/126486.png" alt="Logo Deconnexion" />
                    </Link>
                </div>
            </div>
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
                    <button onClick={() => removeFromPanier(jeu.JeuxID)}>Remove</button>
                </div>
                ))}
            </div>
        </div>
    );
}