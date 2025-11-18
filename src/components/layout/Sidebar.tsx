'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  UserCheck,
  Briefcase,
  ShoppingCart,
  CreditCard,
  Star,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const isAdmin = pathname.startsWith('/admin');
  const isPrestador = pathname.startsWith('/prestador');

  const mainMenu = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Pipelines', href: '/pipelines', icon: null },
    { name: 'Configurações', href: '/settings', icon: null },
  ];

  const adminMenu = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
    { name: 'Profissionais', href: '/admin/profissionais', icon: UserCheck },
    { name: 'Clientes', href: '/admin/clientes', icon: Users },
    { name: 'Serviços', href: '/admin/servicos', icon: Briefcase },
    { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
    { name: 'Pagamentos', href: '/admin/pagamentos', icon: CreditCard },
    { name: 'Avaliações', href: '/admin/avaliacoes', icon: Star },
  ];

  const prestadorMenu = [
    { name: 'Dashboard', href: '/prestador/dashboard', icon: LayoutGrid },
    { name: 'Meus Serviços', href: '/prestador/meus-servicos', icon: Briefcase },
    { name: 'Meus Pedidos', href: '/prestador/meus-pedidos', icon: ShoppingCart },
    { name: 'Meus Ganhos', href: '/prestador/meus-ganhos', icon: TrendingUp },
    { name: 'Minhas Avaliações', href: '/prestador/minhas-avaliacoes', icon: Star },
  ];

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
        {/* Main Menu */}
        {!isAdmin && !isPrestador && mainMenu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
            >
              {item.name}
            </Link>
          </li>
        ))}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <li className="menu-title">
              <span className="text-sm font-semibold">👨‍💼 Admin Master</span>
            </li>
            {adminMenu.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? 'active' : ''}
                  >
                    {Icon && <Icon size={18} />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </>
        )}

        {/* Prestador Section */}
        {isPrestador && (
          <>
            <li className="menu-title">
              <span className="text-sm font-semibold">🔧 Meu Painel</span>
            </li>
            {prestadorMenu.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? 'active' : ''}
                  >
                    {Icon && <Icon size={18} />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
