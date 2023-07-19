import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDrinksDetails from './pages/RecipesDrinksDetails';
import RecipesMealsDetails from './pages/RecipesMealsDetails';
import RecipeInProgressPages from './pages/RecipeInProgress';

function App() {
  useEffect(() => {
    document.title = 'Receitas da hora!';
  }, []);
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/meals"
          component={ Meals }
        />
        <Route
          exact
          path="/meals/:id"
          render={ () => <RecipesMealsDetails /> }
        />
        <Route
          exact
          path="/drinks"
          component={ Drinks }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ () => <RecipesDrinksDetails /> }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ () => <RecipeInProgressPages /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ () => <RecipeInProgressPages /> }
        />
      </Switch>
    </div>
  );
}

export default App;
