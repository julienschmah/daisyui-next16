import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddStageModal } from '../../app/components/pipelines/AddStageModal';

const meta: Meta<typeof AddStageModal> = {
  title: 'Pipelines/Add Stage Modal',
  component: AddStageModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Fechar modal'),
    onSubmit: (data) => console.log('Etapa adicionada:', data),
  },
};

export const AddSalesStage: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Adicionar Nova Etapa</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome da Etapa *</label>
            <input
              type="text"
              placeholder="Ex: Fechado"
              className="input input-bordered w-full"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Cor</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { name: 'Azul', color: '#3B82F6' },
                { name: 'Laranja', color: '#F59E0B' },
                { name: 'Roxo', color: '#8B5CF6' },
                { name: 'Verde', color: '#10B981' },
                { name: 'Vermelho', color: '#EF4444' },
                { name: 'Ciano', color: '#06B6D4' },
              ].map((option) => (
                <button
                  key={option.color}
                  className="w-10 h-10 rounded-lg border-2 border-base-300 hover:border-base-400"
                  style={{ backgroundColor: option.color }}
                  title={option.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-primary">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AddWithPreview: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Adicionar Etapa com Preview</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome da Etapa *</label>
            <input
              type="text"
              placeholder="Ex: Fechado"
              className="input input-bordered w-full"
              defaultValue="Fechado"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Cor</label>
            <div className="flex gap-2 flex-wrap mb-3">
              {[
                { name: 'Azul', color: '#3B82F6' },
                { name: 'Laranja', color: '#F59E0B' },
                { name: 'Roxo', color: '#8B5CF6' },
                { name: 'Verde', color: '#10B981' },
                { name: 'Vermelho', color: '#EF4444' },
                { name: 'Ciano', color: '#06B6D4' },
              ].map((option) => (
                <button
                  key={option.color}
                  className="w-10 h-10 rounded-lg border-2"
                  style={{
                    backgroundColor: option.color,
                    borderColor:
                      option.color === '#10B981'
                        ? '#000'
                        : '#e5e7eb',
                  }}
                  title={option.name}
                />
              ))}
            </div>

            <div className="bg-base-100 p-4 rounded-lg">
              <p className="text-sm text-base-content/70 mb-2">Preview:</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: '#10B981' }}
                />
                <span className="font-semibold">Fechado</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-primary">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AddMultipleStages: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Adicionar Múltiplas Etapas - Sequencial
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Etapa 1', color: '#3B82F6' },
            { name: 'Etapa 2', color: '#F59E0B' },
            { name: 'Etapa 3', color: '#8B5CF6' },
            { name: 'Etapa 4', color: '#10B981' },
          ].map((stage, idx) => (
            <div key={idx} className="bg-base-200 p-4 rounded-lg">
              <div className="mb-3">
                <label className="block font-semibold mb-2">
                  Etapa {idx + 1}
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  defaultValue={stage.name}
                />
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: stage.color }}
                />
                <input
                  type="color"
                  className="input input-bordered input-sm flex-1"
                  defaultValue={stage.color}
                  style={{ height: '32px' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-6">
          <button className="btn btn-ghost">Cancelar</button>
          <button className="btn btn-primary ml-auto">Adicionar Todos</button>
        </div>
      </div>
    </div>
  ),
};

export const ColorSelection: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Seleção de Cores - Detalhes</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-3">
              Escolha uma cor para a etapa
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                '#3B82F6',
                '#F59E0B',
                '#8B5CF6',
                '#10B981',
                '#EF4444',
                '#06B6D4',
                '#EC4899',
                '#14B8A6',
              ].map((color) => (
                <button
                  key={color}
                  className="w-12 h-12 rounded-lg border-2 border-base-300 hover:border-base-400 transition"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="divider" />

          <div>
            <label className="block font-semibold mb-2">
              Ou digite um código HEX
            </label>
            <input
              type="text"
              placeholder="#000000"
              className="input input-bordered w-full"
              defaultValue="#10B981"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-primary">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DuplicateWarning: Story = {
  render: () => (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Adicionar Etapa - Aviso</h2>
        <div className="bg-base-200 p-6 rounded-lg space-y-4">
          <div className="alert alert-warning">
            ⚠️ Já existe uma etapa com o nome "Novo"
          </div>

          <div>
            <label className="block font-semibold mb-2">Nome da Etapa *</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue="Novo"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Cor</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { color: '#3B82F6' },
                { color: '#F59E0B' },
                { color: '#8B5CF6' },
                { color: '#10B981' },
              ].map((option) => (
                <button
                  key={option.color}
                  className="w-10 h-10 rounded-lg border-2 border-base-300"
                  style={{ backgroundColor: option.color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button className="btn btn-ghost ml-auto">Cancelar</button>
            <button className="btn btn-warning">Adicionar Mesmo Assim</button>
          </div>
        </div>
      </div>
    </div>
  ),
};
