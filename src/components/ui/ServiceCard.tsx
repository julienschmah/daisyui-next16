'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button, Badge, Typography } from '@/components/ui';
import { Service } from '@/mocks/services';
import { formatCurrency } from '@/lib/helpers';

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 group">
            <figure className="relative h-48 overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="shadow-sm">
                        {service.category}
                    </Badge>
                </div>
            </figure>

            <div className="card-body p-5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="avatar">
                        <div className="w-6 h-6 rounded-full relative">
                            <Image
                                src={service.provider.avatar}
                                alt={service.provider.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <Typography variant="caption" size="sm">{service.provider.name}</Typography>
                    {service.provider.verified && (
                        <div className="tooltip" data-tip="Verificado">
                            <span className="text-blue-500 text-xs">✓</span>
                        </div>
                    )}
                </div>

                <Link href={`/servico/${service.id}`} className="hover:text-primary transition-colors">
                    <h3 className="card-title text-lg mb-2 line-clamp-2">
                        {service.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 mb-4">
                    <Star size={16} className="fill-warning text-warning" />
                    <span className="font-bold">{service.rating}</span>
                    <Typography variant="caption" size="sm">({service.reviewsCount} avaliações)</Typography>
                </div>

                <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-200">
                    <div className="flex flex-col">
                        <Typography variant="caption" size="xs">A partir de</Typography>
                        <span className="text-xl font-bold text-primary">
                            {formatCurrency(service.price)}
                        </span>
                    </div>
                    <Link href={`/servico/${service.id}`}>
                        <Button size="sm" variant="primary">
                            Ver Detalhes
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
