export type Rule = {
  id: string;
  name: string;
  completed?: boolean;
};

export type SecondaryMission = {
  id: string;
  name: string;
  history: string;
  ruleDescription: string;
};

export type SecondaryMissionRules = {
  fixed: boolean;
  max: number;
  when: string;
};
