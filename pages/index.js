import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';

function Home() {
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetch('/api/supabase')
      .then((res) => res.json())
      .then((data) => setDrink(data));
  }, []);

  return (
    <div>
      <Header />
      <SearchBar />
      {drink ? (
        <DrinkCard drink={drink} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
