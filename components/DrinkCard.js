import React from 'react';

const DrinkCard = ({ drink }) => {
  if (!drink) {
    return <p>Loading...</p>;
  }

  const { name, description, ingredients, instructions } = drink;

  return (
    <div className="drink-card">
      <h1>{name}</h1>
      <p>{description}</p>

      <h2>Ingredients</h2>
      <div className="ingredients-list">
        {ingredients.map((item, index) => (
          <div key={index} className="ingredient-item">
            <strong>{item.name}:</strong> {item.amount}
          </div>
        ))}
      </div>

      <h2>Instructions</h2>
      <div className="instructions-list">
        {instructions.map((step, index) => (
          <div key={index} className="instruction-item">
            <strong>Step {step.step_number}:</strong> {step.instruction}
          </div>
        ))}
      </div>

      <style jsx>{`
        .drink-card {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .ingredients-list, .instructions-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ingredient-item, .instruction-item {
          background-color: #f4f4f4;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default DrinkCard;
