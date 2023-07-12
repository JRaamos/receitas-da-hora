import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import { mockApiIngredients } from '../helpers/mockApiIngredientes';
import { mockApiName } from '../helpers/mockApiName';
import { mockApiFirstLatter } from '../helpers/mockApiPrimeiraLetra';

const buttonSearch = () => screen.getByTestId('search-top-btn');
const searchInput = () => screen.getByTestId('search-input');
const buttonSearch2 = () => screen.getByTestId('exec-search-btn');

describe('Testa o a pagina meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockApiIngredients);
  });
  it('Testa se a pagina tem um titulo, um botal de perfil e um botao de pesquisa,e testa se ao clicar no botao de pesquisa é rederizado as opções de pesquisa e se ao clicar de novo some as opções de pesquisa, e se ao clicar no botao de perfil é redirecionado a pagina de perfil', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

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

  it('Testa se quando clicar no botao de pesquisa é renderizado a barra de pesquisa e as opções de pesquisa junto com o segundo botao de busca, e testa se ao digitar no campo de busca "salmon", escolher a opção ingredites e clicar no botao bucar  se é feito a requisição ao edpoint correto', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    act(() => {
      history.push('/meals');
    });

    userEvent.click(buttonSearch());
    searchInput();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    buttonSearch2();

    expect(searchInput()).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(buttonSearch2()).toBeInTheDocument();

    userEvent.type(searchInput(), 'salmon');
    expect(searchInput()).toHaveValue('salmon');
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    userEvent.click(buttonSearch2());

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=salmon');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Testa outro endpoint da pesquisa por nome', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        meals: mockApiName,
      }),
    }));
  });
  it('Testa se clicar em pesquisar e escolher a opção nome e digitar "Arrabiata" e clicar no botao de pesquisar se é feito a requisição ao endpoint correto', async () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    act(() => {
      history.push('/meals');
    });
    userEvent.click(buttonSearch());
    const nameRadio = screen.getByTestId('name-search-radio');
    buttonSearch2();
    searchInput();

    userEvent.click(nameRadio);
    userEvent.type(searchInput(), 'Arrabiata');
    userEvent.click(buttonSearch2());

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
describe('Testa outro endpoint da pesquisa por primeira letra', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        meals: mockApiFirstLatter,
      }),
    }));
  });
  it('Testa se clicar em pesquisar e escolher a opção primeira letra e digitar "a" e clicar no botao de pesquisar se é feito a requisição ao endpoint correto', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    act(() => {
      history.push('/meals');
    });
    userEvent.click(buttonSearch());
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    buttonSearch2();
    searchInput();

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput(), 'a');
    userEvent.click(buttonSearch2());

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
