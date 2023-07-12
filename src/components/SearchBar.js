import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  fetchFirstLetter, fetchIngredients, fetchName,
  fetchDrinkIngredients,
  fetchDrinkFirstLetter,
  fetchDrinkName,
} from '../helpers/fetchApi';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const handleDetailsMeals = () => {
      if (data.length === 1 && pathname === '/meals') {
        history.push(`/meals/${data[0].idMeal}`);
      } else if (data.length === 1 && pathname === '/drinks') {
        history.push(`/drinks/${data[0].idDrink}`);
      } else if (data === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters');
      }
    };
    handleDetailsMeals();
  }, [data]);

  const handleFetch = async () => {
    if (filter === 'ingrediente') {
      if (pathname === '/meals') {
        const response = await fetchIngredients(search);
        setData(response);
      } else if (pathname === '/drinks') {
        const response = await fetchDrinkIngredients(search);
        setData(response);
      }
    }
    if (filter === 'nome') {
      if (pathname === '/meals') {
        const response = await fetchName(search);
        setData(response);
      } else if (pathname === '/drinks') {
        const response = await fetchDrinkName(search);
        setData(response);
      }
    }
    if (filter === 'primeira-letra' && search.length === 1) {
      if (pathname === '/meals') {
        const response = await fetchFirstLetter(search);
        setData(response);
        handleDetailsMeals();
      } else if (pathname === '/drinks') {
        const response = await fetchDrinkFirstLetter(search);
        setData(response);
      }
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
        onClick={ handleFetch }
      >
        buscar
      </button>
    </form>
  );
}

export default SearchBar;
