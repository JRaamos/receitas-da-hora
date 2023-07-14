import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

describe('Testa o endpoint de detalhes de uma receita de drinks', () => {
  it('Testa se é rederizado o componente ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const GG = await screen.findByTestId('0-card-img');
    act(() => {
      userEvent.click(GG);
    });
    expect(history.location.pathname).toBe('/drinks/15997');

    const title = await screen.findByTestId('recipe-title');
    const img = await screen.findByTestId('recipe-photo');
    const instructions = await screen.findByTestId('instructions');
    const category = await screen.findAllByTestId('recipe-category');

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(category).toHaveLength(2);
    expect(instructions).toBeInTheDocument();
  });
});
