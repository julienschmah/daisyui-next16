# Estrutura do Projeto - DaisyUI Next16

## 📁 Estrutura de Pastas

```
src/
├── app/                       # App Router (Next 13+)
│   ├── layout.tsx            # Layout global
│   ├── page.tsx              # Página inicial (/)
│   ├── globals.css           # Estilos globais
│   ├── providers.tsx         # Providers globais (tema, contexto)
│   ├── (auth)/               # Rotas agrupadas para autenticação
│   ├── (dashboard)/          # Rotas privadas
│   ├── api/                  # Rotas de API
│   ├── pipelines/            # Páginas de pipelines
│   └── settings/             # Páginas de settings
│
├── components/               # ⚡ Componentes reutilizáveis
│   ├── ui/                   # Componentes genéricos (base)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Toggle.tsx
│   │   ├── Accordion.tsx
│   │   ├── icons/            # Ícones do lucide-react
│   │   └── index.ts          # Export central
│   │
│   ├── layout/               # Componentes estruturais
│   │   ├── AppWrapper.tsx
│   │   ├── Navbar.tsx
│   │   ├── SettingsSidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── forms/                # Formulários e componentes de negócio
│   │   ├── RequiredFieldsSettings.tsx
│   │   ├── CoreSettings.tsx
│   │   ├── ModulesSettings.tsx
│   │   ├── DashboardSettings.tsx
│   │   ├── WatermarkSettings.tsx
│   │   ├── PipelineList.tsx
│   │   ├── PipelineModal.tsx
│   │   ├── KanbanBoard.tsx
│   │   └── KanbanColumn.tsx
│   │
│   ├── charts/               # Gráficos
│   │   ├── SalesChart.tsx
│   │   ├── BarChart.tsx
│   │   └── LineChart.tsx
│   │
│   └── index.ts              # Export central de todos os componentes
│
├── hooks/                    # Hooks personalizados
│   ├── useAuth.ts            # (Exemplo)
│   ├── useTheme.ts           # (Exemplo)
│   └── index.ts
│
├── lib/                      # Funções utilitárias
│   ├── api.ts                # Configuração de fetch/axios
│   ├── constants.ts          # Constantes
│   ├── helpers.ts            # Funções genéricas
│   ├── validations.ts        # Validações
│   └── index.ts
│
├── services/                 # Serviços de dados
│   ├── userService.ts        # (Exemplo)
│   ├── productService.ts     # (Exemplo)
│   └── index.ts
│
├── store/                    # Gerenciamento de estado global
│   ├── useUserStore.ts       # (Exemplo - Zustand)
│   ├── useCartStore.ts       # (Exemplo)
│   └── index.ts
│
├── types/                    # Tipos e interfaces TypeScript
│   ├── user.ts               # (Exemplo)
│   ├── product.ts            # (Exemplo)
│   ├── order.ts              # (Exemplo)
│   └── index.ts
│
└── styles/                   # Estilos adicionais
    ├── variables.css         # Variáveis CSS customizadas
    ├── animations.css        # Animações customizadas
    └── index.css             # (opcional)
```

## 🎯 Convenções

### UI Components (`src/components/ui/`)
- Componentes genéricos e reutilizáveis
- Sem lógica de negócio
- Focam apenas em apresentação
- Exemplos: Button, Input, Card, Modal

### Layout Components (`src/components/layout/`)
- Componentes estruturais da aplicação
- Cabeçalho, barra lateral, footer
- Compartilhados entre páginas

### Form Components (`src/components/forms/`)
- Formulários completos
- Componentes de página/negócio
- Podem conter lógica complexa
- Exemplos: LoginForm, ProductForm, Settings

### Imports

**❌ Evite:**
```tsx
import { Button } from '../../components/ui/Button';
```

**✅ Use:**
```tsx
import { Button } from '@/components/ui';
```

## 📦 Instalação e Setup

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Copie `.env.local` e adicione suas variáveis

3. **Rodar em desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🚀 Principais Tecnologias

- **Next.js 16** - Framework React com SSR
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **DaisyUI** - Componentes UI prontos
- **Lucide Icons** - Ícones SVG
- **Zustand** - Gerenciamento de estado (opcional)

## 📝 Scripts Disponíveis

```bash
npm run dev      # Rodar em desenvolvimento
npm run build    # Fazer build para produção
npm run start    # Rodar build de produção
npm run lint     # Verificar linting
npm run type-check # Verificar tipos TypeScript
```

---

**Estrutura criada em:** 2025-11-13
