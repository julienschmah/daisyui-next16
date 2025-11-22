'use client';

import { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Search } from 'lucide-react';
import type { Pedido, StatusPedido } from '@/types/admin';

const mockPedidos: Pedido[] = [
  {
    id: '1',
    clienteId: '1',
    profissionalId: '1',
    servicoId: '1',
    descricao: 'Instalação de tomadas e interruptores',
    localizacao: {
      cidade: 'São Paulo',
      estado: 'SP',
      endereco: 'Rua A, 123',
      latitude: -23.55,
      longitude: -46.63,
    },
    dataAgendada: new Date('2024-01-20'),
    precoOrcado: 350,
    status: 'em_progresso' as StatusPedido,
    dataCriacao: new Date('2024-01-15'),
    dataAtualizacao: new Date('2024-01-19'),
  },
  {
    id: '2',
    clienteId: '2',
    profissionalId: '2',
    servicoId: '2',
    descricao: 'Reparo de vazamento na cozinha',
    localizacao: {
      cidade: 'São Paulo',
      estado: 'SP',
      endereco: 'Avenida B, 456',
      latitude: -23.56,
      longitude: -46.64,
    },
    dataAgendada: new Date('2024-01-25'),
    precoOrcado: 280,
    status: 'pendente' as StatusPedido,
    dataCriacao: new Date('2024-01-18'),
    dataAtualizacao: new Date('2024-01-18'),
  },
  {
    id: '3',
    clienteId: '1',
    profissionalId: '3',
    servicoId: '3',
    descricao: 'Pintura completa da sala',
    localizacao: {
      cidade: 'São Paulo',
      estado: 'SP',
      endereco: 'Rua A, 123',
      latitude: -23.55,
      longitude: -46.63,
    },
    dataAgendada: new Date('2024-01-22'),
    precoOrcado: 450,
    precoCobrado: 450,
    status: 'concluido' as StatusPedido,
    dataCriacao: new Date('2024-01-10'),
    dataAtualizacao: new Date('2024-01-19'),
    dataFim: new Date('2024-01-19'),
  },
];

const statusBadges = {
  pendente: 'badge badge-info',
  aceito: 'badge badge-primary',
  em_progresso: 'badge badge-warning',
  concluido: 'badge badge-success',
  cancelado: 'badge badge-error',
  rejeitado: 'badge badge-error',
};

const statusColors = {
  pendente: '#3b82f6',
  aceito: '#8b5cf6',
  em_progresso: '#f59e0b',
  concluido: '#10b981',
  cancelado: '#ef4444',
  rejeitado: '#dc2626',
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showModal, setShowModal] = useState(false);

  const filtered = pedidos.filter((pedido) => {
    const matchSearch = pedido.descricao.toLowerCase().includes(search.toLowerCase()) ||
                       pedido.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || pedido.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-base-content/60 mt-2">Gestão de solicitações de serviços</p>
        </div>
        <button className="btn btn-primary gap-2" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Novo Pedido
        </button>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Pesquisar</span>
              </div>
              <label className="input input-bordered input-sm flex items-center gap-2">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="ID ou descrição..."
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
                <option value="aceito">Aceito</option>
                <option value="em_progresso">Em Progresso</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
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

      <div className="card bg-base-100 shadow-md border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pedido) => (
                <tr key={pedido.id} className="border-base-300 hover:bg-base-200">
                  <td>
                    <span className="font-mono text-sm font-semibold">{pedido.id}</span>
                  </td>
                  <td>
                    <div>
                      <p className="font-semibold">{pedido.descricao}</p>
                      <p className="text-xs text-base-content/60">{pedido.localizacao.endereco}</p>
                    </div>
                  </td>
                  <td className="text-sm">
                    {new Date(pedido.dataAgendada).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <span className="font-semibold">
                      R$ {pedido.precoOrcado.toLocaleString('pt-BR')}
                    </span>
                  </td>
                  <td>
                    <span className={statusBadges[pedido.status as keyof typeof statusBadges]}>
                      {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1).replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-ghost btn-xs">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-ghost btn-xs">
                        <Edit size={16} />
                      </button>
                      <button className="btn btn-ghost btn-xs text-error">
                        <Trash2 size={16} />
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
              <span className="font-semibold">{pedidos.length}</span> pedidos
            </span>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-2xl">
            <h3 className="font-bold text-lg">Novo Pedido</h3>
            <div className="divider my-3"></div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Cliente *</span>
                  </div>
                  <select className="select select-bordered">
                    <option disabled selected>Selecione um cliente</option>
                  </select>
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Serviço *</span>
                  </div>
                  <select className="select select-bordered">
                    <option disabled selected>Selecione um serviço</option>
                  </select>
                </label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Descrição *</span>
                </div>
                <textarea placeholder="Descrição do serviço solicitado" className="textarea textarea-bordered" rows={3}></textarea>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Data Agendada *</span>
                  </div>
                  <input type="date" className="input input-bordered" />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Preço Orçado (R$) *</span>
                  </div>
                  <input type="number" placeholder="350.00" className="input input-bordered" />
                </label>
              </div>
            </form>

            <div className="modal-action mt-6">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                Salvar
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setShowModal(false)}>
            <button>close</button>
          </form>
        </div>
      )}
    </div>
  );
}
