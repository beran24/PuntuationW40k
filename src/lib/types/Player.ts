import { Missions, MissionsPoints } from './Missions';

export type Player = {
  name: string;
  points: number;
  missions: Missions;
  missionPoints: MissionsPoints;
  commandPoints: number;
  warlord: boolean;
};
