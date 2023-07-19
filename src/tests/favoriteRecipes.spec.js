import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

const favorite = '/favorite-recipes';
const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
const topText = '0-horizontal-top-text';
describe('Testa o a pagina de favorite-recipes', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  localStorage.setItem('user', '{"email":"jonathan@gg.com"}');
  it('Testa o component é renderizado com todos os itens na pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    act(() => {
      history.push(favorite);
    });
    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    const buttonDesfavoritMeals = screen.getByTestId('0-horizontal-favorite-btn');
    const buttonDesfavoritDrinks = screen.getByTestId('1-horizontal-favorite-btn');

    expect(title).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId(topText)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    });
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('1-horizontal-share-btn'));
    });
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();

    userEvent.click(buttonDesfavoritMeals);
    userEvent.click(buttonDesfavoritDrinks);

    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Testa o botão de filtrar por comidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(favorite);
    });
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    act(() => {
      userEvent.click(buttonMeals);
    });

    act(() => {
      userEvent.click(buttonDrinks);
    });

    act(() => {
      userEvent.click(buttonAll);
    });
    const buttonDesfavoritMeals = screen.getByTestId('0-horizontal-favorite-btn');

    act(() => {
      userEvent.click(buttonDesfavoritMeals);
    });
  });
});
