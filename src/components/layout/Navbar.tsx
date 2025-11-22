'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';
import { Button } from '@/components/ui';
import { ThemeDropdown } from './ThemeDropdown';
import { Menu } from 'lucide-react';

export function Navbar() {
  const { theme, changeTheme, mounted } = useTheme();

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 md:px-8 h-20">
      <div className="navbar-start gap-4">
        <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button lg:hidden">
          <Menu size={24} />
        </label>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-base-content">ServiceHub</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex flex-1 max-w-2xl mx-auto justify-center">
        <Link href="/servicos" className="text-base-content/80 hover:text-primary font-medium transition-colors text-lg">
          Serviços
        </Link>
      </div>

      <div className="navbar-end gap-3">
        <ThemeDropdown />
        <Link href="/login">
          <Button variant="ghost" className="font-semibold">
            Entrar
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="primary" className="font-bold px-6">
            Cadastro
          </Button>
        </Link>
      </div>
    </div>
  );
}
