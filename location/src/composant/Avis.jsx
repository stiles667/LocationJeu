import React, { useState, useEffect } from 'react';

export default function Avis() {
    const [cartGames, setCartGames] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);

    useEffect(() => {
        // Fetch cart games from your API and set the cartGames state variable
    }, []);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send a POST request to your API to save the review
    };

    return (
        <div>
            <h2>Cart Games</h2>
            {cartGames.map((jeux, index) => (
                <p key={index}>{jeux.titre}</p> // Replace "game.name" with how you access the game's name
            ))}

            <h2>Leave a review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Comment:
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        rows={4}
                    />
                </label>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={handleRatingChange}
                        min={1}
                        max={5}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}