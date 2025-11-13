'use client';

import { useState } from 'react';
import { Modal, Button, Text } from '@/app/components/UI';

interface AddStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => void;
}

export function AddStageModal({ isOpen, onClose, onSubmit }: AddStageModalProps) {
  const [stageName, setStageName] = useState('');
  const [stageColor, setStageColor] = useState('#3B82F6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stageName.trim()) {
      alert('Nome da coluna é obrigatório');
      return;
    }

    onSubmit(stageName, stageColor);
    setStageName('');
    setStageColor('#3B82F6');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Nova Coluna">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Nome da Coluna *
          </Text>
          <input
            type="text"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            placeholder="Ex: Análise, Prototipagem, Testes..."
            className="input input-bordered w-full"
            autoFocus
          />
        </div>

        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Cor
          </Text>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={stageColor}
              onChange={(e) => setStageColor(e.target.value)}
              className="w-20 h-20 rounded cursor-pointer"
            />
            <div
              className="w-20 h-20 rounded border-2 border-base-300"
              style={{ backgroundColor: stageColor }}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Adicionar Coluna
          </Button>
        </div>
      </form>
    </Modal>
  );
}
