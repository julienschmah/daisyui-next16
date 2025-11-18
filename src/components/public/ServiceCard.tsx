'use client';

import { Card, Badge, Button } from '@/components/ui';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  unit: string;
  professional: {
    name: string;
    avatar?: string;
  };
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  category: string;
}

export function ServiceCard({
  id,
  title,
  description,
  price,
  unit,
  professional,
  rating,
  reviews,
  location,
  availability,
  category,
}: ServiceCardProps) {
  return (
    <Link href={`/servico/${id}`}>
      <Card
        className="h-full hover:shadow-xl transition-all cursor-pointer hover:scale-105"
        bordered
        shadow="md"
      >
        {/* Cabeçalho com Profissional */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-base-300">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span>{professional.name.charAt(0)}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-base-content truncate">
              {professional.name}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-warning">★</span>
              <span className="text-xs font-semibold">{rating}</span>
              <span className="text-xs text-base-content/60">({reviews})</span>
            </div>
          </div>
          <Badge variant="success" size="sm">
            {category}
          </Badge>
        </div>

        {/* Título e Descrição */}
        <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Informações */}
        <div className="space-y-2 mb-4 pb-4 border-b border-base-300">
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Clock size={14} />
            <span>{availability}</span>
          </div>
        </div>

        {/* Preço e CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">
              R$ {price.toFixed(2)}
            </span>
            <span className="text-sm text-base-content/60">/{unit}</span>
          </div>
        </div>

        {/* Botão */}
        <Button
          variant="primary"
          fullWidth
          size="sm"
          className="mt-4"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Ver Detalhes
        </Button>
      </Card>
    </Link>
  );
}
