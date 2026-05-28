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

  const { email, password, name } = req.body || {};

  // 2. Validate Inputs
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required.'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters long.'
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 3. Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name || 'Valued Customer',
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || 'Customer')}`
        }
      }
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // 4. Return success
    // Note: By default, Supabase might require Email Confirmation.
    // If confirmation is active, user is created but session is null until they confirm.
    const isConfirmed = data.session !== null;

    return res.status(201).json({
      success: true,
      message: isConfirmed 
        ? 'Account successfully created!' 
        : 'Registration successful! Please check your email to confirm your account.',
      user: data.user,
      session: data.session
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing registration.'
    });
  }
}
