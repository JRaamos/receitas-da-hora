import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import RecipesDrinksDetails from '../pages/RecipesDrinksDetails';

describe('Testa o endpoint de detalhes de uma receita de drinks', () => {
  it('Testa se é rederizado o componente ', () => {
    const { history } = renderWithRouterAndRedux(<RecipesDrinksDetails />);
    act(() => {
      history.push('/drinks/17251');
    });
    const title = screen.getByText('RecipesDrinksDetails');
    expect(title).toBeInTheDocument();
  });
});
