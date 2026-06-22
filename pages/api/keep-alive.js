import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  const now = new Date().toISOString();
  const { error } = await supabase
    .from('keep_alive')
    .update({ last_ping: now })
    .eq('id', 1);

  if (error) {
    console.error('keep-alive write failed:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }

  return res.status(200).json({ ok: true, pinged_at: now });
}
