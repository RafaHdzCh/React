import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://tysohrndlcxjgubucbjf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5c29ocm5kbGN4amd1YnVjYmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MDAwMjUsImV4cCI6MjAzNDQ3NjAyNX0.ti1e_eU36WY4pLO9C89qTQCx95IshAvy2fJ7SORY3qI"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;