import React from 'react';
import { Link } from 'react-router-dom'; 
export default function Panier() {
    const [searchTerm, setSearchTerm] = React.useState('');
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
        </div>
    );
}