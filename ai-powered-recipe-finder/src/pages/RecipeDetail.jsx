import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams(); // Preluăm ID-ul din URL
    const [recipe, setRecipe] = useState(null); // Inițializăm cu null pentru că încă nu avem datele
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <h1>{recipe.name}</h1>
            <img src={recipe.thumbnail_url} alt={recipe.name} />
            <p>{recipe.description}</p>
            <p>Total time: {recipe.total_time_minutes} minutes</p>
            {/* Aici poți adăuga și alte detalii despre rețetă */}
        </div>
    );
};

export default RecipeDetails;
