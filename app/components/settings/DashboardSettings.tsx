'use client';

export function DashboardSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-base-content/70">Visão geral e resumo do seu sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">📊 Estatísticas</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Temas Ativos:</span>
                <span className="font-bold text-primary">35</span>
              </div>
              <div className="flex justify-between">
                <span>Módulos:</span>
                <span className="font-bold text-primary">5</span>
              </div>
              <div className="flex justify-between">
                <span>Configurações:</span>
                <span className="font-bold text-primary">Ativas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">🎯 Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Sistema:</span>
                <span className="badge badge-success">Operacional</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tema:</span>
                <span className="badge badge-primary">Definido</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sincronização:</span>
                <span className="badge badge-info">Ativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="card-body">
          <h3 className="card-title">✨ Bem-vindo!</h3>
          <p className="text-base-content/70">
            Este é o painel de controle do seu sistema. Aqui você pode visualizar estatísticas gerais e acessar todas as configurações através do menu lateral.
          </p>
        </div>
      </div>
    </div>
  );
}
