import React from 'react';
import PropTypes from 'prop-types';

function MealsDetails({ item, ingredients, recomendacao }) {
  const validUrl = (givenUrl) => givenUrl.replace('watch', 'embed').replace(/\?v=/g, '/');
  return (
    <div>
      <div>

        <h1
          data-testid="recipe-title"
          className="title-details-container"
        >
          {item && item.strMeal}

        </h1>
        <img
          src={ item && item.strMealThumb }
          alt={ item && item.strMeal }
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
        <h1>Video</h1>
        <iframe
          className="video"
          src={ validUrl(item && item.strYoutube) }
          allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          data-testid="video"
        />

        <h1>Recomendations</h1>
        <section className="recomendation">
          {
            recomendacao.map((recomend, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
                className="recomendation-card"
              >
                <p data-testid={ `${index}-recommendation-title` }>
                  { recomend.strDrink }
                </p>
                <img
                  src={ recomend.strDrinkThumb }
                  alt={ recomend.strDrink }
                  className="recomendation-img"
                />
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
