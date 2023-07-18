import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

describe('Testa o a pagina de favorite-recipes', () => {
  localStorage.setItem('user', '{"email":"jonathan@gg.com"}');
  localStorage.setItem('doneRecipes', '[]');
  localStorage.setItem('favoriteRecipes', '[]');
  localStorage.setItem('inProgressRecipes', '{}');
  it('Testa se a pagina tem um titulo, e um botal de perfil e se ao clicar no botao de perfil é redirecionado a pagina de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const email = screen.getByTestId('profile-email');
    const buttonDone = screen.getByTestId('profile-done-btn');
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    const buttonLogout = screen.getByTestId('profile-logout-btn');

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();

    expect(history.location.pathname).toBe('/profile');

    act(() => {
      userEvent.click(buttonDone);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('testa se ao clicar no botao de favoritos é redirecionado a pagina de favoritos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    act(() => {
      userEvent.click(buttonFavorite);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('testa se ao clicar no botao de sair é redirecionado a pagina de login e o localStorage é apagado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    act(() => {
      userEvent.click(buttonLogout);
    });

    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
  });
});
