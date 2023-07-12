import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockApiName } from '../helpers/mockApiName';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

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
