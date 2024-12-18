import { supabase } from '../../utils/supabaseClient';
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { data: allDrinks, error: fetchError } = await supabase
      .from('drinks_v')
      .select('*');
    if (fetchError) {
      throw fetchError;
    }
    if (allDrinks.length === 0) {
      return res.status(404).json({ error: 'No drinks found' });
    }
    const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];
    
    const { data: ingredientData, error: ingredientError } = await supabase
      .from('ingredient_amounts_v')
      .select(`
        amount, 
        ingredients_v (
          id, 
          name,
          i_t_id
        )
      `)
      .eq('drink_id', randomDrink.id)
      .order('i_t_id', { foreignTable: 'ingredients_v', ascending: true });
    
    if (ingredientError) {
      throw ingredientError;
    }
    
    const ingredientsWithNames = ingredientData.map(item => ({
      name: item.ingredients_v.name,
      amount: item.amount
    }));
    
    const { data: instructions, error: instructionsError } = await supabase
      .from('instructions_v')
      .select('step_number, instruction')
      .eq('drink_id', randomDrink.id)
      .order('step_number', { ascending: true });
    
    if (instructionsError) {
      throw instructionsError;
    }
    
    const drinkWithDetails = {
      ...randomDrink,
      ingredients: ingredientsWithNames,
      instructions
    };
    
    return res.status(200).json(drinkWithDetails);
  } catch (error) {
    console.error('Error fetching random drink:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
