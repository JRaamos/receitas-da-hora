import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-contain">
      <form className="forms-login">
        <h1>Login</h1>
        <label htmlFor="email-input">
          <input
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
            type="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ ({ target }) => {
              setPassword(target.value);
            } }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
