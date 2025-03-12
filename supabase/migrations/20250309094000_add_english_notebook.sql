/*
  # Create English Notebook tables

  1. Categories Table
    - `categories`
      - `id` (bigint, primary key)
      - `name` (text, not null)
      - `created_at` (timestamp with time zone, default: now())

  2. Items Table
    - `english_items`
      - `id` (bigint, primary key)
      - `french_text` (text, not null)
      - `english_text` (text, not null)
      - `category_id` (bigint, references categories)
      - `notes` (text)
      - `created_at` (timestamp with time zone, default: now())
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL UNIQUE,
    created_at timestamptz DEFAULT now()
);

-- Create items table
CREATE TABLE IF NOT EXISTS english_items (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    french_text text NOT NULL,
    english_text text NOT NULL,
    category_id bigint REFERENCES categories(id) ON DELETE CASCADE,
    notes text,
    created_at timestamptz DEFAULT now()
);

-- Insert default categories
INSERT INTO categories (name) VALUES
    ('Vocabulaire'),
    ('Phrases'),
    ('Expressions'),
    ('Grammaire'),
    ('Prononciation'),
    ('Idiomes'),
    ('Verbes irréguliers')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE english_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public access to categories"
    ON categories
    FOR ALL
    TO public
    USING (true);

CREATE POLICY "Allow public access to english items"
    ON english_items
    FOR ALL
    TO public
    USING (true); 