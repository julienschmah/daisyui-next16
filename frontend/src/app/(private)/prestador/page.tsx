import { fetchServices } from '@/actions/services';
import { fetchProviderBookings } from '@/actions/bookings';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, Typography, Badge } from '@/components/ui';
import Link from 'next/link';
import { Calendar, DollarSign, Users, Clock } from 'lucide-react';

export default async function ProviderDashboard() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const userRole = cookieStore.get('userRole')?.value;

    if (!userId || userRole !== 'provider') {
        redirect('/login');
    }

    const [services, bookings] = await Promise.all([
        fetchServices({ providerId: userId }),
        fetchProviderBookings(),
    ]);

    const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;
    const confirmedBookings = bookings.filter((b: any) => b.status === 'confirmed').length;

    const stats = [
        { label: 'Agendamentos Pendentes', value: pendingBookings, icon: Clock, color: 'text-warning' },
        { label: 'Confirmados', value: confirmedBookings, icon: Calendar, color: 'text-primary' },
        { label: 'Total de Serviços', value: services.length, icon: Users, color: 'text-info' },
        { label: 'Ganhos (Mês)', value: 'R$ 0,00', icon: DollarSign, color: 'text-success' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <Typography variant="h1">Visão Geral</Typography>
                <Typography variant="body" className="text-base-content/70">
                    Bem-vindo de volta! Aqui está o resumo da sua atividade.
                </Typography>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography variant="h2" size="lg">Próximos Agendamentos</Typography>
                        <Link href="/prestador/agenda" className="link link-primary text-sm">Ver todos</Link>
                    </div>

                    {bookings.length === 0 ? (
                        <Card className="bg-base-100 py-8 text-center">
                            <Typography variant="body" className="text-base-content/60">Nenhum agendamento recente.</Typography>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {bookings.slice(0, 3).map((booking: any) => (
                                <Card key={booking.id} className="bg-base-100 p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                    <span className="text-sm">{booking.client.name.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.client.name}</div>
                                                <div className="text-xs text-base-content/60">{booking.service.title}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">{new Date(booking.date).toLocaleDateString('pt-BR')}</div>
                                            <Badge variant={booking.status === 'pending' ? 'warning' : 'success'} size="sm">
                                                {booking.status === 'pending' ? 'Pendente' : 'Confirmado'}
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions / Services */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography variant="h2" size="lg">Meus Serviços</Typography>
                        <Link href="/servico/novo" className="btn btn-xs btn-primary">+ Novo</Link>
                    </div>

                    {services.length === 0 ? (
                        <Card className="bg-base-100 py-8 text-center">
                            <Typography variant="body" className="text-base-content/60">Nenhum serviço cadastrado.</Typography>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {services.slice(0, 3).map((service: any) => (
                                <Card key={service.id} className="bg-base-100 p-4 flex flex-row gap-4 items-center">
                                    <div className="w-12 h-12 rounded bg-base-200 flex-shrink-0 overflow-hidden">
                                        <img src={service.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold truncate">{service.title}</div>
                                        <div className="text-xs text-primary">R$ {Number(service.price).toFixed(2)}</div>
                                    </div>
                                    <button className="btn btn-ghost btn-xs">Editar</button>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
