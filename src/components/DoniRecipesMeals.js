import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoniRecipesMeals({ recipe, index }) {
  return (
    <div>

      <div key={ index }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe.nationality} - ${recipe.category}` }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <button type="button">
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ recipe.name }
          />
        </button>
        {
          recipe.tags.slice(0, 2).map((tag, indexTag) => (
            <p
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>

          ))
        }
      </div>
    </div>
  );
}

DoniRecipesMeals.propTypes = PropTypes.shape({}).isRequired;
export default DoniRecipesMeals;
