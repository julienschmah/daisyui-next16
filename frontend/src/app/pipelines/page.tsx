'use client';

import { useState } from 'react';
import { Header, Button, Card } from '@/components/ui';
import { PipelineList, PipelineModal, PipelineEditModal } from '@/components/forms/pipeline';
import type { Pipeline } from '@/types/pipeline';

export default function PipelinesPage() {
  const [showNewPipelineModal, setShowNewPipelineModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Vendas',
      description: 'Pipeline de vendas padrão',
      stages: [
        { id: '1-1', name: 'Novo', color: '#3B82F6', order: 0 },
        { id: '1-2', name: 'Em Negociação', color: '#F59E0B', order: 1 },
        { id: '1-3', name: 'Proposta', color: '#8B5CF6', order: 2 },
        { id: '1-4', name: 'Fechado', color: '#10B981', order: 3 },
      ],
      cards: [],
      relatedAssets: ['lead'],
      relatedUsers: [],
      labels: ['vendas', 'estratégico'],
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const handleAddPipeline = (name: string, description: string) => {
    const newPipeline: Pipeline = {
      id: `pipeline-${Date.now()}`,
      name,
      description,
      stages: [
        { id: `stage-${Date.now()}-1`, name: 'Novo', color: '#3B82F6', order: 0 },
        { id: `stage-${Date.now()}-2`, name: 'Em Progresso', color: '#F59E0B', order: 1 },
        { id: `stage-${Date.now()}-3`, name: 'Concluído', color: '#10B981', order: 2 },
      ],
      cards: [],
      relatedAssets: ['lead'],
      relatedUsers: [],
      labels: [],
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPipelines([...pipelines, newPipeline]);
    setShowNewPipelineModal(false);
  };

  const handleEditPipeline = (updatedPipeline: Pipeline) => {
    setPipelines(
      pipelines.map((p) => (p.id === updatedPipeline.id ? updatedPipeline : p))
    );
    setShowEditModal(false);
    setSelectedPipeline(null);
  };

  const handleDeletePipeline = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este pipeline?')) {
      setPipelines(pipelines.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Header title="Pipelines" subtitle="Gerencie suas pipelines e esteiras" icon="📊" />
        <Button variant="primary" onClick={() => setShowNewPipelineModal(true)}>
          Nova Pipeline
        </Button>
      </div>

      <PipelineList
        pipelines={pipelines}
        onEdit={(pipeline) => {
          setSelectedPipeline(pipeline);
          setShowEditModal(true);
        }}
        onDelete={handleDeletePipeline}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
            Total de Pipelines
          </div>
          <div className="text-3xl font-bold text-base-content">{pipelines.length}</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
            Total de Estágios
          </div>
          <div className="text-3xl font-bold text-info">
            {pipelines.reduce((sum, p) => sum + (p.stages?.length || 0), 0)}
          </div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
            Total de Cards
          </div>
          <div className="text-3xl font-bold text-success">
            {pipelines.reduce((sum, p) => sum + (p.cards?.length || 0), 0)}
          </div>
        </Card>
      </div>

      <PipelineModal
        isOpen={showNewPipelineModal}
        onClose={() => setShowNewPipelineModal(false)}
        onSubmit={handleAddPipeline}
      />

      <PipelineEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditPipeline}
        pipeline={selectedPipeline}
      />
    </div>
  );
}
