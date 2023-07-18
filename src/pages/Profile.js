import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email);
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
        >
          Done Recipes
        </button>
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
