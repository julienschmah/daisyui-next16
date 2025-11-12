'use client';

import { useState } from 'react';
import { Modal, Button, Text } from '@/app/components/UI';
import { X } from 'lucide-react';
import type { PipelineFormData, PipelineStage } from '@/app/types/pipeline';

interface PipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PipelineFormData & { stages: (PipelineStage)[] }) => void;
}

const ASSET_OPTIONS = [
  { value: 'imovel', label: '🏠 Imóvel' },
  { value: 'cliente', label: '👤 Cliente' },
  { value: 'lead', label: '🎯 Lead' },
];

const DEFAULT_STAGES: Omit<PipelineStage, 'id'>[] = [
  { name: 'Novo', color: '#3B82F6', order: 0 },
  { name: 'Em Andamento', color: '#F59E0B', order: 1 },
  { name: 'Concluído', color: '#10B981', order: 2 },
];

export function PipelineModal({ isOpen, onClose, onSubmit }: PipelineModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [stages, setStages] = useState<(Omit<PipelineStage, 'id'>)[]>(DEFAULT_STAGES);
  const [newStageName, setNewStageName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Nome da esteira é obrigatório');
      return;
    }

    const stagesWithIds: PipelineStage[] = stages.map((stage, idx) => ({
      ...stage,
      id: `stage-${idx}`,
    })) as PipelineStage[];

    onSubmit({
      name,
      description,
      relatedAssets: selectedAssets as ('imovel' | 'cliente' | 'lead')[],
      relatedUsers: [],
      stages: stagesWithIds,
    });

    // Reset form
    setName('');
    setDescription('');
    setSelectedAssets([]);
    setStages(DEFAULT_STAGES);
    setNewStageName('');
  };

  const toggleAsset = (asset: string) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  };

  const addStage = () => {
    if (!newStageName.trim()) return;

    setStages([
      ...stages,
      {
        name: newStageName,
        color: '#6B7280',
        order: stages.length,
      },
    ]);
    setNewStageName('');
  };

  const removeStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Esteira"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Nome da Esteira *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Vendas, Suporte, Projetos..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição opcional..."
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        {/* Ativos Relacionados */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Ativos Relacionados
          </label>
          <div className="space-y-2">
            {ASSET_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAssets.includes(option.value)}
                  onChange={() => toggleAsset(option.value)}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Etapas */}
        <div>
          <label className="block text-sm font-medium mb-3">Etapas</label>
          
          <div className="space-y-2 mb-4">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stage.color || '#6B7280'}
                  onChange={(e) => {
                    const newStages = [...stages];
                    newStages[idx].color = e.target.value;
                    setStages(newStages);
                  }}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="flex-1 font-medium">{stage.name}</span>
                <button
                  type="button"
                  onClick={() => removeStage(idx)}
                  className="btn btn-sm btn-ghost btn-circle"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Stage */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
              placeholder="Nome da nova etapa..."
              className="input input-bordered input-sm flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addStage();
                }
              }}
            />
            <button
              type="button"
              onClick={addStage}
              className="btn btn-sm btn-primary"
            >
              + Adicionar
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-6 border-t">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Criar Esteira
          </Button>
        </div>
      </form>
    </Modal>
  );
}
