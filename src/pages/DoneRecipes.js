import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoniRecipesMeals from '../components/DoniRecipesMeals';
import DoniRecipesDrinks from '../components/DoniRecipesDrinks';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipe);
  }, []);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        {
          doneRecipes && doneRecipes.map((recipe, index) => (
            recipe.type === 'drink'
              ? <DoniRecipesDrinks key={ index } recipe={ recipe } index={ index } />
              : <DoniRecipesMeals key={ index } recipe={ recipe } index={ index } />
          ))
        }
      </main>
    </div>
  );
}

export default DoneRecipes;
