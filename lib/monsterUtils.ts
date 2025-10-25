import { Monster, Role, ComputedMonster } from './types';

export function applyRoleToMonster(
  monster: Monster,
  role: Role,
  customName?: string
): ComputedMonster {
  const computed: ComputedMonster = { ...monster };

  if (role.stat_modifiers.armor_class) {
    computed.armor_class += role.stat_modifiers.armor_class;
  }

  if (role.stat_modifiers.hit_points) {
    computed.hit_points += role.stat_modifiers.hit_points;
  }

  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach((stat) => {
    if (role.stat_modifiers[stat]) {
      const key = stat as 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
      computed[key] = computed[key] + role.stat_modifiers[stat];
    }
  });

  if (role.stat_modifiers.speed) {
    computed.speed = { ...computed.speed };
    Object.entries(role.stat_modifiers.speed).forEach(([type, bonus]) => {
      if (computed.speed[type]) {
        computed.speed[type] += bonus as number;
      } else {
        computed.speed[type] = bonus as number;
      }
    });
  }

  if (role.feature_additions && role.feature_additions.length > 0) {
    computed.special_abilities = [...computed.special_abilities, ...role.feature_additions];
  }

  computed.applied_role = role;
  if (customName) {
    computed.custom_name = customName;
  }

  return computed;
}
