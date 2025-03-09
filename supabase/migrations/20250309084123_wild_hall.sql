/*
  # Create Shopping List Schema

  1. New Tables
    - `shopping_items`
      - `id` (bigint, primary key)
      - `name` (text, not null)
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on `shopping_items` table
    - Add policies for public access (since this is a simple shopping list app)
*/

CREATE TABLE IF NOT EXISTS shopping_items (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Allow public access for this simple shopping list app
CREATE POLICY "Allow public access to shopping items"
ON shopping_items
FOR ALL
TO public
USING (true);