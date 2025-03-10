/*
  # Create Todos table

  1. New Table
    - `todos`
      - `id` (bigint, primary key)
      - `text` (text, not null)
      - `completed` (boolean, default: false)
      - `created_at` (timestamp with time zone, default: now())
*/

CREATE TABLE IF NOT EXISTS todos (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text text NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to todos"
  ON todos
  FOR ALL
  TO public
  USING (true); 