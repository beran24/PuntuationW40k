import { PlayerId } from '@/types/Game';
import { secondaryMissions } from '../constants/secondaryMissions';
import Selector from './common/Selector';
import { useState } from 'react';
import { useGame } from '@/components/providers/GameContext';
import { Objective } from '@/types/Missions';

export default function MissionPicker({ player }: { player: PlayerId }) {
  const { game, changeDataPlayer } = useGame();
  const [newMissions, setNewMissions] = useState<Objective>({});

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

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <Selector
          options={secondaryMissions}
          label="Secondary Mission A"
          value={newMissions?.A}
          onHandleChange={(value) => onHandleChangeMissions('A', value)}
        />
      </div>
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <Selector
          options={secondaryMissions}
          label="Secondary Mission B"
          value={newMissions?.B}
          onHandleChange={(value) => onHandleChangeMissions('B', value)}
        />
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
