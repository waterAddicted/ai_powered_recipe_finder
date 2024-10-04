import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';  // Asigură-te că stilurile sunt încărcate din acest fișier
import heart1 from '../images/heart1.png';
import heart2 from '../images/heart2.png';
import heart3 from '../images/heart3.png';
import loadingGif from '../images/loading.gif';
import { FavoritesContext } from '../FavoritesContext';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoverId, setHoverId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const { favorites, addFavorite, removeFavorite, isFavorited } = useContext(FavoritesContext);

    const fetchRecipes = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=${offset}&size=5&tags=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': '273f86a1b9mshbd1e909afee534cp1d2b2fjsn75fc8c677f6a', // Cheia ta reală
                    'x-rapidapi-host': 'tasty.p.rapidapi.com',
                    'x-rapidapi-ua': 'RapidAPI-Playground'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.results.length) {
                setRecipes(data.results);
            } else {
                setRecipes([]);
                alert("Nu s-au găsit rețete pentru căutarea ta.");
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            alert("A apărut o problemă la preluarea datelor. Te rugăm să încerci mai târziu.");
        } finally {
            setLoading(false);
        }
    };

    const fetchNewRecipes = async () => {
        setOffset(prevOffset => prevOffset + 5);
        await fetchRecipes(searchTerm);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setOffset(0);
            fetchRecipes(searchTerm);
        }
    };

    const handleFavoriteToggle = (recipe, e) => {
        e.preventDefault(); // Prevenim navigarea la click pe inimă
        if (isFavorited(recipe.id)) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="What do you feel like eating?"
                    style={{ flex: 1 }}
                />
                {loading && (
                    <img src={loadingGif} alt="Loading..." className="loading-gif" style={{ height: '100px', marginLeft: '10px' }} />
                )}
            </form>
            
            <Link to="/favorites" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button 
                    style={{
                        padding: '12px 30px',
                        borderRadius: '25px',
                        backgroundColor: favorites.length > 0 ? '#90ee90' : '#fff',
                        color: favorites.length > 0 ? '#fff' : '#999',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    {favorites.length > 0 ? 'Go to Favorites' : 'No Favorites Yet'}
                </button>
            </Link>

            {recipes.length > 0 && (  // Adăugăm titlul doar dacă există rețete
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Suggested Recipes</h2>
            )}

            <div className="recipe-container">
                {recipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="recipe-card">
                            <img src={recipe.thumbnail_url} alt={recipe.name} className="recipe-image" />
                            <div className="recipe-details">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <p className="recipe-time">{recipe.total_time_minutes} min.</p>
                            </div>
                            <div className="recipe-actions">
                                <button 
                                    className="favorite-btn" 
                                    onClick={(e) => handleFavoriteToggle(recipe, e)}
                                >
                                    <img
                                        src={
                                            isFavorited(recipe.id)
                                                ? hoverId === recipe.id ? heart2 : heart3
                                                : hoverId === recipe.id ? heart2 : heart1
                                        }
                                        alt="favorite"
                                        onMouseEnter={() => setHoverId(recipe.id)}
                                        onMouseLeave={() => setHoverId(null)}
                                    />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {recipes.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button 
                        onClick={fetchNewRecipes} 
                        style={{
                            padding: '12px 30px',
                            borderRadius: '25px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        I don't like those.
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
