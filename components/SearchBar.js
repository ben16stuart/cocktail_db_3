import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

function SearchBar({ onSearch, onIngredientSearch }) {
  const [query, setQuery] = useState('');
  const [ingredient, setIngredient] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleIngredientSearchSubmit = (e) => {
    e.preventDefault();
    onIngredientSearch(ingredient);
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a drink"
        />
        <button type="submit">Search</button>
      </form>
      <form onSubmit={handleIngredientSearchSubmit}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Search by ingredient"
        />
        <button type="submit">Search by Ingredient</button>
      </form>
    </div>
  );
}

export default SearchBar;
