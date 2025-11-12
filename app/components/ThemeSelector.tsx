'use client';

import { useTheme, themes } from '@/app/providers';
import { Text } from './UI';
import { Check } from 'lucide-react';

export function ThemeSelector() {
  const { theme, changeTheme, mounted } = useTheme();

  if (!mounted) return null;

  const groupedThemes = themes.reduce(
    (acc, themeItem) => {
      const category = themeItem.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(themeItem);
      return acc;
    },
    {} as Record<string, typeof themes>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-8">
        {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
          <div key={category}>
            <Text variant="label" size="lg" weight="bold" color="primary" className="mb-4 block">
              {category}
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryThemes.map((themeItem) => (
                <button
                  key={themeItem.name}
                  onClick={() => changeTheme(themeItem.name)}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    theme === themeItem.name
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-base-300 hover:border-base-content'
                  }`}
                  data-theme={themeItem.name}
                >
                  <div className="text-left">
                    <Text variant="label" size="sm" weight="semibold">{themeItem.label}</Text>
                    <div className="flex gap-1 mt-2">
                      <div className="w-3 h-3 rounded bg-primary"></div>
                      <div className="w-3 h-3 rounded bg-secondary"></div>
                      <div className="w-3 h-3 rounded bg-accent"></div>
                    </div>
                  </div>
                  {theme === themeItem.name && (
                    <div className="absolute top-2 right-2">
                      <Check size={20} className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
