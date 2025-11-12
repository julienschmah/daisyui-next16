import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Pipelines/Kanban Card',
  tags: ['autodocs'],
};

export default meta;

export const CardBasic: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-yellow-400">
      <p className="font-medium text-sm line-clamp-2">Implementar autenticação</p>
    </div>
  ),
};

export const CardWithDescription: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-orange-400">
      <div className="space-y-2">
        <p className="font-medium text-sm line-clamp-2">Criar dashboard</p>
        <p className="text-xs text-base-content/70 line-clamp-2">
          Página inicial com gráficos de vendas
        </p>
      </div>
    </div>
  ),
};

export const CardWithLabels: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-blue-400">
      <div className="space-y-2">
        <p className="font-medium text-sm line-clamp-2">Otimizar performance</p>
        <p className="text-xs text-base-content/70 line-clamp-2">
          Reduzir bundle size em 30%
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-base-300 px-2 py-1 rounded">
            performance
          </span>
          <span className="text-xs bg-base-300 px-2 py-1 rounded">
            backend
          </span>
        </div>
      </div>
    </div>
  ),
};

export const CardWithDueDate: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-purple-400">
      <div className="space-y-2">
        <p className="font-medium text-sm line-clamp-2">Reunião com cliente</p>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-base-300 px-2 py-1 rounded">
            reunião
          </span>
          <span className="text-xs bg-base-300 px-2 py-1 rounded">
            cliente
          </span>
        </div>
        <p className="text-xs text-base-content/60">
          📅 15/11/2025
        </p>
      </div>
    </div>
  ),
};

export const CardHighPriority: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-red-600">
      <div className="space-y-2">
        <p className="font-medium text-sm line-clamp-2">🔴 SISTEMA OFFLINE</p>
        <p className="text-xs text-base-content/70 line-clamp-2">
          Servidor em produção não responde
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-red-100 px-2 py-1 rounded text-red-700 font-semibold">
            crítico
          </span>
          <span className="text-xs bg-red-100 px-2 py-1 rounded text-red-700">
            p0
          </span>
        </div>
      </div>
    </div>
  ),
};

export const CardAssigned: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-green-400">
      <div className="space-y-2">
        <p className="font-medium text-sm line-clamp-2">Testes unitários</p>
        <p className="text-xs text-base-content/70 line-clamp-2">
          Aumentar cobertura para 80%
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-base-300 px-2 py-1 rounded">testing</span>
        </div>
        <p className="text-xs text-base-content/60 font-medium">
          👤 João Silva
        </p>
      </div>
    </div>
  ),
};

export const CardFull: StoryObj = {
  render: () => (
    <div className="w-80 p-3 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-l-4 border-indigo-500">
      <div className="space-y-2">
        <p className="font-medium text-sm line-clamp-2">
          Documentação da API
        </p>
        <p className="text-xs text-base-content/70 line-clamp-2">
          Swagger/OpenAPI completo com exemplos
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-base-300 px-2 py-1 rounded">
            documentação
          </span>
          <span className="text-xs bg-base-300 px-2 py-1 rounded">backend</span>
        </div>
        <p className="text-xs text-base-content/60">
          📅 20/11/2025
        </p>
        <p className="text-xs text-base-content/60 font-medium">
          👤 Maria Santos
        </p>
      </div>
    </div>
  ),
};

export const CardAllPriorities: StoryObj = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="w-80 p-3 bg-white rounded-lg shadow border-l-4 border-green-500">
        <p className="font-medium text-sm">🟢 Tarefa com prioridade Baixa</p>
      </div>
      <div className="w-80 p-3 bg-white rounded-lg shadow border-l-4 border-yellow-400">
        <p className="font-medium text-sm">🟡 Tarefa com prioridade Média</p>
      </div>
      <div className="w-80 p-3 bg-white rounded-lg shadow border-l-4 border-orange-500">
        <p className="font-medium text-sm">🔴 Tarefa com prioridade Alta</p>
      </div>
      <div className="w-80 p-3 bg-white rounded-lg shadow border-l-4 border-red-700">
        <p className="font-medium text-sm">⛔ Tarefa com prioridade Urgente</p>
      </div>
    </div>
  ),
};
