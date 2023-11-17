import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Panier.css';

export default function Panier() {
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
        };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:3002/locations');
                if (response.ok) {
                    const data = await response.json();
                    setLocations(data);
                    console.log(data);  
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div className='Body'>
            <div className="header">
                <div className="logo">
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

            <div className="locations-list">
                <h2>Locations</h2>
                <ul>
                {locations.map((location, index) => (
        <li key={index}>
        <p>Nom du jeu: {location.JeuxID}</p>
        <p>Date de début: {new Date(location.DateDebut).toLocaleDateString()}</p>
        <p>Date de fin: {new Date(location.DateFin).toLocaleDateString()}</p>
        <p>Utilisateur ID: {location.UtilisateurID}</p>
    </li>
))}
                    
                </ul>
            </div>
        </div>
    );
}
