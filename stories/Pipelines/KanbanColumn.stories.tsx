import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanColumn } from '../../app/components/pipelines/KanbanColumn';
import type { PipelineCard, PipelineStage } from '../../app/types/pipeline';

const meta: Meta<typeof KanbanColumn> = {
  title: 'Pipelines/Kanban Column',
  component: KanbanColumn,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockStage: PipelineStage = {
  id: 'stage-1',
  name: 'Em Progresso',
  color: '#F59E0B',
  order: 0,
};

export const Empty: Story = {
  args: {
    stage: mockStage,
    cards: [],
    onAddCard: () => console.log('Adicionar card'),
    onSelectCard: (card) => console.log('Card selecionado:', card),
    onMoveCard: (cardId, stageId) =>
      console.log(`Mover card ${cardId} para ${stageId}`),
    onDeleteCard: (cardId) => console.log('Deletar card:', cardId),
  },
};

export const WithCards: Story = {
  args: {
    stage: mockStage,
    cards: [
      {
        id: 'card-1',
        title: 'Implementar autenticação',
        description: 'OAuth2 com Google e GitHub',
        stageId: 'stage-1',
        priority: 'high',
        labels: ['backend', 'segurança'],
        order: 0,
      },
      {
        id: 'card-2',
        title: 'Criar dashboard',
        description: 'Página inicial com gráficos',
        stageId: 'stage-1',
        priority: 'medium',
        assignedTo: 'João Silva',
        labels: ['frontend', 'ui'],
        order: 1,
      },
      {
        id: 'card-3',
        title: 'Otimizar performance',
        description: 'Reduzir bundle size em 30%',
        stageId: 'stage-1',
        priority: 'low',
        labels: ['performance'],
        order: 2,
      },
    ] as PipelineCard[],
    onAddCard: () => console.log('Adicionar card'),
    onSelectCard: (card) => console.log('Card selecionado:', card),
    onMoveCard: (cardId, stageId) =>
      console.log(`Mover card ${cardId} para ${stageId}`),
    onDeleteCard: (cardId) => console.log('Deletar card:', cardId),
  },
};

export const HighPriority: Story = {
  args: {
    stage: {
      ...mockStage,
      name: 'CRÍTICO',
      color: '#EF4444',
    },
    cards: [
      {
        id: 'urgent-1',
        title: '🔴 SISTEMA OFFLINE',
        description: 'Servidor em produção não responde',
        stageId: 'stage-1',
        priority: 'urgent',
        labels: ['crítico', 'produção', 'p0'],
        order: 0,
      },
      {
        id: 'urgent-2',
        title: 'Bug em checkout',
        description: 'Clientes não conseguem pagar',
        stageId: 'stage-1',
        priority: 'urgent',
        assignedTo: 'Admin Team',
        labels: ['bug', 'e-commerce', 'p0'],
        order: 1,
      },
    ] as PipelineCard[],
    onAddCard: () => console.log('Adicionar card'),
    onSelectCard: (card) => console.log('Card selecionado:', card),
    onMoveCard: (cardId, stageId) =>
      console.log(`Mover card ${cardId} para ${stageId}`),
    onDeleteCard: (cardId) => console.log('Deletar card:', cardId),
  },
};

export const WithDueDates: Story = {
  args: {
    stage: {
      ...mockStage,
      name: 'Próximas Tarefas',
      color: '#3B82F6',
    },
    cards: [
      {
        id: 'task-1',
        title: 'Apresentação para cliente',
        description: 'Demonstração do novo sistema',
        stageId: 'stage-1',
        priority: 'high',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias
        labels: ['apresentação', 'cliente'],
        assignedTo: 'Sales Team',
        order: 0,
      },
      {
        id: 'task-2',
        title: 'Reunião com stakeholders',
        description: 'Discussão de roadmap Q4',
        stageId: 'stage-1',
        priority: 'medium',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
        labels: ['reunião', 'planejamento'],
        order: 1,
      },
    ] as PipelineCard[],
    onAddCard: () => console.log('Adicionar card'),
    onSelectCard: (card) => console.log('Card selecionado:', card),
    onMoveCard: (cardId, stageId) =>
      console.log(`Mover card ${cardId} para ${stageId}`),
    onDeleteCard: (cardId) => console.log('Deletar card:', cardId),
  },
};

export const ManyCards: Story = {
  args: {
    stage: {
      ...mockStage,
      name: 'Backlog',
    },
    cards: Array.from({ length: 10 }, (_, i) => ({
      id: `card-${i}`,
      title: `Tarefa ${i + 1}`,
      description: `Descrição da tarefa ${i + 1}`,
      stageId: 'stage-1',
      priority: ['low', 'medium', 'high'][i % 3] as any,
      labels: [`label-${i}`],
      order: i,
    })) as PipelineCard[],
    onAddCard: () => console.log('Adicionar card'),
    onSelectCard: (card) => console.log('Card selecionado:', card),
    onMoveCard: (cardId, stageId) =>
      console.log(`Mover card ${cardId} para ${stageId}`),
    onDeleteCard: (cardId) => console.log('Deletar card:', cardId),
  },
};

export const DifferentColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <KanbanColumn
        stage={{ id: 's1', name: 'Todo', color: '#3B82F6', order: 0 }}
        cards={[]}
        onAddCard={() => {}}
        onSelectCard={() => {}}
        onMoveCard={() => {}}
        onDeleteCard={() => {}}
      />
      <KanbanColumn
        stage={{ id: 's2', name: 'In Progress', color: '#F59E0B', order: 1 }}
        cards={[]}
        onAddCard={() => {}}
        onSelectCard={() => {}}
        onMoveCard={() => {}}
        onDeleteCard={() => {}}
      />
      <KanbanColumn
        stage={{ id: 's3', name: 'Review', color: '#8B5CF6', order: 2 }}
        cards={[]}
        onAddCard={() => {}}
        onSelectCard={() => {}}
        onMoveCard={() => {}}
        onDeleteCard={() => {}}
      />
      <KanbanColumn
        stage={{ id: 's4', name: 'Done', color: '#10B981', order: 3 }}
        cards={[]}
        onAddCard={() => {}}
        onSelectCard={() => {}}
        onMoveCard={() => {}}
        onDeleteCard={() => {}}
      />
    </div>
  ),
};
