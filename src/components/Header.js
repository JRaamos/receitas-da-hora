import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [title, setTitle] = useState('');
  const location = useLocation();
  const { pathname } = location;
  const titlePagesIf = pathname === '/profile' || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

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
      <h1 data-testid="page-title">
        { title }
      </h1>
      <button
        type="button"
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      {
        titlePagesIf ? null
          : (
            <button
              type="button"
            >
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )
      }
    </header>
  );
}

export default Header;
