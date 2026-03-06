export const FACTION_COLORS: Record<string, string> = {
  Tyranids: '#9333ea', // purple
  'Dark Angels': '#14532d', // dark green
  'Space Marines': '#2563eb', // blue
  'Blood Angels': '#dc2626', // red
  'Black Templars': '#000000', // black
  Deathwatch: '#18181b', // dark gray/black
  'Space Wolves': '#64748b', // slate/gray
  'World Eaters': '#b91c1c', // crimson red
};

export const getFactionColor = (factionName?: string): string => {
  if (!factionName) return '#1f443d'; // default custom-green
  return FACTION_COLORS[factionName] || '#1f443d';
};
