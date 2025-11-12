'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Text } from '@/app/components/UI';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Pipeline, PipelineStage } from '@/app/types/pipeline';

interface PipelineEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pipeline) => void;
  pipeline: Pipeline | null;
}

const ASSET_OPTIONS = [
  { value: 'imovel', label: '🏠 Imóvel' },
  { value: 'cliente', label: '👤 Cliente' },
  { value: 'lead', label: '🎯 Lead' },
];

export function PipelineEditModal({
  isOpen,
  onClose,
  onSubmit,
  pipeline,
}: PipelineEditModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [newStageName, setNewStageName] = useState('');
  const [newStageColor, setNewStageColor] = useState('#6B7280');
  const [editingStageId, setEditingStageId] = useState<string | null>(null);

  // Preencher dados do pipeline ao abrir modal
  useEffect(() => {
    if (isOpen && pipeline) {
      setName(pipeline.name);
      setDescription(pipeline.description || '');
      setSelectedAssets(pipeline.relatedAssets as string[]);
      setStages([...pipeline.stages]);
    }
  }, [isOpen, pipeline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Nome da esteira é obrigatório');
      return;
    }

    if (stages.length === 0) {
      alert('Pelo menos uma etapa é obrigatória');
      return;
    }

    if (!pipeline) return;

    const updatedPipeline: Pipeline = {
      ...pipeline,
      name,
      description,
      relatedAssets: selectedAssets as ('imovel' | 'cliente' | 'lead')[],
      stages: stages.sort((a, b) => a.order - b.order),
      updatedAt: new Date(),
    };

    onSubmit(updatedPipeline);
    onClose();
  };

  const toggleAsset = (asset: string) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  };

  const addStage = () => {
    if (!newStageName.trim()) return;

    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: newStageName,
      color: newStageColor,
      order: stages.length,
    };

    setStages([...stages, newStage]);
    setNewStageName('');
    setNewStageColor('#6B7280');
  };

  const updateStage = (id: string, field: string, value: any) => {
    setStages(
      stages.map((stage) => (stage.id === id ? { ...stage, [field]: value } : stage))
    );
  };

  const removeStage = (id: string) => {
    if (stages.length === 1) {
      alert('Deve haver pelo menos uma etapa');
      return;
    }
    setStages(stages.filter((s) => s.id !== id));
  };

  const moveStage = (id: string, direction: 'up' | 'down') => {
    const index = stages.findIndex((s) => s.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === stages.length - 1)
    ) {
      return;
    }

    const newStages = [...stages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newStages[index], newStages[targetIndex]] = [
      newStages[targetIndex],
      newStages[index],
    ];

    // Atualizar ordem
    newStages.forEach((stage, idx) => {
      stage.order = idx;
    });

    setStages(newStages);
  };

  if (!pipeline) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Esteira" size="lg">
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
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
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

        {/* Etapas - Listagem */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Etapas ({stages.length})
          </label>

          <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
            {stages.map((stage, idx) => (
              <div
                key={stage.id}
                className="flex items-center gap-2 p-3 bg-base-200 rounded-lg border border-base-300"
              >
                {/* Ordem */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveStage(stage.id, 'up')}
                    className="btn btn-xs btn-ghost"
                    disabled={idx === 0}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStage(stage.id, 'down')}
                    className="btn btn-xs btn-ghost"
                    disabled={idx === stages.length - 1}
                  >
                    ▼
                  </button>
                </div>

                {/* Cor */}
                <input
                  type="color"
                  value={stage.color || '#6B7280'}
                  onChange={(e) => updateStage(stage.id, 'color', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />

                {/* Nome */}
                <input
                  type="text"
                  value={stage.name}
                  onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                  className="input input-bordered input-sm flex-1"
                  placeholder="Nome da etapa"
                />

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeStage(stage.id)}
                  className="btn btn-sm btn-error btn-circle"
                  disabled={stages.length === 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Stage */}
          <div className="flex gap-2 p-3 bg-base-200 rounded-lg">
            <input
              type="color"
              value={newStageColor}
              onChange={(e) => setNewStageColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
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
              className="btn btn-sm btn-primary gap-2"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>
        </div>

        {/* Metadados */}
        <div className="bg-base-300 rounded-lg p-3">
          <Text variant="caption" className="text-base-content/70">
            Criado por: {pipeline.createdBy} • Criado em:{' '}
            {new Date(pipeline.createdAt).toLocaleDateString('pt-BR')}
          </Text>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-6 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Atualizar Esteira
          </Button>
        </div>
      </form>
    </Modal>
  );
}
