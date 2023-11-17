import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Connexion.css';


function Connexion() {
  const [formData, setFormData] = useState({
    Email: '',
    MotDePasse: '',
  });
  localStorage.getItem('UtilisateurID');

  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
      
        console.log('Login successful');
        response.json().then((data) => {
          console.log(data);

        
        localStorage.setItem('UtilisateurID', data.id);});
        setLoggedIn(true);
        

        navigate('/Accueil');
      } else {
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>

{/* <video src={video} autoPlay loop muted  /> */}

      {loggedIn ? (
        <Link to="/Accueil" />
      ) : (
        <>
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInput}
            />

            <label>Mot de passe:</label>
            <input
              type="password"
              name="MotDePasse"
              value={formData.MotDePasse}
              onChange={handleInput}
            />

            <button type="submit">Se connecter</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <Link to="/Inscription">S'inscrire</Link>
        </>
      )}
       <div style={{ position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
      </div>
    </div>
    </div>
    
  );
}

export default Connexion;