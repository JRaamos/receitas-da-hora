import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { fetchAllDrinks, fetchAllMeals,
  fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MealsDetails from './MealsDetails';
import DrinksDetails from './DrinksDetails';

function RecipeDetails() {
  const location = useLocation();
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isMeals, setIsMeals] = useState(false);
  const [recomendacao, setRecomendacao] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const { pathname } = location;
  const copy = clipboardCopy;
  const favoriteIcon = () => {
    const id = pathname.split('/')[2];
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const favorites = favoritList.some((e) => e.id === id);
    setFavorite(favorites);
  };
  const handleFavoriteIcon = () => {
    const id = pathname.split('/')[2];
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const newStorage = favoritList.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    setFavorite(false);
  };
  const continueRecipe = () => {
    const id = pathname.split('/')[2];
    const type = pathname.split('/')[1];
    const idLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (idLocalStorage && type === 'meals' && idLocalStorage.meals[id]) {
      setInProgress(true);
    }
    if (idLocalStorage && type === 'drinks' && idLocalStorage.drinks[id]) {
      setInProgress(true);
    }
  };
  const handleRedirect = () => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    if (type === 'meals') {
      history.push(`/meals/${id}/in-progress`);
    } else if (type === 'drinks') {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopyLink(true);
  };
  useEffect(() => {
    const recipeDetaisl = async () => {
      const number = 6;

      const type = pathname.split('/')[1];
      const id = pathname.split('/')[2];
      if (type === 'meals') {
        const data = await fetchApiMealsId(id);
        setIsMeals(true);
        setItem(data[0]);
        const response = await fetchAllDrinks();
        setRecomendacao(response.slice(0, number));
      } else if (type === 'drinks') {
        const data = await fetchApiDrikId(id, type);
        setItem(data[0]);
        setIsMeals(false);
        const response = await fetchAllMeals();
        setRecomendacao(response.slice(0, number));
      }
    };
    recipeDetaisl();
    continueRecipe();
    favoriteIcon();
  }, []);

  useEffect(() => {
    const ingredientsKeys = item.length !== 0 ? Object.keys(item)
      .filter((key) => key.includes('strIngredient'))
      : [];

    const listIngredients = ingredientsKeys
      .filter((e) => item[e] !== null)
      .filter((ele) => item[ele].length !== 0);

    setIngredients(listIngredients);
  }, [item]);

  const handleFavorite = () => {
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const type = pathname.split('/')[1];
    if (type === 'meals') {
      const favoritarMeals = [...favoritList,
        {
          id: item.idMeal,
          type: 'meal',
          nationality: item.strArea,
          category: item.strCategory,
          alcoholicOrNot: '',
          name: item.strMeal,
          image: item.strMealThumb,
        }];
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(favoritarMeals),
      );
    }
    if (type === 'drinks') {
      const favoritarDrinks = [...favoritList,
        {
          id: item.idDrink,
          type: 'drink',
          category: item.strCategory,
          alcoholicOrNot: item.strAlcoholic,
          name: item.strDrink,
          nationality: '',
          image: item.strDrinkThumb,
        }];
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(favoritarDrinks),
      );
    }
  };
  return (
    <div>
      {
        copyLink && <p>Link copied!</p>
      }
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ handleRedirect }
      >
        {inProgress ? 'Continue Recipe' : 'Star Recipe'}
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
      <button
        type="button"
        onClick={ () => {
          handleFavoriteIcon();
          handleFavorite();
          setFavorite(!favorite);
        } }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"

        />
      </button>
      {
        isMeals ? (
          <MealsDetails
            item={ item }
            ingredients={ ingredients }
            recomendacao={ recomendacao }
          />

        ) : (
          <DrinksDetails
            item={ item }
            ingredients={ ingredients }
            recomendacao={ recomendacao }
          />
        )
      }
    </div>
  );
}
export default RecipeDetails;
