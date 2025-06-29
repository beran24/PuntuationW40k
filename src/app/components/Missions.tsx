import { useGame } from '@/providers/GameContext';
import MissionPicker from './MissionPicker';
import MissionList from './MissionList';

export default function Missions() {
  const { game, playerB, playerA } = useGame();
  return (
    <main className="flex-1 flex w-full overflow-y-auto mt-16 mb-16 min-h-[calc(100vh-4rem-4rem)]">
      <div className="w-1/2 bg-custom-button-red">
        {game.playerPlaying === 'A' &&
        game.turn !== playerA?.missions?.length ? (
          <MissionPicker player="A" />
        ) : (
          <MissionList player="A" />
        )}
      </div>
      <div className="w-1/2 bg-custom-button-green">
        {game.playerPlaying === 'B' &&
        game.turn !== playerB?.missions?.length ? (
          <MissionPicker player="B" />
        ) : (
          <MissionList player="B" />
        )}
      </div>
    </main>
  );
}
