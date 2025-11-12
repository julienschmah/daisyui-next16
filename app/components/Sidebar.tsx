'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Text } from './UI';
import { Home, Settings, BookOpen, Github, Trello } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li className="menu-title">
          <Text variant="label" weight="bold" size="sm">Menu Principal</Text>
        </li>
        <li>
          <Link href="/" className={isActive('/') ? 'active' : ''}>
            <Home size={20} />
            <Text variant="label" weight="semibold">Home</Text>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={isActive('/settings') ? 'active' : ''}>
            <Settings size={20} />
            <Text variant="label" weight="semibold">Configurações</Text>
          </Link>
        </li>
        <li>
          <Link href="/pipelines" className={isActive('/pipelines') ? 'active' : ''}>
            <Trello size={20} />
            <Text variant="label" weight="semibold">Esteiras</Text>
          </Link>
        </li>
        
        <li className="menu-title mt-8">
          <Text variant="label" weight="bold" size="sm">Navegação</Text>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2">
            <BookOpen size={20} />
            <Text variant="label" weight="semibold">Documentação</Text>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2">
            <Github size={20} />
            <Text variant="label" weight="semibold">GitHub</Text>
          </a>
        </li>
      </ul>
    </aside>
  );
}
