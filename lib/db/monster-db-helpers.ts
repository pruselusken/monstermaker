// lib/db/monster-helpers.ts
import { prisma } from '@/lib/prisma';
import type { Monster, Role, MonsterVariant, ComputedMonster } from '@/types/monster';

// ============================================
// Type Converters
// ============================================

// Convert database row to TypeScript Monster interface
function dbToMonster(dbMonster: any): Monster {
  return {
    id: dbMonster.id,
    name: dbMonster.name,
    size: dbMonster.size,
    type: dbMonster.type,
    alignment: dbMonster.alignment,
    armor_class: dbMonster.armor_class,
    hit_points: dbMonster.hit_points,
    hit_dice: dbMonster.hit_dice,
    speed: JSON.parse(dbMonster.speed),
    str: dbMonster.str,
    dex: dbMonster.dex,
    con: dbMonster.con,
    int: dbMonster.int,
    wis: dbMonster.wis,
    cha: dbMonster.cha,
    saving_throws: JSON.parse(dbMonster.saving_throws),
    skills: JSON.parse(dbMonster.skills),
    damage_vulnerabilities: dbMonster.damage_vulnerabilities,
    damage_resistances: dbMonster.damage_resistances,
    damage_immunities: dbMonster.damage_immunities,
    condition_immunities: dbMonster.condition_immunities,
    senses: dbMonster.senses,
    languages: dbMonster.languages,
    challenge_rating: dbMonster.challenge_rating,
    experience_points: dbMonster.experience_points,
    special_abilities: JSON.parse(dbMonster.special_abilities),
    actions: JSON.parse(dbMonster.actions),
    reactions: JSON.parse(dbMonster.reactions),
    legendary_actions: JSON.parse(dbMonster.legendary_actions),
    description: dbMonster.description,
    is_custom: dbMonster.is_custom,
    created_at: dbMonster.created_at.toISOString(),
    updated_at: dbMonster.updated_at.toISOString(),
  };
}

// Convert TypeScript Monster to database format
function monsterToDb(monster: Omit<Monster, 'id' | 'created_at' | 'updated_at'>) {
  return {
    name: monster.name,
    size: monster.size,
    type: monster.type,
    alignment: monster.alignment,
    armor_class: monster.armor_class,
    hit_points: monster.hit_points,
    hit_dice: monster.hit_dice,
    speed: JSON.stringify(monster.speed),
    str: monster.str,
    dex: monster.dex,
    con: monster.con,
    int: monster.int,
    wis: monster.wis,
    cha: monster.cha,
    saving_throws: JSON.stringify(monster.saving_throws),
    skills: JSON.stringify(monster.skills),
    damage_vulnerabilities: monster.damage_vulnerabilities,
    damage_resistances: monster.damage_resistances,
    damage_immunities: monster.damage_immunities,
    condition_immunities: monster.condition_immunities,
    senses: monster.senses,
    languages: monster.languages,
    challenge_rating: monster.challenge_rating,
    experience_points: monster.experience_points,
    special_abilities: JSON.stringify(monster.special_abilities),
    actions: JSON.stringify(monster.actions),
    reactions: JSON.stringify(monster.reactions),
    legendary_actions: JSON.stringify(monster.legendary_actions),
    description: monster.description,
    is_custom: monster.is_custom,
  };
}

function dbToRole(dbRole: any): Role {
  return {
    id: dbRole.id,
    name: dbRole.name,
    description: dbRole.description,
    stat_modifiers: JSON.parse(dbRole.stat_modifiers),
    feature_additions: JSON.parse(dbRole.feature_additions),
    created_at: dbRole.created_at.toISOString(),
  };
}

function roleToDb(role: Omit<Role, 'id' | 'created_at'>) {
  return {
    name: role.name,
    description: role.description,
    stat_modifiers: JSON.stringify(role.stat_modifiers),
    feature_additions: JSON.stringify(role.feature_additions),
  };
}

function dbToMonsterVariant(dbVariant: any): MonsterVariant {
  return {
    id: dbVariant.id,
    base_monster_id: dbVariant.base_monster_id,
    role_id: dbVariant.role_id,
    custom_name: dbVariant.custom_name,
    stat_overrides: JSON.parse(dbVariant.stat_overrides),
    created_at: dbVariant.created_at.toISOString(),
  };
}

function monsterVariantToDb(variant: Omit<MonsterVariant, 'id' | 'created_at'>) {
  return {
    base_monster_id: variant.base_monster_id,
    role_id: variant.role_id,
    custom_name: variant.custom_name,
    stat_overrides: JSON.stringify(variant.stat_overrides),
  };
}

// ============================================
// Monster CRUD Operations
// ============================================

