import { PlayerId } from '@/types/Game';
import { secondaryMissions } from '../constants/secondaryMissions';
import Selector from './common/Selector';
import { useState } from 'react';
import { useGame } from '@/providers/GameContext';
import { Objective } from '@/types/Missions';
import MissionCard from './common/MissionCard';
import { getRandomNumber } from '../constants/randomNumber';
import Dice from './common/Dice';

export default function MissionPicker({ player }: { player: PlayerId }) {
  const { game, changeDataPlayer } = useGame();
  const [newMissions, setNewMissions] = useState<Objective>({
    A: secondaryMissions[getRandomNumber(0, secondaryMissions.length - 1)].id,
    B: secondaryMissions[getRandomNumber(0, secondaryMissions.length - 1)].id,
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

  const missionA = secondaryMissions.find((sm) => sm.id === newMissions.A);
  const missionB = secondaryMissions.find((sm) => sm.id === newMissions.B);

  const onHandleClickDice = () => {
    setNewMissions({
      A: secondaryMissions[getRandomNumber(0, secondaryMissions.length - 1)].id,
      B: secondaryMissions[getRandomNumber(0, secondaryMissions.length - 1)].id,
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
            options={secondaryMissions}
            label="Secondary Mission A"
            value={newMissions?.A}
            onHandleChange={(value) => onHandleChangeMissions('A', value)}
          />
        </div>
        <div className="w-1/2">
          <Selector
            options={secondaryMissions}
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
            title={missionA?.name}
            subtitle={missionA?.history}
            section={missionA?.ruleDescription}
          />
        </div>
        <div className="w-1/2 ">
          <MissionCard
            type="Mission rule"
            title={missionB?.name}
            subtitle={missionB?.history}
            section={missionB?.ruleDescription}
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
