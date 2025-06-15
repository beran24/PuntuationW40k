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
      <header className="flex header justify-end px-8 py-4">
        <LanguageSwitcher />
      </header>
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-white text-center header">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg md:text-xl max-w-xl mb-6">
          {t.rich('subtitle', {
            text: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <Link
          href="/scoreboard"
          className="bg-custom-green hover:bg-custom-light-green text-white px-6 py-3 rounded text-lg transition"
        >
          {t('pariah_nexus_game')}
        </Link>

        <p className="text-sm mt-4 opacity-60">Free app</p>
      </main>
    </>
  );
}
