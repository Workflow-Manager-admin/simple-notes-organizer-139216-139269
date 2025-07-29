import { createClient } from '@supabase/supabase-js';

/**
 * Initializes the Supabase client using environment variables.
 * PUBLIC_INTERFACE
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
