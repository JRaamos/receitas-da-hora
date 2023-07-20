import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoniRecipesMeals from '../components/DoniRecipesMeals';
import DoniRecipesDrinks from '../components/DoniRecipesDrinks';
import './DoniRecipes.css';
import vector from '../images/vector.jpg';
import cocktail from '../images/cocktail.png';
import all from '../images/all.png';
import food from '../images/icon-fast-food-outline.jpg';
import Footer from '../components/Footer';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setDoneRecipes(doneRecipe);
  }, []);

  // função para filtrar as receitas favoritas por tipo de receita (comida)
  const filterMeals = () => {
    const recipeMeals = doneRecipe.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(recipeMeals);
  };

  // função para filtrar as receitas favoritas por tipo de receita (bebida)
  const filterDrinks = () => {
    const recipeMeals = doneRecipe.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(recipeMeals);
  };

  // função para filtrar as receitas favoritas por tipo de receita (todas)
  const filterAll = () => {
    setDoneRecipes(doneRecipe);
  };
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="searchBar-contain">
        <img src={ vector } alt="" />
        <h1 data-testid="page-title">Done Recipes</h1>
      </div>
      <main>
        <div className="btn-contain2">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            className="btn-categories2"
            onClick={ filterAll }
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
            className="btn-categories2"
            onClick={ filterMeals }
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
      <Footer />
    </div>
  );
}

export default DoneRecipes;
