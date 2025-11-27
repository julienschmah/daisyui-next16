'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Plus, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Card, Typography, Input } from '@/components/ui';

interface ServiceRequest {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    location?: string;
    createdAt: string;
    provider?: {
        name: string;
        avatar: string | null;
    };
}

export default function ClientRequestsPage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
    });

    useEffect(() => {
        if (session?.user?.id) {
            fetchRequests();
        } else if (session === null) {
            // Session loaded but user not authenticated
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        const isNew = searchParams.get('new');
        const categoryParam = searchParams.get('category');

        if (isNew === 'true') {
            setIsModalOpen(true);
            if (categoryParam) {
                setFormData(prev => ({ ...prev, category: categoryParam }));
            }
        }
    }, [searchParams]);

    const fetchRequests = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/my/${session?.user?.id}`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            } else {
                console.error('Failed to fetch requests:', res.status);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    clientId: session.user.id
                })
            });

            if (res.ok) {
                fetchRequests();
                setIsModalOpen(false);
                setFormData({ title: '', description: '', category: '', location: '' });
            }
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open': return <div className="badge badge-info">Aberto</div>;
            case 'accepted': return <div className="badge badge-success">Aceito</div>;
            case 'completed': return <div className="badge badge-neutral">Concluído</div>;
            default: return <div className="badge badge-ghost">{status}</div>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <Typography variant="h2" className="font-bold">Meus Pedidos</Typography>
                    <Typography variant="body2" className="text-base-content/60">
                        Solicite serviços e acompanhe o status
                    </Typography>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant="primary">
                    <Plus size={20} className="mr-2" /> Novo Pedido
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : requests.length === 0 ? (
                <div className="text-center py-12 bg-base-100 rounded-xl border border-dashed border-base-300">
                    <div className="bg-base-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle size={32} className="text-base-content/40" />
                    </div>
                    <Typography variant="h3" className="font-bold mb-2">Nenhum pedido realizado</Typography>
                    <Button onClick={() => setIsModalOpen(true)} variant="outline" className="mt-4">
                        Fazer meu primeiro pedido
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {requests.map((req) => (
                        <Card key={req.id} className={`border-l-4 ${req.status === 'open' ? 'border-l-warning bg-warning/5' : 'border-l-primary'}`}>
                            {req.status === 'open' && (
                                <div className="bg-gradient-to-r from-warning/20 to-transparent p-4 rounded-t-lg border-b border-warning/30 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                                                <Clock size={24} className="text-warning animate-pulse" />
                                            </div>
                                            <div className="absolute inset-0 rounded-full bg-warning/30 animate-ping"></div>
                                        </div>
                                        <div className="flex-1">
                                            <Typography variant="h4" className="font-bold text-warning mb-1">
                                                Aguardando Profissional
                                            </Typography>
                                            <Typography variant="body2" className="text-base-content/70">
                                                Seu pedido está visível para prestadores próximos. Você será notificado quando alguém aceitar!
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="radial-progress text-warning" style={{ "--value": 75, "--size": "3rem", "--thickness": "4px" } as any}>
                                                <Clock size={16} />
                                            </div>
                                            <Typography variant="caption" className="text-base-content/60">Buscando...</Typography>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Typography variant="h4" className="font-bold">{req.title}</Typography>
                                        {getStatusBadge(req.status)}
                                    </div>
                                    <Typography className="text-base-content/70 mb-2">{req.description}</Typography>
                                    <div className="flex items-center gap-4 text-sm text-base-content/60">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {req.location || 'Sem local'}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                {req.provider && (
                                    <div className="text-right">
                                        <Typography variant="caption" className="block mb-1">Aceito por:</Typography>
                                        <div className="flex items-center gap-2 justify-end">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                    <span className="text-xs">{req.provider.name.substring(0, 2)}</span>
                                                </div>
                                            </div>
                                            <span className="font-semibold">{req.provider.name}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsModalOpen(false)}>✕</button>
                        <h3 className="font-bold text-lg mb-4">Novo Pedido de Serviço</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">O que você precisa?</span></label>
                                <Input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ex: Trocar chuveiro"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Categoria</span></label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Eletricista">Eletricista</option>
                                    <option value="Encanador">Encanador</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Descrição Detalhada</span></label>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Descreva o problema..."
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Localização</span></label>
                                <Input
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Ex: Rua das Flores, 123"
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <Button type="submit" variant="primary" fullWidth>Criar Pedido</Button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
                </div>
            )}
        </div>
    );
}
