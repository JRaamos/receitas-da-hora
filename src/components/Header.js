import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [title, setTitle] = useState('');
  const [pesquisa, setPesquisa] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const titlePagesIf = pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes';

  // função responsavel por setar o titulo da pagina de acordo com o pathname
  useEffect(() => {
    const titlePage = () => {
      switch (pathname) {
      case '/meals':
        setTitle('Meals');
        break;
      case '/drinks':
        setTitle('Drinks');
        break;
      case '/profile':
        setTitle('Profile');
        break;
      case '/done-recipes':
        setTitle('Done Recipes');
        break;
      default:
        setTitle('Favorite Recipes');
        break;
      }
    };
    titlePage();
  }, [pathname]);

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      {titlePagesIf ? null : (
        <button type="button" onClick={ () => setPesquisa(!pesquisa) }>
          <img
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {!pesquisa ? null : <SearchBar />}
    </header>
  );
}

export default Header;
