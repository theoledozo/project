import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qwrolznitbypokjcxywv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cm9sem5pdGJ5cG9ramN4eXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MDkyOTYsImV4cCI6MjA1NzA4NTI5Nn0.z5fbfjlRny_cuypRXnXaXX6cfvSIihF5YaFAUCTj6us'
);