// Pipeline Stage/Etapa
export interface PipelineStage {
  id: string;
  name: string;
  color?: string;
  order: number;
}

// Automatização
export interface PipelineAutomation {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  trigger: {
    type: 'card_moved_to' | 'card_created' | 'card_updated' | 'time_based';
    stageId?: string; // para card_moved_to
    daysDelay?: number; // para time_based
  };
  actions: {
    type: 'move_to_stage' | 'assign_user' | 'add_label' | 'notify';
    value?: string; // stageId, userId, label, or message
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Item no Pipeline
export interface PipelineCard {
  id: string;
  title: string;
  description?: string;
  stageId: string;
  assignedTo?: string;
  labels?: string[];
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  order: number;
}

// Pipeline / Funil
export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  stages: PipelineStage[];
  cards: PipelineCard[];
  automations?: PipelineAutomation[];
  relatedAssets: ('imovel' | 'cliente' | 'lead')[];
  relatedUsers: string[];
  labels: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  archived?: boolean;
}

// Form Data para criar/editar Pipeline
export interface PipelineFormData {
  name: string;
  description?: string;
  relatedAssets: ('imovel' | 'cliente' | 'lead')[];
  relatedUsers: string[];
  stages: Omit<PipelineStage, 'id'>[];
}
