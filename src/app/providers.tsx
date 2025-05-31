'use client';

import { ReactNode } from 'react';
import { GameProvider } from '@/providers/GameContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
