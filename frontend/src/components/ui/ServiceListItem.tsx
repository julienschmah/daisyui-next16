'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button, Badge, Typography } from '@/components/ui';
import { Service } from '@/mocks/services';
import { formatCurrency } from '@/lib/helpers';

interface ServiceListItemProps {
    service: Service;
}

export function ServiceListItem({ service }: ServiceListItemProps) {
    return (
        <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 group">
            <figure className="relative w-48 md:w-64 overflow-hidden shrink-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="shadow-sm">
                        {service.category}
                    </Badge>
                </div>
            </figure>

            <div className="card-body p-5 w-full">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
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
                            <h3 className="card-title text-lg mb-2">
                                {service.title}
                            </h3>
                        </Link>

                        <Typography variant="body" size="sm" className="line-clamp-2 mb-3 text-base-content/70">
                            {service.description}
                        </Typography>

                        <div className="flex items-center gap-1">
                            <Star size={16} className="fill-warning text-warning" />
                            <span className="font-bold">{service.rating}</span>
                            <Typography variant="caption" size="sm">({service.reviewsCount} avaliações)</Typography>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end md:border-l md:border-base-200 md:pl-6 min-w-[140px]">
                        <div className="flex flex-col items-end">
                            <Typography variant="caption" size="xs">A partir de</Typography>
                            <span className="text-xl font-bold text-primary">
                                {formatCurrency(service.price)}
                            </span>
                        </div>
                        <Link href={`/servico/${service.id}`} className="w-full">
                            <Button size="sm" variant="primary" fullWidth className="mt-4">
                                Ver Detalhes
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
