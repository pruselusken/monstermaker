export interface Monster {
  id: string;
  name: string;
  size: string;
  type: string;
  alignment: string | null;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  speed: { [key: string]: number };
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  saving_throws: { [key: string]: number };
  skills: { [key: string]: number };
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  challenge_rating: string;
  experience_points: number;
  special_abilities: Array<{ name: string; description: string }>;
  actions: Array<{ name: string; description: string }>;
  reactions: Array<{ name: string; description: string }>;
  legendary_actions: Array<{ name: string; description: string }>;
  description: string;
  is_custom: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  stat_modifiers: { [key: string]: any };
  feature_additions: Array<{ name: string; description: string }>;
  created_at: string;
}

export interface MonsterVariant {
  id: string;
  base_monster_id: string;
  role_id: string;
  custom_name: string | null;
  stat_overrides: { [key: string]: any };
  created_at: string;
}

export interface ComputedMonster extends Monster {
  applied_role?: Role;
  variant_id?: string;
  custom_name?: string;
}
