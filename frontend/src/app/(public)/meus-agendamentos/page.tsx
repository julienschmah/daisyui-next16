import { Card, Badge, Button, Typography } from '@/components/ui';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';

export default function MyAppointmentsPage() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Typography variant="subtitle" size="xl" weight="bold" className="mb-2">Meus Agendamentos</Typography>
                    <Typography variant="body" className="text-base-content/70">Gerencie seus serviços agendados</Typography>
                </div>
                <Button variant="primary" className="gap-2">
                    <Calendar size={18} />
                    Novo Agendamento
                </Button>
            </div>

            <div className="grid gap-6">
                {/* Mock Appointment 1 */}
                <Card className="bg-base-100 shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="primary">Confirmado</Badge>
                                <span className="text-sm text-base-content/60">Agendado em 20/11/2023</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Limpeza Residencial Completa</h3>

                            <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} className="text-primary" />
                                    <span className="font-medium">25 Nov, 2023</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={16} className="text-primary" />
                                    <span className="font-medium">09:00 - 13:00</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} className="text-primary" />
                                    <span>Rua das Flores, 123 - Apt 45</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-base-200/50 p-3 rounded-lg w-full md:w-auto">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                    <img src="https://ui-avatars.com/api/?name=Maria+Silva&background=random" alt="Provider" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-base-content/60">Profissional</p>
                                <p className="font-bold flex items-center gap-1">
                                    Maria Silva
                                    <User size={14} className="text-success" />
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <Button variant="outline" className="flex-1 md:flex-none">Detalhes</Button>
                            <Button variant="ghost" className="text-error flex-1 md:flex-none">Cancelar</Button>
                        </div>
                    </div>
                </Card>

                {/* Mock Appointment 2 */}
                <Card className="bg-base-100 shadow-md hover:shadow-lg transition-shadow border-l-4 border-warning">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="warning">Pendente</Badge>
                                <span className="text-sm text-base-content/60">Agendado hoje</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Reparo Elétrico - Chuveiro</h3>

                            <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} className="text-primary" />
                                    <span className="font-medium">28 Nov, 2023</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={16} className="text-primary" />
                                    <span className="font-medium">14:00 - 15:00</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} className="text-primary" />
                                    <span>Rua das Flores, 123 - Apt 45</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-base-200/50 p-3 rounded-lg w-full md:w-auto">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-12">
                                    <span className="text-xs">Aguardando</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-base-content/60">Profissional</p>
                                <p className="font-bold text-base-content/50">A definir</p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <Button variant="outline" className="flex-1 md:flex-none">Detalhes</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
