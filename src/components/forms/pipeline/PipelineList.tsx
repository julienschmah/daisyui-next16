'use client';

import { Card, Button, Badge } from '@/components/ui';
import { Trash2, Edit2, Eye } from 'lucide-react';
import Link from 'next/link';
import type { Pipeline } from '@/types/pipeline';

interface PipelineListProps {
  pipelines: Pipeline[];
  onEdit: (pipeline: Pipeline) => void;
  onDelete: (id: string) => void;
}

export function PipelineList({ pipelines, onEdit, onDelete }: PipelineListProps) {
  return (
    <div className="space-y-4">
      {pipelines.map((pipeline) => (
        <Card key={pipeline.id} className="hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-base-content text-lg">{pipeline.name}</h3>
              {pipeline.description && (
                <p className="text-sm text-base-content/70 mt-1">{pipeline.description}</p>
              )}
              
              <div className="flex gap-2 mt-3">
                {pipeline.stages?.slice(0, 4).map((stage) => (
                  <div
                    key={stage.id}
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: stage.color || '#999' }}
                  >
                    {stage.name}
                  </div>
                ))}
                {pipeline.stages && pipeline.stages.length > 4 && (
                  <Badge>+{pipeline.stages.length - 4} mais</Badge>
                )}
              </div>

              {pipeline.labels && pipeline.labels.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {pipeline.labels.map((label) => (
                    <Badge key={label} variant="info">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <Link href={`/pipelines/${pipeline.id}`}>
                <Button 
                  variant="primary" 
                  size="sm"
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
                variant="ghost" 
                size="sm"
                onClick={() => onDelete(pipeline.id)}
              >
                <Trash2 size={16} className="text-error" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
