import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div
      data-testid="footer"
      className="footerPosition"
    >
      <button
        className="btn-footer"
      >
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinkIcon"
          />
        </Link>
      </button>
      <button
        className="btn-footer"
      >
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="mealIcon"
          />
        </Link>
      </button>
    </div>
  );
}

export default Footer;
