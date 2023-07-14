import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAllDrinks, fetchAllMeals,
  fetchApiDrikId, fetchApiMealsId } from '../helpers/fetchApi';

function RecipeDetails() {
  const location = useLocation();
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isMeals, setIsMeals] = useState(false);
  const [recomendacao, setRecomendacao] = useState([]);
  const { pathname } = location;

  useEffect(() => {
    const recipeDetaisl = async () => {
      const type = pathname.split('/')[1];
      const id = pathname.split('/')[2];
      if (type === 'meals') {
        const data = await fetchApiMealsId(id);
        setIsMeals(true);
        setItem(data[0]);
        setRecomendacao(await fetchAllDrinks());
      } else if (type === 'drinks') {
        const data = await fetchApiDrikId(id, type);
        setItem(data[0]);
        setIsMeals(false);
        setRecomendacao(await fetchAllMeals());
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
  console.log(recomendacao);
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
          </div>

        )
      }
    </div>
  );
}
export default RecipeDetails;
