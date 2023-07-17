import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
describe('Testa o a pagina de done-recipes', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  it('Testa o component é renderizado com todos os itens na pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    expect(history.location.pathname).toBe('/done-recipes');

    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(title).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
    act(() => {
      userEvent.click(buttonProfile);
    });

    expect(history.location.pathname).toBe('/profile');
  });
  it('Testa se os botões de filtrar estao funcionando', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');

    act(() => {
      userEvent.click(buttonMeals);
    });

    const textMeals = screen.getByTestId('0-horizontal-top-text');

    expect(textMeals).toHaveTextContent(/Italian - Vegetarian/i);

    act(() => {
      userEvent.click(buttonDrinks);
    });

    const textDrinks = screen.getByTestId('0-horizontal-top-text');

    expect(textDrinks).toHaveTextContent(/Alcoholic/i);

    act(() => {
      userEvent.click(buttonAll);
    });

    const textAll = screen.getByTestId('0-horizontal-top-text');
    const textAll2 = screen.getByTestId('1-horizontal-top-text');

    expect(textAll).toHaveTextContent(/Italian - Vegetarian/i);
    expect(textAll2).toHaveTextContent(/Alcoholic/i);
  });
});
