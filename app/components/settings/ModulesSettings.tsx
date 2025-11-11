'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal, List, type ListItem } from '@/app/components/UI';

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
        {/* OFF - Mostrado quando desativado */}
        <svg
          className="swap-off w-8 h-8 fill-base-300"
          viewBox="0 0 24 24"
        >
          <path d="M15.4 5H8.6C4.1 5 1 8.13 1 12s3.1 7 7.6 7h6.8c4.5 0 7.6-3.13 7.6-7s-3.1-7-7.6-7Zm0 12H8.6c-3 0-5.4-2.27-5.4-5s2.4-5 5.4-5h6.8c3 0 5.4 2.27 5.4 5s-2.4 5-5.4 5Zm-3.2-8c-1.7 0-3 1.34-3 3s1.3 3 3 3 3-1.34 3-3-1.3-3-3-3Z" />
        </svg>
        {/* ON - Mostrado quando ativado */}
        <svg
          className="swap-on w-8 h-8 fill-success"
          viewBox="0 0 24 24"
        >
          <path d="M15.4 5H8.6C4.1 5 1 8.13 1 12s3.1 7 7.6 7h6.8c4.5 0 7.6-3.13 7.6-7s-3.1-7-7.6-7Zm3.2 8c0 1.66-1.3 3-3 3s-3-1.34-3-3 1.3-3 3-3 3 1.34 3 3Z" />
        </svg>
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

      <div className="alert alert-warning">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Desativar módulos pode afetar funcionalidades do sistema. Tenha cuidado ao fazer alterações.</span>
      </div>

      <div className="flex gap-4">
        <Button variant="primary">Salvar Alterações</Button>
        <Button variant="ghost">Restaurar Padrão</Button>
      </div>

      <Card title="Resumo" icon="📊">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <span className="font-semibold text-primary">Módulos Ativos:</span>
            <span className="badge badge-success text-lg font-bold">
              {modules.filter((m) => m.enabled).length}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <span className="font-semibold text-primary">Módulos Inativos:</span>
            <span className="badge badge-warning text-lg font-bold">
              {modules.filter((m) => !m.enabled).length}
            </span>
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
          <p className="text-base-content/70">
            Tem certeza que deseja {selectedModule && modules.find(m => m.id === selectedModule)?.enabled ? 'desativar' : 'ativar'} este módulo?
          </p>
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
