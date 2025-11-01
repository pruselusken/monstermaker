'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function MonsterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const monsterId = searchParams.get('id')
  
  const [monster, setMonster] = useState({
    name: '',
    type: '',
    size: '',
    alignment: '',
    armor_class: 0,
    hit_points: 0,
    speed: '',
    // Add other monster properties
  })

  useEffect(() => {
    if (monsterId) {
      // Fetch monster data if we're editing
      fetch(`/api/monsters/${monsterId}`)
        .then(res => res.json())
        .then(data => setMonster(data))
    }
  }, [monsterId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = monsterId 
      ? `/api/monsters/${monsterId}` 
      : '/api/monsters'
    
    const method = monsterId ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(monster),
    })

    if (response.ok) {
      router.push('/monsters')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {monsterId ? 'Edit Monster' : 'Create New Monster'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={monster.name}
            onChange={(e) => setMonster({...monster, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        {/* Add other form fields similarly */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {monsterId ? 'Update Monster' : 'Create Monster'}
        </button>
      </form>
    </div>
  )
}