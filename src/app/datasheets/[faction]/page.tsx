'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import UnitDisplay, { type Unit } from '../../components/UnitDisplay';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import tyranidsData from '@/data/tyranids.json';
import worldEatersData from '@/data/world-eaters.json';
import spaceMarinesData from '@/data/space-marines.json';
import darkAngelsData from '@/data/dark-angels.json';
import blackTemplarsData from '@/data/black-templars.json';
import deathwatchData from '@/data/deathwatch.json';
import spaceWolvesData from '@/data/space-wolves.json';
import bloodAngelsData from '@/data/blood-angels.json';

// Helper function to merge and sort units
const mergeUnits = (...unitArrays: Unit[][]): Unit[] => {
  const merged = unitArrays.flat();
  return merged.sort((a, b) => a.name.localeCompare(b.name));
};

const factionData: Record<string, { name: string; units: Unit[] }> = {
  tyranids: {
    name: 'Tyranids',
    units: tyranidsData as Unit[],
  },
  'world-eaters': {
    name: 'World Eaters',
    units: worldEatersData as Unit[],
  },
  'space-marines': {
    name: 'Space Marines',
    units: spaceMarinesData as Unit[],
  },
  'dark-angels': {
    name: 'Dark Angels',
    units: mergeUnits(darkAngelsData as Unit[], spaceMarinesData as Unit[]),
  },
  'black-templars': {
    name: 'Black Templars',
    units: mergeUnits(blackTemplarsData as Unit[], spaceMarinesData as Unit[]),
  },
  deathwatch: {
    name: 'Deathwatch',
    units: mergeUnits(deathwatchData as Unit[], spaceMarinesData as Unit[]),
  },
  'space-wolves': {
    name: 'Space Wolves',
    units: mergeUnits(spaceWolvesData as Unit[], spaceMarinesData as Unit[]),
  },
  'blood-angels': {
    name: 'Blood Angels',
    units: mergeUnits(bloodAngelsData as Unit[], spaceMarinesData as Unit[]),
  },
};

export default function DatasheetPage() {
  const params = useParams();
  const faction = params.faction as string;
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);

  const factionInfo = factionData[faction];

  if (!factionInfo) {
    return (
      <div className="min-h-screen flex flex-col bg-custom-granate text-white">
        <header className="flex header justify-between items-center px-4 md:px-8 py-4">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold hover:opacity-80"
          >
            ← Back
          </Link>
          <LanguageSwitcher />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Faction Not Found</h1>
            <p className="text-gray-400">
              The faction &quot;{faction}&quot; is not available.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const { name: factionName, units } = factionInfo;
  const selectedUnit = units[selectedUnitIndex];

  return (
    <div className="min-h-screen flex flex-col bg-custom-granate text-white">
      {/* Header */}
      <header className="flex header justify-between items-center px-4 md:px-8 py-4">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold hover:opacity-80"
        >
          ← Back
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">{factionName}</h1>
        <LanguageSwitcher />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-6">
        {/* Unit Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Unit</label>
          <select
            value={selectedUnitIndex}
            onChange={(e) => setSelectedUnitIndex(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-custom-green rounded bg-custom-beige text-black font-medium text-base focus:outline-none focus:ring-2 focus:ring-custom-green"
          >
            {units.map((unit, idx) => (
              <option key={idx} value={idx}>
                {unit.name}
                {unit.variant ? ` - ${unit.variant}` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Details */}
        {selectedUnit && <UnitDisplay unit={selectedUnit} />}
      </main>
    </div>
  );
}
