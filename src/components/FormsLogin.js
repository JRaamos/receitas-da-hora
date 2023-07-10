import { useEffect, useState } from 'react';

function FormsLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
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
  return (
    <div>
      <h1>Login</h1>
      <form>
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
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default FormsLogin;
