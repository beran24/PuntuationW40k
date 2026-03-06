'use client';

type Stats = Record<string, string>;

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

export interface Unit {
  name: string;
  variant?: string;
  keywords?: string[];
  core?: string[];
  faction?: string[];
  abilities?: string[];
  stats?: Array<{ stats: Stats }>;
  ranged_weapons?: Weapon[];
  melee_weapons?: Weapon[];
}

export default function UnitDisplay({ unit }: { unit: Unit }) {
  if (!unit) {
    return (
      <div className="text-center py-8 text-gray-400">
        Select a unit to view details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Unit Header */}
      <div className="bg-gradient-to-r from-custom-red to-custom-green p-3 md:p-4 rounded">
        <h2 className="text-xl md:text-3xl font-bold text-white">
          {unit.name}
        </h2>
        {unit.variant && (
          <p className="text-sm md:text-base text-gray-200 mt-1">
            {unit.variant}
          </p>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE - 65% */}
        <div className="flex-shrink-0 flex-grow-0 md:basis-[calc(65%-0.9rem)] min-w-0 space-y-6">
          {/* Stats Table */}
          {unit.stats && unit.stats.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="text-lg font-bold mb-3 text-black">Stats</h3>
              <table className="w-full text-sm text-black">
                <thead>
                  <tr className="border-b-2 border-custom-green">
                    <th className="px-2 py-2 text-left font-bold">M</th>
                    <th className="px-2 py-2 text-left font-bold">T</th>
                    <th className="px-2 py-2 text-left font-bold">Sv</th>
                    <th className="px-2 py-2 text-left font-bold">W</th>
                    <th className="px-2 py-2 text-left font-bold">Ld</th>
                    <th className="px-2 py-2 text-left font-bold">OC</th>
                  </tr>
                </thead>
                <tbody>
                  {unit.stats.map((statBlock, idx) => (
                    <tr key={idx} className="border-t border-gray-300">
                      <td className="px-2 py-2">{statBlock.stats.M ?? '-'}</td>
                      <td className="px-2 py-2">{statBlock.stats.T ?? '-'}</td>
                      <td className="px-2 py-2">{statBlock.stats.Sv ?? '-'}</td>
                      <td className="px-2 py-2">{statBlock.stats.W ?? '-'}</td>
                      <td className="px-2 py-2">{statBlock.stats.Ld ?? '-'}</td>
                      <td className="px-2 py-2">{statBlock.stats.OC ?? '-'}</td>
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
                <table className="w-full text-xs text-black">
                  <thead>
                    <tr className="border-b-2 border-custom-red">
                      <th className="px-2 py-2 text-left font-bold">Weapon</th>
                      <th className="px-2 py-2 text-left font-bold">Rng</th>
                      <th className="px-2 py-2 text-left font-bold">Att</th>
                      <th className="px-2 py-2 text-left font-bold">Skl</th>
                      <th className="px-2 py-2 text-left font-bold">Str</th>
                      <th className="px-2 py-2 text-left font-bold">AP</th>
                      <th className="px-2 py-2 text-left font-bold">Dmg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.ranged_weapons.map((weapon, idx) => (
                      <tr key={idx} className="border-t border-gray-300">
                        <td className="px-2 py-2">
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
                        <td className="px-2 py-2">{weapon.range}</td>
                        <td className="px-2 py-2">{weapon.attacks}</td>
                        <td className="px-2 py-2">{weapon.skill}</td>
                        <td className="px-2 py-2">{weapon.strength}</td>
                        <td className="px-2 py-2">{weapon.ap}</td>
                        <td className="px-2 py-2">{weapon.damage}</td>
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
                <table className="w-full text-xs text-black">
                  <thead>
                    <tr className="border-b-2 border-custom-green">
                      <th className="px-2 py-2 text-left font-bold">Weapon</th>
                      <th className="px-2 py-2 text-left font-bold">Rng</th>
                      <th className="px-2 py-2 text-left font-bold">Att</th>
                      <th className="px-2 py-2 text-left font-bold">Skl</th>
                      <th className="px-2 py-2 text-left font-bold">Str</th>
                      <th className="px-2 py-2 text-left font-bold">AP</th>
                      <th className="px-2 py-2 text-left font-bold">Dmg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.melee_weapons.map((weapon, idx) => (
                      <tr key={idx} className="border-t border-gray-300">
                        <td className="px-2 py-2">
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
                        <td className="px-2 py-2">{weapon.range}</td>
                        <td className="px-2 py-2">{weapon.attacks}</td>
                        <td className="px-2 py-2">{weapon.skill}</td>
                        <td className="px-2 py-2">{weapon.strength}</td>
                        <td className="px-2 py-2">{weapon.ap}</td>
                        <td className="px-2 py-2">{weapon.damage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Keywords */}
          {unit.keywords && unit.keywords.length > 0 && (
            <div className="bg-custom-beige rounded p-4">
              <h3 className="font-bold text-black mb-2 text-lg">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {unit.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-custom-green text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
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
        </div>
      </div>
    </div>
  );
}
