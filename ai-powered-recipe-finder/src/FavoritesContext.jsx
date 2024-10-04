// FavoritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (recipe) => {
        setFavorites(prev => [...prev, recipe]);
    };

    const removeFavorite = (recipeId) => {
        setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
    };

    const isFavorited = (recipeId) => {
        return favorites.some(recipe => recipe.id === recipeId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
            {children}
        </FavoritesContext.Provider>
    );
};
