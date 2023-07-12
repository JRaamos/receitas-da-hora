import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesDrinks from '../components/RecipesDrinks';

function Drinks() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <RecipesDrinks />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Drinks;
