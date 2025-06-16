import { PlayerId } from '@/types/Game';
import { useGame } from '@/providers/GameContext';
import { Point } from '@/types/Missions';
import { useTranslations } from 'next-intl';

export default function MissionList({ player }: { player: PlayerId }) {
  const { game, changeDataPlayer } = useGame();
  const pmt = useTranslations('primaryMissions');
  const smt = useTranslations('secondaryMissions');

  const handleChangePuntuation = (
    value: number,
    type: Point,
    index: number
  ) => {
    if (!isNaN(value)) {
      const currentMissionsPoints = game[`player${player}`].missionPoints ?? [];
      const updatedMissionPoints = currentMissionsPoints.map((mp, i) =>
        i === index ? { ...mp, [type]: value } : mp
      );
      changeDataPlayer({ missionPoints: updatedMissionPoints }, player);
    }
  };

  const color = player === 'A' ? 'red' : 'green';
  const reverse = player === 'A' ? '-reverse' : '';

  return (
    <div className="flex flex-col gap-2 text-custom-beige">
      <div className="flex items-center gap-1 relative group font-normal px-4 py-2">
        <span className="text-sm font-medium cursor-pointer">
          Primary: {pmt(`${game.primaryMission}.name`)}
        </span>
        <img
          src="/img/dice/info2.svg"
          alt="info"
          className="w-5 h-5 cursor-pointer "
        />
        <div className="absolute z-10 hidden w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg group-hover:block">
          {pmt(`${game.primaryMission}.ruleDescription`)}
        </div>
      </div>
      {game[`player${player}`].missions?.map((mission, index) => {
        return (
          <div
            key={`player${player}-turn${index}`}
            className="flex flex-col px-4 gap-2 rounded shadow-sm"
          >
            <div className={`flex flex-row${reverse} gap-4 font-semibold`}>
              Turn {index + 1}
            </div>
            <div className={`flex flex-row gap-2 flex-row${reverse}`}>
              <div
                className={`flex flex-col justify-between mb-1 w-[15%] bg-custom-${color} rounded p-2`}
              >
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded h-full text-center text-4xl"
                  placeholder="0"
                  value={game[`player${player}`].missionPoints[index].P}
                  step="1"
                  min={0}
                  onChange={(e) =>
                    handleChangePuntuation(parseInt(e.target.value), 'P', index)
                  }
                  disabled={game.finished || index === 0} // disable primary turn 1
                />
              </div>
              <div className="flex flex-col w-[85%] gap-1 mb-1">
                <div
                  className={`flex items-center justify-between bg-custom-${color} rounded p-2`}
                >
                  <div className="relative group max-w-[70%]">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium cursor-pointer">
                        {smt(`${mission?.A}.name`)}
                      </span>
                      <img
                        src="/img/dice/info2.svg"
                        alt="info"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>
                    <div className="absolute z-10 hidden w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg group-hover:block">
                      {smt(`${mission?.A}.ruleDescription`)}
                    </div>
                  </div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 border rounded text-center"
                    placeholder="0"
                    value={game[`player${player}`].missionPoints[index].A}
                    step="1"
                    min={0}
                    onChange={(e) =>
                      handleChangePuntuation(
                        parseInt(e.target.value),
                        'A',
                        index
                      )
                    }
                    disabled={game.finished}
                  />
                </div>
                <div
                  className={`flex items-center justify-between bg-custom-${color} rounded p-2`}
                >
                  <div className="relative group max-w-[70%]">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium cursor-pointer">
                        {smt(`${mission?.B}.name`)}
                      </span>
                      <img
                        src="/img/dice/info2.svg"
                        alt="info"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>
                    <div className="absolute z-10 hidden w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg group-hover:block">
                      {smt(`${mission?.B}.ruleDescription`)}
                    </div>
                  </div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 border rounded text-center"
                    placeholder="0"
                    step="1"
                    value={game[`player${player}`].missionPoints[index].B}
                    onChange={(e) =>
                      handleChangePuntuation(
                        parseInt(e.target.value),
                        'B',
                        index
                      )
                    }
                    min={0}
                    disabled={game.finished}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
