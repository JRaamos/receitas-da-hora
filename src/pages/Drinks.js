import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div className="pages-contain">
      <header className="header-contain">
        <Header />
      </header>
      <main>
        <Recipes />
      </main>
      <footer className="footer-contain">
        <Footer />
      </footer>
    </div>
  );
}

export default Drinks;
