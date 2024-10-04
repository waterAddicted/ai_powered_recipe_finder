import React from 'react';

const RecipeCard = ({ recipe, onAddToFavorites }) => {
  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>{recipe.time}</p>
      <button onClick={() => onAddToFavorites(recipe)}>❤️ Add to Favorites</button>
    </div>
  );
};

export default RecipeCard;
