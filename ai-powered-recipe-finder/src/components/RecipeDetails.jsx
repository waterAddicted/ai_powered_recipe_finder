import React from 'react';

const RecipeDetails = ({ recipe }) => {
  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.time}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
