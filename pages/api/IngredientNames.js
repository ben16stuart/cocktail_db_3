import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.query;
    const { data: ingredients, error } = await supabase
      .from('ingredients')
      .select('id, name')
      .filter('name', 'ilike', `%${query}%`); // Filter ingredients by name

    if (error) {
      throw error;
    }

    return res.status(200).json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}