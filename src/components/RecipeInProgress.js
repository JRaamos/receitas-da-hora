import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAPIId } from '../helpers/fetchApiId';

function RecipeInProgress() {
  const location = useLocation();
  const { pathname } = location;
  const [recipe, setRecipe] = useState({});

  const trataItem = (item) => {
    const { strMealThumb,
      strDrinkThumb,
      strMeal, strDrink,
      strCategory,
      strInstructions } = item;

    return {
      image: strMealThumb || strDrinkThumb,
      title: strMeal || strDrink,
      category: strCategory,
      instructions: strInstructions,
    };
  };

  useEffect(() => {
    const recipeInProgress = async () => {
      const id = pathname.split('/')[2];
      const type = pathname.split('/')[1];
      const data = await fetchAPIId(id, type);
      setRecipe(trataItem(data));
    };
    recipeInProgress();
  }, [pathname]);
  console.log(recipe);
  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.image } alt={ recipe.title } />
      <h1 data-testid="recipe-title">{recipe.title}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h3 data-testid="recipe-category">{recipe.category}</h3>
      <p data-testid="instructions">{recipe.instructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
