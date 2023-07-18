// função pra fazer requisicao da api de comidas por ingrediente
export const fetchIngredients = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de comidas por nome
export const fetchName = async (nome) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de comidas por primeira letra
export const fetchFirstLetter = async (primeiraLetra) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de comidas
export const fetchAllMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de bebidas por ingrediente
export const fetchDrinkIngredients = async (ingrediente) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data.drinks;
};

// função pra fazer requisicao da api de bebidas por nome
export const fetchDrinkName = async (nome) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data.drinks;
};

// função pra fazer requisicao da api de bebidas por primeira letra
export const fetchDrinkFirstLetter = async (primeiraLetra) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  return data.drinks;
};

// função pra fazer requisicao da api de bebidas por id
export const fetchApiDrikId = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks;
};

// função pra fazer requisicao da api de comidas por id
export const fetchApiMealsId = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de bebidas
export const fetchAllDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};

// função pra fazer requisicao da api de categorias de comida
export const fetchMealsCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de categorias de bebidas
export const fetchDrinksCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
};

// função pra fazer requisicao da api de comidas por categoria
export const fetchFilterCategoryMeals = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};

// função pra fazer requisicao da api de bebidas por categoria
export const fetchFilterCategoryDrinks = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
};
