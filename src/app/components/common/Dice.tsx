import React, { useRef } from 'react';
import type { DiceProps } from '@/types/DiceProps';

export default function Dice({ onHandleClickDice }: DiceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    onHandleClickDice();
  };

  return (
    <div>
      {/* Video estático con un poster (imagen del dado) */}
      <video
        ref={videoRef}
        src="/vids/dice_roll.webm"
        width={100}
        loop={false}
        muted
        playsInline
        poster="/img/dice/dice.svg" // Imagen estática del dado
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}
