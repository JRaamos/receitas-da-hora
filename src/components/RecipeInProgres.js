import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './recipeInProgres.css';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import { fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';

function RecipeInProgress() {
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setallIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const copy = clipboardCopy;
  const favoriteIcon = () => {
    const id = pathname.split('/')[2];
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(favoritList.some((e) => e.id === id));
  };

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

  const handleShare = () => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    copy(`http://localhost:3000/${type}/${id}`);
    setCopyLink(true);
  };
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

  return (
    <div>
      <h1 data-testid="recipe-title">titulo</h1>
      <img data-testid="recipe-photo" src="" alt="" />
      <h3 data-testid="recipe-category">category</h3>
      {
        copyLink && <p>Link copied!</p>
      }
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />
      </button>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share"
        />
      </button>
      <ul className="ingredient-progress">
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
      <p data-testid="instructions">instructions</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
