import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

const direction = '/meals/52977';
describe('Testa o endpoint de detalhes de uma receita de drinks', () => {
  it('Testa se é rederizado o componente ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const cardCorba = await screen.findByTestId('0-card-img');
    act(() => {
      userEvent.click(cardCorba);
    });
    expect(history.location.pathname).toBe(direction);

    const title = await screen.findByTestId('recipe-title');
    // const img = screen.getByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const recomendation = await screen.findByTestId('0-recommendation-card');
    const recomendationTitle = await screen.findByTestId('0-recommendation-title');

    expect(title).toBeInTheDocument();
    // expect(img).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();
    expect(recomendationTitle).toBeInTheDocument();

    const startRecipe = screen.getByTestId('start-recipe-btn');

    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toHaveTextContent('Start Recipe');
    act(() => {
      userEvent.click(startRecipe);
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: [] } }));

    expect(history.location.pathname).toBe('/meals/52977/in-progress');

    act(() => {
      history.push('/meals/52977');
    });

    const continueRecipe = screen.getByTestId('start-recipe-btn');
    expect(continueRecipe).toBeInTheDocument();
    expect(continueRecipe.innerHTML).toBe('Continue Recipe');
  });
  it('testa se ao clicar no botao de favoritar a receita ela é adicionada ao local storage', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(direction);
    });

    const favorite = screen.getByTestId('favorite-btn');
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favorite);

    expect(favorite).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(favorite);

    expect(favorite).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
  it('testa se ao clicar no botao de compartilhar o link da receita é copiado para o clipboard', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(direction);
    });

    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();

    act(() => {
      userEvent.click(share);
    });
    const Link = screen.getByText(/link copied!/i);
    expect(Link).toBeInTheDocument();
  });
});
