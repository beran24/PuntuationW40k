'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import type { Game, PlayerId, Rating } from '@/types/Game';
import type { Player } from '@/types/Player';
import useTimer from '../hooks/useTimer';
import { primaryMissions } from '../app/constants/primaryMissions';
import { missionRules } from '../app/constants/missionRules';
import { deployments } from '../app/constants/deployments';
import { getRandomNumber } from '../app/constants/randomNumber';
import { terrainLayouts } from '../app/constants/terrainLayouts';

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
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(defaultGame);
  const { secondsA, secondsB, setActive, active } = useTimer(game.finished);

  useEffect(() => {
    const stored = localStorage.getItem('game');
    if (stored) {
      setGame(JSON.parse(stored));
    } else {
      const randomGame: Game = {
        ...defaultGame,
        deployment: deployments[getRandomNumber(0, deployments.length - 1)].id,
        primaryMission:
          primaryMissions[getRandomNumber(0, primaryMissions.length - 1)].id,
        missionRule:
          missionRules[getRandomNumber(0, missionRules.length - 1)].id,
        terrainLayout:
          terrainLayouts[getRandomNumber(0, terrainLayouts.length - 1)].id,
      };
      setGame(randomGame);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('game', JSON.stringify(game));
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
