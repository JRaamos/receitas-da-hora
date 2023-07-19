import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import tomato from '../images/tomate.png';
import { handleGravatar } from '../helpers/featFunctions';

import { handleGravatarEmail } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // função responsavel por validar o email e a senha
    const handleValidation = () => {
      const MIN_PASSWORD_LENGTH = 6;
      const emailValidation = /.+@[A-z]+[.]com/;
      if (emailValidation.test(email) && password.length > MIN_PASSWORD_LENGTH) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    handleValidation();
  }, [email, password]);

  // função responsavel por salvar o email no localStorage e redirecionar para a pagina de comidas
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
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
      <div>
        <img src={ tomato } alt="comida" className="tomate-img" />
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
          disabled={ isDisabled }
          onClick={ () => {
            handleSubmit();
            dispatch(handleGravatarEmail(handleGravatar(email)));
          } }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
