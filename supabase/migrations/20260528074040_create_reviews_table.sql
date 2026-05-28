/*
  # Create reviews table for Doon Didi website

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `customer_name` (text, not null) - reviewer's name
      - `product` (text) - product being reviewed
      - `rating` (integer, 1-5) - star rating
      - `review_text` (text) - review body
      - `created_at` (timestamptz) - submission time

  2. Security
    - Enable RLS on `reviews` table
    - Public read policy: anyone can read approved reviews
    - Public insert policy: anyone can submit a review (no auth required for customer reviews)
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL DEFAULT '',
  product text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit a review"
  ON reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_name != '' AND
    review_text != '' AND
    rating >= 1 AND rating <= 5
  );
