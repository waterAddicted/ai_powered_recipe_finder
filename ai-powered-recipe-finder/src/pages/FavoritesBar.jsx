import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Importăm Link pentru navigare
import '../Home.css'; // Import the CSS file for styles
import heart3 from '../images/heart3.png'; // Imagine pentru de-favorit
import { FavoritesContext } from '../FavoritesContext';

const FavoritesBar = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [searchTerm, setSearchTerm] = useState(''); // Starea pentru termenul de căutare

    // Funcție pentru filtrarea rețetelor favorite
    const filteredFavorites = favorites.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="recipe-container">

<input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualizează termenul de căutare
                placeholder="Search favorites..."
                style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '20px' }} // Stilizare pentru input
            />

            <h2>Favorites</h2>

            {/* Bara de căutare */}

            {filteredFavorites.length === 0 ? (
                <p>Nu ai adăugat nici o rețetă în favorite!</p>
            ) : (
                filteredFavorites.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="recipe-card">
                            <img 
                                src={recipe.thumbnail_url} 
                                alt={recipe.name} 
                                className="recipe-image" 
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }} // Dimensiuni mai mici pentru imagine
                            />
                            <div className="recipe-details">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <p className="recipe-time">{recipe.total_time_minutes} min.</p>
                            </div>
                            <div className="recipe-actions">
                                <button 
                                    className="favorite-btn" 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevenim navigarea la click pe buton
                                        removeFavorite(recipe.id);
                                    }}
                                >
                                    <img src={heart3} alt="Remove from favorites" />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default FavoritesBar;
