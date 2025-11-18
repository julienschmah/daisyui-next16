'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import type { Profissional } from '@/types/admin';

// Mock Data
const mockProfissionais: Profissional[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    especialidade: 'Eletricista',
    categorias: ['instalacoes', 'reparos'],
    localizacao: { cidade: 'São Paulo', estado: 'SP', latitude: -23.55, longitude: -46.63 },
    avaliacao: 4.9,
    totalReviews: 156,
    status: 'ativo',
    documentosVerificados: true,
    dataCriacao: new Date('2023-01-15'),
    dataAtualizacao: new Date('2024-01-10'),
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@example.com',
    telefone: '(11) 97654-3210',
    cpf: '987.654.321-00',
    especialidade: 'Encanadora',
    categorias: ['instalacoes', 'manutencao'],
    localizacao: { cidade: 'São Paulo', estado: 'SP', latitude: -23.55, longitude: -46.63 },
    avaliacao: 4.8,
    totalReviews: 143,
    status: 'ativo',
    documentosVerificados: true,
    dataCriacao: new Date('2023-02-20'),
    dataAtualizacao: new Date('2024-01-12'),
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    email: 'carlos@example.com',
    telefone: '(11) 96543-2109',
    cpf: '456.789.123-00',
    especialidade: 'Marceneiro',
    categorias: ['moveis', 'restauracao'],
    localizacao: { cidade: 'São Paulo', estado: 'SP', latitude: -23.55, longitude: -46.63 },
    avaliacao: 4.7,
    totalReviews: 128,
    status: 'ativo',
    documentosVerificados: true,
    dataCriacao: new Date('2023-03-10'),
    dataAtualizacao: new Date('2024-01-08'),
  },
];

export default function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState<Profissional[]>(mockProfissionais);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showModal, setShowModal] = useState(false);

  const filtered = profissionais.filter((prof) => {
    const matchSearch = prof.nome.toLowerCase().includes(search.toLowerCase()) ||
                       prof.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || prof.status === statusFilter;
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
          <h1 className="text-3xl font-bold">Profissionais</h1>
          <p className="text-base-content/60 mt-2">Gestão de profissionais e prestadores de serviço</p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Novo Profissional
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
                <th>Especialidade</th>
                <th>Avaliação</th>
                <th>Status</th>
                <th>Documentos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prof) => (
                <tr key={prof.id} className="border-base-300 hover:bg-base-200">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-8">
                          <span className="text-xs font-bold">
                            {prof.nome.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{prof.nome}</p>
                        <p className="text-xs text-base-content/60">{prof.telefone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{prof.email}</td>
                  <td>
                    <span className="badge badge-outline">{prof.especialidade}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{prof.avaliacao}</span>
                      <span className="text-xs text-base-content/60">({prof.totalReviews})</span>
                    </div>
                  </td>
                  <td>
                    <span className={getStatusBadge(prof.status)}>
                      {prof.status.charAt(0).toUpperCase() + prof.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {prof.documentosVerificados ? (
                      <span className="badge badge-success badge-sm">✓ Verificado</span>
                    ) : (
                      <span className="badge badge-warning badge-sm">⚠ Pendente</span>
                    )}
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
              <span className="font-semibold">{profissionais.length}</span> profissionais
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
            <h3 className="font-bold text-lg">Novo Profissional</h3>
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
                    <span className="label-text">CPF *</span>
                  </div>
                  <input type="text" placeholder="123.456.789-00" className="input input-bordered" />
                </label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Especialidade *</span>
                </div>
                <select className="select select-bordered">
                  <option disabled selected>Selecione uma especialidade</option>
                  <option>Eletricista</option>
                  <option>Encanador</option>
                  <option>Marceneiro</option>
                  <option>Pintor</option>
                </select>
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
