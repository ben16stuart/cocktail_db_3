import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing!');
  throw new Error('Missing Supabase URL or Key. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
