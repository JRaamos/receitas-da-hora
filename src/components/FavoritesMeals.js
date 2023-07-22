/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesMeals({ index, recipe, favorits }) {
  const [, setCopyLink] = useState(false);
  const copy = clipboardCopy;

  // função responsavel por copiar o link da pagina de receita para area de transferencia e setar o resultado booleano no stado copyLink
  const handleShare = (id) => {
    copy(`https://receitas-da-hora.vercel.app/meals/${id}`);
    setCopyLink(true);
  };
  return (
    <div className="done-contain">
      {/*
      copyLink && <p>Link copied!</p>
*/}
      <div key={ index } className="done-recipes-card">
        <Link to={ `/meals/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            className="done-img"
          />
        </Link>
        <div
          className="done-recipes-card-text"
        >
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.nationality} - ${recipe.category}` }
          </p>
          {/* <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p> */}
          <div className="favorit">
            <button
              type="button"
              className="btn-header"
              onClick={ () => handleShare(recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt={ recipe.name }

              />
            </button>
            <button
              className="btn-header"
              type="button"
              onClick={ () => { favorits(); } }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt={ recipe.name }
                className="btn-header"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FavoritesMeals.propTypes = PropTypes.shape({}).isRequired;

export default FavoritesMeals;
