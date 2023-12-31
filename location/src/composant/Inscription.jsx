import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Inscription.css';


function Inscription() {
  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Email: '',
    MotDePasse: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3002/Inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('User successfully added');
        
        const { message, utilisateurID } = await response.json();
        console.log(message);
        console.log(utilisateurID);
  
        // Stocke l'ID de l'utilisateur dans le local storage
        localStorage.setItem('UtilisateurID', utilisateurID);
  
        // Redirection vers une autre page ou toute autre action après l'inscription réussie
        
      } else if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data.error);
      } else {
        console.error('Failed to add user');
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
    <div className='inscription'>
      <form onSubmit={handleSubmit}>
        <h1>Inscription</h1>
        {errorMessage && <p>{errorMessage}</p>}
        {/* {successMessage && <p>{successMessage}</p>} */}
        <label>Nom:</label>
        <input
          type="text"
          name='Nom'
          value={formData.Nom}
          onChange={handleInput}
        />

        <label>Prénom:</label>
        <input
          type="text"
          name='Prenom'
          value={formData.Prenom}
          onChange={handleInput}
        />

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

        <button type="submit">
          S'inscrire
        </button>

        <Link to="/">Se connecter</Link>
      </form>
    </div>
  );
}

export default Inscription;