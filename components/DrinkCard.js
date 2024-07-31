import React, { useEffect, useState } from 'react';
import styles from './DrinkCard.module.css';

const DrinkCard = ({ drink }) => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    // Fetch the ingredients and instructions
    const fetchData = async () => {
      try {
        const resIngredients = await fetch(`/api/ingredients?drink_id=${drink.id}`);
        const ingredientsData = await resIngredients.json();
        setIngredients(ingredientsData);

        const resInstructions = await fetch(`/api/instructions?drink_id=${drink.id}`);
        const instructionsData = await resInstructions.json();
        setInstructions(instructionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [drink.id]);

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{drink.name}</h2>
      <p className={styles.description}>{drink.description}</p>
      <div className={styles.gridContainer}>
        <div className={styles.gridSection}>
          <h3 className={styles.sectionTitle}>Ingredients</h3>
          <div className={styles.grid}>
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className={styles.gridItem}>
                <span className={styles.ingredientName}>{ingredient.name}</span>
                <span className={styles.ingredientAmount}>{ingredient.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.gridSection}>
          <h3 className={styles.sectionTitle}>Instructions</h3>
          <div className={styles.grid}>
            {instructions.map((instruction) => (
              <div key={instruction.step_number} className={styles.gridItem}>
                <span className={styles.instructionStep}>Step {instruction.step_number}:</span>
                <span className={styles.instructionText}>{instruction.instruction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
