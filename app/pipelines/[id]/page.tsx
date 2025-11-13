'use client';

import Link from 'next/link';
import { useState } from 'react';
import { use } from 'react';
import { Header, Button } from '@/app/components/UI';
import { KanbanBoard } from '@/app/components/pipelines/KanbanBoard';
import { ChevronLeft } from 'lucide-react';
import type { Pipeline } from '@/app/types/pipeline';

// Mock data - em produção viria de um banco de dados
const MOCK_PIPELINES: Record<string, Pipeline> = {
  '1': {
    id: '1',
    name: 'Vendas',
    description: 'Pipeline de vendas padrão',
    stages: [
      { id: '1-1', name: 'Novo', color: '#3B82F6', order: 0 },
      { id: '1-2', name: 'Em Negociação', color: '#F59E0B', order: 1 },
      { id: '1-3', name: 'Proposta', color: '#8B5CF6', order: 2 },
      { id: '1-4', name: 'Fechado', color: '#10B981', order: 3 },
    ],
    cards: [
        {
          id: 'card-1',
          title: 'Venda para ABC Corp',
          description: 'Projeto de 50k',
          stageId: '1-1',
          priority: 'high',
          labels: ['importante'],
          order: 0,
        },
        {
          id: 'card-2',
          title: 'Negociação XYZ',
          description: 'Em discussão com cliente',
          stageId: '1-2',
          priority: 'medium',
          labels: ['urgente'],
          order: 0,
        },
      ],
      relatedAssets: ['lead'] as const,
    relatedUsers: [],
    labels: ['vendas', 'estratégico'],
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export default function PipelineViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const pipelineId = resolvedParams.id;
  const [pipeline, setPipeline] = useState<Pipeline>(
    MOCK_PIPELINES[pipelineId] || MOCK_PIPELINES['1']
  );

  const handleUpdatePipeline = (updatedPipeline: Pipeline) => {
    setPipeline(updatedPipeline);
  };

  return (
    <div>
      {/* Header com botão voltar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/pipelines">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft size={20} />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Título */}
      <Header
        title={pipeline.name}
        subtitle={pipeline.description}
        icon="📊"
      />

      {/* Kanban Board */}
      <div className="mt-6">
        <KanbanBoard
          pipeline={pipeline}
          onUpdatePipeline={handleUpdatePipeline}
        />
      </div>
    </div>
  );
}
