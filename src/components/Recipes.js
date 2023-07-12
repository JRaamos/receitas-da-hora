import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAllDrinks, fetchAllMeals } from '../helpers/fetchApi';
import { fetchApi } from '../redux/actions';

function Recipes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const number = 12;
  const response = useSelector(({ api }) => api.response);
  const cloneApi = response.slice(0, number);

  useEffect(() => {
    const fetch = async () => {
      if (pathname === '/meals') {
        const results = await fetchAllMeals();
        dispatch(fetchApi(results));
      } else if (pathname === '/drinks') {
        const results = await fetchAllDrinks();
        dispatch(fetchApi(results));
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {
        pathname === '/drinks'
      && cloneApi.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h1>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))
      }
      {
        pathname === '/meals'
        && cloneApi.map((recipe, index) => (
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

export default Recipes;
