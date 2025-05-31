export type Objective = {
  A?: string;
  B?: string;
};
export type Missions = Objective[];

export type Points = {
  A: number;
  B: number;
  P: number;
};
export type MissionsPoints = Points[];

export type Point = 'A' | 'B' | 'P';
