'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';
import { Button } from '@/components/ui';
import { ThemeDropdown } from './ThemeDropdown';
import { Menu } from 'lucide-react';
import { useUserStore } from '@/store';

export function Navbar() {
  const { theme, changeTheme, mounted } = useTheme();
  const { user, isAuthenticated, logout } = useUserStore();

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

        {mounted && isAuthenticated && user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Avatar" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-menu menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link href="/cliente/pedidos" className="justify-between">
                  Meus Pedidos
                  <span className="badge badge-sm badge-primary">Novo</span>
                </Link>
              </li>
              <li>
                <Link href="/meus-agendamentos" className="justify-between">
                  Meus Agendamentos
                </Link>
              </li>
              <li><Link href="/historico">Histórico</Link></li>
              <li><Link href="/perfil">Perfil</Link></li>
              <div className="divider my-0"></div>
              <li><button onClick={logout} className="text-error">Sair</button></li>
            </ul>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
