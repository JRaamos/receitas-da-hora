import React from 'react';
import { useSelector } from 'react-redux';

function RecipesMeals() {
  const number = 12;
  const api = useSelector((state) => state.api.response);
  const cloneApi = api.slice(0, number);

  return (
    <div>
      {
        cloneApi.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}
export default RecipesMeals;
