import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoritesDrinks from '../components/FavoritesDrinks';
import FavoritesMeals from '../components/FavoritesMeals';
import favorito from '../images/button_favorite_01.png';
import cocktail from '../images/cocktail.png';
import all from '../images/all.png';
import food from '../images/icon-fast-food-outline.jpg';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [favoriteRecipes, setfavoritRecipes] = useState([]);
  const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

  // função para desfavoritar, ela recebe o id da receita e filtra as receitas favoritas pelo id e retorna um novo array sem a receita desfavoritada
  const desfavoritar = (id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setfavoritRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  useEffect(() => {
    setfavoritRecipes(favoriteRecipe);
  }, []);

  // função para filtrar as receitas favoritas por tipo de receita (comida)
  const filterMeals = () => {
    const recipeMeals = favoriteRecipe.filter((recipe) => recipe.type === 'meal');
    setfavoritRecipes(recipeMeals);
  };

  // função para filtrar as receitas favoritas por tipo de receita (bebida)
  const filterDrinks = () => {
    const recipeMeals = favoriteRecipe.filter((recipe) => recipe.type === 'drink');
    setfavoritRecipes(recipeMeals);
  };

  // função para filtrar as receitas favoritas por tipo de receita (todas)
  const filterAll = () => {
    setfavoritRecipes(favoriteRecipe);
  };
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="searchBar-contain title-favorit">
        <img
          src={ favorito }
          alt=""
          className="btn-footer"
        />
        <h1 data-testid="page-title">Favorite Recipes</h1>
      </div>
      <main>
        <div className="btn-contain2">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ filterAll }
            className="btn-categories2"
          >
            <img
              src={ food }
              alt=""
              className="img-btn-meals2"
            />
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            onClick={ filterMeals }
            className="btn-categories2"

          >
            <img src={ all } alt="" className="img-btn-meals2" />

            Meals
          </button>
          <button
            className="btn-categories2"
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ filterDrinks }
          >
            <img src={ cocktail } alt="" className="img-btn-drinks2" />
            Drinks
          </button>
        </div>
        {
          favoriteRecipes && favoriteRecipes.map((recipe, index) => (
            recipe.type === 'drink'
              ? (
                <FavoritesDrinks
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                  favorits={ () => desfavoritar(recipe.id) }
                />
              )
              : (
                <FavoritesMeals
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                  favorits={ () => desfavoritar(recipe.id) }

                />
              )
          ))
        }
      </main>
      <Footer />
    </div>

  );
}

export default FavoriteRecipes;
