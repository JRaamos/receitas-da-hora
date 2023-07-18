import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoritesDrinks from '../components/FavoritesDrinks';
import FavoritesMeals from '../components/FavoritesMeals';

function FavoriteRecipes() {
  const [favoriteRecipes, setfavoritRecipes] = useState([]);
  const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const desfavoritar = (id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setfavoritRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  useEffect(() => {
    setfavoritRecipes(favoriteRecipe);
  }, []);

  const filterMeals = () => {
    const recipeMeals = favoriteRecipe.filter((recipe) => recipe.type === 'meal');
    setfavoritRecipes(recipeMeals);
  };
  const filterDrinks = () => {
    const recipeMeals = favoriteRecipe.filter((recipe) => recipe.type === 'drink');
    setfavoritRecipes(recipeMeals);
  };

  const filterAll = () => {
    setfavoritRecipes(favoriteRecipe);
  };
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ filterMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
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
    </div>

  );
}

export default FavoriteRecipes;
