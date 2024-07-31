import React from 'react';

function DrinkCard({ drink }) {
  return (
    <div className="drinkDetails">
      <div className="drinkTitle">{drink.name}</div>
      <div className="drinkIngredients">
        <strong>Ingredients:</strong>
        <p>{drink.ingredients}</p>
      </div>
      <div className="drinkDirections">
        <strong>Directions:</strong>
        <p>{drink.directions}</p>
      </div>
    </div>
  );
}

export default DrinkCard;
