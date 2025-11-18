# 🚀 ServiceHub Admin - Aplicativo de Gestão de Serviços

Sistema administrativo completo para gerenciamento de serviços tipo Uber, desenvolvido com **Next.js 16**, **React 19**, **TypeScript** e **DaisyUI**.

## 📋 Visão Geral

ServiceHub é uma plataforma administrativa para contratar e gerenciar profissionais de serviços (encanadores, eletricistas, pintores, etc). O sistema oferece controle total sobre:

- ✅ **Profissionais** - Cadastro, verificação de documentos, ratings
- ✅ **Clientes** - Gestão de usuários e localização
- ✅ **Serviços** - Categorias, preços e descrições
- ✅ **Pedidos** - Solicitações de serviços com status
- ✅ **Pagamentos** - Histórico financeiro e faturamento
- ✅ **Avaliações** - Sistema de ratings e reviews

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx                  # Layout raiz com AppWrapper
│   ├── admin/
│   │   ├── layout.tsx              # Layout passthrough do admin
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard com KPIs e gráficos
│   │   ├── profissionais/
│   │   │   └── page.tsx            # CRUD de profissionais
│   │   ├── clientes/
│   │   │   └── page.tsx            # CRUD de clientes
│   │   ├── servicos/
│   │   │   └── page.tsx            # CRUD de serviços
│   │   ├── pedidos/
│   │   │   └── page.tsx            # Gestão de pedidos
│   │   ├── pagamentos/
│   │   │   └── page.tsx            # Histórico de pagamentos
│   │   └── avaliacoes/
│   │       └── page.tsx            # Sistema de avaliações
│   └── [outras rotas]
├── components/
│   └── layout/
│       ├── AppWrapper.tsx          # Gerenciador de layout global
│       ├── Navbar.tsx              # Barra superior (usada em todo app)
│       ├── Sidebar.tsx             # Sidebar com menu (gerenciado por AppWrapper)
│       └── [outros componentes]
└── types/
    └── admin/
        └── index.ts                # Tipos TypeScript globais
