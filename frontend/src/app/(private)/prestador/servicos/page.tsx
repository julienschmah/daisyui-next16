'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Edit2, Trash2, Search, MoreVertical, DollarSign, Clock, Tag } from 'lucide-react';
import { Button, Card, Typography, Badge } from '@/components/ui';

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    imageUrl?: string;
}

export default function ServicesPage() {
    const { data: session } = useSession();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (session?.user?.id) {
            fetchServices();
        }
    }, [session]);

    const fetchServices = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?providerId=${session?.user?.id}`);
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingService
                ? `${process.env.NEXT_PUBLIC_API_URL}/services/${editingService.id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/services`;

            const method = editingService ? 'PUT' : 'POST';

            const body = {
                ...formData,
                price: Number(formData.price),
                duration: Number(formData.duration),
                providerId: session?.user?.id
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                fetchServices();
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
                method: 'DELETE'
            });
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            price: service.price.toString(),
            duration: service.duration.toString(),
            category: service.category,
            imageUrl: service.imageUrl || ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setFormData({
            title: '',
            description: '',
            price: '',
            duration: '',
            category: '',
            imageUrl: ''
        });
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <Typography variant="h2" className="font-bold">Meus Serviços</Typography>
                    <Typography variant="body2" className="text-base-content/60">
                        Gerencie os serviços que você oferece aos seus clientes
                    </Typography>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant="primary">
                    <Plus size={20} className="mr-2" /> Novo Serviço
                </Button>
            </div>

            <div className="flex gap-4 bg-base-100 p-4 rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar serviços..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : filteredServices.length === 0 ? (
                <div className="text-center py-12 bg-base-100 rounded-xl border border-dashed border-base-300">
                    <div className="bg-base-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Tag size={32} className="text-base-content/40" />
                    </div>
                    <Typography variant="h3" className="font-bold mb-2">Nenhum serviço encontrado</Typography>
                    <Typography className="text-base-content/60 mb-6">
                        Você ainda não cadastrou nenhum serviço ou não encontramos resultados para sua busca.
                    </Typography>
                    <Button onClick={() => setIsModalOpen(true)} variant="outline">
                        Cadastrar Primeiro Serviço
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <Card key={service.id} className="group hover:shadow-md transition-all duration-300 border-base-200">
                            <div className="relative h-40 bg-base-200 -mx-6 -mt-6 mb-4 overflow-hidden">
                                {service.imageUrl ? (
                                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                                        <Tag size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(service)} className="btn btn-circle btn-sm btn-ghost bg-base-100/80 backdrop-blur-sm hover:bg-base-100">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(service.id)} className="btn btn-circle btn-sm btn-ghost bg-base-100/80 backdrop-blur-sm hover:bg-error/20 text-error">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="text-xs font-medium uppercase tracking-wider opacity-70">
                                            {service.category}
                                        </Badge>
                                    </div>
                                    <Typography variant="h4" className="font-bold group-hover:text-primary transition-colors">
                                        {service.title}
                                    </Typography>
                                </div>

                                <Typography className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
                                    {service.description}
                                </Typography>

                                <div className="flex items-center justify-between pt-4 border-t border-base-100">
                                    <div className="flex items-center gap-2 text-base-content/80">
                                        <Clock size={16} />
                                        <span className="text-sm font-medium">{service.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-primary font-bold text-lg">
                                        <span className="text-xs opacity-70">R$</span>
                                        {Number(service.price).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                        <Typography variant="h3" className="font-bold mb-6">
                            {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                        </Typography>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Título do Serviço</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Categoria</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Eletricista">Eletricista</option>
                                        <option value="Encanador">Encanador</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Descrição</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Preço (R$)</span>
                                    </label>
                                    <div className="relative">
                                        <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="input input-bordered w-full pl-10"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Duração (minutos)</span>
                                    </label>
                                    <div className="relative">
                                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <input
                                            type="number"
                                            className="input input-bordered w-full pl-10"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">URL da Imagem (Opcional)</span>
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">
                                    {editingService ? 'Salvar Alterações' : 'Criar Serviço'}
                                </button>
                            </div>
                        </form>
                    </div >
                    <div className="modal-backdrop" onClick={handleCloseModal}></div>
                </div >
            )
            }
        </div >
    );
}
