import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesMeals({ index, recipe }) {
  return (
    <div>
      <div key={ index }>
        <Link to={ `/meals/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            width={ 250 }
          />
        </Link>
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe.nationality} - ${recipe.category}` }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <button type="button" onClick={ () => handleShare(recipe.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ recipe.name }
          />
        </button>
        <button
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="button"
        >
          <img src={ blackHeartIcon } alt={ recipe.name } />
        </button>

      </div>
    </div>
  );
}

FavoritesMeals.propTypes = PropTypes.shape({}).isRequired;

export default FavoritesMeals;
