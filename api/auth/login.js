import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // 1. Check for missing environment credentials
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({
      success: false,
      error: 'Supabase credentials are not configured. Please add SUPABASE_URL and SUPABASE_ANON_KEY in your .env file.'
    });
  }

  const { email, password } = req.body || {};

  // 2. Validate Inputs
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required.'
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 3. Login user with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // 4. Return success along with the session details (access token, user info)
    return res.status(200).json({
      success: true,
      message: 'Successfully signed in!',
      session: data.session,
      user: data.user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing login.'
    });
  }
}
