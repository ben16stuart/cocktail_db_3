import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearchByName, onSearchByIngredient }) => {
  const [query, setQuery] = useState('');
  const [ingredient, setIngredient] = useState('');

  const handleSearchByName = (e) => {
    e.preventDefault();
    onSearchByName(query);
  };

  const handleSearchByIngredient = (e) => {
    e.preventDefault();
    onSearchByIngredient(ingredient);
  };

  return (
    <div className={styles.searchBarContainer}>
      <form className={styles.searchForm} onSubmit={handleSearchByName}>
        <input
          type="text"
          placeholder="Drink Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search by Name
        </button>
      </form>

      <form className={styles.searchForm} onSubmit={handleSearchByIngredient}>
        <input
          type="text"
          placeholder="Ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search by Ingredient
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
