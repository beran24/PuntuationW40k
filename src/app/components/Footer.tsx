'use client';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useGame } from '@/components/providers/GameContext';
import { PlayerId } from '@/components/lib/types/Game';

dayjs.extend(duration);

export default function Footer() {
  const { game, playerA, playerB, secondsA, secondsB, setActive, active } =
    useGame();

  const format = (s: number) => dayjs.duration(s, 'seconds').format('HH:mm:ss');

  const toggle = (which: PlayerId) => {
    setActive((prev) => (prev === which ? null : which));
  };

  return (
    <footer className="text-white h-16   flex">
      {/* Timer A */}
      <div className="bg-custom-red flex items-center gap-4 w-1/2 justify-end px-3">
        <div className="px-4 py-2 bg-custom-button-red rounded min-w-15 text-center">
          {playerA?.points}
        </div>
        <p className="text-4xl font-mono">{format(secondsA)}</p>
        <button
          className="px-4 py-2 bg-custom-button-red rounded hover:bg-custom-light-red w-[80px]"
          onClick={() => toggle('A')}
        >
          {active === 'A' ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Timer B */}
      <div className="flex items-center gap-4 flex-row-reverse w-1/2 justify-end bg-custom-green px-3">
        <div className="px-4 py-2 bg-custom-button-green rounded min-w-15 text-center">
          {playerB?.points}
        </div>
        <p className="text-4xl font-mono">{format(secondsB)}</p>
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
