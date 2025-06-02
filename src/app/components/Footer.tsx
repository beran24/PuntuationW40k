'use client';

import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useGame } from '@/components/providers/GameContext';
import { PlayerId } from '@/components/lib/types/Game';

dayjs.extend(duration);

export default function Footer() {
  const {
    game,
    playerA,
    playerB,
    secondsA,
    secondsB,
    setActive,
    active,
    changeDataPlayer,
  } = useGame();

  const format = (s: number) => dayjs.duration(s, 'seconds').format('HH:mm:ss');

  const toggle = (which: PlayerId) => {
    setActive((prev) => (prev === which ? null : which));
  };

  const totalA = playerA?.missionPoints.reduce(
    (sum, m) => sum + m.A + m.B + m.P,
    0
  );
  const totalB = playerB?.missionPoints.reduce(
    (sum, m) => sum + m.A + m.B + m.P,
    0
  );

  const onHandleCommandPoints = (type: '+' | '-', player: PlayerId) => {
    const playerCommandPoints = game[`player${player}`].commandPoints;
    if (type === '+') {
      changeDataPlayer({ commandPoints: playerCommandPoints + 1 }, player);
    }
    if (type === '-' && playerCommandPoints > 0) {
      changeDataPlayer({ commandPoints: playerCommandPoints - 1 }, player);
    }
  };

  return (
    <footer className="text-white h-16   flex">
      {/* Timer A */}
      <div className="bg-custom-red flex items-center gap-4 w-1/2 justify-end px-3">
        <label className="flex items-center space-x-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={playerA.warlord}
            onChange={(e) =>
              changeDataPlayer({ warlord: e.target.checked }, 'A')
            }
            className="form-checkbox h-5 w-5 text-white accent-custom-button-red"
          />
          <span>WL+CP</span>
        </label>
        <div className="flex items-center">
          <div className="px-2 py-2 bg-custom-button-red rounded-l min-w-10 text-center">
            {playerA.commandPoints}
          </div>
          <div className="flex flex-col ">
            <button
              className="h-5 w-[40px] bg-custom-button-red rounded-tr hover:bg-custom-light-red text-sm"
              onClick={() => onHandleCommandPoints('+', 'A')}
            >
              +
            </button>
            <button
              className="h-5 w-[40px] bg-custom-button-red rounded-br hover:bg-custom-light-red text-sm"
              onClick={() => onHandleCommandPoints('-', 'A')}
            >
              -
            </button>
          </div>
        </div>
        <div className="px-4 py-2 bg-custom-button-red rounded min-w-15 text-center">
          {totalA}
        </div>
        <p className="text-4xl font-mono hidden sm:block">{format(secondsA)}</p>
        <button
          className="px-4 py-2 bg-custom-button-red rounded hover:bg-custom-light-red w-[80px]"
          onClick={() => toggle('A')}
        >
          {active === 'A' ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Timer B */}
      <div className="flex items-center gap-4 flex-row-reverse w-1/2 justify-end bg-custom-green px-3">
        <label className="flex items-center space-x-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={playerB.warlord}
            onChange={(e) =>
              changeDataPlayer({ warlord: e.target.checked }, 'B')
            }
            className="form-checkbox h-5 w-5 text-white accent-custom-button-green"
          />
          <span>WL+CP</span>
        </label>
        <div className="flex items-center">
          <div className="flex flex-col ">
            <button
              className="h-5 w-[40px] bg-custom-button-green rounded-tl hover:bg-custom-light-green text-sm"
              onClick={() => onHandleCommandPoints('+', 'B')}
            >
              +
            </button>
            <button
              className="h-5 w-[40px] bg-custom-button-green rounded-bl hover:bg-custom-light-green text-sm"
              onClick={() => onHandleCommandPoints('-', 'B')}
            >
              -
            </button>
          </div>
          <div className="px-2 py-2 bg-custom-button-green rounded-r min-w-10 text-center">
            {playerB.commandPoints}
          </div>
        </div>
        <div className="px-4 py-2 bg-custom-button-green rounded min-w-15 text-center">
          {totalB}
        </div>
        <p className="text-4xl font-mono hidden sm:block">{format(secondsB)}</p>
        <button
          className="px-4 py-2 bg-custom-button-green rounded hover:bg-custom-light-green w-[80px]"
          onClick={() => toggle('B')}
        >
          {active === 'B' ? 'Pause' : 'Play'}
        </button>
      </div>
    </footer>
  );
}
