'use client';

import { useState } from 'react';
import { Card, Button, Text } from '@/app/components/UI';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCardModal } from './KanbanCardModal';
import { AddStageModal } from './AddStageModal';
import { AutomationModal } from './AutomationModal';
import { Plus, Zap } from 'lucide-react';
import type { Pipeline, PipelineCard, PipelineStage, PipelineAutomation } from '@/app/types/pipeline';

interface KanbanBoardProps {
  pipeline: Pipeline;
  onUpdatePipeline: (pipeline: Pipeline) => void;
}

export function KanbanBoard({ pipeline, onUpdatePipeline }: KanbanBoardProps) {
  const [cards, setCards] = useState<PipelineCard[]>(pipeline.cards);
  const [stages, setStages] = useState<PipelineStage[]>(pipeline.stages);
  const [automations, setAutomations] = useState<PipelineAutomation[]>(
    pipeline.automations || []
  );
  const [showAddCard, setShowAddCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<PipelineCard | null>(null);
  const [showAddStage, setShowAddStage] = useState(false);
  const [showAddAutomation, setShowAddAutomation] = useState(false);

  const handleAddCard = (stageId: string, cardData: Partial<PipelineCard>) => {
    const newCard: PipelineCard = {
      id: `card-${Date.now()}`,
      title: cardData.title || 'Novo Item',
      description: cardData.description,
      stageId,
      assignedTo: cardData.assignedTo,
      labels: cardData.labels || [],
      priority: cardData.priority || 'medium',
      order: cards.filter((c) => c.stageId === stageId).length,
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    onUpdatePipeline({ ...pipeline, cards: updatedCards });
    setShowAddCard(null);
  };

  const handleMoveCard = (cardId: string, targetStageId: string) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, stageId: targetStageId } : card
    );
    setCards(updatedCards);
    onUpdatePipeline({ ...pipeline, cards: updatedCards });
  };

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = cards.filter((c) => c.id !== cardId);
    setCards(updatedCards);
    onUpdatePipeline({ ...pipeline, cards: updatedCards });
  };

  const handleUpdateCard = (updatedCard: PipelineCard) => {
    const updatedCards = cards.map((c) =>
      c.id === updatedCard.id ? updatedCard : c
    );
    setCards(updatedCards);
    onUpdatePipeline({ ...pipeline, cards: updatedCards });
    setSelectedCard(null);
  };

  const handleAddStage = (stageName: string, stageColor: string) => {
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: stageName,
      color: stageColor,
      order: stages.length,
    };

    const updatedStages = [...stages, newStage];
    setStages(updatedStages);
    onUpdatePipeline({ ...pipeline, stages: updatedStages });
    setShowAddStage(false);
  };

  const handleAddAutomation = (automation: PipelineAutomation) => {
    const updatedAutomations = [...automations, automation];
    setAutomations(updatedAutomations);
    onUpdatePipeline({ ...pipeline, automations: updatedAutomations });
    setShowAddAutomation(false);
  };

  return (
    <div className="space-y-4">
      {/* Header com botões de ação */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddStage(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Nova Coluna
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowAddAutomation(true)}
          className="gap-2"
        >
          <Zap size={16} />
          Automatizações ({automations.length})
        </Button>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            cards={cards.filter((c) => c.stageId === stage.id)}
            onAddCard={() => setShowAddCard(stage.id)}
            onSelectCard={setSelectedCard}
            onMoveCard={handleMoveCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>

      {showAddCard && (
        <KanbanCardModal
          isOpen={true}
          onClose={() => setShowAddCard(null)}
          onSubmit={(data) => handleAddCard(showAddCard, data)}
          title="Novo Item"
        />
      )}

      {selectedCard && (
        <KanbanCardModal
          isOpen={true}
          onClose={() => setSelectedCard(null)}
          onSubmit={(data) => handleUpdateCard({ ...selectedCard, ...data })}
          title="Editar Item"
          initialData={selectedCard}
          onDelete={() => {
            handleDeleteCard(selectedCard.id);
            setSelectedCard(null);
          }}
        />
      )}

      {/* Modal para adicionar coluna */}
      <AddStageModal
        isOpen={showAddStage}
        onClose={() => setShowAddStage(false)}
        onSubmit={handleAddStage}
      />

      {/* Modal para automatizações */}
      <AutomationModal
        isOpen={showAddAutomation}
        onClose={() => setShowAddAutomation(false)}
        onSubmit={handleAddAutomation}
        stages={stages}
      />
    </div>
  );
}
