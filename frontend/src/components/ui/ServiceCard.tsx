'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Service } from '@/mocks/services';
import { formatCurrency } from '@/lib/helpers';

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link href={`/servico/${service.id}`} className="group block h-full">
            <div className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-none rounded-3xl">
                {/* Image Section */}
                <figure className="relative h-56 w-full">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                        <Badge className="badge-secondary border-none px-3 py-1 rounded-full font-medium">
                            {service.category}
                        </Badge>
                    </div>
                </figure>

                <div className="card-body p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-full relative ring-2 ring-primary-content/20">
                                <Image
                                    src={service.provider.avatar}
                                    alt={service.provider.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-medium opacity-90">{service.provider.name}</span>
                            {service.provider.verified && (
                                <CheckCircle size={14} className="text-secondary" />
                            )}
                        </div>
                    </div>

                    <h3 className="card-title text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                        {service.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mb-6">
                        <Star size={18} className="fill-warning text-warning" />
                        <span className="font-bold text-lg">{service.rating}</span>
                        <span className="text-sm opacity-60">({service.reviewsCount} avaliações)</span>
                    </div>

                    {/* Footer (Price & Button) */}
                    <div className="mt-auto pt-4 border-t border-primary-content/10 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs opacity-60">A partir de</span>
                            <span className="text-2xl font-bold text-secondary">
                                {formatCurrency(service.price)}
                            </span>
                        </div>
                        <Button
                            size="sm"
                            className="btn-secondary border-none font-bold px-4 rounded-xl"
                        >
                            Ver Detalhes
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
