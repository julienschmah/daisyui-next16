'use client';

import { Button, Input } from '@/components/ui';
import { X } from 'lucide-react';
import { useState } from 'react';
import type { PipelineCard } from '@/types/pipeline';

interface CardModalProps {
  card: PipelineCard;
  stageId: string;
  onSave: (updatedCard: PipelineCard) => void;
  onClose: () => void;
}

export function CardModal({ card, stageId, onSave, onClose }: CardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>(card.priority || 'medium');
  const [labels, setLabels] = useState<string[]>(card.labels || []);
  const [newLabel, setNewLabel] = useState('');
  const [dueDate, setDueDate] = useState(card.dueDate ? new Date(card.dueDate).toISOString().split('T')[0] : '');
  const [assignedTo, setAssignedTo] = useState(card.assignedTo || '');

  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel.trim()]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    setLabels(labels.filter((l) => l !== labelToRemove));
  };

  const handleSave = () => {
    const updatedCard: PipelineCard = {
      ...card,
      title,
      description,
      priority,
      labels,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      assignedTo,
      stageId, // Atualiza o status baseado na coluna onde foi arrastado
    };
    onSave(updatedCard);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-base-300 bg-base-100">
          <h2 className="text-2xl font-bold text-base-content">Editar Card</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Título do card"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-2">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Descrição detalhada do card"
            />
          </div>

          {/* Priority and Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">
                Prioridade
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="select select-bordered w-full"
              >
                <option value="low">🟢 Baixa</option>
                <option value="medium">🟡 Média</option>
                <option value="high">🟠 Alta</option>
                <option value="urgent">🔴 Urgente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">
                Data de Vencimento
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-2">
              Atribuído a
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Nome do responsável"
            />
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-2">
              Labels
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddLabel();
                }}
                className="input input-bordered flex-1"
                placeholder="Digite uma label e pressione Enter"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddLabel}
              >
                Adicionar
              </Button>
            </div>

            {labels.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {labels.map((label) => (
                  <div
                    key={label}
                    className="badge badge-lg bg-primary text-primary-content gap-1"
                  >
                    {label}
                    <button
                      onClick={() => handleRemoveLabel(label)}
                      className="hover:bg-primary-focus/20 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-2 p-6 border-t border-base-300 bg-base-100">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar Card
          </Button>
        </div>
      </div>
    </div>
  );
}
