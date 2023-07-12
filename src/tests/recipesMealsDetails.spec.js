import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import RecipesMealsDetails from '../pages/RecipesMealsDetails';

describe('Testa o endpoint de detalhes de uma receita de drinks', () => {
  it('Testa se é rederizado o componente ', () => {
    const { history } = renderWithRouterAndRedux(<RecipesMealsDetails />);
    history.push('/meals/52771');
    const title = screen.getByText('RecipesMealsDetails');
    expect(title).toBeInTheDocument();
  });
});
