import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all drinks first
      const { data: allDrinks, error: fetchError } = await supabase
        .from('drinks')
        .select('*');

      if (fetchError) {
        console.error('Error fetching drinks:', fetchError);
        return res.status(500).json({ error: 'Failed to fetch drinks' });
      }

      // Select a random drink from the fetched drinks
      const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];

      return res.status(200).json(randomDrink);
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
