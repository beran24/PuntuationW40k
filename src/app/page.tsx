'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import Missions from './components/Missions';
import { useGame } from '../providers/GameContext';
import ConfigGame from './components/ConfigGame';

export default function Home() {
  const { game } = useGame();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {game.turn ? <Missions /> : <ConfigGame />}
      <Footer />
    </div>
  );
}
