import { NextRequest, NextResponse } from 'next/server';
import { getConnection, sql } from '@/lib/db';
import { Monster } from '@/lib/types';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT * FROM monsters
      ORDER BY name
    `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error fetching monsters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monsters' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const monster = await request.json();
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('name', sql.NVarChar, monster.name)
      .input('size', sql.NVarChar, monster.size)
      .input('type', sql.NVarChar, monster.type)
      .input('alignment', sql.NVarChar, monster.alignment)
      .input('armor_class', sql.Int, monster.armor_class)
      .input('hit_points', sql.Int, monster.hit_points)
      .input('hit_dice', sql.NVarChar, monster.hit_dice)
      .input('speed', sql.NVarChar, JSON.stringify(monster.speed))
      .input('str', sql.Int, monster.str)
      .input('dex', sql.Int, monster.dex)
      .input('con', sql.Int, monster.con)
      .input('int', sql.Int, monster.int)
      .input('wis', sql.Int, monster.wis)
      .input('cha', sql.Int, monster.cha)
      .input('saving_throws', sql.NVarChar, JSON.stringify(monster.saving_throws))
      .input('skills', sql.NVarChar, JSON.stringify(monster.skills))
      .input('damage_vulnerabilities', sql.NVarChar, monster.damage_vulnerabilities || '')
      .input('damage_resistances', sql.NVarChar, monster.damage_resistances || '')
      .input('damage_immunities', sql.NVarChar, monster.damage_immunities || '')
      .input('condition_immunities', sql.NVarChar, monster.condition_immunities || '')
      .input('senses', sql.NVarChar, monster.senses || '')
      .input('languages', sql.NVarChar, monster.languages || '')
      .input('challenge_rating', sql.NVarChar, monster.challenge_rating)
      .input('experience_points', sql.Int, monster.experience_points)
      .input('special_abilities', sql.NVarChar, JSON.stringify(monster.special_abilities || []))
      .input('actions', sql.NVarChar, JSON.stringify(monster.actions || []))
      .input('reactions', sql.NVarChar, JSON.stringify(monster.reactions || []))
      .input('legendary_actions', sql.NVarChar, JSON.stringify(monster.legendary_actions || []))
      .input('description', sql.NVarChar, monster.description || '')
      .input('is_custom', sql.Bit, monster.is_custom !== false).query(`
      INSERT INTO monsters (
        name, size, type, alignment, armor_class, hit_points, hit_dice, speed,
        str, dex, con, int, wis, cha, saving_throws, skills,
        damage_vulnerabilities, damage_resistances, damage_immunities, condition_immunities,
        senses, languages, challenge_rating, experience_points,
        special_abilities, actions, reactions, legendary_actions, description, is_custom
      ) VALUES (
        @name, @size, @type, @alignment, @armor_class, @hit_points, @hit_dice, @speed,
        @str, @dex, @con, @int, @wis, @cha, @saving_throws, @skills,
        @damage_vulnerabilities, @damage_resistances, @damage_immunities, @condition_immunities,
        @senses, @languages, @challenge_rating, @experience_points,
        @special_abilities, @actions, @reactions, @legendary_actions, @description, @is_custom
      );
      SELECT * FROM monsters WHERE id = SCOPE_IDENTITY();
    `);

    return NextResponse.json(result.recordset[0], { status: 201 });
  } catch (error) {
    console.error('Error creating monster:', error);
    return NextResponse.json(
      { error: 'Failed to create monster' },
      { status: 500 }
    );
  }
}
