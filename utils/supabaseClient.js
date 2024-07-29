import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qflhgztoxamhdhlxjpjc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbGhnenRveGFtaGRobHhqcGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4Mzg5MTksImV4cCI6MjAzNjQxNDkxOX0.BWDSmZFBrQVSZV0wK6XWGaAZky51VxrRG_wfwG3FWZc';

export const supabase = createClient(supabaseUrl, supabaseKey);
