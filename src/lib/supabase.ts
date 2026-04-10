
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
}

// Session expiry time in milliseconds (30 minutes)
export const SESSION_EXPIRY_TIME = 30 * 60 * 1000;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Initialize session timeout handling
let sessionTimeoutId: number | null = null;

export const setupSessionTimeout = () => {
  clearSessionTimeout();
  sessionTimeoutId = window.setTimeout(() => {
    handleLogout();
  }, SESSION_EXPIRY_TIME);
};

export const clearSessionTimeout = () => {
  if (sessionTimeoutId !== null) {
    window.clearTimeout(sessionTimeoutId);
    sessionTimeoutId = null;
  }
};

let isLoggingOut = false;

export const handleLogout = async () => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    localStorage.removeItem('userLocation');
    localStorage.removeItem('profileData');
    localStorage.removeItem('lastLocationActivity');
    clearSessionTimeout();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    isLoggingOut = false;
    setTimeout(() => {
      window.location.href = '/auth';
    }, 100);
  }
};

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    setupSessionTimeout();
  } else if (event === 'SIGNED_OUT') {
    clearSessionTimeout();
  }
});

const initializeSessionTimeout = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    setupSessionTimeout();
  }
};

initializeSessionTimeout();
