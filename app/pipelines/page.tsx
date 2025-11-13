'use client';

import { useState } from 'react';
import { Header, Button, Card, Text } from '@/app/components/UI';
import { PipelineList } from '@/app/components/pipelines/PipelineList';
import { PipelineModal } from '@/app/components/pipelines/PipelineModal';
import { PipelineEditModal } from '@/app/components/pipelines/PipelineEditModal';
import type { Pipeline } from '@/app/types/pipeline';

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
      relatedAssets: ['lead'] as const,
      relatedUsers: [],
      labels: ['vendas', 'estratégico'],
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const handleCreatePipeline = (newPipeline: any) => {
    const pipelineToAdd: Pipeline = {
      ...newPipeline,
      id: Date.now().toString(),
      cards: [],
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      relatedUsers: newPipeline.relatedUsers || [],
      labels: newPipeline.labels || [],
    };
    setPipelines([...pipelines, pipelineToAdd]);
    setShowNewPipelineModal(false);
  };

  const handleDeletePipeline = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este pipeline?')) {
      setPipelines(pipelines.filter((p) => p.id !== id));
    }
  };

  const handleEditPipeline = (pipeline: Pipeline) => {
    setSelectedPipeline(pipeline);
    setShowEditModal(true);
  };

  const handleUpdatePipeline = (updatedPipeline: Pipeline) => {
    setPipelines(
      pipelines.map((p) => (p.id === updatedPipeline.id ? updatedPipeline : p))
    );
    setShowEditModal(false);
    setSelectedPipeline(null);
  };

  return (
    <div>
      <Header
          title="Gestão de Esteiras / Pipeline"
          subtitle="Organize e gerencie seus projetos e atendimentos"
          icon="📊"
          action={
            <Button
              variant="primary"
              onClick={() => setShowNewPipelineModal(true)}
            >
              + Nova Esteira
            </Button>
          }
        />

        <div className="grid gap-4">
          {pipelines.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <Text variant="label" className="mb-2 block">
                  Nenhuma esteira criada
                </Text>
                <Text variant="body" className="text-base-content/70 mb-4">
                  Comece criando sua primeira esteira para organizar seus projetos
                </Text>
                <Button
                  variant="primary"
                  onClick={() => setShowNewPipelineModal(true)}
                >
                  Criar Esteira
                </Button>
              </div>
            </Card>
          ) : (
            <PipelineList
              pipelines={pipelines}
              onDelete={handleDeletePipeline}
              onEdit={handleEditPipeline}
            />
          )}
        </div>

        <PipelineModal
          isOpen={showNewPipelineModal}
          onClose={() => setShowNewPipelineModal(false)}
          onSubmit={handleCreatePipeline}
        />

        <PipelineEditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPipeline(null);
          }}
          onSubmit={handleUpdatePipeline}
          pipeline={selectedPipeline}
        />
    </div>
  );
}
