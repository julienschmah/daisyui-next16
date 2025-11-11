'use client';

import { useState } from 'react';

interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export function ModulesSettings() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Painel de controle principal',
      enabled: true,
      icon: '📊',
    },
    {
      id: 'usuarios',
      name: 'Usuários',
      description: 'Gerenciamento de usuários e permissões',
      enabled: true,
      icon: '👥',
    },
    {
      id: 'relatorios',
      name: 'Relatórios',
      description: 'Geração e visualização de relatórios',
      enabled: true,
      icon: '📈',
    },
    {
      id: 'configuracoes',
      name: 'Configurações',
      description: 'Ajustes do sistema',
      enabled: true,
      icon: '⚙️',
    },
    {
      id: 'integracao',
      name: 'Integração',
      description: 'Integrações com sistemas externos',
      enabled: false,
      icon: '🔗',
    },
  ]);

  const toggleModule = (moduleId: string) => {
    setModules(
      modules.map((mod) =>
        mod.id === moduleId ? { ...mod, enabled: !mod.enabled } : mod
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">⚙️ Módulos</h2>
        <p className="text-base-content/70">Ative ou desative módulos do sistema conforme necessário</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {modules.map((module) => (
          <div key={module.id} className="card bg-base-200 shadow-md">
            <div className="card-body flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-3xl">{module.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{module.name}</h3>
                  <p className="text-sm text-base-content/70">{module.description}</p>
                </div>
              </div>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  checked={module.enabled}
                  onChange={() => toggleModule(module.id)}
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-warning">
        <span>⚠️ Desativar módulos pode afetar funcionalidades do sistema. Tenha cuidado ao fazer alterações.</span>
      </div>

      <div className="flex gap-4">
        <button className="btn btn-primary">Salvar Alterações</button>
        <button className="btn btn-ghost">Restaurar Padrão</button>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">📊 Resumo</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Módulos Ativos:</span>
              <span className="ml-2 text-primary font-bold">
                {modules.filter((m) => m.enabled).length}
              </span>
            </p>
            <p>
              <span className="font-semibold">Módulos Inativos:</span>
              <span className="ml-2 text-warning font-bold">
                {modules.filter((m) => !m.enabled).length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
