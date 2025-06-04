import { GameProvider } from '@/providers/GameContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GameProvider>{children}</GameProvider>;
}
