'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSettings = pathname?.startsWith('/settings');

  if (isSettings) {
    return (
      <div className="flex min-h-screen bg-base-100">
        {children}
      </div>
    );
  }

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
      </div>
      <Sidebar />
    </div>
  );
}
