import React from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Navbar />

      {/* Conteúdo */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-12">
        <aside>
          <p>© 2025 ServiceHub. Encontre profissionais confiáveis para qualquer serviço.</p>
        </aside>
      </footer>
    </div>
  );
}
