import {createClient} from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl =  "https://xdcrhbhtzfatlmeoejjo.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)