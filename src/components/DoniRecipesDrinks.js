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
    copy(`https://receitas-da-hora.vercel.app/drink/${id}`);
    setCopyLink(true);
    console.log(copyLink);
  };
  return (
    <div className="done-contain">
      {/*
        copyLink && <p>Link copied!</p>
  */}
      <div
        key={ index }
        className="done-recipes-card"
      >
        <Link to={ `/drinks/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            className="done-img"
          />
        </Link>
        <div className="done-recipes-card-text">
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          {/* <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p> */}
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.alcoholicOrNot}`}
          </p>
          <button
            type="button"
            onClick={ () => handleShare(recipe.id) }
            className="btn-header"
          >
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
    </div>
  );
}

DoniRecipesDrinks.propTypes = PropTypes.shape({}).isRequired;

export default DoniRecipesDrinks;
