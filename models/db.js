import { createClient } from '@supabase/supabase-js';

const db = createClient(
  'https://dvrqapktorwspfrbbhbd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cnFhcGt0b3J3c3BmcmJiaGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTc3MDUsImV4cCI6MjA2Mjk3MzcwNX0.lHeG2KXwQJfVmxoPC3GZg5JNB3I1ZbGJaJwZFosEdIQ'
);
export default db;