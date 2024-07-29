import React from 'react';

function DrinkCard({ drink }) {
  return (
    <div>
      <h2>{drink.name}</h2>
      <p>Ingredients: {drink.ingredients}</p>
      <p>Instructions: {drink.instructions}</p>
    </div>
  );
}

export default DrinkCard;
