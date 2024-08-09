import React from 'react';
import styles from '../styles/DrinkCard.module.css';

const DrinkCard = ({ drink }) => {
  console.log('Drink prop:', drink);

  if (!drink) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.drinkCard}>
      <h1>{drink.name}</h1>
      <p>{drink.description}</p>

      <h2>Ingredients</h2>
      <div className={styles.ingredientsList}>
        {drink.ingredients && drink.ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientItem}>
            <strong>{ingredient.name}:</strong> {ingredient.amount}
          </div>
        ))}
      </div>

      <h2>Instructions</h2>
      <div className={styles.instructionsList}>
        {drink.instructions && drink.instructions.map((step, index) => (
          <div key={index} className={styles.instructionItem}>
            <strong>Step {step.step_number}:</strong> {step.instruction}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinkCard;
