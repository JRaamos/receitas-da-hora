import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchApi } from '../redux/actions';
import { fetchFirstLetter, fetchIngredients, fetchName } from '../helpers/fetchApi';

function SearchBar() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const controlFetch = async () => {
    if (filter === 'ingrediente') {
      dispatch(fetchApi(await fetchIngredients(search)));
    }
    if (filter === 'nome') {
      dispatch(fetchApi(await fetchName(search)));
    }
    if (filter === 'primeira-letra' && search.length === 1) {
      dispatch(fetchApi(await fetchFirstLetter(search)));
    }
    if (filter === 'primeira-letra' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <form>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          type="text"
          id="search-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
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
          onChange={ ({ target }) => setFilter(target.value) }
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
          onChange={ ({ target }) => setFilter(target.value) }
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
          value="primeira-letra"
          onChange={ ({ target }) => setFilter(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ controlFetch }
      >
        buscar
      </button>
    </form>
  );
}

export default SearchBar;
