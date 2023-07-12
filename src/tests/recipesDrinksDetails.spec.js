import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import RecipesDrinksDetails from '../pages/RecipesDrinksDetails';

describe('Testa o endpoint de detalhes de uma receita de drinks', () => {
  it('Testa se é rederizado o componente ', () => {
    const { history } = renderWithRouterAndRedux(<RecipesDrinksDetails />);
    history.push('/drinks/178319');
    const title = screen.getByText('RecipesDrinksDetails');
    expect(title).toBeInTheDocument();
  });
});
