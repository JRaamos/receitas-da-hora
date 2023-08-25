import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { handleGravatar } from '../helpers/featFunctions';
import { handleGravatarEmail } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMessagemEmail, setIsMessagemEmail] = useState(false);
  const [isMessagemPassword, setIsMessagemPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // função responsavel por validar o email e a senha
  const handleValidation = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailValidation = /.+@[A-z]+[.]com/;
    if (!emailValidation.test(email)) {
      setIsMessagemEmail(true);
    } else {
      setIsMessagemEmail(false);
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setIsMessagemPassword(true);
    } else {
      setIsMessagemPassword(false);
    }
  };
  const handleValidationAndSubmit = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailValidation = /.+@[A-z]+[.]com/;
    if (emailValidation.test(email) && password.length > MIN_PASSWORD_LENGTH) {
      dispatch(handleGravatarEmail(handleGravatar(email)));
      setIsMessagemEmail(false);
      setIsMessagemPassword(false);
      localStorage.setItem('user', JSON.stringify({ email }));
      history.push('/meals');
    }
  };

  return (
    <div className="login-contain">
      <div>
        <img
          src="https://i.pinimg.com/736x/ca/d1/7f/cad17f2ce776cf9bf851effd5c16c9d4.jpg"
          alt="comida"
          className="login-img"
        />
      </div>
      <div className="login-messagem">
        {
          isMessagemEmail
          && <p>O email deve ser no formato `exemplo@exem.com`</p>
        }
        {
          isMessagemPassword
           && <p> A senha deve ter no minimo 6 caracteres</p>
        }
      </div>
      <form className="forms-login">
        <h1 className="login-title">Login</h1>
        <label htmlFor="email-input">
          <input
            className="login-input"
            type="email"
            data-testid="email-input"
            placeholder="Email"
            onChange={ ({ target }) => {
              setEmail(target.value);
            } }
          />
        </label>
        <label htmlFor="password-input">
          <input
            className="login-input"
            type="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ ({ target }) => {
              setPassword(target.value);
            } }
          />
        </label>
        <button
          className="login-btn"
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => {
            handleValidation();
            handleValidationAndSubmit();
          } }
        >
          Entrar
        </button>
        <button
          className="login-btn"
          onClick={ () => history.push('/meals') }
        >
          Continuar sem login
        </button>
      </form>
    </div>
  );
}
export default Login;
