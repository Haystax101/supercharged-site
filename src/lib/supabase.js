import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * createClient throws when the URL/key are missing, which would white-screen
 * the whole site. On a preview deploy without secrets we'd rather render the
 * page and let the waitlist degrade, so return null and let callers guard.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

/** True when the waitlist can actually read/write. */
export const supabaseReady = Boolean(supabase)
