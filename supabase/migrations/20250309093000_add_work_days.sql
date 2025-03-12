/*
  # Create Work Days table

  1. New Table
    - `work_days`
      - `id` (bigint, primary key)
      - `person` (text, not null)
      - `hours` (integer, not null)
      - `days` (integer, not null)
      - `contract_type` (text, not null)
      - `days_counted` (integer, not null)
      - `created_at` (timestamp with time zone, default: now())
*/

CREATE TABLE IF NOT EXISTS work_days (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    person text NOT NULL,
    hours integer NOT NULL,
    days integer NOT NULL,
    contract_type text NOT NULL,
    days_counted integer NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE work_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to work days"
  ON work_days
  FOR ALL
  TO public
  USING (true); 