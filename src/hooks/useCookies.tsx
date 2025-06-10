import React, { useState, useEffect } from 'react';

export default function useCookie(key: string, initialValue: string) {
  const [cookie, setCookie] = useState(initialValue);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const match = document.cookie.match(new RegExp(`(^|; )${key}=([^;]*)`));
    if (match) setCookie(decodeURIComponent(match[2]));
  }, [key]);

  const updateCookie = (value: React.SetStateAction<string>) => {
    setCookie(value);
    document.cookie = `${key}=${encodeURIComponent(value as string)}; path=/`;
  };

  return [cookie, updateCookie] as const;
}
