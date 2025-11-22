'use client';

import { Star, Quote } from 'lucide-react';

export function Testimonials() {
    const testimonials = [
        {
            name: 'Carlos Mendes',
            role: 'Empresário',
            image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            text: 'Encontrei um eletricista excelente para minha empresa em menos de 1 hora. O serviço foi impecável e o preço justo.',
            rating: 5,
        },
        {
            name: 'Ana Paula Souza',
            role: 'Arquiteta',
            image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
            text: 'Uso a ServiceHub para todos os meus projetos de reforma. A qualidade dos profissionais é sempre garantida.',
            rating: 5,
        },
        {
            name: 'Roberto Silva',
            role: 'Gerente de TI',
            image: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
            text: 'A facilidade de agendamento e pagamento é incrível. Recomendo para todos que buscam praticidade.',
            rating: 4,
        },
    ];

    return (
        <section className="py-24 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        O que dizem nossos clientes
                    </h2>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Junte-se a milhares de clientes satisfeitos que confiam na ServiceHub.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="card bg-base-200 border border-base-300 hover:border-primary/50 transition-all hover:shadow-xl">
                            <div className="card-body relative">
                                <Quote size={48} className="absolute top-6 right-6 text-primary/10" />

                                <div className="flex items-center gap-1 mb-6">
                                    {Array(5).fill(0).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={`${i < item.rating ? 'fill-warning text-warning' : 'text-base-content/20'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-lg text-base-content/80 mb-8 italic relative z-10">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base-content">{item.name}</h4>
                                        <p className="text-sm text-base-content/60">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
