import React from 'react';
import PropTypes from 'prop-types';

function DrinksDetails({ item, ingredients, recomendacao }) {
  return (
    <div>
      <div>
        <h1
          data-testid="recipe-title"
          className="title-details-container"
        >
          {item && item.strDrink}

        </h1>
        <img
          src={ item && item.strDrinkThumb }
          alt={ item && item.strDrink }
          data-testid="recipe-photo"
          className="details-img"
        />
        <div className="category">
          <h4
            className="category-item"
          >
            Category:
          </h4>
          <p
            data-testid="recipe-category"
            className="category-item"
          >
            {item && item.strCategory}

          </p>
        </div>

        <p data-testid="recipe-category">
          { item.strAlcoholic }
        </p>
        <h4>Ingredients</h4>
        <div className="ing-contain">
          <ul className="ingredientes">
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item[ingredient]} - ${item[`strMeasure${index + 1}`]}` }
              </li>
            ))}
          </ul>

        </div>
        <h4>Instructions</h4>
        <div className="ing-contain">
          <p
            data-testid="instructions"
            className="instructions"
          >
            {item && item.strInstructions}

          </p>

        </div>
        <h1>Recomendations</h1>
        <section className="recomendation">
          { recomendacao.map((recomend, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recomendation-card"
            >
              <p data-testid={ `${index}-recommendation-title` }>
                { recomend.strMeal }
              </p>
              <img
                src={ recomend.strMealThumb }
                alt={ recomend.strMeal }
                className="recomendation-img"
              />

            </div>
          ))}
        </section>
      </div>

    </div>
  );
}

DrinksDetails.propTypes = PropTypes.shape({}).isRequired;

export default DrinksDetails;
