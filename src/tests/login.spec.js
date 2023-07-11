import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

describe('Testa o a pagina de login', () => {
  it('Testa se a pagina contem os campos de email, senha e botao, se o botão inicial desabilitado e depois de validado o bottão passa a funcionar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputEmail, 'exemplo@email.com');
    userEvent.type(inputPassword, '123');
    expect(buttonLogin).toBeDisabled();

    userEvent.clear(inputPassword);
    userEvent.clear(inputEmail);

    userEvent.type(inputEmail, 'exemplo@email');
    userEvent.type(inputPassword, '123456');
    expect(buttonLogin).toBeDisabled();

    userEvent.clear(inputPassword);
    userEvent.clear(inputEmail);

    userEvent.type(inputEmail, 'exemplo@email.com');
    userEvent.type(inputPassword, '1234567');
    expect(buttonLogin).toBeEnabled();

    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/meals');
  });
});
