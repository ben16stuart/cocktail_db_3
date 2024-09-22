import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.query;
    const { data: cheersText, error: fetchError } = await supabase
      .from('cheers_v')
      .select('cheers');

    if (fetchError) {
      throw fetchError;
    }
    console.log('cheersText:', cheersText);
    return res.status(200).json(cheersText.map((quote) => quote.cheers));
  } catch (error) {
    console.error('Error fetching cheers:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}