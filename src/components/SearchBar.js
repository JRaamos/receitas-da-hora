import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import {
  fetchFirstLetter, fetchIngredients, fetchName,
  fetchDrinkIngredients,
  fetchDrinkFirstLetter,
  fetchDrinkName,
} from '../helpers/fetchApi';
import { fetchApi } from '../redux/actions';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const validateFilter = filter === 'primeira-letra';

  // função reponsavel por redirecionar para a pagina de detalhes de comidas ou bebidas e armazenar o valor da api no redux
  const handleDetailsMealsDrinks = (response) => {
    if (!response) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (response.length === 1 && pathname === '/meals') {
      history.push(`/meals/${response[0].idMeal}`);
    } if (response.length === 1 && pathname === '/drinks') {
      history.push(`/drinks/${response[0].idDrink}`);
    }
    dispatch(fetchApi(response));
  };

  // função responsavel por fazer a requisicao da api de comidas
  const handleFetchMeals = async () => {
    if (validateFilter && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (filter === 'ingrediente') {
      const response = await fetchIngredients(search);
      handleDetailsMealsDrinks(response);
    }

    if (filter === 'nome') {
      const response = await fetchName(search);
      handleDetailsMealsDrinks(response);
    }

    if (validateFilter && search.length === 1) {
      const response = await fetchFirstLetter(search);
      handleDetailsMealsDrinks(response);
    }
  };

  // função responsavel por fazer a requisicao da api de bebidas
  const handleFetchDrinks = async () => {
    if (filter === 'primeira-letra' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (filter === 'ingrediente') {
      const response = await fetchDrinkIngredients(search);
      handleDetailsMealsDrinks(response);
    }
    if (filter === 'nome') {
      const response = await fetchDrinkName(search);
      handleDetailsMealsDrinks(response);
    }
    if (validateFilter && search.length === 1) {
      const response = await fetchDrinkFirstLetter(search);
      handleDetailsMealsDrinks(response);
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
        onClick={ () => {
          if (pathname === '/meals') {
            handleFetchMeals();
          }
          if (pathname === '/drinks') {
            handleFetchDrinks();
          }
        } }
      >
        buscar
      </button>
    </form>
  );
}

export default SearchBar;
