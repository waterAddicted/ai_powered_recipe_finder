import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FavoritesBar from './pages/FavoritesBar';
import RecipeDetail from './pages/RecipeDetailsPage';
import { FavoritesProvider } from './FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesBar />} />
      </Routes>
    </Router>
    </FavoritesProvider>
  );
};

export default App;
