import { Deck } from '@/types/Game';

export const terrainLayoutIds: Record<Deck, string[]> = {
  'pariah-nexus': ['1', '2', '3', '4', '5', '6', '7', '8'],
  leviathan: [],
};

export const terrainLayoutImages: Record<string, string> = {
  '1': '/img/terrain_layouts/PN_TerrainLayout1a.webp',
  '2': '/img/terrain_layouts/PN_TerrainLayout2a.webp',
  '3': '/img/terrain_layouts/PN_TerrainLayout3a.webp',
  '4': '/img/terrain_layouts/PN_TerrainLayout4a.webp',
  '5': '/img/terrain_layouts/PN_TerrainLayout5a.webp',
  '6': '/img/terrain_layouts/PN_TerrainLayout6a.webp',
  '7': '/img/terrain_layouts/PN_TerrainLayout7a.webp',
  '8': '/img/terrain_layouts/PN_TerrainLayout8a.webp',
};
