'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal, Text, Badge, Input } from '@/components/ui';
import {
  BarChart3,
  TrendingUp,
  Target,
  PieChart,
  Users,
  Home,
  Calendar,
  Zap,
  ToggleLeft,
  ToggleRight,
  Info,
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  enabled: boolean;
  type: 'chart' | 'stats' | 'metric';
  color: string;
}

const salesData = [
  { mês: 'Jan', vendas: 100, meta: 120 },
  { mês: 'Fev', vendas: 150, meta: 130 },
  { mês: 'Mar', vendas: 120, meta: 140 },
  { mês: 'Abr', vendas: 180, meta: 160 },
  { mês: 'Mai', vendas: 200, meta: 190 },
  { mês: 'Jun', vendas: 160, meta: 210 },
];

const referenciaData = [
  { id: 'ORGANICO', label: 'Orgânico', value: 35 },
  { id: 'REFERENCIA', label: 'Referência', value: 28 },
  { id: 'DIRETO', label: 'Direto', value: 22 },
  { id: 'SOCIAL', label: 'Social', value: 15 },
];

const receitaData = [
  {
    id: 'Receita',
    data: [
      { x: 'Jan', y: 50 },
      { x: 'Fev', y: 65 },
      { x: 'Mar', y: 55 },
      { x: 'Abr', y: 80 },
      { x: 'Mai', y: 95 },
      { x: 'Jun', y: 100 },
    ],
  },
];

const clienteData = [
  { id: 'RESIDENCIAL', label: 'Residencial', value: 45 },
  { id: 'COMERCIAL', label: 'Comercial', value: 25 },
  { id: 'INDUSTRIAL', label: 'Industrial', value: 20 },
  { id: 'RURAL', label: 'Rural', value: 10 },
];

const statusData = [
  { status: 'Disponível', quantidade: 120 },
  { status: 'Alugado', quantidade: 85 },
  { status: 'Vendido', quantidade: 65 },
  { status: 'Manutenção', quantidade: 30 },
];

const metasData = [
  { mês: 'Jan', progresso: 45, meta: 100 },
  { mês: 'Fev', progresso: 65, meta: 100 },
  { mês: 'Mar', progresso: 52, meta: 100 },
  { mês: 'Abr', progresso: 80, meta: 100 },
  { mês: 'Mai', progresso: 92, meta: 100 },
  { mês: 'Jun', progresso: 78, meta: 100 },
];

