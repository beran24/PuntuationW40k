'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import UnitDisplay from '../../components/UnitDisplay';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import { factionData } from '../factionData';
import UnitSearchSelector from './UnitSearchSelector';

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
        <UnitSearchSelector
          units={units}
          selectedUnitIndex={selectedUnitIndex}
          onSelectUnit={setSelectedUnitIndex}
        />

        {/* Unit Details */}
        {selectedUnit && <UnitDisplay unit={selectedUnit} />}
      </main>
    </div>
  );
}
