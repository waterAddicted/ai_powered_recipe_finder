import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import heart1 from '../images/heart1.png'; // Imagine pentru inimă goală (ne-favorită)
import heart2 from '../images/heart2.png'; // Imagine pentru inimă hover
import heart3 from '../images/heart3.png'; // Imagine pentru inimă plină (favorită)
import { FavoritesContext } from '../FavoritesContext'; // Importăm contextul

const RecipeDetails = () => {
    const { id } = useParams(); // Preluăm ID-ul din URL
    const [recipe, setRecipe] = useState(null); // Inițializăm cu null pentru că încă nu avem datele
    const [loading, setLoading] = useState(true);
    const [hovered, setHovered] = useState(false); // Pentru starea de hover la iconița de inimă

    const { favorites, addFavorite, removeFavorite, isFavorited } = useContext(FavoritesContext); // Folosim contextul

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
                setRecipe(data); // Setăm datele odată ce au fost încărcate
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    // Afișăm un mesaj de încărcare dacă datele nu sunt încă disponibile
    if (loading) {
        return <p>Loading...</p>;
    }

    // Verificăm dacă rețeta există înainte de a accesa proprietățile sale
    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    // Funcția pentru a comuta rețeta între favorite și non-favorite
    const handleFavoriteToggle = () => {
        if (isFavorited(recipe.id)) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    // Extrage ingredientele și instrucțiunile
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
                    {/* Butonul de like lângă numele preparatului */}
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
                            style={{ width: '30px', height: '30px' }} // Dimensiunea imaginii
                        />
                    </button>
                </div>
                <p>Total time: {recipe.total_time_minutes} minutes</p>
            </div>

            <div style={{ flex: 2, paddingLeft: '20px' }}>
                {/* Rubrica pentru ingrediente deasupra instrucțiunilor */}
                <h2>Ingredients:</h2>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                
                {/* Rubrica pentru instrucțiuni */}
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
