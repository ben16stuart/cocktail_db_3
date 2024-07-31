import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';
import styles from '../styles/Home.module.css';

function Home() {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomDrink = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/supabase');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load drink');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/supabase', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load drink');
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientSearch = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/supabase', {
        method: 'POST',
        body: JSON.stringify({ ingredient }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load drink');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} onIngredientSearch={handleIngredientSearch} />
      <h2 className={styles.header}>Random Drink</h2>
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

