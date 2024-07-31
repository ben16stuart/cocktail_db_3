import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .order('random()')
        .limit(1);

      if (error) {
        console.error('Error fetching random drink:', error);
        return res.status(500).json({ error: 'Failed to fetch drink' });
      }

      return res.status(200).json(data[0]);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { query, ingredient } = req.body;
      console.log('Search query:', query);
      console.log('Search ingredient:', ingredient);

      let searchQuery = supabase.from('drinks').select('*');

      if (query) {
        searchQuery = searchQuery.or(`name.ilike.%${query}%`);
      }

      if (ingredient) {
        searchQuery = searchQuery.or(`ingredients.ilike.%${ingredient}%`);
      }

      const { data, error } = await searchQuery;

      if (error) {
        console.error('Error searching drinks:', error);
        return res.status(500).json({ error: 'Failed to search drinks' });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
