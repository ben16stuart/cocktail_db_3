import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredient } = req.query;
    if (!ingredient) {
      return res.status(400).json({ error: 'Ingredient parameter is required' });
    }

    // Call the stored procedure to get a random drink by ingredient
    const { data: drinkData, error: fetchError } = await supabase
      .rpc('get_random_drink_by_ingredient', { ingredient_name: ingredient });

    if (fetchError) {
      throw fetchError;
    }

    if (!drinkData || drinkData.length === 0) {
        return res.status(404).json({ error: 'No drinks found for the selected ingredient' });
      }

    // Get the first drink from the result
    const drink = drinkData[0];

    // Fetch detailed information about the drink using its name
    const { data: detailedDrinkData, error: detailedFetchError } = await supabase
      .from('drinks')
      .select('*')
      .eq('name', drink.drinkname);

    if (detailedFetchError) {
      throw detailedFetchError;
    }

    if (!detailedDrinkData || detailedDrinkData.length === 0) {
      return res.status(404).json({ error: 'Drink not found' });
    }

    const detailedDrink = detailedDrinkData[0];

    // Fetch ingredient amounts for the drink
    const { data: ingredientAmounts, error: ingredientError } = await supabase
      .from('ingredient_amounts')
      .select('amount, ingredient_id')
      .eq('drink_id', detailedDrink.id);

    if (ingredientError) {
      throw ingredientError;
    }

    const ingredientIds = ingredientAmounts.map(item => item.ingredient_id);

    const { data: ingredients, error: ingredientsError } = await supabase
      .from('ingredients')
      .select('id, name')
      .in('id', ingredientIds);

    if (ingredientsError) {
      throw ingredientsError;
    }

    const ingredientMap = ingredients.reduce((acc, item) => {
      acc[item.id] = item.name;
      return acc;
    }, {});

    const ingredientsWithNames = ingredientAmounts.map(item => ({
      name: ingredientMap[item.ingredient_id],
      amount: item.amount
    }));

    // Fetch instructions for the drink
    const { data: instructions, error: instructionsError } = await supabase
      .from('instructions')
      .select('step_number, instruction')
      .eq('drink_id', detailedDrink.id)
      .order('step_number', { ascending: true });

    if (instructionsError) {
      throw instructionsError;
    }

    const drinkWithDetails = {
      ...detailedDrink,
      ingredients: ingredientsWithNames,
      instructions
    };

    return res.status(200).json(drinkWithDetails); // Return the drinkWithDetails object directly

  } catch (error) {
    console.error('Error fetching drink by ingredient:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
