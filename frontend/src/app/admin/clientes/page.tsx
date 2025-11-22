'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import type { Cliente } from '@/types/admin';

// Mock Data
const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'Ana Paula Martins',
    email: 'ana@example.com',
    telefone: '(11) 99876-5432',
    cpf: '123.456.789-00',
    localizacao: {
      cidade: 'São Paulo',
      estado: 'SP',
      endereco: 'Rua A, 123',
      latitude: -23.55,
      longitude: -46.63,
    },
    status: 'ativo',
    dataCriacao: new Date('2023-05-10'),
    dataAtualizacao: new Date('2024-01-15'),
  },
  {
    id: '2',
    nome: 'Roberto Costa',
    email: 'roberto@example.com',
    telefone: '(11) 98765-4321',
    cpf: '987.654.321-00',
    localizacao: {
      cidade: 'São Paulo',
      estado: 'SP',
      endereco: 'Avenida B, 456',
      latitude: -23.56,
      longitude: -46.64,
    },
    status: 'ativo',
    dataCriacao: new Date('2023-06-15'),
    dataAtualizacao: new Date('2024-01-12'),
  },
  {
    id: '3',
    nome: 'Fernanda Silva',
    email: 'fernanda@example.com',
    telefone: '(11) 97654-3210',
    cpf: '456.789.123-00',
    localizacao: {
      cidade: 'São Paulo',
      estado: 'SP',
      endereco: 'Rua C, 789',
      latitude: -23.57,
      longitude: -46.65,
    },
    status: 'inativo',
    dataCriacao: new Date('2023-07-20'),
    dataAtualizacao: new Date('2023-12-01'),
  },
];

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showModal, setShowModal] = useState(false);

  const filtered = clientes.filter((cliente) => {
    const matchSearch = cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
                       cliente.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || cliente.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      ativo: 'badge badge-success',
      inativo: 'badge badge-neutral',
      bloqueado: 'badge badge-error',
    };
    return badges[status as keyof typeof badges] || 'badge';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-base-content/60 mt-2">Gestão de clientes e usuários</p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Pesquisar</span>
              </div>
              <label className="input input-bordered input-sm flex items-center gap-2">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Nome ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
              </label>
            </label>

            {/* Status Filter */}
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
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="bloqueado">Bloqueado</option>
              </select>
            </label>

            {/* Results */}
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
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Localização</th>
                <th>Status</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cliente) => (
                <tr key={cliente.id} className="border-base-300 hover:bg-base-200">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded-full w-8">
                          <span className="text-xs font-bold">
                            {cliente.nome.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{cliente.nome}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{cliente.email}</td>
                  <td className="text-sm">{cliente.telefone}</td>
                  <td className="text-sm">
                    {cliente.localizacao.cidade}, {cliente.localizacao.estado}
                  </td>
                  <td>
                    <span className={getStatusBadge(cliente.status)}>
                      {cliente.status.charAt(0).toUpperCase() + cliente.status.slice(1)}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/60">
                    {new Date(cliente.dataCriacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-ghost btn-xs" title="Ver detalhes">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-ghost btn-xs" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="btn btn-ghost btn-xs text-error" title="Deletar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-body p-4 border-t border-base-300">
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/60">
              Mostrando <span className="font-semibold">{filtered.length}</span> de{' '}
              <span className="font-semibold">{clientes.length}</span> clientes
            </span>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-2xl">
            <h3 className="font-bold text-lg">Novo Cliente</h3>
            <div className="divider my-3"></div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Nome *</span>
                  </div>
                  <input type="text" placeholder="Nome completo" className="input input-bordered" />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Email *</span>
                  </div>
                  <input type="email" placeholder="email@example.com" className="input input-bordered" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Telefone *</span>
                  </div>
                  <input type="tel" placeholder="(11) 98765-4321" className="input input-bordered" />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">CPF</span>
                  </div>
                  <input type="text" placeholder="123.456.789-00" className="input input-bordered" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Cidade *</span>
                  </div>
                  <input type="text" placeholder="São Paulo" className="input input-bordered" />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Estado *</span>
                  </div>
                  <input type="text" placeholder="SP" className="input input-bordered" maxLength={2} />
                </label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Endereço *</span>
                </div>
                <input type="text" placeholder="Rua, número" className="input input-bordered" />
              </label>
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
