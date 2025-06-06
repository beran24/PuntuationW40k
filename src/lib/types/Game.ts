import { Player } from './Player';

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;
export type Position = 'top' | 'bottom';
export type PlayerId = 'A' | 'B';
export type Game = {
  turn: Rating;
  phase?: Position;
  finished: boolean;
  battleSize: string;
  deployment?: string;
  missionRule?: string;
  primaryMission?: string;
  terrainLayout?: string;
  playerPlaying?: PlayerId;
  playerA: Player;
  playerB: Player;
};
