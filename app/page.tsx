export default function Home() {
  return (
    <div>
      <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Bem-vindo ao <span className="text-primary">daisyUI</span> Next.js
          </h1>
          <p className="text-xl text-base-content/70 mb-8">
            Sistema completo com suporte a 35 temas incríveis do daisyUI
          </p>
          <a href="/settings" className="btn btn-primary btn-lg">
            Escolha um Tema →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">🎨 35 Temas</h2>
              <p>
                Escolha entre 35 temas diferentes do daisyUI, desde tons claros até paletas escuras e vibrantes.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">⚡ Rápido</h2>
              <p>
                Tema Next.js 16 com Turbopack para desenvolvimento ultra rápido e build otimizado.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">💾 Persistente</h2>
              <p>
                Sua escolha de tema é salva automaticamente e restaurada na próxima visita.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Componentes daisyUI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Botões</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-accent">Accent</button>
                  <button className="btn btn-ghost">Ghost</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-primary">Primary</div>
                  <div className="badge badge-secondary">Secondary</div>
                  <div className="badge badge-accent">Accent</div>
                  <div className="badge badge-success">Success</div>
                  <div className="badge badge-warning">Warning</div>
                  <div className="badge badge-error">Error</div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Progress Bars</h3>
                <progress className="progress progress-primary w-full" value="45" max="100"></progress>
                <progress className="progress progress-secondary w-full" value="65" max="100"></progress>
                <progress className="progress progress-accent w-full" value="85" max="100"></progress>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Stats</h3>
                <div className="flex gap-4">
                  <div className="stat">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value">31K</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Users</div>
                    <div className="stat-value">4,200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Personalize o Sistema</h2>
            <p>
              Visite a página de configurações para explorar todos os 35 temas disponíveis e escolher o que mais combina com você!
            </p>
            <div className="card-actions justify-center">
              <a href="/settings" className="btn btn-ghost">
                Ir para Configurações
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}

