import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';
import styles from '../styles/Home.module.css';

function Home() {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomDrink = async () => {
    try {
      const res = await fetch('/api/supabase');
      const data = await res.json();
      setDrink(data); // assuming data is a single drink object
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/supabase?query=${query}`);
      const data = await res.json();
      setDrink(data[0]); // assuming data is an array of drinks
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleIngredientSearch = async (ingredient) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/supabase?ingredient=${ingredient}`);
      const data = await res.json();
      setDrink(data[0]); // assuming data is an array of drinks
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      {loading ? (
        <p>Loading...</p>
      ) : drink ? (
        <DrinkCard drink={drink} />
      ) : (
        <p>No drinks found.</p>
      )}
    </div>
  );
}

export default Home;
