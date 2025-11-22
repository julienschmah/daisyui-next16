'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import type { Servico } from '@/types/admin';

// Mock Data
const mockServicos: Servico[] = [
  {
    id: '1',
    nome: 'Instalação Elétrica',
    descricao: 'Instalação completa de sistemas elétricos residenciais',
    categoria: 'Eletricista',
    subcategorias: ['Residencial', 'Comercial'],
    precoBase: 150,
    precoMaximo: 300,
    unidade: 'hora',
    tempoEstimado: 120,
    ativo: true,
    dataCriacao: new Date('2023-01-15'),
    dataAtualizacao: new Date('2024-01-10'),
  },
  {
    id: '2',
    nome: 'Encanamento Geral',
    descricao: 'Serviços de encanamento, reparos e manutenção',
    categoria: 'Encanador',
    subcategorias: ['Reparos', 'Manutenção'],
    precoBase: 120,
    precoMaximo: 250,
    unidade: 'hora',
    tempoEstimado: 90,
    ativo: true,
    dataCriacao: new Date('2023-02-20'),
    dataAtualizacao: new Date('2024-01-12'),
  },
  {
    id: '3',
    nome: 'Serviço de Pintura',
    descricao: 'Pintura de paredes, móveis e estruturas',
    categoria: 'Pintor',
    subcategorias: ['Residencial', 'Comercial', 'Industrial'],
    precoBase: 80,
    precoMaximo: 200,
    unidade: 'hora',
    tempoEstimado: 180,
    ativo: true,
    dataCriacao: new Date('2023-03-10'),
    dataAtualizacao: new Date('2024-01-08'),
  },
];

export default function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>(mockServicos);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showModal, setShowModal] = useState(false);

  const filtered = servicos.filter((servico) => {
    const matchSearch = servico.nome.toLowerCase().includes(search.toLowerCase()) ||
                       servico.descricao.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || 
                       (statusFilter === 'ativo' && servico.ativo) ||
                       (statusFilter === 'inativo' && !servico.ativo);
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Serviços</h1>
          <p className="text-base-content/60 mt-2">Gestão de categorias e tipos de serviços disponíveis</p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Novo Serviço
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
                  placeholder="Nome ou descrição..."
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
                <th>Categoria</th>
                <th>Preço Base</th>
                <th>Preço Máximo</th>
                <th>Tempo Estimado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((servico) => (
                <tr key={servico.id} className="border-base-300 hover:bg-base-200">
                  <td>
                    <div>
                      <p className="font-semibold">{servico.nome}</p>
                      <p className="text-xs text-base-content/60">{servico.descricao}</p>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">{servico.categoria}</span>
                  </td>
                  <td>
                    <span className="font-semibold">
                      R$ {servico.precoBase.toLocaleString('pt-BR')}
                    </span>
                  </td>
                  <td>
                    <span className="text-base-content/70">
                      {servico.precoMaximo 
                        ? `R$ ${servico.precoMaximo.toLocaleString('pt-BR')}`
                        : '-'
                      }
                    </span>
                  </td>
                  <td className="text-sm">
                    {Math.floor(servico.tempoEstimado / 60)}h{' '}
                    {servico.tempoEstimado % 60}m
                  </td>
                  <td>
                    {servico.ativo ? (
                      <span className="badge badge-success">Ativo</span>
                    ) : (
                      <span className="badge badge-neutral">Inativo</span>
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
              <span className="font-semibold">{servicos.length}</span> serviços
            </span>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-2xl">
            <h3 className="font-bold text-lg">Novo Serviço</h3>
            <div className="divider my-3"></div>
            
            <form className="space-y-4">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Nome do Serviço *</span>
                </div>
                <input type="text" placeholder="Ex: Instalação Elétrica" className="input input-bordered" />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Descrição *</span>
                </div>
                <textarea placeholder="Descrição detalhada do serviço" className="textarea textarea-bordered" rows={3}></textarea>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Categoria *</span>
                  </div>
                  <select className="select select-bordered">
                    <option disabled selected>Selecione uma categoria</option>
                    <option>Eletricista</option>
                    <option>Encanador</option>
                    <option>Marceneiro</option>
                    <option>Pintor</option>
                  </select>
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Unidade *</span>
                  </div>
                  <select className="select select-bordered">
                    <option>hora</option>
                    <option>dia</option>
                    <option>projeto</option>
                    <option>unidade</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Preço Base (R$) *</span>
                  </div>
                  <input type="number" placeholder="150.00" className="input input-bordered" />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Preço Máximo (R$)</span>
                  </div>
                  <input type="number" placeholder="300.00" className="input input-bordered" />
                </label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Tempo Estimado (minutos)</span>
                </div>
                <input type="number" placeholder="120" className="input input-bordered" />
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
