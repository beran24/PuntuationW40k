'use client';
import Link from 'next/link';

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-white text-center header">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">HammerTime</h1>
      <p className="text-lg md:text-xl max-w-xl mb-6">
        Controla tus partidas de <strong>Warhammer 40K</strong> con un marcador
        táctico que te ayuda a gestionar <strong>Puntos de commando</strong>,
        misiones y <strong>turnos</strong>. Todo desde una sola app.
      </p>
      <Link
        href="/scoreboard"
        className="bg-custom-green hover:bg-custom-light-green text-white px-6 py-3 rounded text-lg transition"
      >
        Entrar al marcador
      </Link>
      <p className="text-sm mt-4 opacity-60">App gratuita y sin registros.</p>
    </main>
  );
}
