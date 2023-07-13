import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAllDrinks,
  fetchAllMeals, fetchDrinksCategories, fetchMealsCategories } from '../helpers/fetchApi';
import { fetchApi } from '../redux/actions';

function Recipes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const number = 12;
  const numberCategori = 5;
  const response = useSelector(({ api }) => api.response);
  const cloneApi = response.slice(0, number);
  const [data, setData] = useState([]);
  const cloneData = data.slice(0, numberCategori);

  useEffect(() => {
    const fetch = async () => {
      if (pathname === '/meals') {
        const results = await fetchAllMeals();
        dispatch(fetchApi(results));
        setData(await fetchMealsCategories());
      } else if (pathname === '/drinks') {
        const results = await fetchAllDrinks();
        dispatch(fetchApi(results));
        setData(await fetchDrinksCategories());
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {
        cloneData.map((categoryName, index) => (
          <button
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
          >
            {categoryName.strCategory}
          </button>
        ))

      }
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
