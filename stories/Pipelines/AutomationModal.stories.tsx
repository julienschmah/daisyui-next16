import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AutomationModal } from '../../app/components/pipelines/AutomationModal';

const meta: Meta<typeof AutomationModal> = {
  title: 'Pipelines/Automation Modal',
  component: AutomationModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateNewAutomation: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Automação criada:', data),
  },
};

export const AutoMoveToStage: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Automação - Auto Mover para Etapa
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Nome da Automação *</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Auto-mover para Análise"
              className="input input-bordered"
              defaultValue="Auto-mover para Análise"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Descrição</span>
            </label>
            <textarea
              placeholder="Descreva o que essa automação faz"
              className="textarea textarea-bordered"
              defaultValue="Move automaticamente novo card para a etapa de Análise"
            />
          </div>

          <div className="divider">GATILHO (TRIGGER)</div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Quando acontecer *</span>
            </label>
            <select className="select select-bordered" defaultValue="card_created">
              <option value="card_moved_to">Card movido para etapa</option>
              <option value="card_created" selected>
                Card criado
              </option>
              <option value="card_updated">Card atualizado</option>
              <option value="time_based">Baseado em tempo</option>
            </select>
          </div>

          <div className="divider">AÇÕES (ACTIONS)</div>

          <div className="space-y-3">
            <div className="bg-base-100 p-4 rounded-lg">
              <div className="text-sm mb-2">
                <strong>Ação 1:</strong> Mover para etapa
              </div>
              <div className="flex items-center gap-2">
                <select className="select select-bordered select-sm flex-1">
                  <option>Selecione uma etapa...</option>
                  <option selected>Análise</option>
                  <option>Em Negociação</option>
                  <option>Proposta</option>
                </select>
                <button className="btn btn-sm btn-ghost">✕</button>
              </div>
            </div>
          </div>

          <button className="btn btn-outline btn-sm">+ Adicionar Ação</button>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Ativa</span>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
              />
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Automação</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TimeBasedAutomation: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Automação - Baseada em Tempo
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Nome da Automação *</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              defaultValue="Notificar se sem movimento por 5 dias"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Descrição</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              defaultValue="Notifica o responsável se o card não foi movido por 5 dias"
            />
          </div>

          <div className="divider">GATILHO (TRIGGER)</div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Quando acontecer *</span>
            </label>
            <select className="select select-bordered" defaultValue="time_based">
              <option value="card_moved_to">Card movido para etapa</option>
              <option value="card_created">Card criado</option>
              <option value="card_updated">Card atualizado</option>
              <option value="time_based" selected>
                Baseado em tempo
              </option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Dias sem movimento *
              </span>
            </label>
            <input
              type="number"
              min="1"
              className="input input-bordered"
              defaultValue="5"
            />
          </div>

          <div className="divider">AÇÕES (ACTIONS)</div>

          <div className="space-y-3">
            <div className="bg-base-100 p-4 rounded-lg">
              <div className="text-sm mb-2">
                <strong>Ação 1:</strong> Notificar
              </div>
              <input
                type="text"
                placeholder="Mensagem de notificação"
                className="input input-bordered input-sm w-full"
                defaultValue="Card parado há muito tempo!"
              />
              <button className="btn btn-sm btn-ghost mt-2">✕</button>
            </div>
          </div>

          <button className="btn btn-outline btn-sm">+ Adicionar Ação</button>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Ativa</span>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
              />
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Automação</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ComplexAutomation: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Automação - Com Múltiplas Ações
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Nome da Automação *</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              defaultValue="Processar Proposta Urgente"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Descrição</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              defaultValue="Quando um card é movido para Proposta com prioridade alta, adiciona label urgente e notifica o gerente"
            />
          </div>

          <div className="divider">GATILHO (TRIGGER)</div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Quando acontecer *</span>
            </label>
            <select className="select select-bordered" defaultValue="card_moved_to">
              <option value="card_moved_to" selected>
                Card movido para etapa
              </option>
              <option value="card_created">Card criado</option>
              <option value="card_updated">Card atualizado</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Para qual etapa *</span>
            </label>
            <select className="select select-bordered">
              <option>Selecione uma etapa...</option>
              <option selected>Proposta</option>
              <option>Análise</option>
              <option>Fechado</option>
            </select>
          </div>

          <div className="divider">AÇÕES (ACTIONS)</div>

          <div className="space-y-3">
            {[
              {
                name: 'Adicionar Label',
                value: 'urgente',
              },
              {
                name: 'Notificar',
                value: 'Nova proposta urgente criada',
              },
            ].map((action, idx) => (
              <div key={idx} className="bg-base-100 p-4 rounded-lg">
                <div className="text-sm mb-2">
                  <strong>Ação {idx + 1}:</strong> {action.name}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="input input-bordered input-sm flex-1"
                    defaultValue={action.value}
                  />
                  <button className="btn btn-sm btn-ghost">✕</button>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-outline btn-sm">+ Adicionar Ação</button>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Ativa</span>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
              />
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Automação</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AutoAssignUser: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Automação - Auto Atribuir Responsável
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Nome da Automação *</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              defaultValue="Atribuir novos leads para vendedor"
            />
          </div>

          <div className="divider">GATILHO (TRIGGER)</div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Quando acontecer *</span>
            </label>
            <select className="select select-bordered" defaultValue="card_created">
              <option value="card_created" selected>
                Card criado
              </option>
              <option value="card_moved_to">Card movido para etapa</option>
              <option value="card_updated">Card atualizado</option>
            </select>
          </div>

          <div className="divider">AÇÕES (ACTIONS)</div>

          <div className="space-y-3">
            <div className="bg-base-100 p-4 rounded-lg">
              <div className="text-sm mb-2">
                <strong>Ação 1:</strong> Atribuir Usuário
              </div>
              <select className="select select-bordered select-sm w-full">
                <option>Selecione um usuário...</option>
                <option selected>João Silva</option>
                <option>Maria Santos</option>
                <option>Pedro Costa</option>
              </select>
              <button className="btn btn-sm btn-ghost mt-2">✕</button>
            </div>
          </div>

          <button className="btn btn-outline btn-sm">+ Adicionar Ação</button>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Ativa</span>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
              />
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success">Criar Automação</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const EmptyForm: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Criar Automação - Formulário Vazio
        </h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Nome da Automação *</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Auto-mover para Análise"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Descrição</span>
            </label>
            <textarea
              placeholder="Descreva o que essa automação faz"
              className="textarea textarea-bordered"
            />
          </div>

          <div className="divider">GATILHO (TRIGGER)</div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Quando acontecer *</span>
            </label>
            <select className="select select-bordered">
              <option>Selecione um trigger...</option>
              <option>Card movido para etapa</option>
              <option>Card criado</option>
              <option>Card atualizado</option>
              <option>Baseado em tempo</option>
            </select>
          </div>

          <div className="divider">AÇÕES (ACTIONS)</div>

          <div className="text-center py-8">
            <p className="text-base-content/70">
              Nenhuma ação adicionada ainda
            </p>
          </div>

          <button className="btn btn-outline btn-sm">+ Adicionar Ação</button>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Ativa</span>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
              />
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-success" disabled>
              Criar Automação
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};
