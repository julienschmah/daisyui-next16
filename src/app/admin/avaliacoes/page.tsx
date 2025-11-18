'use client';

import { useState } from 'react';
import { Eye, Trash2, Search, Star } from 'lucide-react';
import type { Avaliacao } from '@/types/admin';

const mockAvaliacoes: Avaliacao[] = [
  {
    id: '1',
    pedidoId: '1',
    avaliadoId: '1',
    avaliadoPor: 'cliente_1',
    nota: 5,
    comentario: 'Serviço excelente! Profissional muito competente e atencioso.',
    dataCriacao: new Date('2024-01-19'),
  },
  {
    id: '2',
    pedidoId: '2',
    avaliadoId: '2',
    avaliadoPor: 'cliente_2',
    nota: 4,
    comentario: 'Bom serviço, chegou no horário. Preço justo.',
    dataCriacao: new Date('2024-01-18'),
  },
  {
    id: '3',
    pedidoId: '3',
    avaliadoId: '3',
    avaliadoPor: 'cliente_1',
    nota: 5,
    comentario: 'Pintura perfeita! Recomendo fortemente!',
    dataCriacao: new Date('2024-01-17'),
  },
  {
    id: '4',
    pedidoId: '1',
    avaliadoId: 'cliente_1',
    avaliadoPor: 'prof_1',
    nota: 5,
    comentario: 'Cliente educado e colaborativo. Ambiente limpo.',
    dataCriacao: new Date('2024-01-19'),
  },
];

const profissionaisMock = {
  '1': 'João Silva',
  '2': 'Maria Santos',
  '3': 'Carlos Oliveira',
};

const clientesMock = {
  cliente_1: 'Ana Paula Martins',
  cliente_2: 'Roberto Costa',
};

function RatingStars({ nota }: { nota: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < nota ? 'fill-warning text-warning' : 'text-base-300'}
        />
      ))}
      <span className="ml-2 font-semibold">{nota}/5</span>
    </div>
  );
}

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(mockAvaliacoes);
  const [search, setSearch] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState<string>('todos');
  const [notaFiltro, setNotaFiltro] = useState<string>('todos');

  const filtered = avaliacoes.filter((av) => {
    const matchSearch = av.comentario?.toLowerCase().includes(search.toLowerCase()) ||
                       av.pedidoId.toLowerCase().includes(search.toLowerCase());
    const matchTipo = tipoFiltro === 'todos' || true; // Aqui você pode adicionar lógica de tipo
    const matchNota = notaFiltro === 'todos' || av.nota === parseInt(notaFiltro);
    return matchSearch && matchTipo && matchNota;
  });

  const mediaNota = filtered.length > 0
    ? (filtered.reduce((sum, av) => sum + av.nota, 0) / filtered.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Avaliações e Reviews</h1>
        <p className="text-base-content/60 mt-2">Gestão de avaliações de profissionais e clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-sm font-medium text-base-content/70">Total de Avaliações</h3>
            <p className="text-2xl font-bold mt-2">{filtered.length}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-sm font-medium text-base-content/70">Média de Rating</h3>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-2xl font-bold">{mediaNota}</p>
              <Star size={20} className="fill-warning text-warning" />
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-sm font-medium text-base-content/70">Satisfação</h3>
            <div className="mt-2">
              <div className="progress progress-success h-3">
                <div className="progress-value" style={{ width: `${(parseFloat(mediaNota as any) / 5) * 100}%` }}></div>
              </div>
              <p className="text-xs text-base-content/60 mt-2">{Math.round((parseFloat(mediaNota as any) / 5) * 100)}% positiva</p>
            </div>
          </div>
        </div>
      </div>

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
                  placeholder="Pedido ou comentário..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
              </label>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <select
                value={notaFiltro}
                onChange={(e) => setNotaFiltro(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="todos">Todos</option>
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option>
                <option value="2">⭐⭐ (2)</option>
                <option value="1">⭐ (1)</option>
              </select>
            </label>

            <div className="flex items-end">
              <div className="text-sm text-base-content/60">
                <span className="font-semibold text-base-content">{filtered.length}</span> avaliações
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((avaliacao) => (
          <div key={avaliacao.id} className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-base-content/60">
                    Pedido #{avaliacao.pedidoId}
                  </p>
                  <RatingStars nota={avaliacao.nota} />
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost btn-sm btn-circle">
                    <Eye size={18} />
                  </button>
                  <button className="btn btn-ghost btn-sm btn-circle text-error">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {avaliacao.comentario && (
                <p className="text-base-content mb-4">{avaliacao.comentario}</p>
              )}

              <div className="flex items-center justify-between text-sm text-base-content/60 border-t border-base-300 pt-4">
                <span>
                  {new Date(avaliacao.dataCriacao).toLocaleDateString('pt-BR')}
                </span>
                <span>
                  Por: <span className="font-semibold text-base-content">Usuário</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Nenhuma avaliação encontrada</h3>
            <p className="text-base-content/60">Ajuste seus filtros e tente novamente</p>
          </div>
        </div>
      )}
    </div>
  );
}
