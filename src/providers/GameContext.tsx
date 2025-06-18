'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import type { Deck, Game, PlayerId, Rating } from '@/types/Game';
import type { Player } from '@/types/Player';
import useTimer from '../hooks/useTimer';
import { primaryMissionIds } from '../app/constants/primaryMissions';
import { missionRules } from '../app/constants/missionRules';
import { deploymentIds } from '../app/constants/deployments';
import { getRandomNumber } from '../app/constants/randomNumber';
import { terrainLayoutIds } from '../app/constants/terrainLayouts';
import { useSearchParams } from 'next/navigation';

const defaultPlayer: Player = {
  name: 'Name',
  points: 0,
  commandPoints: 0,
  warlord: false,
  missions: [],
  missionPoints: [
    {
      A: 0,
      B: 0,
      P: 0,
    },
  ],
};

const defaultGame: Game = {
  turn: 0,
  finished: false,
  battleSize: 'strike-force',
  playerA: defaultPlayer,
  playerB: defaultPlayer,
  deck: 'pariah-nexus',
};

const GameContext = createContext<{
  game: Game;
  playerA: Player;
  playerB: Player;
  nextTurn: (player: PlayerId) => void;
  changeDataPlayer: (player: Partial<Player>, id: PlayerId) => void;
  secondsA: number;
  secondsB: number;
  setActive: React.Dispatch<React.SetStateAction<PlayerId | null>>;
  active: PlayerId | null;
  changeGameConfig: (key: string, value: string) => void;
  loading: boolean;
}>({
  game: defaultGame,
  playerA: defaultPlayer,
  playerB: defaultPlayer,
  nextTurn: () => {},
  changeDataPlayer: () => {},
  secondsA: 0,
  secondsB: 0,
  setActive: () => {},
  active: null,
  changeGameConfig: () => {},
  loading: true,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(defaultGame);
  const [loading, setLoading] = useState(true);
  const sp = useSearchParams();
  const deck: Deck = (sp.get('deck') as Deck) || 'pariah-nexus';
  const { secondsA, secondsB, setActive, active } = useTimer(game.finished);

  useEffect(() => {
    const stored = localStorage.getItem('game');
    if (stored) {
      setGame(JSON.parse(stored));
    } else {
      const randomGame: Game = {
        ...defaultGame,
        deck: deck,
        deployment:
          deploymentIds[deck][
            getRandomNumber(0, deploymentIds[deck].length - 1)
          ],
        primaryMission:
          primaryMissionIds[deck][
            getRandomNumber(0, primaryMissionIds[deck].length - 1)
          ],
        missionRule:
          missionRules[deck][getRandomNumber(0, missionRules[deck].length - 1)],
        terrainLayout:
          terrainLayoutIds[deck][
            getRandomNumber(0, terrainLayoutIds[deck].length - 1)
          ],
      };
      setGame(randomGame);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (game.deployment) localStorage.setItem('game', JSON.stringify(game));
  }, [game]);

  const nextTurn = (player: PlayerId) => {
    const commandPointsPlayerA = game.playerA.commandPoints;
    const commandPointsPlayerB = game.playerB.commandPoints;
    const opponent = player === 'A' ? 'B' : 'A';
    if (game.turn === 0) {
      setGame({
        ...game,
        turn: 1,
        phase: 'top',
        playerPlaying: player,
        playerA: {
          ...game.playerA,
          commandPoints:
            commandPointsPlayerA +
            1 +
            (player === 'A' && game.playerA.warlord ? 1 : 0),
        },
        playerB: {
          ...game.playerB,
          commandPoints:
            commandPointsPlayerB +
            1 +
            (player === 'B' && game.playerB.warlord ? 1 : 0),
        },
      });
      setActive(player);
    } else if (game.turn === 5 && game.phase === 'bottom') {
      setGame({ ...game, finished: true });
    } else {
      setGame({
        ...game,
        turn: game.phase === 'bottom' ? ((game.turn + 1) as Rating) : game.turn,
        phase: game.phase === 'top' ? 'bottom' : 'top',
        playerPlaying: player,
        [`player${player}`]: {
          ...game[`player${player}`],
          commandPoints:
            game[`player${player}`].commandPoints +
            1 +
            (game[`player${player}`].warlord ? 1 : 0),
          missionPoints: [
            ...game[`player${player}`].missionPoints,
            {
              A: 0,
              B: 0,
              P: 0,
            },
          ],
        },
        [`player${opponent}`]: {
          ...game[`player${opponent}`],
          commandPoints: game[`player${player}`].commandPoints + 1,
        },
      });
      setActive(player);
    }
  };

  const changeDataPlayer = (playerObj: Partial<Player>, id: PlayerId) => {
    setGame((prev) => ({
      ...prev,
      [`player${id}`]: { ...prev[`player${id}`], ...playerObj },
    }));
  };

  const changeGameConfig = (key: string, value: string) => {
    setGame((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <GameContext.Provider
      value={{
        game,
        playerA: game.playerA,
        playerB: game.playerB,
        nextTurn,
        secondsA,
        secondsB,
        setActive,
        active,
        changeGameConfig,
        changeDataPlayer,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
