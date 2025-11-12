'use client';

import { useState } from 'react';
import { Header, Card, Button, Modal } from '@/app/components/UI';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  type: 'chart' | 'stats' | 'metric';
  color: string;
}

// Dados para os gráficos
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
      icon: '📈',
      enabled: true,
      type: 'chart',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'referral-tracking',
      name: 'Rastreamento',
      description: 'Rastreamento de referências e score',
      icon: '🎯',
      enabled: true,
      type: 'metric',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'revenue-funnel',
      name: 'Receita',
      description: 'Funil de receita em etapas',
      icon: '💰',
      enabled: true,
      type: 'chart',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'client-distribution',
      name: 'Distribuição',
      description: 'Distribuição de clientes por tipo',
      icon: '👥',
      enabled: true,
      type: 'chart',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'property-status',
      name: 'Status Imóveis',
      description: 'Status dos imóveis em carteira',
      icon: '🏠',
      enabled: false,
      type: 'metric',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'monthly-targets',
      name: 'Metas Mensais',
      description: 'Metas mensais e progresso',
      icon: '🎪',
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

      {/* Grid de Dashboards Disponíveis */}
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
                {/* Header com checkbox */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dashboard.icon}</span>
                    <div>
                      <h3 className="font-bold text-success">{dashboard.name}</h3>
                      <p className="text-xs text-base-content/70">{dashboard.type}</p>
                    </div>
                  </div>
                  <label className="swap swap-rotate cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dashboard.enabled}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleDashboard(dashboard.id);
                      }}
                      className="hidden"
                    />
                    <svg
                      className="swap-off w-6 h-6 fill-base-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.4 5H8.6C4.1 5 1 8.13 1 12s3.1 7 7.6 7h6.8c4.5 0 7.6-3.13 7.6-7s-3.1-7-7.6-7Zm0 12H8.6c-3 0-5.4-2.27-5.4-5s2.4-5 5.4-5h6.8c3 0 5.4 2.27 5.4 5s-2.4 5-5.4 5Zm-3.2-8c-1.7 0-3 1.34-3 3s1.3 3 3 3 3-1.34 3-3-1.3-3-3-3Z" />
                    </svg>
                    <svg
                      className="swap-on w-6 h-6 fill-success"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.4 5H8.6C4.1 5 1 8.13 1 12s3.1 7 7.6 7h6.8c4.5 0 7.6-3.13 7.6-7s-3.1-7-7.6-7Zm3.2 8c0 1.66-1.3 3-3 3s-3-1.34-3-3 1.3-3 3-3 3 1.34 3 3Z" />
                    </svg>
                  </label>
                </div>

                {/* Descrição */}
                <p className="text-sm text-base-content/70">{dashboard.description}</p>

                {/* Visualização do gráfico */}
                <div className="h-40 rounded-lg bg-base-800 overflow-hidden border border-base-700">
                  {renderChart(dashboard.id) ? (
                    <div className="w-full h-full">
                      {renderChart(dashboard.id)}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl opacity-50">{dashboard.icon}</span>
                    </div>
                  )}
                </div>

                {/* Badge de status */}
                <div className="flex justify-between items-center pt-2 border-t border-base-700">
                  <span className="text-xs text-base-content/70">
                    {dashboard.enabled ? 'Ativo' : 'Inativo'}
                  </span>
                  <span
                    className={`badge ${
                      dashboard.enabled ? 'badge-success' : 'badge-ghost'
                    }`}
                  >
                    {dashboard.enabled ? '✓' : '○'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <Card title="Resumo" icon="📊" shadow="md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <span className="font-semibold text-primary">Total:</span>
            <span className="badge badge-primary text-lg font-bold">
              {dashboards.length}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <span className="font-semibold text-primary">Ativos:</span>
            <span className="badge badge-success text-lg font-bold">
              {dashboards.filter((d) => d.enabled).length}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
            <span className="font-semibold text-primary">Inativos:</span>
            <span className="badge badge-info text-lg font-bold">
              {dashboards.filter((d) => !d.enabled).length}
            </span>
          </div>
        </div>
      </Card>

      {/* Alert */}
      <div className="alert alert-info">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>Clique no card ou use o toggle para ativar/desativar dashboards. As alterações serão aplicadas na próxima visita.</span>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 justify-end">
        <Button variant="ghost">Restaurar Padrão</Button>
        <Button variant="primary">Salvar Alterações</Button>
      </div>

      {/* Modal de Confirmação */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar Mudança"
        icon="⚠️"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-base-content/70">
            Tem certeza que deseja{' '}
            {selectedDashboard && dashboards.find(d => d.id === selectedDashboard)?.enabled
              ? 'desativar'
              : 'ativar'}{' '}
            "{selectedDashboard && dashboards.find(d => d.id === selectedDashboard)?.name}"?
          </p>
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
