'use client';

import { Card, Button } from '@/components/ui';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Pipeline, PipelineCard, PipelineStage } from '@/types/pipeline';

interface KanbanBoardProps {
  pipeline: Pipeline;
  onUpdatePipeline: (pipeline: Pipeline) => void;
}

export function KanbanBoard({ pipeline, onUpdatePipeline }: KanbanBoardProps) {
  const stages = pipeline.stages || [];
  const cards = pipeline.cards || [];
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [newStageName, setNewStageName] = useState('');

  const STAGE_COLORS = [
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#10B981', // Green
    '#EF4444', // Red
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#F97316', // Orange
  ];

  const handleAddCard = (stageId: string) => {
    const newCard: PipelineCard = {
      id: `card-${Date.now()}`,
      title: 'Novo Card',
      stageId,
      order: 0,
    };
    onUpdatePipeline({
      ...pipeline,
      cards: [...cards, newCard],
    });
  };

  const handleAddStage = () => {
    if (!newStageName.trim()) return;

    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: newStageName,
      color: STAGE_COLORS[stages.length % STAGE_COLORS.length],
      order: stages.length,
    };

    onUpdatePipeline({
      ...pipeline,
      stages: [...stages, newStage],
    });

    setNewStageName('');
    setIsAddingStage(false);
  };

  const handleDeleteStage = (stageId: string) => {
    if (confirm('Tem certeza que deseja deletar este estágio? Os cards serão movidos.')) {
      onUpdatePipeline({
        ...pipeline,
        stages: stages.filter((s) => s.id !== stageId),
        cards: cards.filter((c) => c.stageId !== stageId),
      });
    }
  };

  return (
    <div>
      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageCards = cards.filter((c) => c.stageId === stage.id);

          return (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <div
                className="rounded-lg p-4 mb-4 flex items-center justify-between"
                style={{ backgroundColor: `${stage.color || '#999'}20`, borderTop: `4px solid ${stage.color || '#999'}` }}
              >
                <div>
                  <h3 className="font-bold text-base-content">{stage.name}</h3>
                  <span className="text-xs text-base-content/70">{stageCards.length} cards</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteStage(stage.id)}
                  className="text-error hover:bg-error/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="space-y-3">
                {stageCards.map((card) => (
                  <Card key={card.id} className="cursor-move hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-base-content">{card.title}</h4>
                    {card.description && (
                      <p className="text-sm text-base-content/70 mt-1">{card.description}</p>
                    )}
                    {card.labels && card.labels.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {card.labels.map((label) => (
                          <span key={label} className="text-xs bg-base-200 text-base-content px-2 py-1 rounded">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}

                <Button
                  variant="ghost"
                  fullWidth
                  className="justify-start text-base-content/60 hover:text-base-content"
                  onClick={() => handleAddCard(stage.id)}
                >
                  <Plus size={16} className="mr-2" />
                  Adicionar Card
                </Button>
              </div>
            </div>
          );
        })}

        {/* Add New Stage */}
        <div className="flex-shrink-0 w-80">
          {!isAddingStage ? (
            <Button
              variant="ghost"
              fullWidth
              className="h-24 border-2 border-dashed border-base-300 justify-center text-base-content/50 hover:border-primary hover:text-primary"
              onClick={() => setIsAddingStage(true)}
            >
              <Plus size={24} className="mr-2" />
              Adicionar Coluna
            </Button>
          ) : (
            <div className="p-4 border-2 border-base-300 rounded-lg bg-base-200">
              <input
                autoFocus
                type="text"
                placeholder="Nome da coluna..."
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddStage();
                }}
                className="input input-bordered w-full mb-3 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddStage}
                  fullWidth
                >
                  Adicionar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAddingStage(false);
                    setNewStageName('');
                  }}
                  fullWidth
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Automations Section */}
      <div className="mt-8 p-6 bg-base-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-base-content">⚙️ Automatizações</h3>
          <Button variant="primary" size="sm">
            <Plus size={16} className="mr-2" />
            Nova Automatização
          </Button>
        </div>

        {pipeline.automations && pipeline.automations.length > 0 ? (
          <div className="space-y-2">
            {pipeline.automations.map((automation) => (
              <div key={automation.id} className="p-3 bg-base-100 rounded border border-base-300 flex items-center justify-between">
                <div>
                  <p className="font-medium text-base-content">{automation.name}</p>
                  {automation.description && (
                    <p className="text-sm text-base-content/70">{automation.description}</p>
                  )}
                  <p className="text-xs text-base-content/60 mt-1">
                    Trigger: {automation.trigger.type} • Ações: {automation.actions.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={automation.enabled}
                    readOnly
                  />
                  <Button variant="ghost" size="sm" className="text-error">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-base-content/60">Nenhuma automatização configurada</p>
            <p className="text-sm text-base-content/50 mt-1">Crie uma automatização para otimizar seu workflow</p>
          </div>
        )}
      </div>
    </div>
  );
}
