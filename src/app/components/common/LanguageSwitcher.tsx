'use client';

import Selector from './Selector';
import { useRouter } from 'next/navigation';
import useCookies from '../../../hooks/useCookies';
export default function LanguageSwitcher() {
  const [lang, setLang] = useCookies('locale', 'en');
  const router = useRouter();

  const handleChange = (value: React.SetStateAction<string>) => {
    document.cookie = `locale=${value}; path=/`;
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Selector
        value={lang}
        options={[
          { id: 'en', name: '🇬🇧 EN' },
          { id: 'es', name: '🇪🇸 ES' },
        ]}
        onHandleChange={(value) => {
          handleChange(value);
          setLang(value);
        }}
      />
    </div>
  );
}
