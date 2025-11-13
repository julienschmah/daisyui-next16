'use client';

import { Modal, Button, Input } from '@/components/ui';
import type { Pipeline } from '@/types/pipeline';

interface PipelineEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pipeline: Pipeline) => void;
  pipeline: Pipeline | null;
}

export function PipelineEditModal({ isOpen, onClose, onSubmit, pipeline }: PipelineEditModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pipeline) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    onSubmit({
      ...pipeline,
      name,
      description,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Pipeline" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-base-content mb-1 block">Nome</label>
          <Input 
            name="name"
            placeholder="Ex: Vendas, Suporte, RH"
            defaultValue={pipeline?.name}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-base-content mb-1 block">Descrição</label>
          <Input 
            name="description"
            placeholder="Descrição da pipeline"
            defaultValue={pipeline?.description}
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
