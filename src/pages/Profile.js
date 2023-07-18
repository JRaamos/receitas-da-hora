import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <p data-testid="profile-email">{email.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }

        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
