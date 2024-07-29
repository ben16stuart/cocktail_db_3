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
    const { query } = req.body;

    const { data, error } = await supabase
      .from('drinks')
      .select('*')
      .or(`name.ilike.%${query}%`, `ingredients.ilike.%${query}%`);

    if (error) {
      return res.status(500).json({ error: 'Failed to search drinks' });
    }

    return res.status(200).json(data);
  }
}
