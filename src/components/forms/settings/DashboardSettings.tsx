'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal, Typography, Badge } from '@/components/ui';

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
              <Typography>Temas Ativos:</Typography>
              <Typography weight="bold" color="primary">35</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Módulos:</Typography>
              <Typography weight="bold" color="primary">5</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Configurações:</Typography>
              <Typography weight="bold" color="primary">Ativas</Typography>
            </div>
          </div>
        </Card>

        <Card title="Status" icon="🎯" shadow="lg">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Typography>Sistema:</Typography>
              <Badge variant="success">Operacional</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Typography>Tema:</Typography>
              <Badge variant="primary">Definido</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Typography>Sincronização:</Typography>
              <Badge variant="info">Ativa</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20">
        <Typography variant="label" weight="bold" size="lg" color="primary" className="mb-2 block">✨ Bem-vindo!</Typography>
        <Typography variant="subtitle">
          Este é o painel de controle do seu sistema. Aqui você pode visualizar estatísticas gerais e acessar todas as configurações através do menu lateral.
        </Typography>
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
            <Typography variant="label" color="primary" className="mb-2 block">Versão do Sistema</Typography>
            <Typography variant="subtitle" size="sm">Next.js 16.0.1 com Tailwind CSS e daisyUI</Typography>
          </div>
          <div>
            <Typography variant="label" color="primary" className="mb-2 block">Recursos Disponíveis</Typography>
            <ul className="text-sm text-base-content/70 list-disc list-inside space-y-1">
              <li>35 Temas integrados</li>
              <li>5 Módulos configuráveis</li>
              <li>Sidebar responsiva</li>
              <li>UI Kit completo</li>
              <li>Modal customizável</li>
            </ul>
          </div>
          <div>
            <Typography variant="label" color="primary" className="mb-2 block">Armazenamento</Typography>
            <Typography variant="subtitle" size="sm">Tema selecionado salvo em localStorage</Typography>
          </div>
        </div>
      </Modal>
    </div>
  );
}
