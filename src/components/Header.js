import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import url3 from '../images/url3.ico';

function Header({ pesquisa, setPesquisa }) {
  const state = useSelector(({ gravatar }) => gravatar.gravatar);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const titlePagesIf = pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes';

  return (
    <header className="header-contain">
      <Link to="/meals">
        <img
          className="logo"
          src={ url3 }
          alt="logo"
        />
      </Link>
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
