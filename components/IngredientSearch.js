import React, { useState, useEffect } from 'react';
import styles from '../styles/IngredientSearch.module.css';

const IngredientSearch = ({ onSelectIngredient = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchIngredients = async () => {
      if (searchQuery.length > 0) {
        try {
          const res = await fetch(`/api/IngredientNames?query=${searchQuery}`);
          if (res.ok) {
            const data = await res.json();
            setIngredients(data);
          } else {
            console.error('Error fetching ingredients:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      } else {
        setIngredients([]);
      }
    };

    fetchIngredients();
  }, [searchQuery]);

  useEffect(() => {
    if (!selectedIngredient) return;
    const fetchRandomDrinkByIngredient = async () => {
      if (selectedIngredient) {
        try {
          const res = await fetch(`/api/DrinksByIngredient?ingredient=${encodeURIComponent(selectedIngredient)}`);
          const data = await res.json();
          if (data && data.id && data.name) {
            const detailsRes = await fetch(`/api/DrinksByName?name=${data.name}`);
            if (detailsRes.ok) {
              const drinkWithDetails = await detailsRes.json();
              //console.log('Drink details:', drinkWithDetails);
            } else {
              console.error('Error fetching drink details:', detailsRes.statusText);
            }
          } else {
            console.log('No drinks found for the selected ingredient');
          }
        } catch (error) {
          console.error('Error fetching drinks by ingredient:', error);
          setError(`Error fetching drinks: ${error.message}`);
        }
      }
    };
  
    if (selectedIngredient !== null && selectedIngredient !== '') { 
        fetchRandomDrinkByIngredient();
      }
    }, [selectedIngredient]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectedIngredient = (ingredient) => {
    console.log('handleSelectedIngredient called');
    setSearchQuery(ingredient.name);
    setSelectedIngredient(ingredient.name);
    onSelectIngredient(ingredient.name);
  };

  return (
    <div className={styles.ingredientSearchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Random drink by ingredient..."
        className={styles.searchInput}
      />
      {ingredients.length > 0 && (
        <ul className={styles.searchResults}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.name} onClick={() => handleSelectedIngredient(ingredient)} className={styles.searchResult}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default IngredientSearch;
