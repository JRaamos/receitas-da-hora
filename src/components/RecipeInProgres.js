/* eslint-disable max-lines */
/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './RecipeInProgres.css';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';
import drink from '../images/mealIcon.svg';
import prato from '../images/drinkIcon.svg';

function RecipeInProgress() {
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setallIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  const copy = clipboardCopy;

  const favoriteIcon = () => {
    const id = pathname.split('/')[2];
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(favoritList.some((e) => e.id === id));
  };

  // função responsavel por fazer a requisicao da api de comidas e bebidas por id
  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const recipeDetaisl = async () => {
      const type = pathname.split('/')[1];
      const id = pathname.split('/')[2];
      if (type === 'meals') {
        const data = await fetchApiMealsId(id);
        setItem(data[0]);
      } else if (type === 'drinks') {
        const data = await fetchApiDrikId(id);
        setItem(data[0]);
      }
    };
    recipeDetaisl();
    favoriteIcon();
  }, []);

  // função responsavel por pegar as chaves dos ingredientes e filtrar os ingredientes
  useEffect(() => {
    const ingredientsKeys = item.length !== 0 ? Object.keys(item)
      .filter((key) => key.includes('strIngredient'))
      : [];
    const listIngredients = ingredientsKeys
      .filter((e) => item[e] !== null)
      .filter((ele) => item[ele].length !== 0);
    const ingredientFilter = listIngredients.map((ingredient) => item[ingredient]);
    setIngredients(ingredientFilter);
  }, [item]);

  // função responsavel por salvar os ingredientes no localStorage
  const handleCheckbox = (index) => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    const newIngredientes = [...allIngredients];
    if (allIngredients.includes(index)) {
      newIngredientes.splice(newIngredientes.indexOf(index), 1);
    } else {
      newIngredientes.push(index);
    }

    setallIngredients(newIngredientes);
    const progress = localStorage.getItem('inProgressRecipes');
    const progressData = progress ? JSON.parse(progress) : {};
    progressData[type] = {
      ...(progressData[type] || {}),
      [id]: newIngredientes,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressData));
  };
  // função responsavel por pegar os ingredientes salvos no localStorage
  useEffect(() => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    const progress = localStorage.getItem('inProgressRecipes');
    if (progress) {
      const progressData = JSON.parse(progress);
      const saved = progressData[type] && progressData[type][id];
      if (saved) {
        setallIngredients(saved);
      }
    }
  }, [pathname]);

  // função responsavel por copiar o link da pagina
  const handleShare = () => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    copy(`http://localhost:3000/${type}/${id}`);
    setCopyLink(true);
  };

  // função responsavel por salvar a receita nos favoritos
  const handleFavorite = () => {
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const type = pathname.split('/')[1];
    if (!favorite) {
      if (type === 'meals') {
        const favoritarMeals = {
          id: item.idMeal,
          type: 'meal',
          nationality: item.strArea,
          category: item.strCategory,
          alcoholicOrNot: '',
          name: item.strMeal,
          image: item.strMealThumb,
        };
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoritList, favoritarMeals]),
        );
      }
      if (type === 'drinks') {
        const favoritarDrinks = {
          id: item.idDrink,
          type: 'drink',
          category: item.strCategory,
          alcoholicOrNot: item.strAlcoholic,
          name: item.strDrink,
          nationality: '',
          image: item.strDrinkThumb,
        };
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoritList, favoritarDrinks]),
        );
      }
      setFavorite(true);
    } else {
      const newList = favoritList.filter((e) => e.id !== item.idMeal
        && e.id !== item.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
      setFavorite(false);
    }
  };
  // função responsavel por salvar a receita nas receitas feitas
  const handleFinish = () => {
    const type = pathname.split('/')[1];
    const progress = localStorage.getItem('doneRecipes');
    const progressData = progress ? JSON.parse(progress) : [];
    if (type === 'meals') {
      const doneMeals = {
        id: item.idMeal,
        type: 'meal',
        nationality: item.strArea,
        category: item.strCategory,
        alcoholicOrNot: '',
        name: item.strMeal,
        image: item.strMealThumb,
        doneDate: new Date(),
        tags: item.strTags ? item.strTags.split(',') : [],
      };
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...progressData, doneMeals]),
      );
    }
    if (type === 'drinks') {
      const doneDrinks = {
        id: item.idDrink,
        type: 'drink',
        nationality: '',
        category: item.strCategory,
        alcoholicOrNot: item.strAlcoholic,
        name: item.strDrink,
        image: item.strDrinkThumb,
        doneDate: new Date(),
        tags: item.strTags ? item.strTags.split(',') : [],
      };
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...progressData, doneDrinks]),
      );
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <div className="header-details">
        {
          pathname.split('/')[1] === 'meals' ? (
            <div
              className="header-icon"
            >
              <Link to="/meals">
                <img
                  src={ drink }
                  alt="prato"
                  className="img-header"
                />
              </Link>
            </div>
          ) : (
            <div className="header-icon">
              <Link to="/drinks">
                <img
                  src={ prato }
                  alt="drink"
                  className="img-header"
                />
              </Link>
            </div>
          )
        }
        <div className="btn">
          <button
            type="button"
            onClick={ handleFavorite }
            className="btn-details"
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
              data-testid="favorite-btn"

            />
          </button>
          <button
            type="button"
            className="btn-details"
            onClick={ handleShare }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="share"
            />
          </button>
        </div>
      </div>
      <h1
        data-testid="recipe-title"
        className="title-details-container"
      >
        {item.strDrink || item.strMeal }

      </h1>
      <img
        // eslint-disable-next-line max-lines
        className="details-img"
        data-testid="recipe-photo"
        src={ item.strDrinkThumb || item.strMealThumb }
        alt=""
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
      { copyLink && <p>Link copied!</p> }
      <h4>Ingredients</h4>
      <div className="ing-contain">
        <ul className="ingredient-progress ingredientes">
          {
            ingredients.map((ingredient, index) => (
              <li key={ index }>
                <label
                  className={ allIngredients.includes(index) ? 'checked' : '' }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ index }
                    onChange={ () => handleCheckbox(index) }
                    checked={ allIngredients.includes(index) }
                  />
                  { ingredient }
                </label>
              </li>
            ))
          }
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
      <div className="btn-contains">
        <button
          type="button"
          className="start-recipe-btn"

          data-testid="finish-recipe-btn"
          disabled={ ingredients.length !== allIngredients.length }
          onClick={ handleFinish }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
export default RecipeInProgress;
