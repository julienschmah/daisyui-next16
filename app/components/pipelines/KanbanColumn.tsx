'use client';

import { Card, Button, Text, Badge } from '@/app/components/UI';
import { Plus, Trash2 } from 'lucide-react';
import type { PipelineCard, PipelineStage } from '@/app/types/pipeline';

interface KanbanColumnProps {
  stage: PipelineStage;
  cards: PipelineCard[];
  onAddCard: () => void;
  onSelectCard: (card: PipelineCard) => void;
  onMoveCard: (cardId: string, targetStageId: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export function KanbanColumn({
  stage,
  cards,
  onAddCard,
  onSelectCard,
  onMoveCard,
  onDeleteCard,
}: KanbanColumnProps) {
  const priorityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    urgent: '#DC2626',
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-base-200');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-base-200');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-base-200');
    
    const cardId = e.dataTransfer.getData('cardId');
    if (cardId) {
      onMoveCard(cardId, stage.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex-shrink-0 w-80 bg-base-200 rounded-lg p-4 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: stage.color || '#6B7280' }}
          />
          <h3 className="font-bold">{stage.name}</h3>
          <Badge variant="primary">{cards.length}</Badge>
        </div>
      </div>

      {/* Cards Container */}
      <div className="space-y-3 min-h-80">
        {cards.map((card) => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('cardId', card.id)}
            onClick={() => onSelectCard(card)}
            className="bg-white rounded-lg p-3 shadow cursor-move hover:shadow-md transition-shadow border-l-4"
            style={{ borderLeftColor: priorityColors[card.priority || 'medium'] }}
          >
            <div className="space-y-2">
              <p className="font-medium text-sm line-clamp-2">{card.title}</p>
              
              {card.description && (
                <p className="text-xs text-base-content/70 line-clamp-2">
                  {card.description}
                </p>
              )}

              {card.labels && card.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {card.labels.map((label) => (
                    <span
                      key={label}
                      className="text-xs bg-base-300 px-2 py-1 rounded"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {card.dueDate && (
                <p className="text-xs text-base-content/60">
                  📅 {new Date(card.dueDate).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="text-center py-8 text-base-content/50">
            <p className="text-sm">Nenhum item</p>
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={onAddCard}
        className="w-full mt-4 btn btn-sm btn-outline btn-primary gap-2"
      >
        <Plus size={16} />
        Adicionar Item
      </button>
    </div>
  );
}
