'use client';

import Link from 'next/link';
import { Card, Button, Text, Badge } from '@/app/components/UI';
import { Trash2, Edit2, Eye } from 'lucide-react';
import type { Pipeline } from '@/app/types/pipeline';

interface PipelineListProps {
  pipelines: Pipeline[];
  onDelete: (id: string) => void;
  onEdit: (pipeline: Pipeline) => void;
}

export function PipelineList({ pipelines, onDelete, onEdit }: PipelineListProps) {
  const assetLabels = {
    imovel: '🏠 Imóvel',
    cliente: '👤 Cliente',
    lead: '🎯 Lead',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pipelines.map((pipeline) => (
        <Card key={pipeline.id} className="hover:shadow-xl transition-shadow">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">{pipeline.name}</h3>
                {pipeline.description && (
                  <p className="text-sm text-base-content/70 mt-1">
                    {pipeline.description}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Text variant="caption" className="text-base-content/60 mb-2 block">
                {pipeline.stages.length} Etapas
              </Text>
              <div className="flex flex-wrap gap-2">
                {pipeline.stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: stage.color || '#6B7280' }}
                  >
                    {stage.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Text variant="caption" className="text-base-content/60 mb-2 block">
                Ativos
              </Text>
              <div className="flex flex-wrap gap-2">
                {pipeline.relatedAssets.map((asset) => (
                  <Badge key={asset} variant="primary">
                    {assetLabels[asset as keyof typeof assetLabels] || asset}
                  </Badge>
                ))}
              </div>
            </div>

            {pipeline.labels && pipeline.labels.length > 0 && (
              <div>
                <Text variant="caption" className="text-base-content/60 mb-2 block">
                  Etiquetas
                </Text>
                <div className="flex flex-wrap gap-2">
                  {pipeline.labels.map((label) => (
                    <Badge key={label} variant="secondary">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-base-300">
              <Text variant="caption" className="text-base-content/60">
                {pipeline.cards.length} itens no pipeline
              </Text>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href={`/pipelines/${pipeline.id}`} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Eye size={16} />
                  Visualizar
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(pipeline)}
              >
                <Edit2 size={16} />
              </Button>
              <Button
                variant="error"
                size="sm"
                onClick={() => onDelete(pipeline.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
