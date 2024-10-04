export const fetchRecipes = async (query) => {
    
    const response = await fetch(`https://api-ai-recipe.com/search?query=${query}`);
    const data = await response.json();
    return data.recipes;
  };
  
