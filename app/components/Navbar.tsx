'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';
import { Button, Text } from './UI';
import { Menu } from 'lucide-react';

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
        <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button lg:hidden">
          <Menu size={20} />
        </label>
        <Link href="/" className="btn btn-ghost text-xl">
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🎨 daisyUI
          </span>
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">
              <Text variant="label" size="base">Home</Text>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <Text variant="label" size="base">Configurações</Text>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <Button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          title={`Tema atual: ${theme}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
        <Link href="/settings">
          <Button variant="primary">Temas</Button>
        </Link>
      </div>
    </div>
  );
}
