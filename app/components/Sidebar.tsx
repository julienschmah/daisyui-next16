'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li className="menu-title">
          <span>Menu Principal</span>
        </li>
        <li>
          <Link href="/" className={isActive('/') ? 'active' : ''}>
            🏠 Home
          </Link>
        </li>
        <li>
          <Link href="/settings" className={isActive('/settings') ? 'active' : ''}>
            ⚙️ Configurações
          </Link>
        </li>
        
        <li className="menu-title mt-8">
          <span>Navegação</span>
        </li>
        <li>
          <a href="#">📖 Documentação</a>
        </li>
        <li>
          <a href="#">🐙 GitHub</a>
        </li>
      </ul>
    </aside>
  );
}
