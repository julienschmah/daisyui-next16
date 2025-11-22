'use client';

import { useEffect, useState } from 'react';

export function ThemeSelector() {
  const [theme, setTheme] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  const themes = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'cupcake', name: 'Cupcake' },
    { id: 'bumblebee', name: 'Bumblebee' },
    { id: 'emerald', name: 'Emerald' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'synthwave', name: 'Synthwave' },
    { id: 'retro', name: 'Retro' },
    { id: 'cyberpunk', name: 'Cyberpunk' },
    { id: 'valentine', name: 'Valentine' },
    { id: 'halloween', name: 'Halloween' },
    { id: 'garden', name: 'Garden' },
    { id: 'forest', name: 'Forest' },
    { id: 'aqua', name: 'Aqua' },
    { id: 'lofi', name: 'Lofi' },
    { id: 'pastel', name: 'Pastel' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'wireframe', name: 'Wireframe' },
    { id: 'black', name: 'Black' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'dracula', name: 'Dracula' },
    { id: 'cmyk', name: 'CMYK' },
    { id: 'autumn', name: 'Autumn' },
    { id: 'business', name: 'Business' },
    { id: 'acid', name: 'Acid' },
    { id: 'lemonade', name: 'Lemonade' },
    { id: 'night', name: 'Night' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'winter', name: 'Winter' },
    { id: 'dim', name: 'Dim' },
    { id: 'nord', name: 'Nord' },
    { id: 'sunset', name: 'Sunset' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleThemeChange(t.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === t.id
                ? 'bg-primary text-primary-content ring-2 ring-primary'
                : 'bg-base-200 text-base-content hover:bg-base-300'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
