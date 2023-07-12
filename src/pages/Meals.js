import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <header>
        <Header />
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
