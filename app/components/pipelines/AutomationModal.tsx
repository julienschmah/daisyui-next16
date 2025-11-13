'use client';

import { useState } from 'react';
import { Modal, Button, Badge, Text } from '@/app/components/UI';
import { X, Plus } from 'lucide-react';
import type { PipelineAutomation, PipelineStage } from '@/app/types/pipeline';

interface AutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (automation: PipelineAutomation) => void;
  stages: PipelineStage[];
}

export function AutomationModal({
  isOpen,
  onClose,
  onSubmit,
  stages,
}: AutomationModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [triggerType, setTriggerType] = useState<
    'card_moved_to' | 'card_created' | 'card_updated' | 'time_based'
  >('card_moved_to');
  const [triggerStageId, setTriggerStageId] = useState('');
  const [daysDelay, setDaysDelay] = useState(1);
  const [actionType, setActionType] = useState<'move_to_stage' | 'assign_user' | 'add_label' | 'notify'>('move_to_stage');
  const [actionValue, setActionValue] = useState('');
  const [actions, setActions] = useState<any[]>([]);
  const [enabled, setEnabled] = useState(true);

  const handleAddAction = () => {
    if (!actionValue.trim()) {
      alert('Preencha o valor da ação');
      return;
    }

    const newAction = {
      id: `action-${Date.now()}`,
      type: actionType,
      value: actionValue,
    };

    setActions([...actions, newAction]);
    setActionValue('');
    setActionType('move_to_stage');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Nome da automatização é obrigatório');
      return;
    }

    if (actions.length === 0) {
      alert('Adicione pelo menos uma ação');
      return;
    }

    const automation: PipelineAutomation = {
      id: `automation-${Date.now()}`,
      name,
      description,
      enabled,
      trigger: {
        type: triggerType,
        stageId: triggerType === 'card_moved_to' ? triggerStageId : undefined,
        daysDelay: triggerType === 'time_based' ? daysDelay : undefined,
      },
      actions: actions.map(({ id, ...action }) => action),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onSubmit(automation);

    // Reset form
    setName('');
    setDescription('');
    setTriggerType('card_moved_to');
    setTriggerStageId('');
    setDaysDelay(1);
    setActions([]);
    setActionValue('');
    setEnabled(true);
    onClose();
  };

  const getActionLabel = (action: any) => {
    switch (action.type) {
      case 'move_to_stage':
        const stage = stages.find((s) => s.id === action.value);
        return `Mover para: ${stage?.name || 'Desconhecido'}`;
      case 'assign_user':
        return `Atribuir a: ${action.value}`;
      case 'add_label':
        return `Adicionar etiqueta: ${action.value}`;
      case 'notify':
        return `Notificar: ${action.value}`;
      default:
        return action.value;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Criar Automatização"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Nome da Automatização *
          </Text>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Auto-mover para Análise"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
            Descrição
          </Text>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição opcional..."
            className="textarea textarea-bordered w-full"
            rows={2}
          />
        </div>

        <div className="bg-base-200 rounded-lg p-4 space-y-3">
          <Text variant="label" weight="semibold">Quando:</Text>

          <div>
            <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
              Tipo de Gatilho
            </Text>
            <select
              value={triggerType}
              onChange={(e) =>
                setTriggerType(
                  e.target.value as any
                )
              }
              className="select select-bordered w-full"
            >
              <option value="card_moved_to">Card movido para etapa</option>
              <option value="card_created">Card criado</option>
              <option value="card_updated">Card atualizado</option>
              <option value="time_based">Tempo baseado (dias)</option>
            </select>
          </div>

          {triggerType === 'card_moved_to' && (
            <div>
              <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
                Mover para qual coluna?
              </Text>
              <select
                value={triggerStageId}
                onChange={(e) => setTriggerStageId(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Selecione...</option>
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {triggerType === 'time_based' && (
            <div>
              <Text variant="label" weight="semibold" size="sm" className="mb-2 block">
                Depois de quantos dias?
              </Text>
              <input
                type="number"
                min="1"
                max="365"
                value={daysDelay}
                onChange={(e) => setDaysDelay(parseInt(e.target.value))}
                className="input input-bordered w-full"
              />
            </div>
          )}
        </div>

        <div className="bg-base-200 rounded-lg p-4 space-y-3">
          <Text variant="label" weight="semibold">Então:</Text>

          {actions.length > 0 && (
            <div className="space-y-2">
              {actions.map((action, idx) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between bg-base-100 p-2 rounded border border-base-300"
                >
                  <Text variant="body" size="sm">{getActionLabel(action)}</Text>
                  <Button
                    type="button"
                    onClick={() =>
                      setActions(actions.filter((_, i) => i !== idx))
                    }
                    variant="ghost"
                    size="xs"
                    className="px-1"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Text variant="label" weight="semibold" size="sm">
              Adicionar Ação
            </Text>
            <div className="flex gap-2">
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value as any)}
                className="select select-bordered select-sm"
              >
                <option value="move_to_stage">Mover para coluna</option>
                <option value="assign_user">Atribuir usuário</option>
                <option value="add_label">Adicionar etiqueta</option>
                <option value="notify">Notificar</option>
              </select>
              {actionType === 'move_to_stage' ? (
                <select
                  value={actionValue}
                  onChange={(e) => setActionValue(e.target.value)}
                  className="select select-bordered select-sm flex-1"
                >
                  <option value="">Selecione...</option>
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={actionValue}
                  onChange={(e) => setActionValue(e.target.value)}
                  placeholder="Valor..."
                  className="input input-bordered input-sm flex-1"
                />
              )}
              <Button
                type="button"
                onClick={handleAddAction}
                variant="primary"
                size="sm"
                className="gap-1"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <Text variant="body" size="sm">Ativar automatização</Text>
        </label>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Criar Automatização
          </Button>
        </div>
      </form>
    </Modal>
  );
}
