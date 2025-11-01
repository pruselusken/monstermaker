'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createMonster } from '@/lib/api';
import Link from 'next/link';

export default function CreateMonsterPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const monsterId = searchParams.get('id')



  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    size: 'Medium',
    type: 'Humanoid',
    alignment: 'Unaligned',
    armor_class: 10,
    hit_points: 10,
    hit_dice: '2d8',
    speed_walk: 30,
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
    challenge_rating: '0',
    experience_points: 0,
    senses: 'passive Perception 10',
    languages: '',
    description: '',
  });

  const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  const types = [
    'Aberration',
    'Beast',
    'Celestial',
    'Construct',
    'Dragon',
    'Elemental',
    'Fey',
    'Fiend',
    'Giant',
    'Humanoid',
    'Monstrosity',
    'Ooze',
    'Plant',
    'Undead',
  ];

  useEffect(() => {
    if (monsterId) {
      // Fetch monster data if we're editing
      fetch(`/api/monsters/${monsterId}`)
        .then(res => res.json())
        .then(data => setFormData(data))
    }
  }, [monsterId])


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const monster = {
      name: formData.name,
      size: formData.size,
      type: formData.type,
      alignment: formData.alignment,
      armor_class: formData.armor_class,
      hit_points: formData.hit_points,
      hit_dice: formData.hit_dice,
      speed: { walk: formData.speed_walk },
      str: formData.str,
      dex: formData.dex,
      con: formData.con,
      int: formData.int,
      wis: formData.wis,
      cha: formData.cha,
      challenge_rating: formData.challenge_rating,
      experience_points: formData.experience_points,
      senses: formData.senses,
      languages: formData.languages,
      description: formData.description,
      special_abilities: [],
      actions: [],
      saving_throws: {},
      skills: {},
    };

    try {
      await createMonster(monster);
      router.push('/monsters');
    } catch (error) {
      alert('Error creating monster: ' + (error as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/monsters"
            className="text-[#9c2b1b] hover:text-[#7a2216] font-semibold"
          >
            ← Back to Monsters
          </Link>
          <h1 className="text-4xl font-bold text-[#58180d] font-serif">
            {monsterId ? 'Edit Monster' : 'Create New Monster'}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 border-2 border-[#9c2b1b]"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-[#58180d] font-semibold mb-2">Monster Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Size</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Alignment</label>
                <input
                  type="text"
                  value={formData.alignment}
                  onChange={(e) => setFormData({ ...formData, alignment: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-[#58180d] font-semibold mb-2">AC</label>
                <input
                  type="number"
                  required
                  value={formData.armor_class}
                  onChange={(e) =>
                    setFormData({ ...formData, armor_class: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">HP</label>
                <input
                  type="number"
                  required
                  value={formData.hit_points}
                  onChange={(e) =>
                    setFormData({ ...formData, hit_points: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Hit Dice</label>
                <input
                  type="text"
                  required
                  value={formData.hit_dice}
                  onChange={(e) => setFormData({ ...formData, hit_dice: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Speed</label>
                <input
                  type="number"
                  required
                  value={formData.speed_walk}
                  onChange={(e) =>
                    setFormData({ ...formData, speed_walk: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>
            </div>

            <div className="bg-[#faf8f5] p-4 rounded border border-[#9c2b1b]">
              <h3 className="text-lg font-bold text-[#58180d] mb-3 font-serif">Ability Scores</h3>
              <div className="grid grid-cols-6 gap-3">
                {['str', 'dex', 'con', 'int', 'wis', 'cha'].map((stat) => (
                  <div key={stat}>
                    <label className="block text-[#58180d] font-semibold mb-1 uppercase text-sm">
                      {stat}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="30"
                      value={formData[stat as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [stat]: parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Challenge Rating</label>
                <input
                  type="text"
                  required
                  value={formData.challenge_rating}
                  onChange={(e) =>
                    setFormData({ ...formData, challenge_rating: e.target.value })
                  }
                  placeholder="e.g., 1/2, 1, 2"
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Experience Points</label>
                <input
                  type="number"
                  required
                  value={formData.experience_points}
                  onChange={(e) =>
                    setFormData({ ...formData, experience_points: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Senses</label>
                <input
                  type="text"
                  value={formData.senses}
                  onChange={(e) => setFormData({ ...formData, senses: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>

              <div>
                <label className="block text-[#58180d] font-semibold mb-2">Languages</label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#58180d] font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-[#9c2b1b] rounded focus:outline-none focus:ring-2 focus:ring-[#9c2b1b]"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#9c2b1b] text-white px-6 py-3 rounded hover:bg-[#7a2216] transition-colors font-semibold disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Monster'}
              </button>
              <Link
                href="/monsters"
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 transition-colors font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
