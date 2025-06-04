import { PlayerId } from '@/types/Game';
import { useGame } from '@/providers/GameContext';
import React, { useState } from 'react';

export default function Header({}) {
  const { game, playerA, playerB, nextTurn, changeDataPlayer } = useGame();
  const [showInput, setShowInput] = useState<PlayerId | null>();
  return (
    <header className="text-white p-4 header flex items-center justify-between h-16">
      <div className="flex-1 text-center flex flex-row justify-center">
        {showInput === 'A' ? (
          <input
            className="bg-custom-light-red mx-4 w-[100px] text-center"
            defaultValue={playerA.name}
            onBlur={(event) => {
              setShowInput(null);
              changeDataPlayer({ ...playerA, name: event.target.value }, 'A');
            }}
          />
        ) : (
          <div
            className="px-4 py-2 mx-4 w-[100px] font-bold"
            onClick={() => setShowInput('A')}
          >
            {playerA.name}
          </div>
        )}
        <button
          className="px-4 py-2 bg-custom-button-red rounded hover:bg-custom-light-red disabled:cursor-not-allowed disabled:bg-custom-disabled-bg disabled:text-custom-disabled-text"
          onClick={() => nextTurn('A')}
          disabled={
            game.playerPlaying === 'A' ||
            game.finished ||
            (game.playerPlaying === 'B' &&
              playerB?.missions?.length < game.turn)
          }
        >
          {!game.playerPlaying ? 'Start game' : 'Next Turn'}
        </button>
      </div>
      <div className="px-4 w-[200px] text-center font-bold">
        {game.finished ? 'Finished' : `Turn: ${game.turn} ${game.phase || ''}`}
      </div>
      <div className="flex-1 text-center flex flex-row-reverse justify-center">
        {showInput === 'B' ? (
          <input
            defaultValue={playerB.name}
            className="bg-custom-light-green mx-4 w-[100px] text-center"
            onBlur={(event) => {
              setShowInput(null);
              changeDataPlayer({ ...playerB, name: event.target.value }, 'B');
            }}
          />
        ) : (
          <div
            className="px-4 py-2 w-[100px] mx-4 font-bold"
            onClick={() => setShowInput('B')}
          >
            {playerB.name}
          </div>
        )}
        <button
          className="px-4 py-2 bg-custom-button-green rounded hover:bg-custom-light-green disabled:cursor-not-allowed disabled:bg-custom-disabled-bg disabled:text-custom-disabled-text"
          onClick={() => nextTurn('B')}
          disabled={
            game.playerPlaying === 'B' ||
            game.finished ||
            (game.playerPlaying === 'A' &&
              playerA?.missions?.length < game.turn)
          }
        >
          {!game.playerPlaying ? 'Start game' : 'Next Turn'}
        </button>
      </div>
    </header>
  );
}