export function DashboardConfigSettings() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([
    {
      id: 'sales-overview',
      name: 'Vendas',
      description: 'Gráfico de vendas ao longo do ano',
      icon: BarChart3,
      enabled: true,
      type: 'chart',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'referral-tracking',
      name: 'Rastreamento',
      description: 'Rastreamento de referências e score',
      icon: Target,
      enabled: true,
      type: 'metric',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'revenue-funnel',
      name: 'Receita',
      description: 'Funil de receita em etapas',
      icon: TrendingUp,
      enabled: true,
      type: 'chart',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'client-distribution',
      name: 'Distribuição',
      description: 'Distribuição de clientes por tipo',
      icon: Users,
      enabled: true,
      type: 'chart',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'property-status',
      name: 'Status Imóveis',
      description: 'Status dos imóveis em carteira',
      icon: Home,
      enabled: false,
      type: 'metric',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'monthly-targets',
      name: 'Metas Mensais',
      description: 'Metas mensais e progresso',
      icon: Calendar,
      enabled: false,
      type: 'chart',
      color: 'from-yellow-500 to-orange-500',
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);

  const toggleDashboard = (dashboardId: string) => {
    setSelectedDashboard(dashboardId);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    if (selectedDashboard) {
      setDashboards(
        dashboards.map((dash) =>
          dash.id === selectedDashboard ? { ...dash, enabled: !dash.enabled } : dash
        )
      );
    }
    setShowConfirm(false);
    setSelectedDashboard(null);
  };

  const renderChart = (dashboardId: string) => {
    const theme = {
      text: { fill: '#9CA3AF' },
      axis: { ticks: { line: { stroke: '#374151' } } },
    };

    switch (dashboardId) {
      case 'sales-overview':
        return (
          <ResponsiveBar
            data={salesData}
            keys={['vendas', 'meta']}
            indexBy="mês"
            margin={{ top: 10, right: 10, bottom: 10, left: 30 }}
            padding={0.3}
            colors={['#0ea5e9', '#06b6d4']}
            theme={theme}
          />
        );
      case 'referral-tracking':
        return (
          <ResponsivePie
            data={referenciaData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.5}
            colors={['#10b981', '#059669', '#047857', '#065f46']}
            theme={theme}
          />
        );
      case 'revenue-funnel':
        return (
          <ResponsiveLine
            data={receitaData}
            margin={{ top: 10, right: 10, bottom: 10, left: 30 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            axisBottom={null}
            colors={['#a855f7']}
            enableArea={true}
            areaOpacity={0.3}
            theme={theme}
            curve="monotoneX"
          />
        );
      case 'client-distribution':
        return (
          <ResponsivePie
            data={clienteData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.5}
            colors={['#f97316', '#ea580c', '#dc2626', '#991b1b']}
            theme={theme}
          />
        );
      case 'property-status':
        return (
          <ResponsiveBar
            data={statusData}
            keys={['quantidade']}
            indexBy="status"
            margin={{ top: 10, right: 10, bottom: 10, left: 30 }}
            padding={0.3}
            colors={['#6366f1']}
            theme={theme}
          />
        );
      case 'monthly-targets':
        return (
          <ResponsiveBar
            data={metasData}
            keys={['progresso', 'meta']}
            indexBy="mês"
            margin={{ top: 10, right: 10, bottom: 10, left: 30 }}
            padding={0.3}
            colors={['#f59e0b', '#d97706']}
            theme={theme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="Configurar Dashboard"
        subtitle="Escolha quais dashboards e gráficos deseja exibir"
        icon="⚙️"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className={`relative group cursor-pointer transition-all duration-300 ${
              dashboard.enabled ? 'opacity-100' : 'opacity-60 hover:opacity-75'
            }`}
            onClick={() => toggleDashboard(dashboard.id)}
          >
            <Card shadow="lg" className={`h-full border-2 bg-base-900 ${
              dashboard.enabled ? 'border-success' : 'border-base-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <dashboard.icon size={28} className="text-success" />
                    <div>
                      <h3 className="font-bold text-success">{dashboard.name}</h3>
                      <Text variant="caption" size="xs">{dashboard.type}</Text>
                    </div>
                  </div>
                  <label className="swap swap-rotate cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={dashboard.enabled}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleDashboard(dashboard.id);
                      }}
                      className="hidden"
                    />
                    <ToggleLeft size={24} className="swap-off text-base-500" />
                    <ToggleRight size={24} className="swap-on text-success" />
                  </label>
                </div>

                <Text variant="subtitle" color="muted">{dashboard.description}</Text>

                <div className="h-40 rounded-lg bg-base-800 overflow-hidden border border-base-700">
                  {renderChart(dashboard.id) ? (
                    <div className="w-full h-full">
                      {renderChart(dashboard.id)}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <dashboard.icon size={60} className="text-base-content/50" />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-base-700">
                  <Text variant="caption" size="xs">
                    {dashboard.enabled ? 'Ativo' : 'Inativo'}
                  </Text>
                  <Badge variant={dashboard.enabled ? 'success' : 'ghost'}>
                    {dashboard.enabled ? '✓' : '○'}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card title="Resumo" icon="📊" shadow="md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <Text variant="label" color="primary">Total:</Text>
            <Badge variant="primary" size="lg" className="text-lg font-bold">
              {dashboards.length}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <Text variant="label" color="primary">Ativos:</Text>
            <Badge variant="success" size="lg" className="text-lg font-bold">
              {dashboards.filter((d) => d.enabled).length}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <Text variant="label" color="primary">Inativos:</Text>
            <Badge variant="info" size="lg" className="text-lg font-bold">
              {dashboards.filter((d) => !d.enabled).length}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="alert ">
        <Info size={24} className="text-info" />
        <Text>Clique no card ou use o toggle para ativar/desativar dashboards. As alterações serão aplicadas na próxima visita.</Text>
      </div>

      <div className="flex gap-4 justify-end">
        <Button variant="ghost">Restaurar Padrão</Button>
        <Button variant="primary">Salvar Alterações</Button>
      </div>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar Mudança"
        icon="⚠️"
        size="sm"
      >
        <div className="space-y-4">
          <Text color="muted">
            Tem certeza que deseja{' '}
            {selectedDashboard && dashboards.find(d => d.id === selectedDashboard)?.enabled
              ? 'desativar'
              : 'ativar'}{' '}
            "{selectedDashboard && dashboards.find(d => d.id === selectedDashboard)?.name}"?
          </Text>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmToggle}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
