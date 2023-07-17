import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesMeals({ index, recipe, favorits }) {
  const [copyLink, setCopyLink] = useState(false);
  const copy = clipboardCopy;
  const handleShare = (id) => {
    copy(`http://localhost:3000/meals/${id}`);
    setCopyLink(true);
  };
  return (
    <div>
      {
        copyLink && <p>Link copied!</p>
      }
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
          type="button"
          onClick={ () => { favorits(); } }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt={ recipe.name }
          />
        </button>

      </div>
    </div>
  );
}

FavoritesMeals.propTypes = PropTypes.shape({}).isRequired;

export default FavoritesMeals;