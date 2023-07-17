import React from 'react';
import Header from '../components/Header';
import TelaDoneRecipes from '../components/TelaDoneRecipes';

function DoneRecipes() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <TelaDoneRecipes />
      </main>
    </div>
  );
}

export default DoneRecipes;
