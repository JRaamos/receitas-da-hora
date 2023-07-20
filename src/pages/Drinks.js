import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import drink from '../images/icone-drink.jpg';

function Drinks() {
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
              <img src={ drink } alt="" />
              <h1 data-testid="page-title">Drinks</h1>
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

export default Drinks;
