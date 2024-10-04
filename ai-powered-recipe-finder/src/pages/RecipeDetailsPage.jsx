import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import heart1 from '../images/heart1.png'; 
import heart2 from '../images/heart2.png'; 
import heart3 from '../images/heart3.png'; 
import { FavoritesContext } from '../FavoritesContext'; 

const RecipeDetails = () => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [hovered, setHovered] = useState(false); 

    const { favorites, addFavorite, removeFavorite, isFavorited } = useContext(FavoritesContext); 

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-rapidapi-key': '273f86a1b9mshbd1e909afee534cp1d2b2fjsn75fc8c677f6a',
                        'x-rapidapi-host': 'tasty.p.rapidapi.com',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }

                const data = await response.json();
                setRecipe(data); 
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    
    if (loading) {
        return <p>Loading...</p>;
    }

    
    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    
    const handleFavoriteToggle = () => {
        if (isFavorited(recipe.id)) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    
    const ingredients = recipe.sections[0].components.map((component) => component.ingredient.name);
    const instructions = recipe.instructions.map((instruction) => instruction.display_text);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <img 
                    src={recipe.thumbnail_url} 
                    alt={recipe.name} 
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 style={{ margin: '0' }}>{recipe.name}</h1>
                    { }
                    <button 
                        onClick={handleFavoriteToggle} 
                        style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }}
                    >
                        <img
                            src={
                                isFavorited(recipe.id) ? (hovered ? heart2 : heart3) : (hovered ? heart2 : heart1)
                            }
                            alt="favorite"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            style={{ width: '30px', height: '30px' }} 
                        />
                    </button>
                </div>
                <p>Total time: {recipe.total_time_minutes} minutes</p>
            </div>

            <div style={{ flex: 2, paddingLeft: '20px' }}>
                { }
                <h2>Ingredients:</h2>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                
                { }
                <h2>Instructions:</h2>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default RecipeDetails;
