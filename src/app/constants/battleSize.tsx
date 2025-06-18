import { Deck } from '@/types/Game';

export const battleSizeIds: Record<Deck, string[]> = {
  'pariah-nexus': ['boarding-patrol', 'incursion', 'strike-force', 'onslaught'],
  leviathan: [],
};

export const battleSizePoints: Record<string, number> = {
  'boarding-patrol': 500,
  incursion: 1000,
  'strike-force': 2000,
  onslaught: 3000,
};
