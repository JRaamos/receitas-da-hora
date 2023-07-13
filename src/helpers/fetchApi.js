export const fetchIngredients = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data.meals;
};
export const fetchName = async (nome) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data.meals;
};

export const fetchFirstLetter = async (primeiraLetra) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  return data.meals;
};

export const fetchDrinkIngredients = async (ingrediente) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchDrinkName = async (nome) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchDrinkFirstLetter = async (primeiraLetra) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchAPIId = async (id, type) => {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const useUrl = type === 'meals' ? urlMeals : urlDrinks;
  const response = await fetch(`${useUrl}${id}`);
  const data = await response.json();
  return data[type][0];
};
