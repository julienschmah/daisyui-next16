import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PipelineEditModal } from '../../src/components/ui/pipelines/PipelineEditModal';

const meta: Meta<typeof PipelineEditModal> = {
  title: 'Pipelines/Pipeline Edit Modal',
  component: PipelineEditModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPipeline: any = {
  id: '1',
  name: 'Vendas',
  description: 'Pipeline padrão de vendas',
  stages: [
    { id: '1', name: 'Novo', color: '#3B82F6', order: 0 },
    { id: '2', name: 'Em Negociação', color: '#F59E0B', order: 1 },
    { id: '3', name: 'Proposta', color: '#8B5CF6', order: 2 },
    { id: '4', name: 'Fechado', color: '#10B981', order: 3 },
  ],
  cards: [],
  automations: [],
  relatedAssets: ['lead', 'cliente'],
  relatedUsers: [],
  labels: [],
  createdBy: 'João Silva',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
};

export const EditSalesPipeline: Story = {
  args: {
    isOpen: true,
    pipeline: mockPipeline,
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Pipeline atualizado:', data),
  },
};

export const EditSupportPipeline: Story = {
  args: {
    isOpen: true,
    pipeline: {
      ...mockPipeline,
      id: '2',
      name: 'Suporte Técnico',
      description: 'Pipeline de atendimento de suporte',
      stages: [
        { id: '5', name: 'Aberto', color: '#EF4444', order: 0 },
        { id: '6', name: 'Em Atendimento', color: '#F59E0B', order: 1 },
        { id: '7', name: 'Aguardando Cliente', color: '#6366F1', order: 2 },
        { id: '8', name: 'Resolvido', color: '#10B981', order: 3 },
        { id: '9', name: 'Fechado', color: '#6B7280', order: 4 },
      ],
      relatedAssets: ['cliente'] as const,
    },
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Pipeline atualizado:', data),
  },
};

export const EditDevPipeline: Story = {
  args: {
    isOpen: true,
    pipeline: {
      ...mockPipeline,
      id: '3',
      name: 'Desenvolvimento',
      description: 'Pipeline de desenvolvimento de software',
      stages: [
        { id: '10', name: 'Backlog', color: '#6B7280', order: 0 },
        { id: '11', name: 'Em Planejamento', color: '#3B82F6', order: 1 },
        { id: '12', name: 'Em Desenvolvimento', color: '#F59E0B', order: 2 },
        { id: '13', name: 'Em Revisão', color: '#8B5CF6', order: 3 },
        { id: '14', name: 'Em Testes', color: '#EC4899', order: 4 },
        { id: '15', name: 'Pronto', color: '#10B981', order: 5 },
      ],
      relatedAssets: [] as const,
    },
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Pipeline atualizado:', data),
  },
};

export const EditStageReordering: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Editar Pipeline - Reordenação</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="Vendas"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              className="textarea textarea-bordered w-full"
              defaultValue="Pipeline padrão de vendas"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Etapas (com reordenação)</label>
            <div className="space-y-2">
              {[
                { name: 'Novo', color: '#3B82F6' },
                { name: 'Em Negociação', color: '#F59E0B' },
                { name: 'Proposta', color: '#8B5CF6' },
                { name: 'Fechado', color: '#10B981' },
              ].map((stage, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-base-100 p-3 rounded-lg"
                >
                  <div
                    className="w-6 h-6 rounded flex-shrink-0"
                    style={{ backgroundColor: stage.color }}
                  />
                  <input
                    type="text"
                    className="input input-bordered input-sm flex-1"
                    defaultValue={stage.name}
                  />
                  <div className="flex gap-1">
                    <button className="btn btn-sm btn-ghost">↑</button>
                    <button className="btn btn-sm btn-ghost">↓</button>
                    <button className="btn btn-sm btn-ghost">✎</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-primary">Adicionar Etapa</button>
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const EditWithColorPicker: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Editar Pipeline - Customização de Cores
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Etapas com Cores</label>
            <div className="space-y-3">
              {[
                { name: 'Novo', color: '#3B82F6' },
                { name: 'Em Negociação', color: '#F59E0B' },
                { name: 'Proposta', color: '#8B5CF6' },
                { name: 'Fechado', color: '#10B981' },
              ].map((stage, idx) => (
                <div key={idx} className="bg-base-100 p-3 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="text"
                      className="input input-bordered input-sm flex-1"
                      defaultValue={stage.name}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="block text-sm">Cor:</label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        '#3B82F6',
                        '#F59E0B',
                        '#8B5CF6',
                        '#10B981',
                        '#EF4444',
                        '#06B6D4',
                        '#EC4899',
                        '#14B8A6',
                      ].map((c) => (
                        <button
                          key={c}
                          className="w-8 h-8 rounded-md border-2 border-base-300"
                          style={{
                            backgroundColor: c,
                            borderColor: c === stage.color ? '#000' : undefined,
                            borderWidth: c === stage.color ? '3px' : '2px',
                          }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const EditMetadata: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Editar Pipeline - Metadados
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="Vendas"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              className="textarea textarea-bordered w-full"
              defaultValue="Pipeline padrão de vendas"
            />
          </div>

          <div className="bg-base-100 p-4 rounded-lg space-y-2">
            <div className="text-sm text-base-content/70">
              <strong>Criado por:</strong> João Silva
            </div>
            <div className="text-sm text-base-content/70">
              <strong>Data de criação:</strong> 15 de janeiro de 2024
            </div>
            <div className="text-sm text-base-content/70">
              <strong>Última atualização:</strong> 20 de janeiro de 2024
            </div>
            <div className="text-sm text-base-content/70">
              <strong>Total de cards:</strong> 12
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};
