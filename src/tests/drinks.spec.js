import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Drinks from '../pages/Drinks';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import { mockApiDrinkIngredients } from '../helpers/mockApiDrinkIngridients';
import { mockApiFirstLatter } from '../helpers/mockApiDrinkPrimeiraLetra';
import App from '../App';

const buttonSearch = () => screen.getByTestId('search-top-btn');
const searchInput = () => screen.getByTestId('search-input');
const buttonSearch2 = () => screen.getByTestId('exec-search-btn');
const firstLetterRadio = () => screen.getByTestId('first-letter-search-radio');

describe('Testa o a pagina de drinks', () => {
  it('Testa se a pagina tem um titulo, um botal de perfil e um botao de pesquisa, e se ao clicar no botao de perfil é redirecionado a pagina de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });
});

describe('Testa o a pagina de drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockApiDrinkIngredients);
  });
  it('Testa se quando clicar no botao de pesquisa é renderizado a barra de pesquisa e as opções de pesquisa junto com o segundo botao de busca, e testa se ao digitar no campo de busca "water", escolher a opção ingredites e clicar no botao bucar  se é feito a requisição ao edpoint correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const title = screen.getByTestId('page-title');
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(title).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch()).toBeInTheDocument();

    userEvent.click(buttonSearch());
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();

    userEvent.click(buttonSearch());
    expect(ingredientRadio).not.toBeInTheDocument();

    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Testa se quando clicar no botao de pesquisa é renderizado a barra de pesquisa e as opções de pesquisa junto com o segundo botao de busca, e testa se ao digitar no campo de busca "boulevard", escolher a opção ingredites e clicar no botao bucar  se é feito a requisição ao edpoint correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    userEvent.click(buttonSearch());

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');

    expect(searchInput()).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio()).toBeInTheDocument();
    expect(buttonSearch2()).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    act(() => {
      userEvent.type(searchInput(), 'Fruit');
      userEvent.click(buttonSearch2());
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/12728');
    });
  });
});
describe('Testa outro endpoint da pesquisa por primeira letra', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiFirstLatter),
    });
  });

  it('Testa se clicar em pesquisar e escolher a opção primeira letra e digitar "z" e clicar no botao de pesquisar se é feito a requisição ao endpoint correto', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    act(() => {
      history.push('/drinks');
    });
    userEvent.click(buttonSearch());
    userEvent.click(firstLetterRadio());
    act(() => {
      userEvent.type(searchInput(), 'y');
      userEvent.click(buttonSearch2());
    });

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Testa global alert', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    global.alert = jest.fn();
    act(() => {
      history.push('/drinks');
    });
    userEvent.click(buttonSearch());

    userEvent.click(firstLetterRadio());
    act(() => {
      userEvent.type(searchInput(), 'zd');
      userEvent.click(buttonSearch2());
    });
    expect(global.alert).toHaveBeenCalled();
  });
});
