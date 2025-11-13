import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from '../../src/components/ui/pipelines/KanbanBoard';
import type { Pipeline } from '../../src/types/pipeline';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Pipelines/Kanban Board',
  component: KanbanBoard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockPipeline: Pipeline = {
  id: '1',
  name: 'Pipeline de Vendas',
  description: 'Funil completo de vendas com múltiplas etapas',
  stages: [
    { id: 'stage-1', name: 'Novo', color: '#3B82F6', order: 0 },
    { id: 'stage-2', name: 'Em Negociação', color: '#F59E0B', order: 1 },
    { id: 'stage-3', name: 'Proposta', color: '#8B5CF6', order: 2 },
    { id: 'stage-4', name: 'Fechado', color: '#10B981', order: 3 },
  ],
  cards: [
    {
      id: 'card-1',
      title: 'Venda ABC Corp',
      description: 'Projeto de integração de sistemas',
      stageId: 'stage-1',
      priority: 'high',
      labels: ['importante', 'estratégico'],
      order: 0,
    },
    {
      id: 'card-2',
      title: 'Consultoria XYZ',
      description: 'Análise de requisitos em andamento',
      stageId: 'stage-2',
      assignedTo: 'João Silva',
      priority: 'medium',
      labels: ['urgente'],
      order: 0,
    },
    {
      id: 'card-3',
      title: 'Manutenção Preventiva',
      description: 'Proposta técnica já enviada',
      stageId: 'stage-3',
      assignedTo: 'Maria Santos',
      priority: 'low',
      labels: ['follow-up'],
      order: 0,
    },
    {
      id: 'card-4',
      title: 'Contrato Renovado',
      description: 'Cliente satisfeito, renovação anual',
      stageId: 'stage-4',
      assignedTo: 'Pedro Costa',
      priority: 'low',
      dueDate: new Date('2025-12-31'),
      order: 0,
    },
  ],
  relatedAssets: ['lead'],
  relatedUsers: ['João Silva', 'Maria Santos', 'Pedro Costa'],
  labels: ['vendas', 'estratégico'],
  createdBy: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Default: Story = {
  args: {
    pipeline: mockPipeline,
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};

export const WithManyCards: Story = {
  args: {
    pipeline: {
      ...mockPipeline,
      cards: [
        ...mockPipeline.cards,
        {
          id: 'card-5',
          title: 'Projeto A',
          description: 'Desenvolvimento em progresso',
          stageId: 'stage-1',
          priority: 'high',
          labels: ['novo'],
          order: 1,
        },
        {
          id: 'card-6',
          title: 'Projeto B',
          description: 'Análise de viabilidade',
          stageId: 'stage-1',
          priority: 'medium',
          labels: ['análise'],
          order: 2,
        },
        {
          id: 'card-7',
          title: 'Projeto C',
          description: 'Aguardando feedback',
          stageId: 'stage-2',
          priority: 'high',
          assignedTo: 'João Silva',
          labels: ['bloqueado'],
          order: 1,
        },
        {
          id: 'card-8',
          title: 'Projeto D',
          description: 'Proposta revisada',
          stageId: 'stage-3',
          priority: 'medium',
          assignedTo: 'Maria Santos',
          order: 1,
        },
        {
          id: 'card-9',
          title: 'Projeto E',
          description: 'Contrato assinado',
          stageId: 'stage-4',
          priority: 'low',
          assignedTo: 'Pedro Costa',
          dueDate: new Date('2025-11-30'),
          order: 1,
        },
      ],
    },
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};

export const CustomStages: Story = {
  args: {
    pipeline: {
      ...mockPipeline,
      name: 'Pipeline de Desenvolvimento',
      stages: [
        { id: 'stage-a', name: 'Backlog', color: '#6B7280', order: 0 },
        { id: 'stage-b', name: 'Em Planejamento', color: '#3B82F6', order: 1 },
        { id: 'stage-c', name: 'Em Desenvolvimento', color: '#F59E0B', order: 2 },
        { id: 'stage-d', name: 'Em Revisão', color: '#8B5CF6', order: 3 },
        { id: 'stage-e', name: 'Em Testes', color: '#EC4899', order: 4 },
        { id: 'stage-f', name: 'Pronto', color: '#10B981', order: 5 },
      ],
      cards: [
        {
          id: 'task-1',
          title: 'Implementar autenticação',
          description: 'OAuth2 com Google',
          stageId: 'stage-b',
          priority: 'high',
          assignedTo: 'Dev Team',
          labels: ['backend'],
          order: 0,
        },
        {
          id: 'task-2',
          title: 'Criar dashboard',
          description: 'Página inicial com gráficos',
          stageId: 'stage-c',
          priority: 'high',
          assignedTo: 'Frontend Team',
          labels: ['frontend', 'ui'],
          order: 0,
        },
        {
          id: 'task-3',
          title: 'Testes unitários',
          description: 'Cobertura de 80%',
          stageId: 'stage-e',
          priority: 'medium',
          assignedTo: 'QA Team',
          labels: ['testing'],
          order: 0,
        },
        {
          id: 'task-4',
          title: 'Documentação API',
          description: 'Swagger/OpenAPI',
          stageId: 'stage-f',
          priority: 'low',
          labels: ['docs'],
          order: 0,
        },
      ],
    },
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};

export const WithPriorities: Story = {
  args: {
    pipeline: {
      ...mockPipeline,
      cards: [
        {
          id: 'urgent-1',
          title: '🔴 URGENTE: Sistema Down',
          description: 'Servidor em produção offline',
          stageId: 'stage-1',
          priority: 'urgent',
          labels: ['crítico', 'produção'],
          order: 0,
        },
        {
          id: 'high-1',
          title: 'Bug crítico em checkout',
          description: 'Clientes não conseguem comprar',
          stageId: 'stage-2',
          priority: 'high',
          assignedTo: 'João Silva',
          labels: ['bug', 'e-commerce'],
          order: 0,
        },
        {
          id: 'medium-1',
          title: 'Melhorar performance',
          description: 'Otimizar queries do banco',
          stageId: 'stage-3',
          priority: 'medium',
          labels: ['performance'],
          order: 0,
        },
        {
          id: 'low-1',
          title: 'Atualizar documentação',
          description: 'Adicionar novos exemplos',
          stageId: 'stage-4',
          priority: 'low',
          labels: ['docs'],
          order: 0,
        },
      ],
    },
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};

export const EmptyStages: Story = {
  args: {
    pipeline: {
      ...mockPipeline,
      cards: [],
    },
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};

export const SupportPipeline: Story = {
  args: {
    pipeline: {
      id: '2',
      name: 'Pipeline de Suporte Técnico',
      description: 'Tickets de suporte e atendimento',
      stages: [
        { id: 'sup-1', name: 'Aberto', color: '#EF4444', order: 0 },
        { id: 'sup-2', name: 'Em Atendimento', color: '#F59E0B', order: 1 },
        { id: 'sup-3', name: 'Aguardando Cliente', color: '#6366F1', order: 2 },
        { id: 'sup-4', name: 'Resolvido', color: '#10B981', order: 3 },
        { id: 'sup-5', name: 'Fechado', color: '#6B7280', order: 4 },
      ],
      cards: [
        {
          id: 'ticket-1',
          title: '#1001 - Erro ao fazer login',
          description: 'Usuário não consegue acessar conta',
          stageId: 'sup-1',
          priority: 'high',
          labels: ['autenticação', 'crítico'],
          order: 0,
        },
        {
          id: 'ticket-2',
          title: '#1002 - Problema de integração',
          description: 'API retorna erro 500',
          stageId: 'sup-2',
          assignedTo: 'Carlos Dev',
          priority: 'high',
          labels: ['api', 'integração'],
          order: 0,
        },
        {
          id: 'ticket-3',
          title: '#1003 - Dúvida sobre licença',
          description: 'Cliente pergunta sobre renovação',
          stageId: 'sup-3',
          assignedTo: 'Ana Suporte',
          priority: 'low',
          labels: ['billing', 'informação'],
          order: 0,
        },
        {
          id: 'ticket-4',
          title: '#1004 - Relatório corrompido',
          description: 'Arquivo PDF não abre corretamente',
          stageId: 'sup-4',
          priority: 'medium',
          labels: ['relatórios'],
          order: 0,
        },
      ],
      relatedAssets: ['cliente'],
      relatedUsers: ['Carlos Dev', 'Ana Suporte'],
      labels: ['suporte', 'tickets'],
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};

export const RealEstateLeads: Story = {
  args: {
    pipeline: {
      id: '3',
      name: 'Pipeline de Imóveis',
      description: 'Gestão de leads e vendas imobiliárias',
      stages: [
        { id: 're-1', name: 'Lead Novo', color: '#3B82F6', order: 0 },
        { id: 're-2', name: 'Contato Realizado', color: '#F59E0B', order: 1 },
        { id: 're-3', name: 'Visita Agendada', color: '#8B5CF6', order: 2 },
        { id: 're-4', name: 'Proposta Enviada', color: '#06B6D4', order: 3 },
        { id: 're-5', name: 'Negociação', color: '#EC4899', order: 4 },
        { id: 're-6', name: 'Fechado', color: '#10B981', order: 5 },
      ],
      cards: [
        {
          id: 'lead-1',
          title: 'Sr. João - Apt 3 Qtos',
          description: 'Buscando imóvel na zona sul',
          stageId: 're-1',
          priority: 'high',
          labels: ['apartamento', 'zona-sul'],
          order: 0,
        },
        {
          id: 'lead-2',
          title: 'Dra. Maria - Casa com piscina',
          description: 'Orçamento até R$ 500k',
          stageId: 're-2',
          assignedTo: 'Vendedor 1',
          priority: 'high',
          labels: ['casa', 'piscina'],
          order: 0,
        },
        {
          id: 'lead-3',
          title: 'Família Silva - Galpão',
          description: 'Para fins comerciais',
          stageId: 're-3',
          assignedTo: 'Vendedor 2',
          priority: 'medium',
          labels: ['comercial', 'galpão'],
          dueDate: new Date('2025-11-20'),
          order: 0,
        },
        {
          id: 'lead-4',
          title: 'Empresa XYZ - Sala Comercial',
          description: 'Espaço para escritório',
          stageId: 're-4',
          priority: 'medium',
          labels: ['comercial'],
          order: 0,
        },
        {
          id: 'lead-5',
          title: 'Casal Costa - Cobertura',
          description: 'Negosiando valor final',
          stageId: 're-5',
          assignedTo: 'Gerente',
          priority: 'high',
          labels: ['cobertura', 'venda-quente'],
          order: 0,
        },
        {
          id: 'lead-6',
          title: 'Investidor ABC - Prédio',
          description: 'Compra concluída, documentação',
          stageId: 're-6',
          priority: 'low',
          labels: ['prédio', 'investimento'],
          dueDate: new Date('2025-11-15'),
          order: 0,
        },
      ],
      relatedAssets: ['imovel', 'cliente'],
      relatedUsers: ['Vendedor 1', 'Vendedor 2', 'Gerente'],
      labels: ['imóveis', 'vendas'],
      createdBy: 'gerente-vendas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    onUpdatePipeline: (pipeline) => console.log('Pipeline atualizado:', pipeline),
  },
};