export const monsterDb = {
  // Get all monsters
  async getAll(): Promise<Monster[]> {
    const monsters = await prisma.monster.findMany({
      orderBy: { name: 'asc' },
    });
    return monsters.map(dbToMonster);
  },

  // Get monster by ID
  async getById(id: string): Promise<Monster | null> {
    const monster = await prisma.monster.findUnique({
      where: { id },
    });
    return monster ? dbToMonster(monster) : null;
  },

  // Create new monster
  async create(monster: Omit<Monster, 'id' | 'created_at' | 'updated_at'>): Promise<Monster> {
    const created = await prisma.monster.create({
      data: monsterToDb(monster),
    });
    return dbToMonster(created);
  },

  // Update monster
  async update(id: string, monster: Partial<Omit<Monster, 'id' | 'created_at' | 'updated_at'>>): Promise<Monster> {
    const dataToUpdate: any = {};
    
    if (monster.name !== undefined) dataToUpdate.name = monster.name;
    if (monster.size !== undefined) dataToUpdate.size = monster.size;
    if (monster.type !== undefined) dataToUpdate.type = monster.type;
    if (monster.alignment !== undefined) dataToUpdate.alignment = monster.alignment;
    if (monster.armor_class !== undefined) dataToUpdate.armor_class = monster.armor_class;
    if (monster.hit_points !== undefined) dataToUpdate.hit_points = monster.hit_points;
    if (monster.hit_dice !== undefined) dataToUpdate.hit_dice = monster.hit_dice;
    if (monster.speed !== undefined) dataToUpdate.speed = JSON.stringify(monster.speed);
    if (monster.str !== undefined) dataToUpdate.str = monster.str;
    if (monster.dex !== undefined) dataToUpdate.dex = monster.dex;
    if (monster.con !== undefined) dataToUpdate.con = monster.con;
    if (monster.int !== undefined) dataToUpdate.int = monster.int;
    if (monster.wis !== undefined) dataToUpdate.wis = monster.wis;
    if (monster.cha !== undefined) dataToUpdate.cha = monster.cha;
    if (monster.saving_throws !== undefined) dataToUpdate.saving_throws = JSON.stringify(monster.saving_throws);
    if (monster.skills !== undefined) dataToUpdate.skills = JSON.stringify(monster.skills);
    if (monster.special_abilities !== undefined) dataToUpdate.special_abilities = JSON.stringify(monster.special_abilities);
    if (monster.actions !== undefined) dataToUpdate.actions = JSON.stringify(monster.actions);
    if (monster.reactions !== undefined) dataToUpdate.reactions = JSON.stringify(monster.reactions);
    if (monster.legendary_actions !== undefined) dataToUpdate.legendary_actions = JSON.stringify(monster.legendary_actions);
    if (monster.description !== undefined) dataToUpdate.description = monster.description;
    if (monster.is_custom !== undefined) dataToUpdate.is_custom = monster.is_custom;

    const updated = await prisma.monster.update({
      where: { id },
      data: dataToUpdate,
    });
    return dbToMonster(updated);
  },

  // Delete monster
  async delete(id: string): Promise<void> {
    await prisma.monster.delete({
      where: { id },
    });
  },

  // Search monsters by name
  async search(query: string): Promise<Monster[]> {
    const monsters = await prisma.monster.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: { name: 'asc' },
    });
    return monsters.map(dbToMonster);
  },
};

// ============================================
// Role CRUD Operations
// ============================================

export const roleDb = {
  async getAll(): Promise<Role[]> {
    const roles = await prisma.role.findMany({
      orderBy: { name: 'asc' },
    });
    return roles.map(dbToRole);
  },

  async getById(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { id },
    });
    return role ? dbToRole(role) : null;
  },

  async create(role: Omit<Role, 'id' | 'created_at'>): Promise<Role> {
    const created = await prisma.role.create({
      data: roleToDb(role),
    });
    return dbToRole(created);
  },

  async update(id: string, role: Partial<Omit<Role, 'id' | 'created_at'>>): Promise<Role> {
    const dataToUpdate: any = {};
    if (role.name !== undefined) dataToUpdate.name = role.name;
    if (role.description !== undefined) dataToUpdate.description = role.description;
    if (role.stat_modifiers !== undefined) dataToUpdate.stat_modifiers = JSON.stringify(role.stat_modifiers);
    if (role.feature_additions !== undefined) dataToUpdate.feature_additions = JSON.stringify(role.feature_additions);

    const updated = await prisma.role.update({
      where: { id },
      data: dataToUpdate,
    });
    return dbToRole(updated);
  },

  async delete(id: string): Promise<void> {
    await prisma.role.delete({
      where: { id },
    });
  },
};

// ============================================
// Monster Variant Operations
// ============================================

export const variantDb = {
  async getAll(): Promise<MonsterVariant[]> {
    const variants = await prisma.monsterVariant.findMany();
    return variants.map(dbToMonsterVariant);
  },

  async getById(id: string): Promise<MonsterVariant | null> {
    const variant = await prisma.monsterVariant.findUnique({
      where: { id },
    });
    return variant ? dbToMonsterVariant(variant) : null;
  },

  async create(variant: Omit<MonsterVariant, 'id' | 'created_at'>): Promise<MonsterVariant> {
    const created = await prisma.monsterVariant.create({
      data: monsterVariantToDb(variant),
    });
    return dbToMonsterVariant(created);
  },

  async delete(id: string): Promise<void> {
    await prisma.monsterVariant.delete({
      where: { id },
    });
  },

  // Get computed monster (base monster + role applied)
  async getComputedMonster(variantId: string): Promise<ComputedMonster | null> {
    const variant = await prisma.monsterVariant.findUnique({
      where: { id: variantId },
      include: {
        base_monster: true,
        role: true,
      },
    });

    if (!variant) return null;

    const baseMonster = dbToMonster(variant.base_monster);
    const role = dbToRole(variant.role);
    const statOverrides = JSON.parse(variant.stat_overrides);

    // Merge stats (this is simplified - you'd apply your actual role logic here)
    const computedMonster: ComputedMonster = {
      ...baseMonster,
      ...statOverrides,
      applied_role: role,
      variant_id: variant.id,
      custom_name: variant.custom_name,
    };

    return computedMonster;
  },
};