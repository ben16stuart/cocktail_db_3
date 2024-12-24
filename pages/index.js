import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import IngredientSearch from '../components/IngredientSearch';
import DrinkCard from '../components/DrinkCard';
import CheersCard from '../components/CheersCard';
import HomemadeIngredients from '../components/HomemadeIngredients';
import styles from '../styles/Index.module.css';

function Home() {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cheersText, setCheersText] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [lockDrink, setLockDrink] = useState(false);
  const [lockedDrinkName, setLockedDrinkName] = useState(null); // Changed to store drink name

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

  const fetchHomemadeIngredientByName = async (hm_name) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/HomemadeIngredientsByName?hm_name=${encodeURIComponent(hm_name)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data);
    } catch (error) {
      console.error('Error fetching homemade ingredient by name:', error);
      setError(`Error fetching homemade ingredient: ${error.message}`);
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
      console.error('Error fetching drink by ingredient:', error);
      setError(`Error fetching drink: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCheersText = async () => {
    try {
      const res = await fetch('/api/Cheers');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setCheersText(data);
    } catch (error) {
      console.error('Error fetching cheers:', error);
    }
  };

  const createDrink = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the locked drink name if available, otherwise use the current drink name
      const baseDrinkParam = lockDrink ? 
        (lockedDrinkName || drink?.name) : 
        null;

      const url = baseDrinkParam
        ? `/api/CreateADrink?value=${sliderValue}&baseDrink=${encodeURIComponent(baseDrinkParam)}`
        : `/api/CreateADrink?value=${sliderValue}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDrink(data);
    } catch (error) {
      console.error('Error creating drink:', error);
      setError(`Error creating drink: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle lock drink toggle
  const handleLockToggle = () => {
    const newLockState = !lockDrink;
    setLockDrink(newLockState);
    
    if (newLockState && drink) {
      // Store the current drink's name when locking
      setLockedDrinkName(drink.name);
    } else {
      // Clear the locked drink name when unlocking
      setLockedDrinkName(null);
    }
  };

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  return (
    <div className={styles.IndexContainer}>
      <SearchBar onSelectDrink={fetchDrinkByName} />
      <IngredientSearch onSelectIngredient={fetchDrinksByIngredient} />
      <HomemadeIngredients onSelectDrink={fetchHomemadeIngredientByName} />

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

      <div style={{ marginTop: '50px' }} className={styles.createAdrinkCard}>
        <div>
        <h2>RiffMaker</h2>
          <label>
            <input
              type="checkbox"
              checked={lockDrink}
              onChange={handleLockToggle}
            />
            Lock Current Drink
          </label>
        </div>
        <h3>How cool / trendy / dangerous are you feeling?</h3>
        <input
          type="range"
          min="10"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          className={styles.slider}
        />
        <p>Danger Level: {sliderValue}% </p>
        <button onClick={createDrink} className={styles.createDrinkButton}>
          Create-A-Drink
        </button>
      </div>

      <div style={{ marginTop: '200px' }}>
        <h3 className={styles.header}>
          If you click this, you are morally obligated to recite it
          <br />
          regardless of the situation before the next round!
        </h3>
        <button onClick={fetchCheersText} className={styles.fetchCheersButton}>
          Cheers!
        </button>
      </div>
      {cheersText && <CheersCard cheersText={cheersText} />}
    </div>
  );
}

export default Home;
