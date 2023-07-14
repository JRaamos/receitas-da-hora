export const getLocalStorage = {
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  getItem: (key) => {
    const result = localStorage.getItem(key);
    return result && JSON.parse(result);
  },
};

export const favoriteRecipe = (recipe) => {
  const recipes = getLocalStorage.getItem('favoriteRecipes') || [];
  const newRecipes = recipes.filter((item) => item.id !== recipe.id);
  if (newRecipes.length === recipes.length) {
    newRecipes.push(recipe);
    console.log(recipe);
  }
  getLocalStorage.setItem('favoriteRecipes', newRecipes);
};

export const isFavorite = (id) => {
  const recipes = getLocalStorage.getItem('favoriteRecipes') || [];
  return recipes.some((recipe) => recipe.id === id);
};
