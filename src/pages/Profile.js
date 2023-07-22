import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import perfil from '../images/perfil.jpg';
import done from '../images/group-10.jpg';
import logout from '../images/group-8.jpg';
import favorit from '../images/button_favorite_01.png';
import './Profile.css';

function Profile() {
  const history = useHistory();
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="searchBar-contain title-favorit">
        <img
          src={ perfil }
          alt=""
          className="btn-footer"
        />
        <h1 data-testid="page-title">Profile</h1>
      </div>
      <main className="profile-contain">

        <Link
          to="/done-recipes"
          style={ { textDecoration: 'none' } }
        >
          <img
            src={ done }
            alt=""
            className="btn-footer"
          />
          Done Recipes
        </Link>
        <Link
          to="/favorite-recipes"
          style={ { textDecoration: 'none' } }
        >
          <img
            src={ favorit }
            alt=""
            className="btn-footer"
          />
          Favorite Recipes
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          className="btn-categories2"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          <img
            src={ logout }
            alt=""
            className="img-btn-meals2 logout"
          />
          Logout
        </button>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
