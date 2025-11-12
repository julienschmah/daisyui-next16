import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanCardModal } from '../../app/components/pipelines/KanbanCardModal';

const meta: Meta<typeof KanbanCardModal> = {
  title: 'Pipelines/Kanban Card Modal',
  component: KanbanCardModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateNewCard: Story = {
  args: {
    isOpen: true,
    title: 'Criar Novo Card',
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Card criado:', data),
  },
};

export const EditExistingCard: Story = {
  args: {
    isOpen: true,
    title: 'Editar Card',
    initialData: {
      id: '1',
      title: 'Contato Cliente',
      description: 'Fazer primeiro contato com o cliente potencial',
      stageId: '1',
      priority: 'high',
      labels: ['urgente', 'vendas'],
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      assignedTo: 'João Silva',
      order: 0,
    },
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Card atualizado:', data),
    onDelete: () => console.log('Card deletado'),
  },
};

export const CreateWithPriority: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Card - Seleção de Prioridade
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Título *</label>
            <input
              type="text"
              placeholder="Título do card"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              placeholder="Descrição do card"
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Prioridade</label>
            <select className="select select-bordered w-full">
              <option value="low">🟢 Baixa</option>
              <option value="medium">🟡 Média</option>
              <option value="high" selected>
                🟠 Alta
              </option>
              <option value="urgent">🔴 Urgente</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Labels</label>
            <input
              type="text"
              placeholder="Separar por vírgula: label1, label2"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Card</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const EditWithAllFields: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Editar Card - Todos os Campos
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Título *</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="Contato Cliente"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              className="textarea textarea-bordered w-full"
              defaultValue="Fazer primeiro contato com o cliente potencial"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Prioridade</label>
              <select className="select select-bordered w-full">
                <option value="low">🟢 Baixa</option>
                <option value="medium">🟡 Média</option>
                <option value="high" selected>
                  🟠 Alta
                </option>
                <option value="urgent">🔴 Urgente</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Data de Vencimento</label>
              <input type="date" className="input input-bordered w-full" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Labels</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="urgente, vendas"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-error btn-outline ml-auto">Deletar</button>
            <button className="btn btn-ghost">Cancelar</button>
            <button className="btn btn-success">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CreateUrgentCard: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Criar Card - Urgente</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div className="alert alert-warning">
            <span>⚠️ Este card será criado como URGENTE</span>
          </div>

          <div>
            <label className="block font-semibold mb-2">Título *</label>
            <input
              type="text"
              placeholder="Título do card"
              className="input input-bordered w-full"
              defaultValue="Problema Crítico - Produção"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              placeholder="Descrição"
              className="textarea textarea-bordered w-full"
              defaultValue="Site fora do ar - ação imediata necessária"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Prioridade</label>
            <select className="select select-bordered w-full">
              <option value="urgent" selected>
                🔴 Urgente
              </option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Labels</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="crítico, produção, down"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-error">Criar Card Urgente</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CreateWithLabels: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Card - Com Labels
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Título *</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="Reunião com Cliente"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Descrição</label>
            <textarea
              className="textarea textarea-bordered w-full"
              defaultValue="Reunião presencial para apresentação de proposta"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Labels (separados por vírgula)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="reunião, apresentação, importante"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {['reunião', 'apresentação', 'importante'].map((label) => (
                <div key={label} className="badge badge-primary">
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Card</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Criar Card - Mínimo</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Título *</label>
            <input
              type="text"
              placeholder="Título do card"
              className="input input-bordered w-full"
              autoFocus
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Card</button>
          </div>
        </div>
      </div>
    </div>
  ),
};
