'use client';

import { useEffect, useState } from 'react';
import { fetchMonsters, fetchRoles } from '@/lib/api';
import { Monster, Role } from '@/lib/types';
import MonsterStatBlock from '@/components/MonsterStatBlock';
import { applyRoleToMonster } from '@/lib/monsterUtils';
import Link from 'next/link';

export default function MonstersPage() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [monstersData, rolesData] = await Promise.all([
        fetchMonsters(),
        fetchRoles(),
      ]);
      setMonsters(monstersData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  }

  const displayMonster =
    selectedMonster && selectedRole
      ? applyRoleToMonster(selectedMonster, selectedRole)
      : selectedMonster;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center">
        <div className="text-[#58180d] text-xl">Loading monsters...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#58180d] font-serif">Monster Manager</h1>
          <Link
            href="/monsters/create"
            className="bg-[#9c2b1b] text-white px-6 py-3 rounded hover:bg-[#7a2216] transition-colors font-semibold"
          >
            Create New Monster
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#9c2b1b]">
              <h2 className="text-2xl font-bold text-[#58180d] mb-4 font-serif">Monsters</h2>
              {monsters.length === 0 ? (
                <p className="text-gray-600">No monsters yet. Create your first one!</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {monsters.map((monster) => (
                    <button
                      key={monster.id}
                      onClick={() => {
                        setSelectedMonster(monster);
                        setSelectedRole(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded transition-colors ${
                        selectedMonster?.id === monster.id
                          ? 'bg-[#9c2b1b] text-white'
                          : 'bg-[#faf8f5] hover:bg-[#e0ddd8] text-[#58180d]'
                      }`}
                    >
                      <div className="font-semibold">{monster.name}</div>
                      <div className="text-sm opacity-80">
                        CR {monster.challenge_rating} {monster.type}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedMonster && (
              <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#9c2b1b]">
                <h2 className="text-2xl font-bold text-[#58180d] mb-4 font-serif">Apply Role</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className={`w-full text-left px-4 py-3 rounded transition-colors ${
                      !selectedRole
                        ? 'bg-[#9c2b1b] text-white'
                        : 'bg-[#faf8f5] hover:bg-[#e0ddd8] text-[#58180d]'
                    }`}
                  >
                    <div className="font-semibold">Base Monster</div>
                    <div className="text-sm opacity-80">No role applied</div>
                  </button>
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role)}
                      className={`w-full text-left px-4 py-3 rounded transition-colors ${
                        selectedRole?.id === role.id
                          ? 'bg-[#9c2b1b] text-white'
                          : 'bg-[#faf8f5] hover:bg-[#e0ddd8] text-[#58180d]'
                      }`}
                    >
                      <div className="font-semibold">{role.name}</div>
                      <div className="text-sm opacity-80">{role.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {displayMonster ? (
              <div>
                <MonsterStatBlock monster={displayMonster} />
                {displayMonster.description && (
                  <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-2 border-[#9c2b1b]">
                    <h3 className="text-xl font-bold text-[#58180d] mb-3 font-serif">Description</h3>
                    <p className="text-[#3c3c3c] leading-relaxed">{displayMonster.description}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center border-2 border-[#9c2b1b]">
                <h3 className="text-2xl font-bold text-[#58180d] mb-4 font-serif">
                  Select a Monster
                </h3>
                <p className="text-gray-600">
                  Choose a monster from the list to view its stat block, or create a new one.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
