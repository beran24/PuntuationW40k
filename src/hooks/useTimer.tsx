import { useEffect, useState } from 'react';
import { PlayerId } from '../lib/types/Game';

export default function useTimer(finished: boolean) {
  const [active, setActive] = useState<PlayerId | null>(null);
  const [secondsA, setSecondsA] = useState(0);
  const [secondsB, setSecondsB] = useState(0);

  useEffect(() => {
    if (finished) setActive(null);
  }, [finished]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (active === 'A') setSecondsA((s) => s + 1);
      if (active === 'B') setSecondsB((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);
  return { secondsA, secondsB, setActive, active };
}
