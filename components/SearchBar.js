import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch, onIngredientSearch }) {
  const [query, setQuery] = useState('');
  const [ingredient, setIngredient] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onIngredientSearch(ingredient);
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a drink"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      <form onSubmit={handleIngredientSubmit}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Search by ingredient"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search by Ingredient</button>
      </form>
    </div>
  );
}

export default SearchBar;
