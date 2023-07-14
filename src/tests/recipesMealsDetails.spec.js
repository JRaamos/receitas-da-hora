import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

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
    expect(history.location.pathname).toBe('/meals/52977');

    const title = await screen.findByTestId('recipe-title');
    const img = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const recomendation = await screen.findByTestId('0-recommendation-card');
    const recomendationTitle = await screen.findByTestId('0-recommendation-title');

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();
    expect(recomendationTitle).toBeInTheDocument();
    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();

    const favorite = screen.getByTestId('favorite-btn');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
  });
});
