import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o a pagina de drinks', () => {
  it('Testa se a pagina tem um titulo, um botal de perfil e um botao de pesquisa, e se ao clicar no botao de perfil é redirecionado a pagina de perfil', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const buttonSearch = screen.getByTestId('search-top-btn');

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });
});
