'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal } from '@/app/components/UI';

export function DashboardSettings() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
      <Header
        title="Dashboard"
        subtitle="Visão geral e resumo do seu sistema"
        icon="📊"
        action={
          <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
            Ver Detalhes
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Estatísticas" icon="📊" shadow="lg">
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
        </Card>

        <Card title="Status" icon="🎯" shadow="lg">
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
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20">
        <h3 className="font-bold text-lg text-primary mb-2">✨ Bem-vindo!</h3>
        <p className="text-base-content/70">
          Este é o painel de controle do seu sistema. Aqui você pode visualizar estatísticas gerais e acessar todas as configurações através do menu lateral.
        </p>
      </Card>

      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Detalhes do Sistema"
        icon="ℹ️"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-primary mb-2">Versão do Sistema</h4>
            <p className="text-sm text-base-content/70">Next.js 16.0.1 com Tailwind CSS e daisyUI</p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-2">Recursos Disponíveis</h4>
            <ul className="text-sm text-base-content/70 list-disc list-inside space-y-1">
              <li>35 Temas integrados</li>
              <li>5 Módulos configuráveis</li>
              <li>Sidebar responsiva</li>
              <li>UI Kit completo</li>
              <li>Modal customizável</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-2">Armazenamento</h4>
            <p className="text-sm text-base-content/70">Tema selecionado salvo em localStorage</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
