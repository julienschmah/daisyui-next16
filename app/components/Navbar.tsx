'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';

export function Navbar() {
  const { theme, changeTheme, mounted } = useTheme();

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          🎨 daisyUI
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/settings">Configurações</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          title={`Tema atual: ${theme}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <Link href="/settings" className="btn btn-primary">
          Temas
        </Link>
      </div>
    </div>
  );
}
