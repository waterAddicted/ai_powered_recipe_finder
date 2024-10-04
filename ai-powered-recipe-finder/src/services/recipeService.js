export const fetchRecipes = async (query) => {
    // Înlocuiește acest endpoint cu cel real pe care îl vei folosi
    const response = await fetch(`https://api-ai-recipe.com/search?query=${query}`);
    const data = await response.json();
    return data.recipes;
  };
  