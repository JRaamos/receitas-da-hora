import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoniRecipesDrinks({ recipe, index }) {
  const [copyLink, setCopyLink] = useState(false);
  const copy = clipboardCopy;

  // função responsavel por copiar o link da pagina de receita para area de transferencia e setar o resultado booleano no stado copyLink
  const handleShare = (id) => {
    copy(`http://localhost:3000/drink/${id}`);
    setCopyLink(true);
  };
  return (
    <div>
      <div key={ index }>
        {
          copyLink && <p>Link copied!</p>
        }
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
        {
          recipe.tags.map((tag, indexTag) => (
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

DoniRecipesDrinks.propTypes = PropTypes.shape({}).isRequired;

export default DoniRecipesDrinks;
