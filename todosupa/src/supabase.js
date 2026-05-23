import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dijddljhorxwskbqhlbv.supabase.co'
const supabaseKey = 'sb_publishable_zbSteqbL0QgoKq1oexz8kw_zS4EqY03'

export const supabase = createClient(supabaseUrl, supabaseKey)