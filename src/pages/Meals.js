import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesMeals from '../components/RecipesMeals';

function Meals() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <RecipesMeals />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Meals;
