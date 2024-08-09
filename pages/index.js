import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import IngredientSearch from '../components/IngredientSearch';
import DrinkCard from '../components/DrinkCard';
import styles from '../styles/Index.module.css';

function Home() {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomDrink = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/RandomDrink');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data);
    } catch (error) {
      console.error('Error fetching random drink:', error);
      setError('Failed to load drink');
    } finally {
      setLoading(false);
    }
  };

  const fetchDrinkByName = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/DrinksByName?name=${encodeURIComponent(name)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data);
    } catch (error) {
      console.error('Error fetching drink by name:', error);
      setError(`Error fetching drink: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchDrinksByIngredient = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/DrinksByIngredient?ingredient=${encodeURIComponent(ingredient)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data);
    } catch (error) {
      console.error('Error fetching drinks by ingredient:', error);
      setError('Failed to load drinks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  return (
    <div className={styles.IndexContainer}>
      <SearchBar onSelectDrink={fetchDrinkByName} /> 
      <IngredientSearch onSelectIngredient={fetchDrinksByIngredient} />
      <h2 className={styles.header}>What Should I Make?</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : drink ? (
        <DrinkCard drink={drink} />
      ) : (
        <p>No drinks found.</p>
      )}
    </div>
  );
}

export default Home;
