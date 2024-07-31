import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('drinks')
      .select('*')
      .order('random()')
      .limit(1);

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch drink' });
    }

    return res.status(200).json(data[0]);
  } else if (req.method === 'POST') {
    const { query, ingredient } = req.body;

    let searchQuery = supabase.from('drinks').select('*');

    if (query) {
      searchQuery = searchQuery.or(`name.ilike.%${query}%`);
    }

    if (ingredient) {
      searchQuery = searchQuery.or(`ingredients.ilike.%${ingredient}%`);
    }

    const { data, error } = await searchQuery;

    if (error) {
      return res.status(500).json({ error: 'Failed to search drinks' });
    }

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
