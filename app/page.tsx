import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-12 border-4 border-[#9c2b1b]">
        <h1 className="text-5xl font-bold text-[#58180d] mb-6 font-serif text-center">
          D&D Monster Manager
        </h1>
        <p className="text-xl text-[#3c3c3c] mb-8 text-center leading-relaxed">
          Create, manage, and customize D&D 5e monster stat blocks. Apply roles like Guard, Scout,
          Brute, or Caster to create unique variants with modified abilities and features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#faf8f5] p-6 rounded border-2 border-[#9c2b1b]">
            <h2 className="text-2xl font-bold text-[#58180d] mb-3 font-serif">Features</h2>
            <ul className="space-y-2 text-[#3c3c3c]">
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span>Create custom monsters with full D&D 5e stat blocks</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span>Apply role templates for instant variants</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span>Authentic D&D 5e styling and formatting</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span>Manage your monster collection</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#faf8f5] p-6 rounded border-2 border-[#9c2b1b]">
            <h2 className="text-2xl font-bold text-[#58180d] mb-3 font-serif">Roles</h2>
            <ul className="space-y-2 text-[#3c3c3c]">
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span><strong>Guard:</strong> Defensive bonuses and sentinel abilities</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span><strong>Scout:</strong> Enhanced speed and perception</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span><strong>Brute:</strong> Increased damage and hit points</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#9c2b1b] mr-2">•</span>
                <span><strong>Caster:</strong> Spellcasting abilities</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/monsters"
            className="bg-[#9c2b1b] text-white px-8 py-4 rounded-lg hover:bg-[#7a2216] transition-colors font-bold text-lg shadow-lg"
          >
            Enter Monster Manager
          </Link>
        </div>
      </div>
    </div>
  );
}