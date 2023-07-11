import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import Footer from '../components/Footer';

describe('Testando o componente Footer', () => {
  it('Teste se o componente contém os ícones corretos de acordo com a rota', () => {
    renderWithRouterAndRedux(<Footer />);
    const footer = screen.getByTestId('footer');
    const icons = screen.getAllByRole('img');
    expect(footer).toBeInTheDocument();
    expect(icons.length).toBe(2);
  });
  it('Verifica se ao clicar no ícone de bebidas, a rota muda para a tela /drinks', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  it('Verifica se ao clicar no ícone de comidas, a rota muda para a tela /meals', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
