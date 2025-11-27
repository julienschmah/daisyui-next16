'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store';
import { MapPin, Loader2 } from 'lucide-react';
import { Button, Input, Typography } from '@/components/ui';
import { useRouter } from 'next/navigation';

interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCategory?: string;
}

export function RequestModal({ isOpen, onClose, initialCategory }: RequestModalProps) {
    const { user, isAuthenticated } = useUserStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: initialCategory || '',
        location: '',
    });

    useEffect(() => {
        if (initialCategory) {
            setFormData(prev => ({ ...prev, category: initialCategory }));
        }
    }, [initialCategory]);

    const handleGetLocation = () => {
        setLocationLoading(true);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData(prev => ({
                        ...prev,
                        location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                    }));
                    setLocationLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Erro ao obter localização. Por favor, digite manualmente.');
                    setLocationLoading(false);
                }
            );
        } else {
            alert('Geolocalização não suportada pelo seu navegador.');
            setLocationLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated || !user) {
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    clientId: user.id
                })
            });

            if (res.ok) {
                const data = await res.json();
                onClose();
                setFormData({ title: '', description: '', category: '', location: '' });
                router.push(`/cliente/pedidos/${data.id}`); // Redirect to tracking page
            }
        } catch (error) {
            console.error('Error creating request:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open z-50">
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <Typography variant="h3" className="font-bold text-lg mb-4">Novo Pedido de Serviço</Typography>

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
                        <div className="relative">
                            <Input
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Ex: Rua das Flores, 123"
                                required
                                className="pr-12"
                            />
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary-focus"
                                title="Usar minha localização atual"
                            >
                                {locationLoading ? <Loader2 size={20} className="animate-spin" /> : <MapPin size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="modal-action">
                        <Button type="submit" variant="primary" fullWidth disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : 'Criar Pedido'}
                        </Button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}
