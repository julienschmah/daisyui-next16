'use client';

import React, { useEffect, useState } from 'react';

interface Theme {
  name: string;
  label: string;
  category: string;
}

const themes: Theme[] = [
  { name: 'light', label: 'Light', category: 'Light' },
  { name: 'dark', label: 'Dark', category: 'Dark' },
  { name: 'cupcake', label: 'Cupcake', category: 'Pastel' },
  { name: 'pastel', label: 'Pastel', category: 'Pastel' },
  { name: 'garden', label: 'Garden', category: 'Pastel' },
  { name: 'bumblebee', label: 'Bumblebee', category: 'Vibrant' },
  { name: 'emerald', label: 'Emerald', category: 'Vibrant' },
  { name: 'acid', label: 'Acid', category: 'Vibrant' },
  { name: 'lemonade', label: 'Lemonade', category: 'Vibrant' },
  { name: 'corporate', label: 'Corporate', category: 'Professional' },
  { name: 'business', label: 'Business', category: 'Professional' },
  { name: 'autumn', label: 'Autumn', category: 'Professional' },
  { name: 'winter', label: 'Winter', category: 'Professional' },
  { name: 'retro', label: 'Retro', category: 'Retro' },
  { name: 'lofi', label: 'Lo-Fi', category: 'Retro' },
  { name: 'wireframe', label: 'Wireframe', category: 'Retro' },
  { name: 'cyberpunk', label: 'Cyberpunk', category: 'Dark & Cool' },
  { name: 'noir', label: 'Noir', category: 'Dark & Cool' },
  { name: 'dracula', label: 'Dracula', category: 'Dark & Cool' },
  { name: 'night', label: 'Night', category: 'Dark & Cool' },
  { name: 'abyss', label: 'Abyss', category: 'Dark & Cool' },
  { name: 'nord', label: 'Nord', category: 'Dark & Cool' },
  { name: 'forest', label: 'Forest', category: 'Warm' },
  { name: 'luxury', label: 'Luxury', category: 'Warm' },
  { name: 'cafe', label: 'Café', category: 'Warm' },
  { name: 'sunset', label: 'Sunset', category: 'Warm' },
  { name: 'coffee', label: 'Coffee', category: 'Warm' },
  { name: 'fantasy', label: 'Fantasy', category: 'Fantasy' },
  { name: 'valentine', label: 'Valentine', category: 'Fantasy' },
  { name: 'halloween', label: 'Halloween', category: 'Fantasy' },
  { name: 'aqua', label: 'Aqua', category: 'Fantasy' },
  { name: 'synthwave', label: 'Synthwave', category: 'Fantasy' },
  { name: 'cmyk', label: 'CMYK', category: 'Modern' },
  { name: 'dim', label: 'Dim', category: 'Modern' },
  { name: 'silk', label: 'Silk', category: 'Modern' },
  { name: 'milky', label: 'Milky', category: 'Modern' },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

export function useTheme() {
  const [theme, setTheme] = useState<string>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, changeTheme, mounted, themes };
}

export { themes };
