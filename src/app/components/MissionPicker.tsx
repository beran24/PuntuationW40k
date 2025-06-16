import { PlayerId } from '@/types/Game';
import { secondaryMissionIds } from '../constants/secondaryMissions';
import Selector from './common/Selector';
import { useState } from 'react';
import { useGame } from '@/providers/GameContext';
import { Objective } from '@/types/Missions';
import MissionCard from './common/MissionCard';
import { getRandomNumber } from '../constants/randomNumber';
import Dice from './common/Dice';
import { useTranslations } from 'next-intl';

export default function MissionPicker({ player }: { player: PlayerId }) {
  const smt = useTranslations('secondaryMissions');
  const { game, changeDataPlayer } = useGame();
  const [newMissions, setNewMissions] = useState<Objective>({
    A: secondaryMissionIds[getRandomNumber(0, secondaryMissionIds.length - 1)],
    B: secondaryMissionIds[getRandomNumber(0, secondaryMissionIds.length - 1)],
  });

  const onHandleChangeMissions = (
    key: PlayerId,
    value: React.SetStateAction<string>
  ) => {
    setNewMissions({ ...newMissions, [key]: value });
  };

  const onHandleSave = () => {
    const currentMissions = game[`player${player}`].missions ?? [];
    changeDataPlayer({ missions: [...currentMissions, newMissions] }, player);
  };

  const onHandleClickDice = () => {
    setNewMissions({
      A: secondaryMissionIds[
        getRandomNumber(0, secondaryMissionIds.length - 1)
      ],
      B: secondaryMissionIds[
        getRandomNumber(0, secondaryMissionIds.length - 1)
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex justify-center">
        <Dice onHandleClickDice={onHandleClickDice} />
      </div>
      <div className="flex flex-row gap-8">
        <div className="w-1/2">
          <Selector
            options={secondaryMissionIds.map((sm) => ({
              id: sm,
              name: smt(`${sm}.name`),
            }))}
            label="Secondary Mission A"
            value={newMissions?.A}
            onHandleChange={(value) => onHandleChangeMissions('A', value)}
          />
        </div>
        <div className="w-1/2">
          <Selector
            options={secondaryMissionIds.map((sm) => ({
              id: sm,
              name: smt(`${sm}.name`),
            }))}
            label="Secondary Mission B"
            value={newMissions?.B}
            onHandleChange={(value) => onHandleChangeMissions('B', value)}
          />
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="w-1/2">
          <MissionCard
            type="Primary Mission"
            title={smt(`${newMissions.A}.name`)}
            subtitle={smt(`${newMissions.A}.history`)}
            section={smt(`${newMissions.A}.ruleDescription`)}
          />
        </div>
        <div className="w-1/2 ">
          <MissionCard
            type="Mission rule"
            title={smt(`${newMissions.B}.name`)}
            subtitle={smt(`${newMissions.B}.history`)}
            section={smt(`${newMissions.B}.ruleDescription`)}
          />
        </div>
      </div>
      <button
        className={`px-4 py-2 bg-custom-${player === 'A' ? 'red' : 'green'} rounded hover:bg-custom-light-${player === 'A' ? 'red' : 'green'} 
        disabled:cursor-not-allowed disabled:bg-custom-disabled-bg disabled:text-custom-disabled-text text-white`}
        onClick={() => onHandleSave()}
        disabled={!newMissions?.B || !newMissions?.A}
      >
        Save missions
      </button>
    </div>
  );
}
