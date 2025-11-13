import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PipelineList } from '../../src/components/ui/pipelines/PipelineList';

const meta: Meta<typeof PipelineList> = {
  title: 'Pipelines/Pipeline List',
  component: PipelineList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPipelines: any[] = [
  {
    id: '1',
    name: 'Vendas',
    description: 'Pipeline padrão de vendas',
    stages: [
      { id: '1', name: 'Novo', color: '#3B82F6', order: 0 },
      { id: '2', name: 'Em Negociação', color: '#F59E0B', order: 1 },
      { id: '3', name: 'Proposta', color: '#8B5CF6', order: 2 },
      { id: '4', name: 'Fechado', color: '#10B981', order: 3 },
    ],
    cards: [
      { id: 'c1', title: 'Lead 1', stageId: '1', order: 0 },
      { id: 'c2', title: 'Lead 2', stageId: '2', order: 0 },
      { id: 'c3', title: 'Lead 3', stageId: '3', order: 0 },
    ],
    automations: [],
    relatedAssets: ['lead', 'cliente'],
    relatedUsers: [],
    labels: [],
    createdBy: 'João Silva',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Suporte Técnico',
    description: 'Pipeline de atendimento de suporte',
    stages: [
      { id: '5', name: 'Aberto', color: '#EF4444', order: 0 },
      { id: '6', name: 'Em Atendimento', color: '#F59E0B', order: 1 },
      { id: '7', name: 'Resolvido', color: '#10B981', order: 2 },
    ],
    cards: [
      { id: 'c4', title: 'Ticket 1', stageId: '5', order: 0 },
      { id: 'c5', title: 'Ticket 2', stageId: '6', order: 0 },
      { id: 'c6', title: 'Ticket 3', stageId: '6', order: 1 },
    ],
    automations: [],
    relatedAssets: ['cliente'],
    relatedUsers: [],
    labels: [],
    createdBy: 'Maria Santos',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    name: 'Desenvolvimento',
    description: 'Pipeline de desenvolvimento de software',
    stages: [
      { id: '8', name: 'Backlog', color: '#6B7280', order: 0 },
      { id: '9', name: 'Em Desenvolvimento', color: '#F59E0B', order: 1 },
      { id: '10', name: 'Pronto', color: '#10B981', order: 2 },
    ],
    cards: [
      { id: 'c7', title: 'Task 1', stageId: '8', order: 0 },
      { id: 'c8', title: 'Task 2', stageId: '9', order: 0 },
    ],
    automations: [],
    relatedAssets: [],
    relatedUsers: [],
    labels: [],
    createdBy: 'Pedro Costa',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-19'),
  },
];

export const Default: Story = {
  args: {
    pipelines: mockPipelines,
    onEdit: (pipeline) => console.log('Editar:', pipeline.name),
    onDelete: (id) => console.log('Deletar:', id),
  },
};

export const SinglePipeline: Story = {
  args: {
    pipelines: [mockPipelines[0]],
    onEdit: (pipeline) => console.log('Editar:', pipeline.name),
    onDelete: (id) => console.log('Deletar:', id),
  },
};

export const EmptyState: Story = {
  args: {
    pipelines: [],
    onEdit: (pipeline) => console.log('Editar:', pipeline.name),
    onDelete: (id) => console.log('Deletar:', id),
  },
};

export const ManyPipelines: Story = {
  args: {
    pipelines: [
      ...mockPipelines,
      {
        id: '4',
        name: 'Imóveis',
        description: 'Pipeline de venda de imóveis',
        stages: [
          { id: '11', name: 'Prospectado', color: '#3B82F6', order: 0 },
          { id: '12', name: 'Visitado', color: '#F59E0B', order: 1 },
          { id: '13', name: 'Proposta', color: '#8B5CF6', order: 2 },
          { id: '14', name: 'Vendido', color: '#10B981', order: 3 },
        ],
        cards: [
          { id: 'c9', title: 'Casa A', stageId: '11', order: 0 },
          { id: 'c10', title: 'Apto B', stageId: '12', order: 0 },
          { id: 'c11', title: 'Lote C', stageId: '13', order: 0 },
        ],
        automations: [],
        relatedAssets: ['imovel'],
        relatedUsers: [],
        labels: [],
        createdBy: 'Ana Silva',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-17'),
      },
      {
        id: '5',
        name: 'Marketing',
        description: 'Pipeline de campanhas de marketing',
        stages: [
          { id: '15', name: 'Planejamento', color: '#3B82F6', order: 0 },
          { id: '16', name: 'Execução', color: '#F59E0B', order: 1 },
          { id: '17', name: 'Análise', color: '#8B5CF6', order: 2 },
        ],
        cards: [
          { id: 'c12', title: 'Campanha 1', stageId: '15', order: 0 },
          { id: 'c13', title: 'Campanha 2', stageId: '16', order: 0 },
        ],
        automations: [],
        relatedAssets: [],
        relatedUsers: [],
        labels: [],
        createdBy: 'Carlos Santos',
        createdAt: new Date('2023-12-15'),
        updatedAt: new Date('2024-01-16'),
      },
    ],
    onEdit: (pipeline) => console.log('Editar:', pipeline.name),
    onDelete: (id) => console.log('Deletar:', id),
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Pipelines - Com Labels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPipelines.map((pipeline) => (
          <div
            key={pipeline.id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition"
          >
            <div className="card-body">
              <h3 className="card-title text-lg">{pipeline.name}</h3>
              <p className="text-sm text-base-content/70">
                {pipeline.description}
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {pipeline.stages.map((stage: any) => (
                    <div
                      key={stage.id}
                      className="badge"
                      style={{
                        backgroundColor: stage.color,
                        color: '#fff',
                      }}
                    >
                      {stage.name}
                    </div>
                  ))}
                </div>
              </div>

              {pipeline.relatedAssets.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {pipeline.relatedAssets.map((asset: string) => (
                    <div key={asset} className="badge badge-outline">
                      {asset === 'imovel'
                        ? '🏠'
                        : asset === 'cliente'
                          ? '👤'
                          : '🎯'}{' '}
                      {asset.charAt(0).toUpperCase() + asset.slice(1)}
                    </div>
                  ))}
                </div>
              )}

              <div className="card-actions justify-between mt-4">
                <div className="text-xs text-base-content/50">
                  {pipeline.cards.length} items
                </div>
                <div className="space-x-2">
                  <button className="btn btn-sm btn-ghost">Ver</button>
                  <button className="btn btn-sm btn-ghost">Editar</button>
                  <button className="btn btn-sm btn-ghost text-error">
                    Del
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const DetailedView: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Pipelines - Visão Detalhada</h2>
      <div className="space-y-4">
        {mockPipelines.map((pipeline) => (
          <div key={pipeline.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="card-title text-lg">{pipeline.name}</h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    {pipeline.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{pipeline.cards.length}</div>
                  <div className="text-xs text-base-content/50">items</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {pipeline.stages.map((stage: any) => (
                  <div
                    key={stage.id}
                    className="text-center p-2 rounded"
                    style={{ backgroundColor: stage.color + '20' }}
                  >
                    <div
                      className="text-sm font-semibold"
                      style={{ color: stage.color }}
                    >
                      {stage.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="text-xs text-base-content/50">
                  Criado: {pipeline.createdAt.toLocaleDateString('pt-BR')}
                </div>
                <div className="text-xs text-base-content/50">
                  por {pipeline.createdBy}
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-ghost">Visualizar</button>
                <button className="btn btn-sm btn-ghost">Editar</button>
                <button className="btn btn-sm btn-ghost text-error">
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
