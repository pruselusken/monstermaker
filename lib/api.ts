import { Monster, Role } from './types';

function parseMonsterData(monster: any): Monster {
  return {
    ...monster,
    speed: typeof monster.speed === 'string' ? JSON.parse(monster.speed) : monster.speed,
    saving_throws: typeof monster.saving_throws === 'string' ? JSON.parse(monster.saving_throws) : monster.saving_throws,
    skills: typeof monster.skills === 'string' ? JSON.parse(monster.skills) : monster.skills,
    special_abilities: typeof monster.special_abilities === 'string' ? JSON.parse(monster.special_abilities) : monster.special_abilities,
    actions: typeof monster.actions === 'string' ? JSON.parse(monster.actions) : monster.actions,
    reactions: typeof monster.reactions === 'string' ? JSON.parse(monster.reactions) : monster.reactions,
    legendary_actions: typeof monster.legendary_actions === 'string' ? JSON.parse(monster.legendary_actions) : monster.legendary_actions,
    features: typeof monster.features === 'string' ? JSON.parse(monster.features) : monster.features,
  };
}

export async function fetchMonsters(): Promise<Monster[]> {
  const response = await fetch('/api/monsters');
  if (!response.ok) {
    throw new Error('Failed to fetch monsters');
  }
  const data = await response.json();
  return data.map(parseMonsterData);
}

export async function fetchMonster(id: number | string): Promise<Monster> {
  const response = await fetch(`/api/monsters?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch monster');
  }
  const data = await response.json();
  return parseMonsterData(data);
}

export async function saveMonster(monster: Partial<Monster>): Promise<Monster> {
  const response = await fetch('/api/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(monster),
  });

  if (!response.ok) {
    throw new Error('Failed to save monster');
  }

  const data = await response.json();
  return parseMonsterData(data);
}

export async function fetchRoles(): Promise<Role[]> {
  const response = await fetch('/api/roles');
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }
  const data = await response.json();
  return data.map((role: any) => ({
    ...role,
    stat_modifiers: typeof role.stat_modifiers === 'string' ? JSON.parse(role.stat_modifiers) : role.stat_modifiers,
    feature_additions: typeof role.feature_additions === 'string' ? JSON.parse(role.feature_additions) : role.feature_additions,
  }));
}
