import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './recipeInProgres.css';

import { fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';

function RecipeInProgress() {
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setallIngredients] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
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

  const handleCheckboxChange = (index) => {
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
  return (
    <div>
      <h1 data-testid="recipe-title">titulo</h1>
      <img data-testid="recipe-photo" src="" alt="" />
      <h3 data-testid="recipe-category">category</h3>
      <button
        type="button"
        data-testid="favorite-btn"
        // onClick={favoriteButton}
        // src={ favorite ? blackHeartIcon : whiteHeartIcon }
      >
        Favorite
      </button>
      <button
        type="button"
        data-testid="share-btn"
        // onClick={ shareButton }
      >
        Share
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
                  onChange={ () => handleCheckboxChange(index) }
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
