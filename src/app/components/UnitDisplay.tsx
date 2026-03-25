'use client';

import { getFactionColor } from '../constants/factionColors';

type Stats = Record<string, string>;
type UnitStatBlock = {
  stats: Stats;
  model_name?: string;
};

interface Weapon {
  name: string;
  types?: string[];
  range: string;
  attacks: string;
  skill: string;
  strength: string;
  ap: string;
  damage: string;
}

type WargearOption = {
  text: string;
  list_options?: string[];
  list?: string[];
};

export interface Unit {
  name: string;
  variant?: string;
  keywords?: string[];
  faction_keywords?: string[];
  core?: string[];
  faction?: string[];
  abilities?: string[];
  points?: Partial<Record<string, string>>;
  wargear_options?: WargearOption[];
  stats?: UnitStatBlock[];
  ranged_weapons?: Weapon[];
  melee_weapons?: Weapon[];
  sourceFaction?: string;
}

export default function UnitDisplay({ unit }: { unit: Unit }) {
  const formatInvSave = (inv?: string) => {
    if (!inv) return '';
    return `(${inv}+)`;
  };

  if (!unit) {
    return (
      <div className="text-center py-8 text-gray-400">
        Select a unit to view details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE - 65% */}
        <div className="flex-shrink-0 flex-grow-0 md:basis-[calc(65%-0.9rem)] min-w-0 space-y-6">
          {/* Stats Table */}
          {unit.stats && unit.stats.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="text-lg font-bold mb-3 text-black">Stats</h3>
              <table className="w-full text-sm leading-normal text-black table-fixed">
                <colgroup>
                  <col className="w-[40%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                </colgroup>
                <thead>
                  <tr className="border-b-2 border-custom-green">
                    <th className="px-3 py-2 text-left font-bold">Name</th>
                    <th className="px-2 py-2 text-center font-bold">M</th>
                    <th className="px-2 py-2 text-center font-bold">T</th>
                    <th className="px-2 py-2 text-center font-bold">Sv</th>
                    <th className="px-2 py-2 text-center font-bold">W</th>
                    <th className="px-2 py-2 text-center font-bold">Ld</th>
                    <th className="px-2 py-2 text-center font-bold">OC</th>
                  </tr>
                </thead>
                <tbody>
                  {unit.stats.map((statBlock, idx) => (
                    <tr key={idx} className="border-t border-gray-300">
                      <td className="px-3 py-2">
                        <div className="flex flex-col">
                          <p className="font-bold truncate">
                            {statBlock.model_name ?? unit.name}
                            {statBlock.stats.BaseSize
                              ? ` ${statBlock.stats.BaseSize}`
                              : ''}
                          </p>
                          {unit.variant && (
                            <p className="text-xs text-gray-600 truncate">
                              {unit.variant}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {statBlock.stats.M ?? '-'}
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {statBlock.stats.T ?? '-'}
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {statBlock.stats.Sv
                          ? `${statBlock.stats.Sv}${statBlock.stats.Inv ? ` ${formatInvSave(statBlock.stats.Inv)}` : ''}`
                          : '-'}
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {statBlock.stats.W ?? '-'}
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {statBlock.stats.Ld ?? '-'}
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {statBlock.stats.OC ?? '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Ranged Weapons */}
          {unit.ranged_weapons && unit.ranged_weapons.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-3 text-lg">
                Ranged Weapons
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm leading-normal text-black table-fixed">
                  <colgroup>
                    <col className="w-[40%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b-2 border-custom-red">
                      <th className="px-3 py-2 text-left font-bold">Weapon</th>
                      <th className="px-2 py-2 text-center font-bold">R</th>
                      <th className="px-2 py-2 text-center font-bold">A</th>
                      <th className="px-2 py-2 text-center font-bold">BS</th>
                      <th className="px-2 py-2 text-center font-bold">S</th>
                      <th className="px-2 py-2 text-center font-bold">AP</th>
                      <th className="px-2 py-2 text-center font-bold">D</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.ranged_weapons.map((weapon, idx) => (
                      <tr key={idx} className="border-t border-gray-300">
                        <td className="px-3 py-2">
                          <div className="flex items-center flex-wrap gap-1">
                            <p className="font-bold">{weapon.name}</p>
                            {weapon.types &&
                              weapon.types.length > 0 &&
                              weapon.types.map((type, i) => (
                                <span
                                  key={i}
                                  className="bg-custom-red text-white px-1.5 py-0.5 rounded text-xs"
                                >
                                  {type.toUpperCase()}
                                </span>
                              ))}
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.range}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.attacks}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.skill}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.strength}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.ap}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.damage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Melee Weapons */}
          {unit.melee_weapons && unit.melee_weapons.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-3 text-lg">
                Melee Weapons
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm leading-normal text-black table-fixed">
                  <colgroup>
                    <col className="w-[40%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b-2 border-custom-green">
                      <th className="px-3 py-2 text-left font-bold">Weapon</th>
                      <th className="px-2 py-2 text-center font-bold">R</th>
                      <th className="px-2 py-2 text-center font-bold">A</th>
                      <th className="px-2 py-2 text-center font-bold">WS</th>
                      <th className="px-2 py-2 text-center font-bold">S</th>
                      <th className="px-2 py-2 text-center font-bold">AP</th>
                      <th className="px-2 py-2 text-center font-bold">D</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.melee_weapons.map((weapon, idx) => (
                      <tr key={idx} className="border-t border-gray-300">
                        <td className="px-3 py-2">
                          <div className="flex items-center flex-wrap gap-1">
                            <p className="font-bold">{weapon.name}</p>
                            {weapon.types &&
                              weapon.types.length > 0 &&
                              weapon.types.map((type, i) => (
                                <span
                                  key={i}
                                  className="bg-custom-green text-white px-1.5 py-0.5 rounded text-xs"
                                >
                                  {type.toUpperCase()}
                                </span>
                              ))}
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.range}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.attacks}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.skill}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.strength}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.ap}
                        </td>
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          {weapon.damage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - 35% */}
        <div className="flex-shrink-0 flex-grow-0 md:basis-[calc(35%-0.6rem)] min-w-0 space-y-6">
          {/* Core Rules */}
          {unit.core && unit.core.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">Core Rules</h3>
              <div className="flex flex-wrap gap-2">
                {unit.core.map((rule, idx) => (
                  <span
                    key={idx}
                    className="bg-custom-red text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    {rule}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Faction */}
          {unit.faction && unit.faction.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">Faction</h3>
              <div className="flex flex-wrap gap-2">
                {unit.faction.map((fac, idx) => (
                  <span
                    key={idx}
                    className="bg-custom-light-green text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Abilities */}
          {unit.abilities && unit.abilities.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">Abilities</h3>
              <div className="space-y-2">
                {unit.abilities.map((ability, idx) => (
                  <p key={idx} className="text-xs text-black leading-tight">
                    {ability}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Points */}
          {unit.points && Object.keys(unit.points).length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">Points</h3>
              <div className="space-y-2">
                {Object.entries(unit.points).map(([points, models]) => {
                  if (!models) return null;

                  return (
                    <p
                      key={`${models}-${points}`}
                      className="text-xs text-black"
                    >
                      {models}: {points}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* Keywords */}
          {((unit.keywords && unit.keywords.length > 0) ||
            (unit.faction_keywords && unit.faction_keywords.length > 0)) && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {unit.keywords?.map((keyword, idx) => (
                  <span
                    key={`keyword-${idx}`}
                    className="bg-custom-green text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
                {unit.faction_keywords?.map((keyword, idx) => (
                  <span
                    key={`faction-keyword-${idx}`}
                    className="text-white px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: getFactionColor(unit.sourceFaction),
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Wargear Options */}
          {unit.wargear_options && unit.wargear_options.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">
                Wargear Options
              </h3>
              <div className="space-y-3">
                {unit.wargear_options.map((option, idx) => {
                  const optionList = option.list_options ?? option.list;

                  return (
                    <div key={idx} className="text-xs text-black">
                      <p className="leading-tight">{option.text}</p>
                      {optionList && optionList.length > 0 && (
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {optionList.map((item, itemIdx) => (
                            <li key={itemIdx} className="leading-tight">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
