import { Missions } from './Missions';

export type Player = {
  name: string;
  points: number;
  missions?: Missions;
};
