import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import clipBoardCopy from 'clipboard-copy';
import { fetchAPIId } from '../helpers/fetchApiId';
import './recipeInProgress.css';
import { favoriteRecipe, getLocalStorage, isFavorite } from '../utils/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const getIngredients = (recipe) => Object.entries(recipe)
  .filter(([key, value]) => key.includes('strIngredient') && value)
  .map(([, value]) => value);

function RecipeInProgress() {
  const location = useLocation();
  const { pathname } = location;
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [message, setMessage] = useState('');
  const [favorite, setFavorite] = useState(isFavorite(recipe.id));
  console.log(favorite);
  console.log(message);

  const shareButton = () => {
    const { id, type } = recipe;
    console.log(id, type);
    clipBoardCopy(`http://localhost:3000/${type}/${id}`);
    setMessage('Link copied!');
  };

  const trataItem = (item) => {
    const { strMealThumb,
      strDrinkThumb,
      strMeal, strDrink,
      strCategory,
      strInstructions,
      idDrink,
      idMeal } = item;

    return {
      id: idMeal || idDrink,
      image: strMealThumb || strDrinkThumb,
      title: strMeal || strDrink,
      category: strCategory,
      instructions: strInstructions,
      ingredients: getIngredients(item),
      type: strMeal ? 'meals' : 'drinks',
    };
  };

  useEffect(() => {
    const id = pathname.split('/')[2];
    const recipeInProgress = async () => {
      const type = pathname.split('/')[1];
      const data = await fetchAPIId(id, type);
      console.log(data);
      setRecipe(trataItem(data));
    };
    recipeInProgress();
    const catchLocalStorage = getLocalStorage.getItem('inProgressRecipes') || {};
    setIngredients((catchLocalStorage[id]) || []);
  }, [pathname]);

  useEffect(() => {
    const { id } = recipe;
    getLocalStorage.setItem('inProgressRecipes', { [id]: ingredients });
  }, [ingredients, recipe]);

  const handleChangeCheckbox = ({ target }, index) => {
    const { checked } = target;
    ingredients[index] = true;
    setIngredients((state) => {
      state[index] = checked;
      return [...state];
    });
  };

  const favoriteButton = () => {
    setFavorite((state) => !state);
    favoriteRecipe(recipe);
  };

  return (
    <div>
      <header>
        <h1 data-testid="recipe-title">{recipe.title}</h1>
        <img data-testid="recipe-photo" src={ recipe.image } alt={ recipe.title } />
        <h3 data-testid="recipe-category">{recipe.category}</h3>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteButton }
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
        >
          Favorite
        </button>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ shareButton }
        >
          Share

        </button>
      </header>
      <div className="ingredient-progress">
        <h3>Ingredients</h3>
        <ul className="ingredient-progress">
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>
              <label>
                <input
                  type="checkbox"
                  className="ingredient-input"
                  onChange={ (event) => handleChangeCheckbox(event, index) }
                  checked={ Boolean(ingredients[index]) }
                />
                {ingredient}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <p data-testid="instructions">{recipe.instructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
