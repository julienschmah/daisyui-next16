'use client';

import { useTheme, themes } from '@/app/providers';

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
            <h2 className="text-lg text-primary font-semibold mb-4">{category}</h2>
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
                    <div className="font-semibold text-sm">{themeItem.label}</div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-3 h-3 rounded bg-primary"></div>
                      <div className="w-3 h-3 rounded bg-secondary"></div>
                      <div className="w-3 h-3 rounded bg-accent"></div>
                    </div>
                  </div>
                  {theme === themeItem.name && (
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
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
