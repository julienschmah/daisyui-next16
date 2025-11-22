'use client';

import { ArrowRight, Search, Calendar, Star } from 'lucide-react';

export function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: '1. Busque um Serviço',
            description: 'Navegue por milhares de profissionais qualificados e encontre o especialista ideal para sua necessidade.',
        },
        {
            icon: Calendar,
            title: '2. Agende Online',
            description: 'Escolha o melhor horário, verifique a disponibilidade e agende o serviço em segundos.',
        },
        {
            icon: Star,
            title: '3. Avalie o Serviço',
            description: 'Após a conclusão, avalie o profissional e ajude a manter a qualidade da nossa comunidade.',
        },
    ];

    return (
        <section className="py-24 bg-base-200 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Como Funciona?
                    </h2>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Simples, rápido e seguro. Veja como é fácil contratar na ServiceHub.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-base-300 -translate-y-1/2 z-0 transform scale-x-75"></div>

                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div key={idx} className="relative z-10">
                                <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200 hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30 text-white">
                                        <Icon size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-base-content mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-base-content/70 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
