import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  const { value, baseDrink } = req.query; // Match the frontend parameter name

  if (!value) {
    return res.status(400).json({ error: 'Slider value is required' });
  }

  try {
    // If baseDrink is provided, first get its ID
    let drinkId = null;
    if (baseDrink) {
      const { data: drinkData, error: drinkError } = await supabase
        .from('drinks_v')
        .select('id')
        .eq('name', baseDrink)
        .single();

      if (drinkError) {
        throw drinkError;
      }

      if (drinkData) {
        drinkId = drinkData.id;
      }
    }

    // Set up parameters for the create_a_drink function
    const params = {
      p_percent: parseFloat(value)
    };

    if (drinkId) {
      params.p_drink_id = drinkId;
    }

    // Call the SQL function with the parameters
    const { data, error } = await supabase.rpc('create_a_drink', params);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      // Extract ingredients and amounts
      const ingredientsList = data.map(item => `${item.old_ingredient} (${item.amount})`).join(', ');
      
      const drinkResponse = {
        name: 'Made Up Drink. Good Luck',
        description: baseDrink 
          ? `This was once an amazing ${data[0].name} with ${ingredientsList}. \nNow it's:` 
          : `This is a completely random concoction. Good luck!`,
        ingredients: data.map(item => ({
          name: item.ingredients,
          amount: item.amount,
        })),
        instructions: [
          { 
            step_number: 1, 
            instruction: baseDrink 
              ? "Follow the original drink's steps but with these ingredients instead ¯\\_(ツ)_/¯"
              : "IDK you figure it out ¯\\_(ツ)_/¯" 
          },
          { 
            step_number: 2, 
            instruction: "I take no responsibility if this is total crap, but all credit if it's fantastic." 
          },
        ],
      };

      res.status(200).json(drinkResponse);
    } else {
      res.status(404).json({ error: 'No drink found' });
    }
  } catch (error) {
    console.error('Error creating drink:', error);
    res.status(500).json({ 
      error: 'Failed to create drink',
      details: error.message 
    });
  }
}