```

## 🏗️ Arquitetura de Layout

O projeto usa uma arquitetura **unificada** de layout:

- **AppWrapper** (`src/components/layout/AppWrapper.tsx`) gerencia toda a estrutura visual
- **Navbar** está sempre visível em todas as rotas (exceto settings)
- **Sidebar** se adapta e mostra itens diferentes baseado na rota:
  - Menu principal quando em `/`, `/pipelines`
  - Menu de admin quando em `/admin/*`
- As páginas de admin não têm componentes próprios de header/sidebar
- Reutiliza 100% da navegação existente do projeto

### Fluxo de Navegação

```
Layout Raiz (AppWrapper)
    ├── Navbar (sempre visível)
    │   └── Menu hambúrguer (mobile)
    └── Sidebar (conteúdo dinâmico)
        ├── Menu Principal (Home, Pipelines, Configurações)
        └── Menu Admin (quando em /admin/*)
            ├── Dashboard
            ├── Profissionais
            ├── Clientes
            ├── Serviços
            ├── Pedidos
            ├── Pagamentos
            └── Avaliações
```

### 📊 Dashboard
- **KPIs em tempo real** com cards animados
- **Gráficos de receita** e pedidos (últimos 6 meses)
- **Status dos pedidos** em gráfico pizza
- **Top profissionais** com melhor desempenho

### 👨‍💼 Profissionais
- Cadastro com documento de verificação
- Especialidades múltiplas
- Sistema de ratings (1-5 estrelas)
- Filtros por status (Ativo, Inativo, Bloqueado)
- Localização geográfica

### 👥 Clientes
- Gestão completa de usuários
- Localização com cidade/estado/endereço
- Status de atividade
- Histórico de cadastro

### 🔧 Serviços
- Categorias de serviços
- Preços base e máximos configuráveis
- Unidades flexíveis (hora, dia, projeto)
- Tempo estimado por serviço

### 📝 Pedidos
- Status completo (Pendente → Concluído)
- Localização detalhada
- Preço orçado e cobrado
- Data de agendamento
- Filtros avançados

### 💳 Pagamentos
- Múltiplos métodos (Crédito, Débito, PIX, Boleto)
- Cálculo automático de taxas
- Histórico completo
- Relatórios exportáveis

### ⭐ Avaliações
- Reviews de profissionais e clientes
- Rating de 1-5 estrelas
- Comentários detalhados
- Cálculo de média geral

## 🛠️ Tecnologias Utilizadas

- **Next.js** 16.0.1 - Framework React
- **React** 19.2.0 - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos utilitários
- **DaisyUI** 5.5.0 - Componentes UI
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones
- **pnpm** - Gerenciador de pacotes

## 🚀 Como Começar

### Pré-requisitos
```bash
node >= 18.0.0
pnpm >= 8.0.0
```

### Instalação

1. **Instalar dependências**
```bash
pnpm install
```

2. **Instalar pacotes adicionais** (se necessário)
```bash
pnpm add recharts lucide-react
```

3. **Executar em desenvolvimento**
```bash
pnpm dev
```

4. **Acessar no navegador**
```
http://localhost:3000/admin/dashboard
```

### Build para Produção
```bash
pnpm build
pnpm start
```

## 📁 Tipos TypeScript

Todos os tipos estão centralizados em `src/types/admin/index.ts`:

```typescript
// Profissional
interface Profissional {
  id: string;
  nome: string;
  email: string;
  especialidade: string;
  avaliacao: number;
  status: 'ativo' | 'inativo' | 'bloqueado';
  // ... mais campos
}

// Cliente
interface Cliente {
  id: string;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo' | 'bloqueado';
  // ... mais campos
}

// Serviço
interface Servico {
  id: string;
  nome: string;
  categoria: string;
  precoBase: number;
  // ... mais campos
}

// Pedido
interface Pedido {
  id: string;
  clienteId: string;
  profissionalId?: string;
  status: StatusPedido;
  // ... mais campos
}

// Pagamento
interface Pagamento {
  id: string;
  pedidoId: string;
  valor: number;
  metodo: MetodoPagamento;
  status: StatusPagamento;
  // ... mais campos
}

// Avaliação
interface Avaliacao {
  id: string;
  pedidoId: string;
  nota: number;
  comentario?: string;
  // ... mais campos
}
```

## 🎨 Design System

O projeto utiliza **DaisyUI** com as seguintes cores e componentes:

### Componentes Principais
- `btn` - Botões
- `card` - Cards/Painéis
- `table` - Tabelas
- `modal` - Modais
- `input` - Inputs de texto
- `select` - Dropdowns
- `badge` - Badges de status
- `textarea` - Campos de texto longo

### Variáveis de Cor
- `primary` - Cor principal (azul)
- `secondary` - Cor secundária
- `success` - Verde (sucesso)
- `warning` - Amarelo (aviso)
- `error` - Vermelho (erro)
- `base-100/200/300` - Cores neutras

## 📊 Mock Data

O projeto vem com dados de exemplo (mock) para demonstração. Para integrar com uma API real:

1. Substitua os `mockData` por chamadas `fetch` ou `axios`
2. Use `useEffect` para carregar dados iniciais
3. Implemente as funções CRUD (Create, Read, Update, Delete)

Exemplo:
```typescript
// Antes (Mock)
const [profissionais, setProfissionais] = useState<Profissional[]>(mockProfissionais);

// Depois (API)
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/profissionais');
    const data = await response.json();
    setProfissionais(data);
  };
  fetchData();
}, []);
```

## 🔄 Fluxo de Dados

```
1. Dashboard (Analytics)
   ↓
2. Cadastro de Profissionais + Clientes
   ↓
3. Criação de Serviços
   ↓
4. Solicitação de Pedidos
   ↓
5. Processamento de Pagamentos
   ↓
6. Avaliações e Feedback
```

## 🔐 Rotas Protegidas

Todas as rotas `/admin/*` deveriam estar protegidas com autenticação. Para adicionar:

```typescript
// Middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
```

## 📈 Melhorias Futuras

- [ ] Integração com API backend
- [ ] Autenticação e autorização
- [ ] Temas customizáveis (light/dark)
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Notificações em tempo real (WebSocket)
- [ ] Mapa interativo de localização
- [ ] Sistema de mensagens entre usuários
- [ ] Analytics avançados

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Crie uma branch para sua feature
2. Commit com mensagens claras
3. Faça um pull request

## 📝 Licença

MIT

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando Next.js e DaisyUI

---

**Pronto para usar! Qualquer dúvida, consulte a documentação acima.** 🎉
