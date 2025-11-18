// API_INTEGRATION_GUIDE.md
# 🔌 Guia de Integração com API

Este documento fornece exemplos de como integrar a aplicação com um backend real.

## 📡 Configuração Base

### 1. Criar um arquivo de configuração da API

```typescript
// src/lib/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = {
  get: async (path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('API error');
    return response.json();
  },

  post: async (path: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API error');
    return response.json();
  },

  put: async (path: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API error');
    return response.json();
  },

  delete: async (path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('API error');
    return response.json();
  },
};
```

## 👨‍💼 Profissionais

### Listar Profissionais
```typescript
// GET /api/profissionais?page=1&limit=10
// GET /api/profissionais?search=João&status=ativo

const getProfissionais = async (page = 1, limit = 10, filters = {}) => {
  const query = new URLSearchParams({ page, limit, ...filters });
  return apiClient.get(`/profissionais?${query}`);
};
```

### Criar Profissional
```typescript
// POST /api/profissionais
const createProfissional = async (data: Partial<Profissional>) => {
  return apiClient.post('/profissionais', {
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    cpf: data.cpf,
    especialidade: data.especialidade,
    localizacao: data.localizacao,
  });
};
```

### Atualizar Profissional
```typescript
// PUT /api/profissionais/:id
const updateProfissional = async (id: string, data: Partial<Profissional>) => {
  return apiClient.put(`/profissionais/${id}`, data);
};
```

### Deletar Profissional
```typescript
// DELETE /api/profissionais/:id
const deleteProfissional = async (id: string) => {
  return apiClient.delete(`/profissionais/${id}`);
};
```

## 👥 Clientes

```typescript
// GET /api/clientes
const getClientes = async (page = 1, limit = 10) => {
  return apiClient.get(`/clientes?page=${page}&limit=${limit}`);
};

// POST /api/clientes
const createCliente = async (data: Partial<Cliente>) => {
  return apiClient.post('/clientes', data);
};

// PUT /api/clientes/:id
const updateCliente = async (id: string, data: Partial<Cliente>) => {
  return apiClient.put(`/clientes/${id}`, data);
};

// DELETE /api/clientes/:id
const deleteCliente = async (id: string) => {
  return apiClient.delete(`/clientes/${id}`);
};
```

## 🔧 Serviços

```typescript
// GET /api/servicos
const getServicos = async (page = 1, limit = 10) => {
  return apiClient.get(`/servicos?page=${page}&limit=${limit}`);
};

// POST /api/servicos
const createServico = async (data: Partial<Servico>) => {
  return apiClient.post('/servicos', data);
};

// PUT /api/servicos/:id
const updateServico = async (id: string, data: Partial<Servico>) => {
  return apiClient.put(`/servicos/${id}`, data);
};

// DELETE /api/servicos/:id
const deleteServico = async (id: string) => {
  return apiClient.delete(`/servicos/${id}`);
};
```

## 📝 Pedidos

```typescript
// GET /api/pedidos?status=pendente
const getPedidos = async (filters?: { status?: StatusPedido; page?: number }) => {
  const query = new URLSearchParams(filters as any);
  return apiClient.get(`/pedidos?${query}`);
};

// POST /api/pedidos
const createPedido = async (data: Partial<Pedido>) => {
  return apiClient.post('/pedidos', data);
};

// PUT /api/pedidos/:id/status
const updatePedidoStatus = async (id: string, status: StatusPedido) => {
  return apiClient.put(`/pedidos/${id}/status`, { status });
};

// PUT /api/pedidos/:id/atribuir-profissional
const atribuirProfissional = async (pedidoId: string, profissionalId: string) => {
  return apiClient.put(`/pedidos/${pedidoId}/atribuir-profissional`, { profissionalId });
};
```

## 💳 Pagamentos

