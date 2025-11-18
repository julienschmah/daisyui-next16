// ============================================================================
// PROFISSIONAL
// ============================================================================
export interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  foto?: string;
  bio?: string;
  especialidade: string; // 'encanador', 'eletricista', etc
  categorias: string[]; // IDs das categorias de serviço
  localizacao: {
    cidade: string;
    estado: string;
    latitude: number;
    longitude: number;
  };
  avaliacao: number; // 0-5
  totalReviews: number;
  status: 'ativo' | 'inativo' | 'bloqueado';
  documentosVerificados: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

// ============================================================================
// CLIENTE
// ============================================================================
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  foto?: string;
  localizacao: {
    cidade: string;
    estado: string;
    endereco: string;
    latitude: number;
    longitude: number;
  };
  status: 'ativo' | 'inativo' | 'bloqueado';
  dataCriacao: Date;
  dataAtualizacao: Date;
}

// ============================================================================
// SERVIÇO
// ============================================================================
export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  categoria: string; // categoria principal
  subcategorias?: string[];
  precoBase: number;
  precoMaximo?: number;
  unidade: 'hora' | 'dia' | 'projeto' | 'unidade';
  tempoEstimado: number; // em minutos
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

// ============================================================================
// PEDIDO/SOLICITAÇÃO
// ============================================================================
export type StatusPedido = 'pendente' | 'aceito' | 'em_progresso' | 'concluido' | 'cancelado' | 'rejeitado';

export interface Pedido {
  id: string;
  clienteId: string;
  cliente?: Cliente;
  profissionalId?: string;
  profissional?: Profissional;
  servicoId: string;
  servico?: Servico;
  descricao: string;
  localizacao: {
    cidade: string;
    estado: string;
    endereco: string;
    latitude: number;
    longitude: number;
  };
  dataAgendada: Date;
  precoOrcado: number;
  precoCobrado?: number;
  status: StatusPedido;
  dataCriacao: Date;
  dataAtualizacao: Date;
  dataInicio?: Date;
  dataFim?: Date;
}

// ============================================================================
// PAGAMENTO
// ============================================================================
export type StatusPagamento = 'pendente' | 'processando' | 'aprovado' | 'rejeitado' | 'reembolsado';
export type MetodoPagamento = 'credito' | 'debito' | 'pix' | 'boleto' | 'transferencia';

export interface Pagamento {
  id: string;
  pedidoId: string;
  pedido?: Pedido;
  valor: number;
  taxa: number;
  valorLiquido: number;
  metodo: MetodoPagamento;
  status: StatusPagamento;
  descricao?: string;
  dataCriacao: Date;
  dataProcessamento?: Date;
  dataAtualizacao: Date;
}

// ============================================================================
// AVALIAÇÃO/REVIEW
// ============================================================================
export interface Avaliacao {
  id: string;
  pedidoId: string;
  pedido?: Pedido;
  avaliadoId: string; // ID do profissional ou cliente
  avaliadoPor: string; // ID de quem fez a avaliação
  nota: number; // 1-5
  comentario?: string;
  dataCriacao: Date;
}

// ============================================================================
// CATEGORIA DE SERVIÇO
// ============================================================================
export interface CategoriaServico {
  id: string;
  nome: string;
  descricao?: string;
  icone?: string;
  ativa: boolean;
  ordem: number;
  dataCriacao: Date;
}

// ============================================================================
// DASHBOARD KPI
// ============================================================================
export interface DashboardKPI {
  totalProfissionais: number;
  totalClientes: number;
  totalPedidos: number;
  pedidosAtivos: number;
  receita: number;
  receitaMes: number;
  avaliacaoMedia: number;
  profissionaisAtivos: number;
}

// ============================================================================
// FILTROS E PAGINAÇÃO
// ============================================================================
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
