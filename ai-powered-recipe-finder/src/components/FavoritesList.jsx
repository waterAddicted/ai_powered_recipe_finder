import React from 'react';

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.name}</h4>
          <button onClick={() => onRemoveFavorite(recipe)}>❌ Remove</button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
