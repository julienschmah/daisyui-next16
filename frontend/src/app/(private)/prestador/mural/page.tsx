'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MapPin, Clock, User, Navigation, DollarSign, Star, Shield } from 'lucide-react';
import { Button, Card, Typography } from '@/components/ui';
import { useUserStore } from '@/store';

interface ServiceRequest {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    location: string;
    createdAt: string;
    client: {
        name: string;
        avatar: string | null;
    };
}

export default function ProviderMuralPage() {
    const { data: session, status } = useSession();
    const user = useUserStore((state) => state.user);
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [acceptingId, setAcceptingId] = useState<string | null>(null);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

    useEffect(() => {
        fetchOpenRequests();
        const interval = setInterval(fetchOpenRequests, 5000); // Poll for new requests
        return () => clearInterval(interval);
    }, []);

    const fetchOpenRequests = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/open`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
                // Auto-select the first request if none selected
                if (data.length > 0 && !selectedRequest) {
                    setSelectedRequest(data[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (requestId: string) => {
        const userId = session?.user?.id || user?.id;

        console.log('Attempting to accept request:', requestId);
        console.log('Session status:', status);
        console.log('Session user:', session?.user);
        console.log('Store user:', user);
        console.log('Resolved User ID:', userId);

        if (status === 'loading') {
            alert('Aguarde, carregando informações da sessão...');
            return;
        }

        if (!userId) {
            alert('Erro: Você precisa estar logado para aceitar serviços. Tente recarregar a página ou fazer login novamente.');
            console.error('No session or user ID found');
            return;
        }

        setAcceptingId(requestId);
        try {
            console.log('Sending PUT request to:', `${process.env.NEXT_PUBLIC_API_URL}/requests/${requestId}/accept`);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${requestId}/accept`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ providerId: userId })
            });

            console.log('Response status:', res.status);

            if (res.ok) {
                const data = await res.json();
                console.log('Accept success:', data);
                alert('Serviço aceito! Navegue até o cliente.');
                fetchOpenRequests();
                setSelectedRequest(null);
            } else {
                const errorData = await res.json();
                console.error('Accept failed:', errorData);
                alert(`Erro ao aceitar: ${errorData.message || 'Tente novamente.'}`);
                fetchOpenRequests();
            }
        } catch (error) {
            console.error('Error accepting request:', error);
            alert('Erro de conexão ao aceitar serviço.');
        } finally {
            setAcceptingId(null);
        }
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-base-200">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) invert(1) opacity(0.6)'
                }}>
            </div>

            {/* Map Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-base-300/30 via-transparent to-base-300/90 pointer-events-none"></div>

            {/* Top Status Bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
                <div className="bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                    <span className="font-bold text-sm">Online</span>
                </div>
                <div className="bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <DollarSign size={16} className="text-success" />
                    <span className="font-bold text-sm">R$ 450,00 hoje</span>
                </div>
            </div>

            {/* Request Pins (Simulated) */}
            {requests.map((req, index) => (
                <div
                    key={req.id}
                    className="absolute cursor-pointer transition-transform hover:scale-110"
                    style={{
                        top: `${40 + (index * 10)}%`,
                        left: `${50 + (index * 5 * (index % 2 === 0 ? 1 : -1))}%`
                    }}
                    onClick={() => setSelectedRequest(req)}
                >
                    <div className={`relative flex flex-col items-center ${selectedRequest?.id === req.id ? 'z-20 scale-125' : 'z-10'}`}>
                        <div className="bg-base-100 text-xs font-bold px-2 py-1 rounded-lg shadow-md mb-1 whitespace-nowrap">
                            R$ 150
                        </div>
                        <MapPin size={48} className="text-primary drop-shadow-lg" fill="currentColor" />
                        <div className="w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
                    </div>
                </div>
            ))}

            {/* Bottom Sheet / Request Card */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
                {selectedRequest ? (
                    <Card className="max-w-md mx-auto bg-base-100/95 backdrop-blur-md shadow-2xl border-t-4 border-t-primary animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                        <span className="text-xl">{selectedRequest.client.name.substring(0, 1)}</span>
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="h4" className="font-bold">{selectedRequest.client.name}</Typography>
                                    <div className="flex items-center gap-1 text-warning text-sm">
                                        <Star size={14} fill="currentColor" />
                                        <span>4.8</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Typography variant="h3" className="font-bold text-success">R$ 150</Typography>
                                <Typography variant="caption" className="text-base-content/60">Estimado</Typography>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <div className="badge badge-primary badge-outline">{selectedRequest.category}</div>
                            <div className="badge badge-ghost flex gap-1">
                                <Navigation size={12} /> 2.5 km
                            </div>
                        </div>

                        <Typography className="font-medium mb-1">{selectedRequest.title}</Typography>
                        <Typography className="text-sm text-base-content/70 mb-4 line-clamp-2">{selectedRequest.description}</Typography>

                        <div className="flex items-center gap-2 text-sm text-base-content/60 mb-6 bg-base-200/50 p-2 rounded-lg">
                            <MapPin size={16} />
                            <span className="truncate">{selectedRequest.location}</span>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                className="flex-1"
                                onClick={() => setSelectedRequest(null)}
                            >
                                Ignorar
                            </Button>
                            <Button
                                variant="primary"
                                className="flex-[2] text-lg font-bold h-12"
                                onClick={() => handleAccept(selectedRequest.id)}
                                disabled={acceptingId === selectedRequest.id}
                            >
                                {acceptingId === selectedRequest.id ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    'Aceitar Corrida'
                                )}
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="text-center pb-8">
                        {loading ? (
                            <div className="inline-flex items-center gap-2 bg-base-100/80 px-4 py-2 rounded-full shadow-lg">
                                <span className="loading loading-spinner loading-sm text-primary"></span>
                                <span className="font-medium">Buscando serviços próximos...</span>
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="inline-flex items-center gap-2 bg-base-100/80 px-4 py-2 rounded-full shadow-lg">
                                <Shield size={16} className="text-primary" />
                                <span className="font-medium">Você está online. Aguardando chamados.</span>
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2 bg-base-100/80 px-4 py-2 rounded-full shadow-lg animate-bounce">
                                <span className="font-bold text-primary">{requests.length}</span>
                                <span className="font-medium">serviços disponíveis no mapa!</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
