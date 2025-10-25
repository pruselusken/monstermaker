-- D&D Monster Management System Schema
--
-- Overview:
-- This migration creates the database schema for a D&D 5e monster management system
-- that allows storing base monsters and applying role modifiers to create variants.
--
-- New Tables:
-- 1. monsters - Core monster stat blocks with D&D 5e attributes
-- 2. roles - Predefined roles that can be applied to monsters
-- 3. monster_variants - Monsters with roles applied
--
-- Security:
-- - Enable RLS on all tables
-- - Public read access for viewing monsters

-- Create monsters table
CREATE TABLE IF NOT EXISTS monsters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  size text NOT NULL,
  type text NOT NULL,
  alignment text,
  armor_class integer NOT NULL,
  hit_points integer NOT NULL,
  hit_dice text NOT NULL,
  speed jsonb DEFAULT '{"walk": 30}'::jsonb,
  str integer NOT NULL DEFAULT 10,
  dex integer NOT NULL DEFAULT 10,
  con integer NOT NULL DEFAULT 10,
  int integer NOT NULL DEFAULT 10,
  wis integer NOT NULL DEFAULT 10,
  cha integer NOT NULL DEFAULT 10,
  saving_throws jsonb DEFAULT '{}'::jsonb,
  skills jsonb DEFAULT '{}'::jsonb,
  damage_vulnerabilities text DEFAULT '',
  damage_resistances text DEFAULT '',
  damage_immunities text DEFAULT '',
  condition_immunities text DEFAULT '',
  senses text DEFAULT '',
  languages text DEFAULT '',
  challenge_rating text NOT NULL,
  experience_points integer NOT NULL DEFAULT 0,
  special_abilities jsonb DEFAULT '[]'::jsonb,
  actions jsonb DEFAULT '[]'::jsonb,
  reactions jsonb DEFAULT '[]'::jsonb,
  legendary_actions jsonb DEFAULT '[]'::jsonb,
  description text DEFAULT '',
  is_custom boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  stat_modifiers jsonb DEFAULT '{}'::jsonb,
  feature_additions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create monster_variants table
CREATE TABLE IF NOT EXISTS monster_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  base_monster_id uuid NOT NULL REFERENCES monsters(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  custom_name text,
  stat_overrides jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(base_monster_id, role_id)
);

-- Enable RLS
ALTER TABLE monsters ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE monster_variants ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public can view monsters"
  ON monsters FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view roles"
  ON roles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view monster variants"
  ON monster_variants FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public write access (for now - can be restricted later with auth)
CREATE POLICY "Public can insert monsters"
  ON monsters FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can update monsters"
  ON monsters FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete monsters"
  ON monsters FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can insert roles"
  ON roles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can update roles"
  ON roles FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete roles"
  ON roles FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can insert monster variants"
  ON monster_variants FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can update monster variants"
  ON monster_variants FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete monster variants"
  ON monster_variants FOR DELETE
  TO anon, authenticated
  USING (true);

-- Insert some default roles
INSERT INTO roles (name, description, stat_modifiers, feature_additions) VALUES
  (
    'Guard',
    'A defensive role focused on protection and holding positions',
    '{"armor_class": 2, "hit_points": 10}'::jsonb,
    '[{"name": "Sentinel", "description": "This creature has advantage on opportunity attacks and can use its reaction to make a melee attack against a creature that moves within 5 feet of an ally."}]'::jsonb
  ),
  (
    'Scout',
    'A reconnaissance role focused on speed and perception',
    '{"dex": 2, "speed": {"walk": 10}}'::jsonb,
    '[{"name": "Keen Senses", "description": "This creature has advantage on Wisdom (Perception) checks that rely on sight or hearing."}, {"name": "Nimble Escape", "description": "The creature can take the Disengage or Hide action as a bonus action on each of its turns."}]'::jsonb
  ),
  (
    'Brute',
    'A heavy-hitting role focused on damage output',
    '{"str": 2, "hit_points": 15}'::jsonb,
    '[{"name": "Brutal Critical", "description": "When this creature scores a critical hit with a melee weapon attack, it rolls one additional weapon damage die."}]'::jsonb
  ),
  (
    'Caster',
    'A magic-focused role with spellcasting abilities',
    '{"int": 2, "wis": 2}'::jsonb,
    '[{"name": "Spellcasting", "description": "This creature can cast spells using Intelligence or Wisdom as its spellcasting ability (spell save DC 13, +5 to hit with spell attacks). It knows a selection of cantrips and 1st-level spells appropriate to its challenge rating."}]'::jsonb
  )
ON CONFLICT (name) DO NOTHING;