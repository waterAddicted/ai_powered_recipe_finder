import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../Home.css'; 
import heart3 from '../images/heart3.png'; 
import { FavoritesContext } from '../FavoritesContext';

const FavoritesBar = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [searchTerm, setSearchTerm] = useState(''); 

    
    const filteredFavorites = favorites.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="recipe-container">

<input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search favorites..."
                style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '20px' }} 
            />

            <h2>Favorites</h2>

            {/* Bara de cautare */}

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
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                            />
                            <div className="recipe-details">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <p className="recipe-time">{recipe.total_time_minutes} min.</p>
                            </div>
                            <div className="recipe-actions">
                                <button 
                                    className="favorite-btn" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
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
