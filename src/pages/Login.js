import { useEffect } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const history = useHistory();
  useEffect(() => {
    const number = 4000;
    setTimeout(() => {
      history.push('/meals');
    }, number);
  }, []);
  return (
    <div className="login-contain">
      <div className="img-contain">
        <img
          src="https://i.pinimg.com/736x/ca/d1/7f/cad17f2ce776cf9bf851effd5c16c9d4.jpg"
          alt="comida"
          className="login-img"
        />
      </div>
      {/* <div>
        <img src={ tomato } alt="comida" className="tomate-img" />
  </div> */}
      <h1 className="login-title">
        Seja bem vindo ao melhor app de receitas do brasil!
      </h1>
      <p className="login-paragraph">
        voce sera redirecionado para tela de reiceitas em segundos
      </p>
    </div>
  );
}

export default Login;
