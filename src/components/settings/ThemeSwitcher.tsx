'use client';

import { useState, useEffect } from 'react';
import { Card, Badge } from '@/components/ui';
import { Palette, Check, Monitor } from 'lucide-react';

const DAISY_UI_THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

interface ThemeSwitcherProps {
  onThemeChange?: (theme: string) => void;
  userId?: string;
}

export function ThemeSwitcher({ onThemeChange, userId }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<string>('light');
  const [mounted, setMounted] = useState(false);

  const getStorageKey = () => {
    // Se tiver userId, salva por usuário. Senão, salva globalmente
    return userId ? `theme_${userId}` : 'theme';
  };

  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage
    const saved = localStorage.getItem(getStorageKey()) || 'light';
    setCurrentTheme(saved);
    applyTheme(saved);
  }, [userId]);

  const applyTheme = (theme: string) => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem(getStorageKey(), theme);
    setCurrentTheme(theme);
    onThemeChange?.(theme);
  };


  if (!mounted) {
    return (
      <Card title="Tema" icon={<Palette className="text-primary" size={24} />} shadow="sm">
        <div className="space-y-4">
          <div className="h-12 bg-base-200 rounded animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-base-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Cores - Tema do Sistema" icon={<Palette className="text-primary" size={24} />} shadow="sm">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-base-content/70">
            Escolha o tema que define as cores de todo o sistema
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-base-content mb-4 flex items-center gap-2">
            <Monitor size={18} />
            Seleção de Tema
          </h4>
          <p className="text-xs text-base-content/60 mb-4">
            Escolha um tema para personalizar as cores e aparência de toda sua experiência. Sua seleção será salva automaticamente em seu navegador.
          </p>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {DAISY_UI_THEMES.map((theme) => (
              <button
                key={theme}
                onClick={() => applyTheme(theme)}
                className={`relative p-3 rounded-lg transition-all border-2 flex flex-col items-center justify-center gap-1 text-xs font-medium ${
                  currentTheme === theme
                    ? 'border-primary bg-primary/10'
                    : 'border-base-300 hover:border-primary/50'
                }`}
                data-theme={theme}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="capitalize text-xs">{theme}</span>
                {currentTheme === theme && (
                  <Check size={14} className="absolute top-1 right-1 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="divider my-4" />

        <div>
          <h4 className="font-semibold text-base-content mb-3">🎨 Temas Diversos</h4>
          <p className="text-xs text-base-content/60 mb-4">
            Escolha entre 35 temas diferentes, desde tons claros até paletas vibrantes. Cada tema oferece uma experiência visual única.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-4 bg-primary text-primary-content rounded-lg text-center text-sm font-semibold">
              Primário
            </div>
            <div className="p-4 bg-secondary text-secondary-content rounded-lg text-center text-sm font-semibold">
              Secundário
            </div>
            <div className="p-4 bg-accent text-accent-content rounded-lg text-center text-sm font-semibold">
              Destaque
            </div>
            <div className="p-4 bg-success text-success-content rounded-lg text-center text-sm font-semibold">
              Sucesso
            </div>
            <div className="p-4 bg-warning text-warning-content rounded-lg text-center text-sm font-semibold">
              Aviso
            </div>
            <div className="p-4 bg-error text-error-content rounded-lg text-center text-sm font-semibold">
              Erro
            </div>
          </div>
        </div>

        <div className="divider my-4" />

        <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
          <Monitor size={18} className="text-info flex-shrink-0" />
          <span className="text-sm text-base-content/70">
            Sua escolha de tema é salva automaticamente no armazenamento local e restaurada quando você retorna.
          </span>
        </div>
      </div>
    </Card>
  );
}
