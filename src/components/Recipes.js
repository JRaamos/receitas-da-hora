import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import {
  fetchAllDrinks,
  fetchAllMeals,
  fetchDrinksCategories,
  fetchFilterCategoryDrinks,
  fetchFilterCategoryMeals,
  fetchMealsCategories,
} from '../helpers/fetchApi';
import { fetchApi } from '../redux/actions';
import './Recipes.css';
import beef from '../images/beef.png';
import goat from '../images/goat.png';
import chicken from '../images/chicken.png';
import breakfast from '../images/breakfast.png';
import dessert from '../images/dessert.jpeg';
import all from '../images/all.png';
import alld from '../images/allD.png';
import cocktail from '../images/cocktail.png';
import ordinaryDrink from '../images/Ordinary-drink.png';
import shake from '../images/shake.png';
import other from '../images/other.png';
import cocoa from '../images/cocoa.png';

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

  // função responsavel por fazer a requisicao da api de comidas e bebidas e armazenar o valor da api no redux
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

  // função responsavel por fazer a requisicao da api de comidas e bebidas por categoria
  const handleFetchFilter = async (categoryName) => {
    if (pathname === '/meals') {
      const results = await fetchFilterCategoryMeals(categoryName);
      dispatch(fetchApi(results));
    }
    if (pathname === '/drinks') {
      const results = await fetchFilterCategoryDrinks(categoryName);
      dispatch(fetchApi(results));
    }
  };
  return (
    <div className="main-contain">
      <div className="btn-contain">
        {cloneData.map((categoryName, index) => (
          <button
            className="btn-categories"
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
            {categoryName.strCategory === 'Beef' && (
              <img src={ beef } className="img-btn-meals" alt="" />

            )}
            {categoryName.strCategory === 'Goat' && (
              <img src={ goat } alt="" className="img-btn-meals" />
            )}
            {categoryName.strCategory === 'Breakfast' && (
              <img src={ breakfast } alt="" className="img-btn-meals" />
            )}
            {categoryName.strCategory === 'Chicken' && (
              <img src={ chicken } alt="" className="img-btn-meals" />
            )}
            { categoryName.strCategory === 'Dessert' && (
              <img src={ dessert } alt="" className="img-btn-meals" />
            )}
            {
              categoryName.strCategory === 'Ordinary Drink' && (
                <img src={ ordinaryDrink } alt="" className="img-btn-drinks" />
              )
            }
            {
              categoryName.strCategory === 'Cocktail' && (
                <img src={ cocktail } alt="" className="img-btn-drinks" />
              )
            }
            {
              categoryName.strCategory === 'Shake' && (
                <img src={ shake } alt="" className="img-btn-drinks" />
              )
            }
            {
              categoryName.strCategory === 'Other / Unknown' && (
                <img src={ other } alt="" className="img-btn-drinks" />
              )
            }
            {
              categoryName.strCategory === 'Cocoa' && (
                <img src={ cocoa } alt="" className="img-btn-drinks" />
              )
            }
            <p
              className="category-name"
            >
              {categoryName.strCategory}
            </p>
          </button>
        ))}
        <button
          className="btn-categories"
          data-testid="All-category-filter"
          type="button"
          onClick={ () => {
            fetchMealsDrinks();
          } }
        >
          <img
            src={ pathname === '/meals' ? all : alld }
            alt=""
            className="img-btn-meals"
          />
          <p>All</p>
        </button>
      </div>
      <div className="card-contain-drinks">
        {pathname === '/drinks'
        && cloneApi.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <Link
              to={ `/drinks/${recipe.idDrink}` }
              style={ { textDecoration: 'none' } }
            >
              <div className="card">
                <h4
                  data-testid={ `${index}-card-name` }
                  className="title"
                >
                  {recipe.strDrink}

                </h4>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid={ `${index}-card-img` }
                  className="img"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="card-contain-meals">
        {pathname === '/meals'
        && cloneApi.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <Link
              to={ `/meals/${recipe.idMeal}` }
              style={ { textDecoration: 'none' } }
            >
              <div className="card">
                <h4
                  data-testid={ `${index}-card-name` }
                  className="title"
                >
                  {recipe.strMeal}

                </h4>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-card-img` }
                  className="img"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
