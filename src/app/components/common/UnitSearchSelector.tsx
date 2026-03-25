'use client';

import { useEffect, useRef, useState } from 'react';
import { getFactionColor } from '../../constants/factionColors';
import { type Unit } from '../UnitDisplay';

type UnitSearchSelectorProps = {
  units: Unit[];
  selectedUnitIndex: number;
  onSelectUnit: (index: number) => void;
};

const getUnitLabel = (unit: Unit) =>
  `${unit.name}${unit.variant ? ` ${unit.variant}` : ''}`;

export default function UnitSearchSelector({
  units,
  selectedUnitIndex,
  onSelectUnit,
}: Readonly<UnitSearchSelectorProps>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUnit = units[selectedUnitIndex];

  const restoreSelectedUnitLabel = () => {
    if (selectedUnit) {
      setSearchTerm(getUnitLabel(selectedUnit));
    }
  };

  const openDropdown = () => {
    setSearchTerm('');
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        restoreSelectedUnitLabel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedUnit]);

  useEffect(() => {
    if (selectedUnit && !isDropdownOpen) {
      setSearchTerm(getUnitLabel(selectedUnit));
    }
  }, [isDropdownOpen, selectedUnitIndex, selectedUnit]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUnits = units
    .map((unit, idx) => ({ unit, idx }))
    .filter(({ unit }) => {
      if (!normalizedSearch) return true;
      return getUnitLabel(unit).toLowerCase().includes(normalizedSearch);
    });

  if (!selectedUnit) {
    return null;
  }

  return (
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

      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onFocus={openDropdown}
            onClick={openDropdown}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isDropdownOpen) {
                setIsDropdownOpen(true);
              }
            }}
            placeholder="Search unit by name..."
            className="w-full px-4 py-3 pr-16 border border-custom-green rounded bg-custom-beige text-black font-medium text-base focus:outline-none focus:ring-2 focus:ring-custom-green"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setIsDropdownOpen(true);
                }}
                className="text-gray-600 hover:text-black text-sm leading-none"
                aria-label="Clear search"
              >
                X
              </button>
            )}
            <button
              type="button"
              onClick={openDropdown}
              className="text-gray-600 hover:text-black text-sm leading-none"
              aria-label="Open unit selector"
            >
              ▼
            </button>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-custom-beige border border-custom-green rounded max-h-96 overflow-y-auto shadow-lg">
            {filteredUnits.length > 0 ? (
              filteredUnits.map(({ unit, idx }) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectUnit(idx);
                    setSearchTerm(getUnitLabel(unit));
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
                    {unit.variant ? ` ${unit.variant}` : ''}
                    {unit.sourceFaction ? ` [${unit.sourceFaction}]` : ''}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-gray-600">
                No units found with that name.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}