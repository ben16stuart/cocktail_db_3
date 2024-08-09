import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name } = req.query;
    console.log('Name passed:', name);
    const { data: drinkData, error: fetchError } = await supabase
      .from('drinks')
      .select('*')
      .eq('name', name);

    if (fetchError) {
      throw fetchError;
    }

    if (!drinkData || drinkData.length === 0) {
      return res.status(404).json({ error: 'Drink not found' });
    }

    const drink = drinkData[0];
    console.log('Drink data:', drink);

    const { data: ingredientAmounts, error: ingredientError } = await supabase
      .from('ingredient_amounts')
      .select('amount, ingredient_id')
      .eq('drink_id', drink.id);

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

    const { data: instructions, error: instructionsError } = await supabase
      .from('instructions')
      .select('step_number, instruction')
      .eq('drink_id', drink.id)
      .order('step_number', { ascending: true });

    if (instructionsError) {
      throw instructionsError;
    }

    const drinkWithDetails = {
      ...drink,
      ingredients: ingredientsWithNames,
      instructions
    };

    console.log('Ingredient Amounts:', ingredientsWithNames);
    console.log('Instructions:', instructions);

    return res.status(200).json(drinkWithDetails); // Return the drinkWithDetails object directly
  } catch (error) {
    console.error('Error fetching drink by name:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}