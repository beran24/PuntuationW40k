'use client';
import Link from 'next/link';

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-white text-center header">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">HammerTime</h1>
      <p className="text-lg md:text-xl max-w-xl mb-6">
        Control your <strong>Warhammer 40K</strong> games with a tactical
        scoreboard that helps to create a game and manage
        <strong> Command Points, secondary missions, turns and points</strong> —
        all in one app.
      </p>
      <Link
        href="/scoreboard"
        className="bg-custom-green hover:bg-custom-light-green text-white px-6 py-3 rounded text-lg transition"
      >
        Pariah nexus game
      </Link>
      <p className="text-sm mt-4 opacity-60">Free app</p>
    </main>
  );
}
