'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Service } from '@/mocks/services';
import { Button, Input, Card, Typography } from '@/components/ui';
import { Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/helpers';

export function CheckoutFlow({ service }: { service: Service }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleConfirm = () => {
        setStep(3); // Success state
        setTimeout(() => {
            router.push('/dashboard');
        }, 3000);
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
                <Card className="bg-base-100 shadow-xl text-center max-w-md w-full py-12">
                    <div className="flex justify-center mb-6">
                        <CheckCircle size={64} className="text-success" />
                    </div>
                    <Typography variant="subtitle" size="xl" weight="bold" className="mb-2 text-3xl">Pedido Confirmado!</Typography>
                    <Typography variant="body" className="text-base-content/60 mb-8">
                        Seu agendamento foi realizado com sucesso. O profissional entrará em contato em breve.
                    </Typography>
                    <Button variant="primary" onClick={() => router.push('/dashboard')}>
                        Ir para Meus Pedidos
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="w-full lg:w-2/3 space-y-6">

                        <Card className={`bg-base-100 shadow-md transition-opacity ${step !== 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">1</div>
                                <Typography variant="subtitle" size="lg" weight="bold">Agendamento</Typography>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <Typography variant="label">Data</Typography>
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="date"
                                            className="w-full pl-10"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <Typography variant="label">Horário</Typography>
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="time"
                                            className="w-full pl-10"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                        <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                                    </div>
                                </div>
                            </div>

                            {step === 1 && (
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="primary"
                                        disabled={!date || !time}
                                        onClick={() => setStep(2)}
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            )}
                        </Card>

                        <Card className={`bg-base-100 shadow-md transition-opacity ${step !== 2 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">2</div>
                                <Typography variant="subtitle" size="lg" weight="bold">Pagamento</Typography>
                            </div>

                            <div className="space-y-4">
                                <label className="label cursor-pointer justify-start gap-4 border p-4 rounded-lg hover:bg-base-200 transition">
                                    <input type="radio" name="payment" className="radio radio-primary" defaultChecked />
                                    <CreditCard size={24} />
                                    <div>
                                        <Typography variant="body" weight="bold" className="block">Cartão de Crédito</Typography>
                                        <Typography variant="caption" size="xs">Pagamento seguro via Stripe</Typography>
                                    </div>
                                </label>

                                <label className="label cursor-pointer justify-start gap-4 border p-4 rounded-lg hover:bg-base-200 transition">
                                    <input type="radio" name="payment" className="radio radio-primary" />
                                    <Typography variant="body" weight="bold" size="xl">Pix</Typography>
                                    <div>
                                        <Typography variant="body" weight="bold" className="block">Pix (Instantâneo)</Typography>
                                        <Typography variant="caption" size="xs">Aprovação imediata</Typography>
                                    </div>
                                </label>
                            </div>

                            {step === 2 && (
                                <div className="mt-6 flex justify-between">
                                    <Button variant="ghost" onClick={() => setStep(1)}>Voltar</Button>
                                    <Button variant="primary" onClick={handleConfirm}>Confirmar Pedido</Button>
                                </div>
                            )}
                        </Card>

                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-24">
                            <Card className="bg-base-100 shadow-xl">
                                <Typography variant="subtitle" size="lg" weight="bold">Resumo do Pedido</Typography>

                                <div className="flex gap-4 mb-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={service.image} alt={service.title} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <Typography variant="body" weight="bold" size="lg" className="line-clamp-2">{service.title}</Typography>
                                        <Typography variant="caption" size="xs" className="mt-1">{service.category}</Typography>
                                    </div>
                                </div>

                                <div className="divider my-2"></div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <Typography variant="caption" size="xs">Profissional</Typography>
                                        <Typography variant="body" weight="bold" size="lg">{service.provider.name}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography variant="caption" size="xs">Data</Typography>
                                        <Typography variant="body" weight="bold" size="lg">{date ? new Date(date).toLocaleDateString('pt-BR') : '-'}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography variant="caption" size="xs">Horário</Typography>
                                        <Typography variant="body" weight="bold" size="lg">{time || '-'}</Typography>
                                    </div>
                                </div>

                                <div className="divider my-2"></div>

                                <div className="flex justify-between items-end">
                                    <Typography variant="caption" size="xs">Total</Typography>
                                    <Typography variant="body" weight="bold" size="lg">{formatCurrency(service.price)}</Typography>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
