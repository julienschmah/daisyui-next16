import React from 'react';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Navbar Pública */}
      <nav className="navbar bg-base-200 border-b border-base-300 sticky top-0 z-40">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            🔧 ServiceHub
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Buscar serviços..."
              className="input input-bordered input-sm w-64"
            />
          </div>
          <Link href="/login" className="btn btn-primary btn-sm">
            Entrar
          </Link>
          <Link href="/signup" className="btn btn-secondary btn-sm">
            Cadastro
          </Link>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="flex-1 container mx-auto p-4">
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
