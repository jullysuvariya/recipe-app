import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = <APP_ID>;
  const APP_KEY = <APP_KEY>;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Burger");

  useEffect(() => {
      getRecipes();
  },[query]);

  const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
  };

  const updateSearch = (e) => {
      setSearch(e.target.value);
  };

  const getSearch = (e) => {
      e.preventDefault();
      setQuery(search);
      setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button"  type="submit">
          Search
        </button>
      </form>
      <div className="recipes" >
        {recipes.map(recipe =>(
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>

  );
};

export default App;
