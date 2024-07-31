import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query, ingredient } = req.query;

    if (query) {
      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .or(`name.ilike.%${query}%,ingredients.ilike.%${query}%`);

      if (error) {
        return res.status(500).json({ error: 'Failed to search drinks' });
      }

      return res.status(200).json(data);
    } else if (ingredient) {
      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .contains('ingredients', [ingredient]);

      if (error) {
        return res.status(500).json({ error: 'Failed to search drinks' });
      }

      return res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .order('random()')
        .limit(1);

      if (error) {
        return res.status(500).json({ error: 'Failed to fetch drink' });
      }

      return res.status(200).json(data[0]);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
