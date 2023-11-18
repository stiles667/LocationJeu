import React, { useState, useEffect } from 'react';

export default function Avis() {
    const [gamesWithReviews, setGamesWithReviews] = useState([]);

    useEffect(() => {
        // Fetch games with reviews from your API and set the gamesWithReviews state variable
        fetchGamesWithReviews();
    }, []);

    const fetchGamesWithReviews = async () => {
        try {
            const response = await fetch('http://localhost:3002/jeux-avis'); // Endpoint à ajuster
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Vérifiez les données renvoyées par le serveur
                setGamesWithReviews(data);
            } else {
                throw new Error('Failed to fetch games with reviews');
            }
        } catch (error) {
            console.error('Error fetching games with reviews:', error);
        }
    };
    
    return (
        <div>
            <h2>Jeux with Reviews</h2>
            {gamesWithReviews.map((game) => (
                <div key={game.JeuxID}>
                    <h3>{game.Titre}</h3>
                    <ul>
                        {game.Commentaire && game.Note && (
                            <li>
                                <p>Comment: {game.Commentaire}</p>
                                <p>Rating: {game.Note}</p>
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}
