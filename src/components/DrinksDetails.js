import React from 'react';
import PropTypes from 'prop-types';

function DrinksDetails({ item, ingredients, recomendacao }) {
  return (
    <div>
      <div>
        <h1 data-testid="recipe-title">{item && item.strDrink}</h1>
        <img
          src={ item && item.strDrinkThumb }
          alt={ item && item.strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-category">{item && item.strCategory}</p>
        <p data-testid="instructions">{item && item.strInstructions}</p>
        <p data-testid="recipe-category">
          { item.strAlcoholic }
        </p>
        <section>
          {ingredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${item[ingredient]} - ${item[`strMeasure${index + 1}`]}` }
            </p>
          ))}
        </section>
        <section className="recomendation">
          { recomendacao.map((recomend, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recomendation-card"
            >
              <img
                src={ recomend.strMealThumb }
                alt={ recomend.strMeal }
                className="recomendation-img"
              />
              <p data-testid={ `${index}-recommendation-title` }>
                { recomend.strMeal }
              </p>

            </div>
          ))}
        </section>
      </div>

    </div>
  );
}

DrinksDetails.propTypes = PropTypes.shape({}).isRequired;

export default DrinksDetails;
