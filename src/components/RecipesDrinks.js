import React from 'react';
import { useSelector } from 'react-redux';

function RecipesDrinks() {
  const number = 12;
  const api = useSelector((state) => state.api.response);

  const cloneApi = api.slice(0, number);
  return (
    <div>
      {cloneApi.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h1>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}

export default RecipesDrinks;
