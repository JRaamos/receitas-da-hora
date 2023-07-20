import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import prato from '../images/icone-prato.jpg';

function Meals() {
  const [pesquisa, setPesquisa] = useState(false);

  return (
    <div>
      <header>
        <Header
          setPesquisa={ setPesquisa }
          pesquisa={ pesquisa }
        />
        <div className="search-contain">
          {!pesquisa ? (
            <div className="searchBar-contain">
              <img src={ prato } alt="" />
              <h1 data-testid="page-title">Meals</h1>
            </div>
          ) : (
            <SearchBar />
          )}
        </div>
      </header>
      <main>
        <Recipes />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Meals;
