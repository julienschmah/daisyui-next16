'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, ShoppingCart, TrendingUp, DollarSign, Star } from 'lucide-react';

// Mock Data
const kpiData = {
  totalProfissionais: 1.234,
  totalClientes: 5.678,
  totalPedidos: 12.345,
  pedidosAtivos: 89,
  receita: 125.430,
  receitaMes: 28.900,
  avaliacaoMedia: 4.7,
  profissionaisAtivos: 956,
};

const revenueData = [
  { mes: 'Jan', receita: 18000, pedidos: 45 },
  { mes: 'Fev', receita: 22000, pedidos: 52 },
  { mes: 'Mar', receita: 19000, pedidos: 48 },
  { mes: 'Abr', receita: 25000, pedidos: 61 },
  { mes: 'Mai', receita: 28900, pedidos: 72 },
  { mes: 'Jun', receita: 31000, pedidos: 85 },
];

const statusData = [
  { name: 'Concluído', value: 45, fill: '#10b981' },
  { name: 'Em Progresso', value: 28, fill: '#f59e0b' },
  { name: 'Pendente', value: 16, fill: '#3b82f6' },
  { name: 'Cancelado', value: 11, fill: '#ef4444' },
];

const topProfissionais = [
  { id: 1, nome: 'João Silva', especialidade: 'Eletricista', pedidos: 156, rating: 4.9 },
  { id: 2, nome: 'Maria Santos', especialidade: 'Encanadora', pedidos: 143, rating: 4.8 },
  { id: 3, nome: 'Carlos Oliveira', especialidade: 'Marceneiro', pedidos: 128, rating: 4.7 },
  { id: 4, nome: 'Ana Costa', especialidade: 'Pintora', pedidos: 112, rating: 4.6 },
];

function KPICard({ icon: Icon, title, value, change, unit = '' }: any) {
  const isPositive = change >= 0;

  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-base-content/70">{title}</p>
            <p className="text-2xl font-bold mt-2">
              {value.toLocaleString('pt-BR')} {unit}
            </p>
            <p className={`text-xs mt-2 flex items-center gap-1 ${isPositive ? 'text-success' : 'text-error'}`}>
              <TrendingUp size={14} />
              {isPositive ? '+' : ''}{change}% vs mês anterior
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/60 mt-2">Bem-vindo ao painel administrativo ServiceHub</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Users}
          title="Total de Clientes"
          value={kpiData.totalClientes}
          change={12.5}
        />
        <KPICard
          icon={UserCheck}
          title="Profissionais Ativos"
          value={kpiData.profissionaisAtivos}
          change={8.2}
        />
        <KPICard
          icon={ShoppingCart}
          title="Pedidos Este Mês"
          value={kpiData.totalPedidos}
          change={23.1}
        />
        <KPICard
          icon={DollarSign}
          title="Receita Este Mês"
          value={kpiData.receitaMes}
          change={18.7}
          unit="R$"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h2 className="card-title text-lg">Receita e Pedidos (últimos 6 meses)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--bc) / 0.1)" />
                <XAxis dataKey="mes" stroke="hsl(var(--bc) / 0.5)" />
                <YAxis stroke="hsl(var(--bc) / 0.5)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--b1))',
                    border: '1px solid hsl(var(--bc) / 0.2)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="hsl(var(--p))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--p))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pedidos */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-6">
            <h2 className="card-title text-lg">Status dos Pedidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Profissionais */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-6">
          <h2 className="card-title text-lg mb-4">Top Profissionais</h2>
          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead>
                <tr className="border-base-300">
                  <th>Nome</th>
                  <th>Especialidade</th>
                  <th>Pedidos Completos</th>
                  <th>Avaliação</th>
                </tr>
              </thead>
              <tbody>
                {topProfissionais.map((prof) => (
                  <tr key={prof.id} className="border-base-300 hover:bg-base-200">
                    <td className="font-medium">{prof.nome}</td>
                    <td>{prof.especialidade}</td>
                    <td>
                      <span className="badge badge-primary badge-outline">{prof.pedidos}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-warning fill-warning" />
                        <span className="font-semibold">{prof.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
