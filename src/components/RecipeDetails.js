import { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { fetchAllDrinks, fetchAllMeals,
  fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MealsDetails from './MealsDetails';
import DrinksDetails from './DrinksDetails';
import drink from '../images/mealIcon.svg';
import prato from '../images/drinkIcon.svg';

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

  // função responsavel por verificar se a receita esta favoritada ou não de acordo com o localStorag e setar o resultado booleano no stado favorite
  const favoriteIcon = () => {
    const id = pathname.split('/')[2];
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(favoritList.some((e) => e.id === id));
  };

  // função responsavel por verificar se a receita esta em progresso ou não de acordo com o localStorag e setar o resultado booleano no stado inProgress
  const continueRecipe = () => {
    const id = pathname.split('/')[2];
    const type = pathname.split('/')[1];
    const idLocalStorage = localStorage.getItem('inProgressRecipes');
    if (idLocalStorage) {
      const idLocalStorageParse = JSON.parse(idLocalStorage);
      if (idLocalStorageParse && idLocalStorageParse[type]) {
        const check = Object.keys(idLocalStorageParse[type]).some((e) => e === id);
        if (check) { setInProgress(true); }
      }
    }
  };

  // função responsavel por motar a url da pagina de receita em progresso e redirecionar para a pagina de receita em progresso
  const handleRedirect = () => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    if (type === 'meals') {
      history.push(`/meals/${id}/in-progress`);
    } else if (type === 'drinks') {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  // função responsavel por copiar o link da pagina de receita para area de transferencia e setar o resultado booleano no stado copyLink
  const handleShare = () => {
    const numberT = 3000;
    copy(`http://localhost:3000${pathname}`);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, numberT);
  };

  useEffect(() => {
    // função responsavel por verificar se o localStorag existe e caso não exista criar um localStorag com um array vazio e responsavel por fazer requisição a aó api de bebidas e comidas e setar o resultado no stado recomendacao e responsavel por fazer requisição a aó api de bebidas e comidas por id
    const recipeDetaisl = async () => {
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
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
        const data = await fetchApiDrikId(id);
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

  // função responsavel por pegar todas os ingredietes da receita separar suas chaves e filtrar as chaves que contem a palavra strIngredient e setar o resultado no stado ingredients e responsavel po retirar os ingredientes que não tem valor e setar o resultado no stado ingredients
  useEffect(() => {
    const ingredientsKeys = item.length !== 0 ? Object.keys(item)
      .filter((key) => key.includes('strIngredient'))
      : [];
    const listIngredients = ingredientsKeys
      .filter((e) => item[e] !== null)
      .filter((ele) => item[ele].length !== 0);
    setIngredients(listIngredients);
  }, [item]);

  // função responsavel por setar no localStorage o array de objetos com todas as receitas que são favoritas e tbm retirar do localStorage a receita que foi desfavoritada
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
        {
          copyLink && <p>Link copied!</p>
        }
        <div className="btn">
          <button
            type="button"
            onClick={ handleShare }
            className="btn-details"
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button
            className="btn-details"
            type="button"
            onClick={ () => {
              handleFavorite();
            } }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
              data-testid="favorite-btn"
            />
          </button>
        </div>

      </div>
      {
        isMeals ? (
          <MealsDetails
            item={ item }
            title="Meals"
            ingredients={ ingredients }
            recomendacao={ recomendacao }
          />

        ) : (
          <DrinksDetails
            item={ item }
            title="Drinks"
            ingredients={ ingredients }
            recomendacao={ recomendacao }
          />
        )
      }
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ () => {
          handleRedirect();
        } }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>

    </div>
  );
}
export default RecipeDetails;
