/*
  # Create recipes table and related schema updates

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key)
      - `ingredients` (text array)
      - `suggestion` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, for future auth integration)

  2. Security
    - Enable RLS on `recipes` table
    - Add policy for public access (temporary, should be updated when auth is added)
*/

CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredients text[] NOT NULL,
  suggestion text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to recipes"
  ON recipes
  FOR ALL
  TO public
  USING (true);