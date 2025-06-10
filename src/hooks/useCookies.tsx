'use client';

export default function useCookies() {
  const getCookieLocale = (): string => {
    const match = window.document.cookie.match(/(^|;\s*)locale=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : 'en';
  };

  return { getCookieLocale };
}
