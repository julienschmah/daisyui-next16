'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Clock, Phone, MessageSquare, Shield, Star, ChevronLeft } from 'lucide-react';
import { Button, Card, Typography } from '@/components/ui';
import Link from 'next/link';

interface RequestDetails {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    location: string;
    createdAt: string;
    provider?: {
        name: string;
        avatar: string | null;
        rating?: number;
    };
}

export default function RequestTrackingPage() {
    const params = useParams();
    const router = useRouter();
    const [request, setRequest] = useState<RequestDetails | null>(null);
    const [loading, setLoading] = useState(true);

    // Poll for updates
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setRequest(data);
                }
            } catch (error) {
                console.error('Error fetching request:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
        const interval = setInterval(fetchRequest, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [params.id]);

    if (loading) return <div className="flex h-screen items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (!request) return <div className="flex h-screen items-center justify-center">Pedido não encontrado</div>;

    const isAccepted = request.status === 'accepted';

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-base-200">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) invert(1)'
                }}>
            </div>

            {/* Map Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-base-300/50 via-transparent to-base-300/90 pointer-events-none"></div>

            {/* Back Button */}
            <div className="absolute top-4 left-4 z-10">
                <Link href="/cliente/pedidos">
                    <Button variant="ghost" size="sm" className="bg-base-100/80 backdrop-blur-md shadow-sm hover:bg-base-100">
                        <ChevronLeft size={20} /> Voltar
                    </Button>
                </Link>
            </div>

            {/* Central Radar / Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isAccepted ? 'bg-success/20' : 'bg-primary/20'}`}>
                        <MapPin size={48} className={`${isAccepted ? 'text-success' : 'text-primary'} z-10`} />
                    </div>
                    {!isAccepted && (
                        <>
                            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
                            <div className="absolute inset-[-20px] rounded-full border border-primary/20 animate-[spin_3s_linear_infinite]"></div>
                        </>
                    )}
                </div>
                {!isAccepted && (
                    <div className="mt-4 bg-base-100/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                        <Typography className="font-semibold text-primary animate-pulse">Procurando prestadores...</Typography>
                    </div>
                )}
            </div>

            {/* Bottom Sheet Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                <Card className="max-w-2xl mx-auto backdrop-blur-md bg-base-100/95 shadow-2xl border-t-4 border-t-primary">
                    {isAccepted && request.provider ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-base-200 pb-4">
                                <div>
                                    <Typography variant="caption" className="text-success font-bold uppercase tracking-wider mb-1">Profissional Encontrado!</Typography>
                                    <Typography variant="h3" className="font-bold">O prestador está a caminho</Typography>
                                </div>
                                <div className="text-right">
                                    <Typography variant="h2" className="font-bold">15</Typography>
                                    <Typography variant="caption">min</Typography>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={request.provider.avatar || `https://ui-avatars.com/api/?name=${request.provider.name}`} alt={request.provider.name} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Typography variant="h4" className="font-bold">{request.provider.name}</Typography>
                                    <div className="flex items-center gap-1 text-warning">
                                        <Star size={16} fill="currentColor" />
                                        <span className="font-medium">4.9</span>
                                        <span className="text-base-content/40 text-sm">(124 avaliações)</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" className="btn-circle bg-base-200">
                                        <Phone size={20} />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="btn-circle bg-base-200">
                                        <MessageSquare size={20} />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <div className="flex-1 bg-base-200/50 rounded-lg p-3 flex items-center gap-3">
                                    <Shield size={20} className="text-success" />
                                    <div>
                                        <Typography variant="caption" className="block font-bold">Código de Segurança</Typography>
                                        <Typography className="font-mono text-lg tracking-widest">8492</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Typography variant="h3" className="font-bold mb-1">{request.title}</Typography>
                                    <Typography className="text-base-content/60">{request.category} • {request.location}</Typography>
                                </div>
                                <div className="badge badge-primary badge-outline">R$ 150 - 200</div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-base-content/60">
                                    <Clock size={16} />
                                    <span>Solicitado às {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="text-error hover:bg-error/10"
                                    onClick={async () => {
                                        if (confirm('Tem certeza que deseja cancelar este pedido?')) {
                                            try {
                                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${request.id}/cancel`, {
                                                    method: 'PUT'
                                                });
                                                if (res.ok) {
                                                    router.push('/cliente/pedidos');
                                                }
                                            } catch (error) {
                                                console.error('Error cancelling request:', error);
                                            }
                                        }
                                    }}
                                >
                                    Cancelar Pedido
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </Card >
            </div >
        </div >
    );
}
