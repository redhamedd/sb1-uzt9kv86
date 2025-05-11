/*
  # Initial schema setup with RLS

  1. New Tables
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamp)
    - `organization_users`
      - `organization_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `role` (text)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for organization-based access
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create organization_users table
CREATE TABLE IF NOT EXISTS organization_users (
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  PRIMARY KEY (organization_id, user_id)
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their organizations"
  ON organizations
  FOR SELECT
  USING (
    id IN (
      SELECT organization_id 
      FROM organization_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their organization memberships"
  ON organization_users
  FOR SELECT
  USING (user_id = auth.uid());