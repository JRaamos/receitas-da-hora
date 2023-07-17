import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoniRecipesMeals from '../components/DoniRecipesMeals';
import DoniRecipesDrinks from '../components/DoniRecipesDrinks';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setDoneRecipes(doneRecipe);
  }, []);

  const filterMeals = () => {
    const recipeMeals = doneRecipe.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(recipeMeals);
  };

  const filterDrinks = () => {
    const recipeMeals = doneRecipe.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(recipeMeals);
  };

  const filterAll = () => {
    setDoneRecipes(doneRecipe);
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
          doneRecipes && doneRecipes.map((recipe, index) => (
            recipe.type === 'drink'
              ? (
                <DoniRecipesDrinks
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                />
              )
              : (
                <DoniRecipesMeals
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                />
              )
          ))
        }
      </main>
    </div>
  );
}

export default DoneRecipes;
