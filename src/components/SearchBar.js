import React from 'react';

function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
        />
      </label>
      <label
        htmlFor="ingredient-search-radio"
      >
        ingrediente
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          name="seach"
          value="ingrediente"
        />
      </label>
      <label
        htmlFor="name-search-radio"
      >
        nome
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          name="seach"
          value="nome"
        />
      </label>
      <label
        htmlFor="first-letter-search-radio"
      >
        primeira letra
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          name="seach"
          value="primeira letra"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        buscar
      </button>
    </form>
  );
}

export default SearchBar;
