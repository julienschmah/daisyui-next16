'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal, Text, Badge } from '@/app/components/UI';

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
              <Text>Temas Ativos:</Text>
              <Text weight="bold" color="primary">35</Text>
            </div>
            <div className="flex justify-between">
              <Text>Módulos:</Text>
              <Text weight="bold" color="primary">5</Text>
            </div>
            <div className="flex justify-between">
              <Text>Configurações:</Text>
              <Text weight="bold" color="primary">Ativas</Text>
            </div>
          </div>
        </Card>

        <Card title="Status" icon="🎯" shadow="lg">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Text>Sistema:</Text>
              <Badge variant="success">Operacional</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Text>Tema:</Text>
              <Badge variant="primary">Definido</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Text>Sincronização:</Text>
              <Badge variant="info">Ativa</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20">
        <Text variant="label" weight="bold" size="lg" color="primary" className="mb-2 block">✨ Bem-vindo!</Text>
        <Text variant="subtitle">
          Este é o painel de controle do seu sistema. Aqui você pode visualizar estatísticas gerais e acessar todas as configurações através do menu lateral.
        </Text>
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
            <Text variant="label" color="primary" className="mb-2 block">Versão do Sistema</Text>
            <Text variant="subtitle" size="sm">Next.js 16.0.1 com Tailwind CSS e daisyUI</Text>
          </div>
          <div>
            <Text variant="label" color="primary" className="mb-2 block">Recursos Disponíveis</Text>
            <ul className="text-sm text-base-content/70 list-disc list-inside space-y-1">
              <li>35 Temas integrados</li>
              <li>5 Módulos configuráveis</li>
              <li>Sidebar responsiva</li>
              <li>UI Kit completo</li>
              <li>Modal customizável</li>
            </ul>
          </div>
          <div>
            <Text variant="label" color="primary" className="mb-2 block">Armazenamento</Text>
            <Text variant="subtitle" size="sm">Tema selecionado salvo em localStorage</Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}
