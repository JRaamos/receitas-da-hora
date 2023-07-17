import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesDrinks({ index, recipe }) {
  const [copyLink, setCopyLink] = useState(false);
  const copy = clipboardCopy;
  const handleShare = (id) => {
    copy(`http://localhost:3000/drinks/${id}`);
    setCopyLink(true);
  };
  return (
    <div>
      <div>
        {
          copyLink && <p>Link copied!</p>
        }
        <div key={ index }>

          <Link to={ `/drinks/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.alcoholicOrNot}`}
          </p>
          <button type="button" onClick={ () => handleShare(recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ recipe.name }
            />
          </button>
          <button
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ recipe.name }
            />
          </button>

        </div>
      </div>
    </div>
  );
}

FavoritesDrinks.propTypes = PropTypes.shape({}).isRequired;

export default FavoritesDrinks;
