import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.query;
    const { data: drinkNames, error: fetchError } = await supabase
      .from('homemade_ingredients')
      .select('name')
      .ilike('name', `%${query}%`);

    if (fetchError) {
      throw fetchError;
    }

    return res.status(200).json(drinkNames.map((drink) => drink.name));
  } catch (error) {
    console.error('Error fetching drink names:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}