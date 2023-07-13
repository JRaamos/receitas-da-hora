import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockApiName } from '../helpers/mockApiName';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import { mealsCategories } from '../helpers/mockApiCategory';

describe('Teste de rotas da pagina drink', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiName),
    });
  });
  it('Testa se ao digitar "Boulevardier" no campo de buca e escolher a opção nome e clicar em bucar se a pagina é redirecionada para "/drink/17251', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const input = screen.getByTestId('search-input');
    const buttonSearch2 = screen.getByTestId('exec-search-btn');
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(input, 'Arrabiata');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    act(() => {
      userEvent.click(buttonSearch2);
    });
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });
});
describe('Teste botões de categoria na pagina meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mealsCategories);
  });
  it('Testa se ao carregar a pagina os botões de categoria existem', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const beef = await screen.findByTestId('Beef-category-filter');
    const breakfast = await screen.findByTestId('Breakfast-category-filter');
    const chicken = await screen.findByTestId('Chicken-category-filter');
    const dessert = await screen.findByTestId('Dessert-category-filter');
    const goat = await screen.findByTestId('Goat-category-filter');

    expect(beef).toBeInTheDocument();
    expect(breakfast).toBeInTheDocument();
    expect(chicken).toBeInTheDocument();
    expect(dessert).toBeInTheDocument();
    expect(goat).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de categoria "Beef" é feito a requisição para o endpoint da api de meals com a categoria beef', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const beef = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beef);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    userEvent.click(beef);
  });
});
