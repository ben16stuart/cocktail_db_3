import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Import Layout
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
      console.log('Random drink data:', data);
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
      console.log('Search result data:', data);
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
      console.log('Ingredient search result data:', data);
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
    <Layout>
      <div className={styles.container}>
        <SearchBar onSearch={handleSearch} onIngredientSearch={handleIngredientSearch} />
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
    </Layout>
  );
}

export default Home;
