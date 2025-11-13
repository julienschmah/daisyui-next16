'use client';

import { useState } from 'react';
import { Modal, Button, Text } from '@/app/components/UI';
import type { PipelineCard } from '@/app/types/pipeline';

interface KanbanCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<PipelineCard>) => void;
  title: string;
  initialData?: PipelineCard;
  onDelete?: () => void;
}

export function KanbanCardModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialData,
  onDelete,
}: KanbanCardModalProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: (initialData?.priority || 'medium') as 'low' | 'medium' | 'high' | 'urgent',
    labels: initialData?.labels?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Título é obrigatório');
      return;
    }

    onSubmit({
      title: formData.title,
      description: formData.description,
      priority: formData.priority as any,
      labels: formData.labels
        .split(',')
        .map((l) => l.trim())
        .filter((l) => l),
    });

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      labels: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Título *
          </Text>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Ex: Implementar login"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Descrição
          </Text>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Detalhes do item..."
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Prioridade
          </Text>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ 
                ...formData, 
                priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent'
              })
            }
            className="select select-bordered w-full"
          >
            <option value="low">🟢 Baixa</option>
            <option value="medium">🟡 Média</option>
            <option value="high">🔴 Alta</option>
            <option value="urgent">⛔ Urgente</option>
          </select>
        </div>

        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Etiquetas (separadas por vírgula)
          </Text>
          <input
            type="text"
            value={formData.labels}
            onChange={(e) =>
              setFormData({ ...formData, labels: e.target.value })
            }
            placeholder="Ex: bug, importante, urgente"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-3 justify-between pt-4 border-t">
          <div>
            {onDelete && (
              <Button
                variant="error"
                size="sm"
                type="button"
                onClick={() => {
                  if (confirm('Tem certeza que deseja deletar este item?')) {
                    onDelete();
                    onClose();
                  }
                }}
              >
                Deletar
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
