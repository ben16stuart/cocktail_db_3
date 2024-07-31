import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredient, setIngredient] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query, ingredient });
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search by drink name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Search by ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
