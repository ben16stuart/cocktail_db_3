import React from 'react';
import styles from '../styles/DrinkCard.module.css';

const DrinkCard = ({ drink }) => {
  if (!drink) return null;

  return (
    <div className={styles.card}>
      <h2>{drink.name}</h2>
      <p>{drink.description}</p>
      <p>Category: {drink.category}</p>
      <img src={drink.url} alt={drink.name} />
      <h3>Ingredients:</h3>
      <ul>
        {drink.ingredients.map((item, index) => (
          <li key={index}>
            {item.amount} of {item.ingredients.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkCard;
