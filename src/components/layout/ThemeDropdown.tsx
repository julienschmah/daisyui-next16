'use client';

import { useState, useEffect } from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';

const DAISY_UI_THEMES = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
    'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black',
    'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade',
    'night', 'coffee', 'winter', 'dim', 'nord', 'sunset',
];

export function ThemeDropdown() {
    const [currentTheme, setCurrentTheme] = useState<string>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme') || 'light';
        setCurrentTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    const changeTheme = (theme: string) => {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setCurrentTheme(theme);
        // Close dropdown after selection (optional, handled by daisyUI focus loss usually)
        const elem = document.activeElement as HTMLElement;
        if (elem) {
            elem.blur();
        }
    };

    if (!mounted) return null;

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
                <Palette size={20} />
                <span className="hidden md:inline">Tema</span>
                <ChevronDown size={16} />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-200 rounded-box w-56 max-h-96 overflow-y-auto flex flex-col gap-2">
                {DAISY_UI_THEMES.map((theme) => (
                    <li key={theme}>
                        <button
                            className={`btn btn-sm btn-block justify-between font-medium ${currentTheme === theme ? 'ring-2 ring-primary ring-offset-2' : ''
                                }`}
                            onClick={() => changeTheme(theme)}
                            data-theme={theme}
                        >
                            <span className="capitalize">{theme}</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                                <div className="w-2 h-2 rounded-full bg-accent" />
                                <div className="w-2 h-2 rounded-full bg-neutral" />
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
