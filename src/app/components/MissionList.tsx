import { PlayerId } from '@/types/Game';
import { useGame } from '@/components/providers/GameContext';
import { secondaryMissions } from '../constants/secondaryMissions';
import { Point } from '@/types/Missions';
import { primaryMissions } from '../constants/primaryMissions';

export default function MissionList({ player }: { player: PlayerId }) {
  const { game, changeDataPlayer } = useGame();

  const handleChangePuntuation = (
    value: number,
    type: Point,
    index: number
  ) => {
    const currentMissionsPoints = game[`player${player}`].missionPoints ?? [];
    const updatedMissionPoints = currentMissionsPoints.map((mp, i) =>
      i === index ? { ...mp, [type]: value } : mp
    );
    changeDataPlayer({ missionPoints: updatedMissionPoints }, player);
  };

  return (
    <div className="flex flex-col gap-4">
      {game[`player${player}`].missions?.map((mission, index) => {
        const missionA = secondaryMissions.find((m) => m.id === mission?.A);
        const missionB = secondaryMissions.find((m) => m.id === mission?.B);
        const primary = primaryMissions.find(
          (m) => m.id === game.primaryMission
        );

        return (
          <div
            key={`player${player}-turn${index}`}
            className="flex flex-col px-4 rounded shadow-sm"
          >
            <div className="mt-1 font-semibold">Turn {index + 1}</div>
            <div className="flex items-center justify-between mb-1">
              <div className="relative group max-w-[70%]">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium cursor-pointer">
                    {primary?.name}
                  </span>
                  <img
                    src="/img/dice/info.svg"
                    alt="info"
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="absolute z-10 hidden w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg group-hover:block">
                  {primary?.ruleDescription}
                </div>
              </div>
              <input
                type="number"
                className="w-20 px-2 py-1 border rounded"
                placeholder="0"
                value={game[`player${player}`].missionPoints[index].P}
                step="1"
                min={0}
                onChange={(e) =>
                  handleChangePuntuation(parseInt(e.target.value), 'P', index)
                }
                disabled={game.finished}
              />
            </div>
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
                value={game[`player${player}`].missionPoints[index].A}
                step="1"
                min={0}
                onChange={(e) =>
                  handleChangePuntuation(parseInt(e.target.value), 'A', index)
                }
                disabled={game.finished}
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
                step="1"
                value={game[`player${player}`].missionPoints[index].B}
                onChange={(e) =>
                  handleChangePuntuation(parseInt(e.target.value), 'B', index)
                }
                min={0}
                disabled={game.finished}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
