import { PlayerId } from '@/types/Game';
import { useGame } from '@/components/providers/GameContext';
import { secondaryMissions } from '../constants/secondaryMissions';
import InfoIcon from '@/assets/icons/info.svg';

export default function MissionList({ player }: { player: PlayerId }) {
  const { game, changeDataPlayer } = useGame();

  const onHandleSave = () => {
    changeDataPlayer({}, player);
  };

  return (
    <div className="flex flex-col gap-4">
      {game[`player${player}`].missions?.map((mission, index) => {
        const missionA = secondaryMissions.find((m) => m.id === mission?.A);
        const missionB = secondaryMissions.find((m) => m.id === mission?.B);

        return (
          <div
            key={index}
            className="flex flex-col px-4 py-2 rounded shadow-sm"
          >
            <div className="mb-1 font-semibold">Turn {index + 1}</div>

            <div className="flex items-center justify-between mb-1">
              <div className="relative group max-w-[70%]">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium cursor-pointer">
                    {missionA?.name || mission?.A}
                  </span>
                  <img
                    src="/img/dice/info.svg"
                    alt="info"
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="absolute z-10 hidden w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg group-hover:block">
                  {missionA?.ruleDescription}
                </div>
              </div>
              <input
                type="number"
                className="w-20 px-2 py-1 border rounded"
                placeholder="0"
              />
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="relative group max-w-[70%]">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium cursor-pointer">
                    {missionB?.name || mission?.B}
                  </span>
                  <img
                    src="/img/dice/info.svg"
                    alt="info"
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="absolute z-10 hidden w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg group-hover:block">
                  {missionB?.ruleDescription}
                </div>
              </div>
              <input
                type="number"
                className="w-20 px-2 py-1 border rounded"
                placeholder="0"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
