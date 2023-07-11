import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa o a pagina de favorite-recipes', () => {
  it('Testa se a pagina tem um titulo, e um botal de perfil e se ao clicar no botao de perfil é redirecionado a pagina de perfil', () => {
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);
    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();

    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });
});