```typescript
// GET /api/pagamentos
const getPagamentos = async (filters?: any) => {
  const query = new URLSearchParams(filters);
  return apiClient.get(`/pagamentos?${query}`);
};

// POST /api/pagamentos
const criarPagamento = async (data: Partial<Pagamento>) => {
  return apiClient.post('/pagamentos', data);
};

// PUT /api/pagamentos/:id/processar
const processarPagamento = async (id: string) => {
  return apiClient.put(`/pagamentos/${id}/processar`, {});
};

// GET /api/pagamentos/relatorio
const gerarRelatorioPagamentos = async (periodo: { inicio: Date; fim: Date }) => {
  const query = new URLSearchParams({
    inicio: periodo.inicio.toISOString(),
    fim: periodo.fim.toISOString(),
  });
  return apiClient.get(`/pagamentos/relatorio?${query}`);
};
```

## ⭐ Avaliações

```typescript
// GET /api/avaliacoes
const getAvaliacoes = async (filters?: any) => {
  const query = new URLSearchParams(filters);
  return apiClient.get(`/avaliacoes?${query}`);
};

// POST /api/avaliacoes
const criarAvaliacao = async (data: Partial<Avaliacao>) => {
  return apiClient.post('/avaliacoes', data);
};

// GET /api/profissionais/:id/avaliacoes
const getAvaliacoesProfissional = async (profissionalId: string) => {
  return apiClient.get(`/profissionais/${profissionalId}/avaliacoes`);
};

// GET /api/profissionais/:id/media-avaliacoes
const getMediaAvaliacoes = async (profissionalId: string) => {
  return apiClient.get(`/profissionais/${profissionalId}/media-avaliacoes`);
};
```

## 📊 Dashboard

```typescript
// GET /api/dashboard/kpi
const getDashboardKPI = async (): Promise<DashboardKPI> => {
  return apiClient.get('/dashboard/kpi');
};

// GET /api/dashboard/receita?periodo=mes
const getReceita = async (periodo: 'dia' | 'mes' | 'ano') => {
  return apiClient.get(`/dashboard/receita?periodo=${periodo}`);
};

// GET /api/dashboard/pedidos-status
const getStatusPedidos = async () => {
  return apiClient.get('/dashboard/pedidos-status');
};

// GET /api/dashboard/top-profissionais
const getTopProfissionais = async (limit = 5) => {
  return apiClient.get(`/dashboard/top-profissionais?limit=${limit}`);
};
```

## 🪝 Exemplo de Uso em Componente

```typescript
'use client';

import { useEffect, useState } from 'react';
import type { Profissional } from '@/types/admin';
import { apiClient } from '@/lib/api';

export default function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/profissionais?page=1&limit=10');
        setProfissionais(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (newData: Partial<Profissional>) => {
    try {
      const result = await apiClient.post('/profissionais', newData);
      setProfissionais([...profissionais, result]);
      // Mostrar toast de sucesso
    } catch (err) {
      // Mostrar toast de erro
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<Profissional>) => {
    try {
      const result = await apiClient.put(`/profissionais/${id}`, updatedData);
      setProfissionais(profissionais.map(p => p.id === id ? result : p));
    } catch (err) {
      // Mostrar toast de erro
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/profissionais/${id}`);
      setProfissionais(profissionais.filter(p => p.id !== id));
    } catch (err) {
      // Mostrar toast de erro
    }
  };

  if (loading) return <div className="loading"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    // Seu JSX aqui
  );
}
```

## 🔄 Tratamento de Erros

```typescript
// src/lib/errorHandler.ts
export const handleApiError = (error: Error) => {
  if (error.message === 'Unauthorized') {
    // Redirecionar para login
    window.location.href = '/login';
  }
  
  if (error.message === 'Not Found') {
    // Mostrar 404
  }

  // Log de erro
  console.error('API Error:', error);
};
```

## ⚡ Com React Query (Recomendado)

```typescript
// src/hooks/useProfissionais.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export const useProfissionais = () => {
  return useQuery({
    queryKey: ['profissionais'],
    queryFn: () => apiClient.get('/profissionais'),
  });
};

export const useCreateProfissional = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Profissional>) => apiClient.post('/profissionais', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profissionais'] });
    },
  });
};
```

---

**Próximas etapas:**
1. Implementar autenticação (JWT)
2. Adicionar validação de entrada
3. Implementar cache com React Query
4. Adicionar retry automático para falhas
5. Implementar rate limiting
