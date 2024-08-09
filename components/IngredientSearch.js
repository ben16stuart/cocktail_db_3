import React, { useState, useEffect } from 'react';
import styles from '../styles/IngredientSearch.module.css';

const IngredientSearch = ({ onSelectDrink }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (searchQuery.length > 0) {
        try {
          const res = await fetch(`/api/IngredientNames?query=${searchQuery}`);
          const data = await res.json();
          setIngredients(data);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      } else {
        setIngredients([]);
      }
    };

    fetchIngredients();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIngredientSelect = (ingredientName) => {
    setSelectedIngredient(ingredientName);
    if (onSelectDrink) {
      onSelectDrink(ingredientName);
    }
  };

  return (
    <div className={styles.ingredientSearchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for an ingredient..."
        className={styles.searchInput}
      />
      {ingredients.length > 0 && (
        <ul className={styles.searchResults}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.name} onClick={() => handleIngredientSelect(ingredient.name)} className={styles.searchResult}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientSearch;
