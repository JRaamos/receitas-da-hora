import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPIId } from '../helpers/fetchApi';

function RecipeDetails() {
  const location = useLocation();
  const [item, setItem] = useState();
  const { pathname } = location;
  useEffect(() => {
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    const recipeDetaisl = async () => {
      const data = await fetchAPIId(id, type);
      setItem(data);
    };
    recipeDetaisl();
  }, [pathname]);
  console.log(item);
  return (
    <div>
      <h1 data-testid="recipe-title">
        oi
      </h1>
      <img
        src=""
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">texto</p>

      <p data-testid="instructions"> texto instruçoes</p>
      <p data-testid="video"> video</p>
    </div>
  );
}
export default RecipeDetails;
