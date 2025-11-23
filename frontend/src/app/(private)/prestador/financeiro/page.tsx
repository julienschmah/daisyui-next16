'use client';

import { Card, Typography } from '@/components/ui';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function FinancialPage() {
    // Mock data for now
    const stats = [
        { label: 'Ganhos Totais', value: 'R$ 4.250,00', icon: DollarSign, color: 'text-success' },
        { label: 'A Receber', value: 'R$ 850,00', icon: TrendingUp, color: 'text-warning' },
        { label: 'Saques Realizados', value: 'R$ 3.400,00', icon: TrendingDown, color: 'text-info' },
    ];

    const transactions = [
        { id: 1, client: 'Maria Silva', service: 'Limpeza Residencial', date: '22/11/2023', amount: 'R$ 150,00', status: 'Pago' },
        { id: 2, client: 'João Santos', service: 'Reparo Elétrico', date: '21/11/2023', amount: 'R$ 200,00', status: 'Pago' },
        { id: 3, client: 'Ana Costa', service: 'Instalação', date: '20/11/2023', amount: 'R$ 350,00', status: 'Pendente' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <Typography variant="h1">Financeiro</Typography>
                <Typography variant="body" className="text-base-content/70">
                    Acompanhe seus ganhos e extrato.
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="bg-base-100">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full bg-base-200 ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-base-content/60">{stat.label}</div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Card className="bg-base-100">
                <Typography variant="h2" size="lg" className="mb-4">Histórico de Transações</Typography>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Cliente</th>
                                <th>Serviço</th>
                                <th>Status</th>
                                <th className="text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover">
                                    <td>{tx.date}</td>
                                    <td>{tx.client}</td>
                                    <td>{tx.service}</td>
                                    <td>
                                        <span className={`badge ${tx.status === 'Pago' ? 'badge-success' : 'badge-warning'} badge-sm`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="text-right font-mono font-bold">{tx.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
