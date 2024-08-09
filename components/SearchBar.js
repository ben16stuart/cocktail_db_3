import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSelectDrink }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drinkNames, setDrinkNames] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    const fetchDrinkNames = async () => {
      if (searchQuery.length > 0) { // changed from 2 to 0
        try {
          const res = await fetch(`/api/DrinkNames?query=${searchQuery}`);
          const data = await res.json();
          setDrinkNames(data);
        } catch (error) {
          console.error('Error fetching drink names:', error);
        }
      } else {
        setDrinkNames([]);
      }
    };

    fetchDrinkNames();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDrinkSelect = (drinkName) => {
    setSelectedDrink(drinkName);
    onSelectDrink(drinkName);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a drink..."
        className={styles.searchInput}
      />
      {drinkNames.length > 0 && (
        <ul className={styles.searchResults}>
          {drinkNames.map((drinkName) => (
            <li key={drinkName} onClick={() => handleDrinkSelect(drinkName)} className={styles.searchResult}>
              {drinkName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
