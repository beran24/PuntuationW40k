import { Deck } from '@/types/Game';
import { SecondaryMissionRules } from '@/types/Rules';

export const secondaryMissionIds: Record<Deck, string[]> = {
  'pariah-nexus': [
    'area_denial',
    'assassination',
    'behind_enemy_lines',
    'bring_it_down',
    'cleanse',
    'containment',
    'cull_the_horde',
    'defend_stronghold',
    'engage_on_all_fronts',
    'establish_locus',
    'extend_battle_lines',
    'marked_for_death',
    'no_prisoners',
    'overwhelming_force',
    'recover_assets',
    'sabotage',
    'secure_no_mans_land',
    'storm_hostile_objective',
  ],
  leviathan: [],
};

export const secondaryMissionRules: Record<string, SecondaryMissionRules> = {
  area_denial: {
    fixed: false,
    max: 5,
    when: 'end_of_turn',
  },
  assassination: {
    fixed: true,
    max: 5,
    when: 'active',
  },
  behind_enemy_lines: {
    fixed: true,
    max: 4,
    when: 'end_of_turn',
  },
  bring_it_down: { fixed: true, max: 6, when: 'active' },
  cleanse: {
    fixed: true,
    when: 'end_of_turn',
    max: 4,
  },
  containment: {
    fixed: false,
    when: 'shooting_phase',
    max: 6,
  },
  cull_the_horde: {
    max: 5,
    fixed: true,
    when: 'active',
  },
  defend_stronghold: {
    fixed: false,
    when: 'end_of_opponent_turn',
    max: 3,
  },
  engage_on_all_fronts: {
    fixed: true,
    when: 'end_of_turn',
    max: 4,
  },
  establish_locus: {
    fixed: true,
    when: 'end_of_turn',
    max: 4,
  },
  extend_battle_lines: {
    fixed: false,
    when: 'end_of_turn',
    max: 5,
  },
  marked_for_death: {
    fixed: false,
    when: 'end_of_turn',
    max: 5,
  },
  no_prisoners: {
    fixed: false,
    when: 'active',
    max: 5,
  },
  overwhelming_force: {
    fixed: false,
    when: 'active',
    max: 5,
  },
  recover_assets: {
    fixed: true,
    when: 'end_of_opponent_turn',
    max: 6,
  },
  sabotage: {
    fixed: false,
    when: 'end_of_opponent_turn',
    max: 6,
  },
  secure_no_mans_land: {
    fixed: false,
    max: 5,
    when: 'end_of_turn',
  },
  storm_hostile_objective: {
    fixed: true,
    max: 4,
    when: 'end_of_turn',
  },
};
