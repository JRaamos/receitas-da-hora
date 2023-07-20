import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import url3 from '../images/url3.ico';

function Header({ pesquisa, setPesquisa }) {
  const [title, setTitle] = useState('');
  const state = useSelector(({ gravatar }) => gravatar.gravatar);
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
        setTitle('');
        break;
      case '/drinks':
        setTitle('');
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
    <header className="header-contain">
      <img
        className="logo"
        src={ url3 }
        alt="logo"
      />
      <h1>{title}</h1>
      <div className="butons-header">
        <button
          className="btn-header"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="img-gravatar"
            src={ state || profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </button>
        {titlePagesIf ? null : (
          <button
            className="btn-header"
            type="button"
            onClick={ () => setPesquisa(!pesquisa) }
          >
            <img
              className="img-search"
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = PropTypes.shape({}).isRequired;
export default Header;
