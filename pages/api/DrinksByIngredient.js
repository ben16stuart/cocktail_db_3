import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredient } = req.query;
    console.log('Ingredient passed:', ingredient);

    const { data: drinks, error } = await supabase
      .from('drinks')
      .select('id, name, description')
      .join('ingredient_amounts', 'drinks.id = ingredient_amounts.drink_id')
      .join('ingredients', 'ingredient_amounts.ingredient_id = ingredients.id')
      .eq('ingredients.name', ingredient);

    if (error) {
      throw error;
    }

    return res.status(200).json(drinks);
  } catch (error) {
    console.error('Error fetching drinks by ingredient:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}