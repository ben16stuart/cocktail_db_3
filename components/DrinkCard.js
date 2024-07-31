import React, { useEffect, useState } from 'react';

const DrinkRecipeCard = () => {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await fetch('/api/supabase');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDrink(data);
      } catch (error) {
        console.error('Error fetching drink:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrink();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!drink) {
    return <p>No drink data available</p>;
  }

  return (
    <div className="drink-recipe-card">
      <h1>{drink.name}</h1>
      <p>{drink.description}</p>

      <div className="ingredients">
        <h2>Ingredients</h2>
        <div className="grid">
          {drink.ingredients.map((ingredient, index) => (
            <div key={index} className="grid-item">
              <span>{ingredient.name}</span>: <span>{ingredient.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="instructions">
        <h2>Instructions</h2>
        <div className="grid">
          {drink.instructions.map((instruction, index) => (
            <div key={index} className="grid-item">
              <span>Step {instruction.step_number}: </span>
              <span>{instruction.instruction}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .drink-recipe-card {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          max-width: 600px;
          margin: auto;
        }

        .ingredients,
        .instructions {
          margin-top: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 10px;
        }

        .grid-item {
          background: #f9f9f9;
          padding: 10px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 2em;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default DrinkRecipeCard;
