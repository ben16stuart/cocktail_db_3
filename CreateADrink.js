import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  const { value } = req.query;

  if (!value) {
    return res.status(400).json({ error: 'Slider value is required' });
  }

  try {
    // Call the SQL function with the slider value
    const { data, error } = await supabase.rpc('create_a_drink', {
      p_percent: parseFloat(value),  // ensure correct parameter name
    });

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      // Extract ingredients and amounts
      const ingredientsList = data.map(item => `${item.old_ingredient} (${item.amount})`).join(', ');

      const drinkResponse = {
        name: 'Made Up Drink. Good Luck',
        description: `This was once an amazing ${data[0].name} with ${ingredientsList}. \n Now it's:`,
        ingredients: data.map(item => ({
          name: item.ingredients,
          amount: item.amount,
        })),
        instructions: [{ step_number: 1, instruction: "IDK you figure it out ¯\\_(ツ)_/¯ " },{step_number: 2, instruction: "I take no responsibility if this is total crap, but all credit if it's fantastic."}]
      };

      res.status(200).json(drinkResponse);
    } else {
      res.status(404).json({ error: 'No drink found' });
    }
  } catch (error) {
    console.error('Error creating drink:', error);
    res.status(500).json({ error: 'Failed to create drink' });
  }
}