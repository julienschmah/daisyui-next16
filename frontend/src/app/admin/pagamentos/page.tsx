'use client';

import { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Search, Download } from 'lucide-react';
import type { Pagamento, StatusPagamento, MetodoPagamento } from '@/types/admin';

const mockPagamentos: Pagamento[] = [
  {
    id: '1',
    pedidoId: '1',
    valor: 350,
    taxa: 10.5,
    valorLiquido: 339.5,
    metodo: 'credito',
    status: 'aprovado',
    dataCriacao: new Date('2024-01-19'),
    dataProcessamento: new Date('2024-01-19'),
    dataAtualizacao: new Date('2024-01-19'),
  },
  {
    id: '2',
    pedidoId: '3',
    valor: 450,
    taxa: 13.5,
    valorLiquido: 436.5,
    metodo: 'pix',
    status: 'aprovado',
    dataCriacao: new Date('2024-01-19'),
    dataProcessamento: new Date('2024-01-19'),
    dataAtualizacao: new Date('2024-01-19'),
  },
  {
    id: '3',
    pedidoId: '2',
    valor: 280,
    taxa: 8.4,
    valorLiquido: 271.6,
    metodo: 'debito',
    status: 'pendente',
    dataCriacao: new Date('2024-01-18'),
    dataAtualizacao: new Date('2024-01-18'),
  },
];

const statusBadges = {
  pendente: 'badge badge-info',
  processando: 'badge badge-warning',
  aprovado: 'badge badge-success',
  rejeitado: 'badge badge-error',
  reembolsado: 'badge badge-neutral',
};

const metodoBadges = {
  credito: 'badge badge-primary',
  debito: 'badge badge-primary',
  pix: 'badge badge-secondary',
  boleto: 'badge badge-neutral',
  transferencia: 'badge badge-accent',
};

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(mockPagamentos);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [metodoFilter, setMetodoFilter] = useState<string>('todos');

  const filtered = pagamentos.filter((pag) => {
    const matchSearch = pag.id.toLowerCase().includes(search.toLowerCase()) ||
                       pag.pedidoId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || pag.status === statusFilter;
    const matchMetodo = metodoFilter === 'todos' || pag.metodo === metodoFilter;
    return matchSearch && matchStatus && matchMetodo;
  });

  const totalPago = filtered.reduce((sum, pag) => sum + pag.valor, 0);
  const totalLiquido = filtered.reduce((sum, pag) => sum + pag.valorLiquido, 0);
  const totalTaxas = filtered.reduce((sum, pag) => sum + pag.taxa, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pagamentos</h1>
          <p className="text-base-content/60 mt-2">Histórico e gestão de transações financeiras</p>
        </div>
        <button className="btn btn-primary gap-2">
          <Download size={20} />
          Exportar Relatório
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-sm font-medium text-base-content/70">Total Pago</h3>
            <p className="text-2xl font-bold mt-2">R$ {totalPago.toLocaleString('pt-BR')}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-sm font-medium text-base-content/70">Valor Líquido</h3>
            <p className="text-2xl font-bold mt-2">R$ {totalLiquido.toLocaleString('pt-BR')}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-sm font-medium text-base-content/70">Taxas Cobradas</h3>
            <p className="text-2xl font-bold mt-2">R$ {totalTaxas.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Pesquisar</span>
              </div>
              <label className="input input-bordered input-sm flex items-center gap-2">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="ID ou Pedido..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
              </label>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Status</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="todos">Todos</option>
                <option value="pendente">Pendente</option>
                <option value="processando">Processando</option>
                <option value="aprovado">Aprovado</option>
                <option value="rejeitado">Rejeitado</option>
              </select>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Método</span>
              </div>
              <select
                value={metodoFilter}
                onChange={(e) => setMetodoFilter(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="todos">Todos</option>
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
              </select>
            </label>

            <div className="flex items-end">
              <div className="text-sm text-base-content/60">
                <span className="font-semibold text-base-content">{filtered.length}</span> resultados
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-md border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>ID</th>
                <th>Pedido</th>
                <th>Valor</th>
                <th>Taxa</th>
                <th>Valor Líquido</th>
                <th>Método</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pag) => (
                <tr key={pag.id} className="border-base-300 hover:bg-base-200">
                  <td>
                    <span className="font-mono text-sm font-semibold">{pag.id}</span>
                  </td>
                  <td>
                    <span className="font-mono text-sm">#{pag.pedidoId}</span>
                  </td>
                  <td>
                    <span className="font-semibold">R$ {pag.valor.toLocaleString('pt-BR')}</span>
                  </td>
                  <td className="text-sm text-error">
                    -R$ {pag.taxa.toLocaleString('pt-BR')}
                  </td>
                  <td className="font-semibold text-success">
                    R$ {pag.valorLiquido.toLocaleString('pt-BR')}
                  </td>
                  <td>
                    <span className={metodoBadges[pag.metodo as keyof typeof metodoBadges]}>
                      {pag.metodo.charAt(0).toUpperCase() + pag.metodo.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={statusBadges[pag.status as keyof typeof statusBadges]}>
                      {pag.status.charAt(0).toUpperCase() + pag.status.slice(1)}
                    </span>
                  </td>
                  <td className="text-sm">
                    {new Date(pag.dataCriacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-ghost btn-xs">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-ghost btn-xs">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-body p-4 border-t border-base-300">
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/60">
              Mostrando <span className="font-semibold">{filtered.length}</span> de{' '}
              <span className="font-semibold">{pagamentos.length}</span> pagamentos
            </span>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
