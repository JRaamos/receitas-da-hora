import React from 'react';
import PropTypes from 'prop-types';

function MealsDetails({ item, ingredients, recomendacao }) {
  return (
    <div>
      <div>
        <img
          src={ item && item.strMealThumb }
          alt={ item && item.strMeal }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-category">{item && item.strCategory}</p>
        <p data-testid="instructions">{item && item.strInstructions}</p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${item[ingredient]} - ${item[`strMeasure${index + 1}`]}` }
            </li>
          ))}
        </ul>
        <iframe
          width="560"
          height="315"
          src={ item && item.strYoutube }
          allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          data-testid="video"
        />

        <section className="recomendation">
          {
            recomendacao.map((recomend, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
                className="recomendation-card"
              >
                <img
                  src={ recomend.strDrinkThumb }
                  alt={ recomend.strDrink }
                  className="recomendation-img"
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  { recomend.strDrink }
                </p>
              </div>
            ))
          }
        </section>
      </div>

    </div>
  );
}

MealsDetails.propTypes = PropTypes.shape({}).isRequired;
export default MealsDetails;
