import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { fetchAllDrinks, fetchAllMeals, fetchDrinksCategories,
  fetchFilterCategoryDrinks, fetchFilterCategoryMeals,
  fetchMealsCategories } from '../helpers/fetchApi';
import { fetchApi } from '../redux/actions';

function Recipes() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const number = 12;
  const numberCategori = 5;
  const response = useSelector(({ api }) => api.response);
  const cloneApi = response.slice(0, number);
  const cloneData = data.slice(0, numberCategori);

  const fetchMealsDrinks = async () => {
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

  useEffect(() => {
    fetchMealsDrinks();
  }, []);

  const handleFetchFilter = async (categoryName) => {
    if (pathname === '/meals') {
      const results = await fetchFilterCategoryMeals(categoryName);
      dispatch(fetchApi(results));
    } else if (pathname === '/drinks') {
      const results = await fetchFilterCategoryDrinks(categoryName);
      dispatch(fetchApi(results));
    }
  };
  return (
    <div>
      {
        cloneData.map((categoryName, index) => (
          <button
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
            type="button"
            onClick={ () => {
              if (toggle) {
                fetchMealsDrinks();
              } else {
                handleFetchFilter(categoryName.strCategory);
              }
              setToggle(!toggle);
            } }
          >
            {categoryName.strCategory}
          </button>
        ))

      }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => { fetchMealsDrinks(); } }
      >
        All
      </button>
      {
        pathname === '/drinks'
      && cloneApi.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/drinks/${recipe.idDrink}` }>
            <h1
              data-testid={ `${index}-card-name` }
            >
              {recipe.strDrink}
            </h1>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </Link>
        </div>
      ))

      }
      {
        pathname === '/meals'
        && cloneApi.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/meals/${recipe.idMeal}` }>
              <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        ))
      }

    </div>
  );
}

export default Recipes;
