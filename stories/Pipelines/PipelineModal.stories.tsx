import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PipelineModal } from '../../src/components/ui/pipelines/PipelineModal';

const meta: Meta<typeof PipelineModal> = {
  title: 'Pipelines/Pipeline Modal',
  component: PipelineModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateNew: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Pipeline criado:', data),
  },
};

export const SalesTemplate: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Pipeline - Template Vendas
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome</label>
            <input
              type="text"
              placeholder="Vendas"
              className="input input-bordered w-full"
              defaultValue="Vendas"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              placeholder="Pipeline de vendas"
              className="textarea textarea-bordered w-full"
              defaultValue="Pipeline de vendas padrão"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Ativos Relacionados</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" checked disabled />
                🎯 Lead
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                👤 Cliente
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                🏠 Imóvel
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Etapas</label>
            <div className="space-y-2">
              {[
                { name: 'Novo', color: '#3B82F6' },
                { name: 'Em Negociação', color: '#F59E0B' },
                { name: 'Proposta', color: '#8B5CF6' },
                { name: 'Fechado', color: '#10B981' },
              ].map((stage, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span>{stage.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SupportTemplate: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Pipeline - Template Suporte
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome</label>
            <input
              type="text"
              placeholder="Suporte Técnico"
              className="input input-bordered w-full"
              defaultValue="Suporte Técnico"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              placeholder="Pipeline de suporte"
              className="textarea textarea-bordered w-full"
              defaultValue="Tickets de suporte técnico"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Ativos Relacionados</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" checked disabled />
                👤 Cliente
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                🎯 Lead
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Etapas</label>
            <div className="space-y-2">
              {[
                { name: 'Aberto', color: '#EF4444' },
                { name: 'Em Atendimento', color: '#F59E0B' },
                { name: 'Aguardando Cliente', color: '#6366F1' },
                { name: 'Resolvido', color: '#10B981' },
                { name: 'Fechado', color: '#6B7280' },
              ].map((stage, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span>{stage.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DevelopmentTemplate: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Pipeline - Template Desenvolvimento
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome</label>
            <input
              type="text"
              placeholder="Desenvolvimento"
              className="input input-bordered w-full"
              defaultValue="Desenvolvimento"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              placeholder="Pipeline de desenvolvimento"
              className="textarea textarea-bordered w-full"
              defaultValue="Gestão de tarefas de desenvolvimento"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Etapas</label>
            <div className="space-y-2">
              {[
                { name: 'Backlog', color: '#6B7280' },
                { name: 'Em Planejamento', color: '#3B82F6' },
                { name: 'Em Desenvolvimento', color: '#F59E0B' },
                { name: 'Em Revisão', color: '#8B5CF6' },
                { name: 'Em Testes', color: '#EC4899' },
                { name: 'Pronto', color: '#10B981' },
              ].map((stage, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span>{stage.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
