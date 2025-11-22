'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal, List, type ListItem, Typography, ToggleLeft, ToggleRight, Badge } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  enabled: boolean;
}

export function ModulesSettings() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'gestao-leads',
      name: 'Gestão de Leads',
      enabled: true,
    },
    {
      id: 'funivel-vendas',
      name: 'Funivel de Vendas',
      enabled: true,
    },
    {
      id: 'condominio',
      name: 'Condomínio',
      enabled: true,
    },
    {
      id: 'documentos',
      name: 'Documentos',
      enabled: true,
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    if (selectedModule) {
      setModules(
        modules.map((mod) =>
          mod.id === selectedModule ? { ...mod, enabled: !mod.enabled } : mod
        )
      );
    }
    setShowConfirm(false);
    setSelectedModule(null);
  };

  const listItems: ListItem[] = modules.map((module) => ({
    id: module.id,
    label: module.name,
    action: (
      <label className="swap swap-rotate cursor-pointer">
        <input
          type="checkbox"
          checked={module.enabled}
          onChange={() => toggleModule(module.id)}
          className="hidden"
        />
        <ToggleLeft size={32} className="swap-off text-base-300" />
        <ToggleRight size={32} className="swap-on text-success" />
      </label>
    ),
  }));

  return (
    <div className="space-y-6">
      <Header
        title="Gerencie os Módulos que serão Utilizados"
        subtitle="Ative ou desative os módulos conforme necessário"
        icon="⚙️"
      />

      <Card title="" icon="" shadow="lg">
        <List items={listItems} variant="bordered" />
      </Card>

      <div className="alert ">
        <AlertTriangle size={24} className="text-warning" />
        <Typography color="base">Desativar módulos pode afetar funcionalidades do sistema. Tenha cuidado ao fazer alterações.</Typography>
      </div>

      <div className="flex gap-4">
        <Button variant="primary">Salvar Alterações</Button>
        <Button variant="ghost">Restaurar Padrão</Button>
      </div>

      <Card title="Resumo" icon="📊">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <Typography variant="label" color="primary">Módulos Ativos:</Typography>
            <Badge variant="success" size="lg" className="text-lg font-bold">
              {modules.filter((m) => m.enabled).length}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <Typography variant="label" color="primary">Módulos Inativos:</Typography>
            <Badge variant="warning" size="lg" className="text-lg font-bold">
              {modules.filter((m) => !m.enabled).length}
            </Badge>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar Mudança"
        icon="⚠️"
        size="sm"
      >
        <div className="space-y-4">
          <Typography color="muted">
            Tem certeza que deseja {selectedModule && modules.find(m => m.id === selectedModule)?.enabled ? 'desativar' : 'ativar'} este módulo?
          </Typography>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmToggle}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
