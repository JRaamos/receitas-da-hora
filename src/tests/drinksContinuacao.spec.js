import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';
import { mockApiDrinkName } from '../helpers/mockApiDrinkName';

describe('Testa o endpoint de ingredientes', () => {
  it('Testa global alert', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const butoonSeach = screen.getByTestId('search-top-btn');

    userEvent.click(butoonSeach);
    const input = screen.getByTestId('search-input');
    const buttonSearch2 = screen.getByTestId('exec-search-btn');
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(input, 'duvido que retone alguma coisa');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    act(() => {
      userEvent.click(buttonSearch2);
    });
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
describe('Teste de rotas da pagina drink', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiDrinkName),
    });
  });
  it('Testa se ao digitar "Boulevardier" no campo de buca e escolher a opção nome e clicar em bucar se a pagina é redirecionada para "/drink/17251', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const input = screen.getByTestId('search-input');
    const buttonSearch2 = screen.getByTestId('exec-search-btn');
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(input, 'Boulevardier');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    act(() => {
      userEvent.click(buttonSearch2);
    });
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/17251'));
  });
});
