'use client';

import { Modal, Button, Input, Typography } from '@/components/ui';

interface PipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export function PipelineModal({ isOpen, onClose, onSubmit }: PipelineModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    onSubmit(name, description);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Pipeline" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-base-content mb-1 block">Nome</label>
          <Input
            name="name"
            placeholder="Ex: Vendas, Suporte, RH"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-base-content mb-1 block">Descrição</label>
          <Input
            name="description"
            placeholder="Descrição da pipeline"
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
