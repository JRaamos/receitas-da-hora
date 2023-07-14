import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAllDrinks, fetchAllMeals,
  fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';
import './RecipeDetails.css';

function RecipeDetails() {
  const location = useLocation();
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isMeals, setIsMeals] = useState(false);
  const [recomendacao, setRecomendacao] = useState([]);
  const { pathname } = location;

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
  return (
    <div>
      {
        isMeals ? (

          <div>
            <h1 data-testid="recipe-title">{item && item.strMeal}</h1>
            <img
              src={ item && item.strMealThumb }
              alt={ item && item.strMeal }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">{item && item.strCategory}</p>
            <p data-testid="instructions">{item && item.strInstructions}</p>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${item[ingredient]} - ${item[`strMeasure${index + 1}`]}` }
                </li>
              ))}
            </ul>
            <iframe
              width="560"
              height="315"
              src={ item && item.strYoutube }
              allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
              title="YouTube video player"
              data-testid="video"
            />
            <h2>Recomendadas</h2>
            <section
              className="recomendation"
            >
              {
                recomendacao.map((recomend, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                    className="recomendation-card"
                  >
                    <img
                      src={ recomend.strDrinkThumb }
                      alt={ recomend.strDrink }
                      className="recomendation-img"
                    />
                    <p
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { recomend.strDrink }
                    </p>
                  </div>
                ))
              }
            </section>
          </div>
        ) : (
          <div>
            <h1 data-testid="recipe-title">{item && item.strDrink}</h1>
            <img
              src={ item && item.strDrinkThumb }
              alt={ item && item.strDrink }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">{item && item.strCategory}</p>
            <p data-testid="instructions">{item && item.strInstructions}</p>
            <p data-testid="recipe-category">
              { item.strAlcoholic }
            </p>
            <section>
              {ingredients.map((ingredient, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${item[ingredient]} - ${item[`strMeasure${index + 1}`]}` }
                </p>
              ))}
            </section>
            <h2>Recomendadas</h2>
            <section className="recomendation">
              {
                recomendacao.map((recomend, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                    className="recomendation-card"
                  >
                    <img
                      src={ recomend.strMealThumb }
                      alt={ recomend.strMeal }
                      className="recomendation-img"
                    />
                    <p
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { recomend.strMeal }
                    </p>
                  </div>
                ))
              }
            </section>
          </div>
        )
      }

    </div>
  );
}
export default RecipeDetails;
