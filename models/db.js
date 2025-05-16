import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://db.dvrqapktorwspfrbbhbd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cnFhcGt0b3J3c3BmcmJiaGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTc3MDUsImV4cCI6MjA2Mjk3MzcwNX0.lHeG2KXwQJfVmxoPC3GZg5JNB3I1ZbGJaJwZFosEdIQ'; // Use your anon or service role key here

const supabase = createClient(supabaseUrl, supabaseKey);

export default db;
