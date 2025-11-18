'use client';

import { useState } from 'react';
import { Card, Button, Badge, Text } from '@/components/ui';
import { Star, MapPin, Clock, Phone, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const [quantity, setQuantity] = useState(1);

  // Mock data
  const service = {
    id: parseInt(params.id),
    title: 'Reparo de Torneira',
    description: 'Conserto profissional de torneiras com garantia de 30 dias',
    price: 150,
    unit: 'serviço',
    professional: {
      id: 1,
      name: 'João Silva',
      rating: 4.8,
      reviews: 124,
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP',
      joinedDate: '2020',
      completedServices: 340,
    },
    images: ['🔧', '🔧', '🔧'],
    category: 'Encanamento',
    availability: 'Disponível hoje e amanhã',
    responseTime: 'Responde em menos de 1 hora',
    materials: ['Torneira nova', 'Mão de obra', 'Garantia 30 dias'],
    reviews: [
      {
        id: 1,
        author: 'Carlos M.',
        rating: 5,
        date: '2025-01-10',
        comment: 'Excelente profissional! Muito pontual e prestativo.',
      },
      {
        id: 2,
        author: 'Ana P.',
        rating: 4.5,
        date: '2025-01-08',
        comment: 'Bom trabalho, chegou no horário marcado.',
      },
    ],
  };

  const totalPrice = service.price * quantity;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs text-base-content/70">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">{service.category}</Link>
          </li>
          <li>{service.title}</li>
        </ul>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Esquerda - Imagens e Descrição */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagens */}
          <div className="bg-base-200 rounded-lg p-8 text-center">
            <div className="text-8xl">{service.images[0]}</div>
            <p className="text-sm text-base-content/60 mt-4">Imagens do serviço</p>
          </div>

          {/* Informações do Profissional */}
          <Card title="Profissional" shadow="md">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-16">
                    <span className="text-2xl">{service.professional.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-primary">
                    {service.professional.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-warning" />
                    <span className="font-semibold">{service.professional.rating}</span>
                    <span className="text-sm text-base-content/70">
                      ({service.professional.reviews} avaliações)
                    </span>
                  </div>
                  <Badge variant="success">{service.professional.completedServices} serviços</Badge>
                </div>
              </div>

              <div className="divider" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>{service.professional.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-primary" />
                  <span>{service.professional.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span>{service.responseTime}</span>
                </div>
              </div>

              <Button fullWidth variant="secondary">
                Entrar em Contato
              </Button>
            </div>
          </Card>

          {/* Descrição Completa */}
          <Card title="Descrição do Serviço" shadow="md">
            <div className="space-y-4">
              <p className="text-base-content/80">{service.description}</p>

              <div>
                <h4 className="font-semibold text-base-content mb-3">O que está incluído:</h4>
                <ul className="space-y-2">
                  {service.materials.map((material, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-base-content/80">
                      <span className="text-success">✓</span>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Disponibilidade: {service.availability}</span>
              </div>
            </div>
          </Card>

          {/* Avaliações */}
          <Card title="Avaliações de Clientes" shadow="md">
            <div className="space-y-4">
              {service.reviews.map((review) => (
                <div key={review.id} className="p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-base-content">{review.author}</h4>
                    <div className="flex items-center gap-1">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-warning">
                            ★
                          </span>
                        ))}
                    </div>
                  </div>
                  <p className="text-sm text-base-content/80 mb-2">{review.comment}</p>
                  <p className="text-xs text-base-content/60">{review.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Direita - Resumo e Agendamento */}
        <div className="lg:col-span-1">
          <Card title="Agendar Serviço" shadow="lg" className="sticky top-24">
            <div className="space-y-4">
              {/* Preço */}
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base-content/70">Preço por {service.unit}:</span>
                  <span className="text-lg font-bold text-primary">
                    R$ {service.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Quantidade */}
              <div>
                <label className="text-sm font-semibold text-base-content mb-2 block">
                  Quantidade:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input input-sm input-bordered flex-1 text-center"
                  />
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="divider" />

              {/* Total */}
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base-content">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Botões */}
              <Link href={`/checkout/${service.id}?quantity=${quantity}`}>
                <Button fullWidth variant="primary" size="lg">
                  Prosseguir para Agendamento
                </Button>
              </Link>

              <Button fullWidth variant="outline">
                Adicionar aos Favoritos
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
