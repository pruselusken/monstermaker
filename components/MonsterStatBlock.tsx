import { ComputedMonster } from '@/lib/types';

interface MonsterStatBlockProps {
  monster: ComputedMonster;
}

function getModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export default function MonsterStatBlock({ monster }: MonsterStatBlockProps) {
  const speedStr = Object.entries(monster.speed)
    .map(([type, value]) => `${type === 'walk' ? '' : type + ' '}${value} ft.`)
    .join(', ');

  return (
    <div className="bg-[#faf8f5] border-2 border-[#9c2b1b] rounded-sm shadow-lg max-w-2xl mx-auto font-serif">
      <div className="bg-[#e0ddd8] border-b-2 border-[#9c2b1b] px-4 py-3">
        <h2 className="text-2xl font-bold text-[#58180d] uppercase tracking-wide">
          {monster.applied_role && monster.custom_name ? monster.custom_name : monster.name}
          {monster.applied_role && !monster.custom_name && ` (${monster.applied_role.name})`}
        </h2>
        <div className="text-sm italic text-[#58180d]">
          {monster.size} {monster.type}
          {monster.alignment && `, ${monster.alignment}`}
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        <div className="border-b border-[#9c2b1b] pb-2">
          <div className="flex gap-4 text-sm">
            <span><strong className="text-[#58180d]">Armor Class</strong> {monster.armor_class}</span>
            <span><strong className="text-[#58180d]">Hit Points</strong> {monster.hit_points} ({monster.hit_dice})</span>
            <span><strong className="text-[#58180d]">Speed</strong> {speedStr}</span>
          </div>
        </div>

        <div className="border-b border-[#9c2b1b] pb-2">
          <div className="grid grid-cols-6 gap-2 text-center text-sm">
            <div>
              <div className="font-bold text-[#58180d]">STR</div>
              <div>{monster.str} ({getModifier(monster.str)})</div>
            </div>
            <div>
              <div className="font-bold text-[#58180d]">DEX</div>
              <div>{monster.dex} ({getModifier(monster.dex)})</div>
            </div>
            <div>
              <div className="font-bold text-[#58180d]">CON</div>
              <div>{monster.con} ({getModifier(monster.con)})</div>
            </div>
            <div>
              <div className="font-bold text-[#58180d]">INT</div>
              <div>{monster.int} ({getModifier(monster.int)})</div>
            </div>
            <div>
              <div className="font-bold text-[#58180d]">WIS</div>
              <div>{monster.wis} ({getModifier(monster.wis)})</div>
            </div>
            <div>
              <div className="font-bold text-[#58180d]">CHA</div>
              <div>{monster.cha} ({getModifier(monster.cha)})</div>
            </div>
          </div>
        </div>

        <div className="text-sm space-y-1 border-b border-[#9c2b1b] pb-2">
          {Object.keys(monster.saving_throws).length > 0 && (
            <div>
              <strong className="text-[#58180d]">Saving Throws</strong>{' '}
              {Object.entries(monster.saving_throws)
                .map(([ability, bonus]) => `${ability.toUpperCase()} +${bonus}`)
                .join(', ')}
            </div>
          )}
          {Object.keys(monster.skills).length > 0 && (
            <div>
              <strong className="text-[#58180d]">Skills</strong>{' '}
              {Object.entries(monster.skills)
                .map(([skill, bonus]) => `${skill.charAt(0).toUpperCase() + skill.slice(1)} +${bonus}`)
                .join(', ')}
            </div>
          )}
          {monster.damage_vulnerabilities && (
            <div>
              <strong className="text-[#58180d]">Damage Vulnerabilities</strong> {monster.damage_vulnerabilities}
            </div>
          )}
          {monster.damage_resistances && (
            <div>
              <strong className="text-[#58180d]">Damage Resistances</strong> {monster.damage_resistances}
            </div>
          )}
          {monster.damage_immunities && (
            <div>
              <strong className="text-[#58180d]">Damage Immunities</strong> {monster.damage_immunities}
            </div>
          )}
          {monster.condition_immunities && (
            <div>
              <strong className="text-[#58180d]">Condition Immunities</strong> {monster.condition_immunities}
            </div>
          )}
          {monster.senses && (
            <div>
              <strong className="text-[#58180d]">Senses</strong> {monster.senses}
            </div>
          )}
          {monster.languages && (
            <div>
              <strong className="text-[#58180d]">Languages</strong> {monster.languages}
            </div>
          )}
          <div>
            <strong className="text-[#58180d]">Challenge</strong> {monster.challenge_rating} ({monster.experience_points.toLocaleString()} XP)
          </div>
        </div>

        {monster.special_abilities && monster.special_abilities.length > 0 && (
          <div className="text-sm space-y-2">
            {monster.special_abilities.map((ability, index) => (
              <div key={index}>
                <strong className="text-[#58180d] italic">{ability.name}.</strong>{' '}
                <span className="text-[#3c3c3c]">{ability.description}</span>
              </div>
            ))}
          </div>
        )}

        {monster.actions && monster.actions.length > 0 && (
          <div className="border-t-2 border-[#9c2b1b] pt-3">
            <h3 className="text-xl font-bold text-[#58180d] mb-2 uppercase">Actions</h3>
            <div className="text-sm space-y-2">
              {monster.actions.map((action, index) => (
                <div key={index}>
                  <strong className="text-[#58180d] italic">{action.name}.</strong>{' '}
                  <span className="text-[#3c3c3c]">{action.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {monster.reactions && monster.reactions.length > 0 && (
          <div className="border-t-2 border-[#9c2b1b] pt-3">
            <h3 className="text-xl font-bold text-[#58180d] mb-2 uppercase">Reactions</h3>
            <div className="text-sm space-y-2">
              {monster.reactions.map((reaction, index) => (
                <div key={index}>
                  <strong className="text-[#58180d] italic">{reaction.name}.</strong>{' '}
                  <span className="text-[#3c3c3c]">{reaction.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {monster.legendary_actions && monster.legendary_actions.length > 0 && (
          <div className="border-t-2 border-[#9c2b1b] pt-3">
            <h3 className="text-xl font-bold text-[#58180d] mb-2 uppercase">Legendary Actions</h3>
            <div className="text-sm space-y-2">
              {monster.legendary_actions.map((action, index) => (
                <div key={index}>
                  <strong className="text-[#58180d] italic">{action.name}.</strong>{' '}
                  <span className="text-[#3c3c3c]">{action.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
