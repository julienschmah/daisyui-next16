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
       
      </div>
    </div>
  );
}
