'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import UnitDisplay, { type Unit } from '../../components/UnitDisplay';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import { getFactionColor } from '../../constants/factionColors';
import tyranidsData from '@/data/tyranids.json';
import worldEatersData from '@/data/world-eaters.json';
import spaceMarinesData from '@/data/space-marines.json';
import darkAngelsData from '@/data/dark-angels.json';
import blackTemplarsData from '@/data/black-templars.json';
import deathwatchData from '@/data/deathwatch.json';
import spaceWolvesData from '@/data/space-wolves.json';
import bloodAngelsData from '@/data/blood-angels.json';
import adeptusCustodesData from '@/data/adeptus-custodes.json';
import adeptusCustodesFwData from '@/data/adeptus-custodes-fw.json';

// Helper function to merge and sort units with faction tagging
const mergeUnits = (
  primaryFaction: string,
  primaryUnits: Unit[],
  secondaryFaction: string,
  secondaryUnits: Unit[]
): Unit[] => {
  const taggedPrimary = primaryUnits.map((unit) => ({
    ...unit,
    sourceFaction: primaryFaction,
  }));
  const taggedSecondary = secondaryUnits.map((unit) => ({
    ...unit,
    sourceFaction: secondaryFaction,
  }));
  return [...taggedPrimary, ...taggedSecondary];
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
    units: mergeUnits(
      'Dark Angels',
      darkAngelsData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'black-templars': {
    name: 'Black Templars',
    units: mergeUnits(
      'Black Templars',
      blackTemplarsData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  deathwatch: {
    name: 'Deathwatch',
    units: mergeUnits(
      'Deathwatch',
      deathwatchData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'space-wolves': {
    name: 'Space Wolves',
    units: mergeUnits(
      'Space Wolves',
      spaceWolvesData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'blood-angels': {
    name: 'Blood Angels',
    units: mergeUnits(
      'Blood Angels',
      bloodAngelsData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'adeptus-custodes': {
    name: 'Adeptus Custodes',
    units: mergeUnits(
      'Adeptus Custodes',
      adeptusCustodesData as Unit[],
      'Adeptus Custodes FW',
      adeptusCustodesFwData as Unit[]
    ),
  },
};

export default function DatasheetPage() {
  const params = useParams();
  const faction = params.faction as string;
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const factionInfo = factionData[faction];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="flex items-center gap-3 mb-2">
            <label className="block text-sm font-medium">Select Unit</label>
            {selectedUnit.sourceFaction && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded text-white"
                style={{
                  backgroundColor: getFactionColor(selectedUnit.sourceFaction),
                }}
              >
                {selectedUnit.sourceFaction}
              </span>
            )}
          </div>

          {/* Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-custom-green rounded bg-custom-beige text-black font-medium text-base focus:outline-none focus:ring-2 focus:ring-custom-green text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {selectedUnit.sourceFaction && (
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: getFactionColor(
                        selectedUnit.sourceFaction
                      ),
                    }}
                  />
                )}
                <span>
                  {selectedUnit.name}
                  {selectedUnit.variant ? ` - ${selectedUnit.variant}` : ''}
                </span>
              </div>
              <span className="text-gray-600">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-custom-beige border border-custom-green rounded max-h-96 overflow-y-auto shadow-lg">
                {units.map((unit, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedUnitIndex(idx);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-custom-light-green hover:text-white transition flex items-center gap-2 ${
                      idx === selectedUnitIndex
                        ? 'bg-custom-green text-white'
                        : 'text-black'
                    }`}
                  >
                    {unit.sourceFaction && (
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: getFactionColor(unit.sourceFaction),
                        }}
                      />
                    )}
                    <span className="text-sm">
                      {unit.name}
                      {unit.variant ? ` - ${unit.variant}` : ''}
                      {unit.sourceFaction ? ` [${unit.sourceFaction}]` : ''}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Unit Details */}
        {selectedUnit && <UnitDisplay unit={selectedUnit} />}
      </main>
    </div>
  );
}
