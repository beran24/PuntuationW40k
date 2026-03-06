'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './components/common/LanguageSwitcher';

export default function Landing() {
  const t = useTranslations('dashboard');

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <header className="flex header justify-between items-center px-4 md:px-8 py-4">
        <nav className="flex flex-wrap gap-3">
          <Link
            href="/datasheets/tyranids"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Tyranids
          </Link>
          <Link
            href="/datasheets/world-eaters"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            World Eaters
          </Link>
          <Link
            href="/datasheets/space-marines"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Space Marines
          </Link>
          <Link
            href="/datasheets/dark-angels"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Dark Angels
          </Link>
          <Link
            href="/datasheets/black-templars"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Black Templars
          </Link>
          <Link
            href="/datasheets/deathwatch"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Deathwatch
          </Link>
          <Link
            href="/datasheets/space-wolves"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Space Wolves
          </Link>
          <Link
            href="/datasheets/blood-angels"
            className="bg-custom-green hover:bg-custom-light-green text-white px-3 py-2 rounded text-sm transition"
          >
            Blood Angels
          </Link>
        </nav>
        <LanguageSwitcher />
      </header>
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-white text-center header">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg md:text-xl max-w-xl mb-6">
          {t.rich('subtitle', {
            text: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <div className="gap-4 flex flex-row">
          <Link
            href="/scoreboard?deck=pariah-nexus"
            className="bg-custom-green hover:bg-custom-light-green text-white px-6 py-3 rounded text-lg transition"
          >
            {t('pariah_nexus_game')}
          </Link>
          <Link
            href="/scoreboard?deck=chapter-approved"
            className="bg-custom-green hover:bg-custom-light-green text-white px-6 py-3 rounded text-lg transition"
          >
            {t('chapter_aproved_game')}
          </Link>
        </div>
        <p className="text-sm mt-4 opacity-60">Free app</p>
      </main>
    </>
  );
}
