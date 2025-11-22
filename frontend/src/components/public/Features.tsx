'use client';

import { CheckCircle, Zap, Award, Users } from 'lucide-react';

export function Features() {
    const features = [
        {
            icon: CheckCircle,
            title: 'Profissionais Verificados',
            description: 'Todos os profissionais passam por verificação rigorosa de antecedentes e qualificações.',
            color: 'text-success',
            bg: 'bg-success/10',
        },
        {
            icon: Zap,
            title: 'Rápido e Eficiente',
            description: 'Agendamento em poucos minutos com confirmação instantânea e gestão simplificada.',
            color: 'text-warning',
            bg: 'bg-warning/10',
        },
        {
            icon: Award,
            title: 'Garantia de Qualidade',
            description: 'Garantia de satisfação ou seu dinheiro de volta. Seu serviço protegido.',
            color: 'text-primary',
            bg: 'bg-primary/10',
        },
        {
            icon: Users,
            title: 'Suporte Humanizado',
            description: 'Time de suporte sempre pronto para ajudar em qualquer etapa do processo.',
            color: 'text-info',
            bg: 'bg-info/10',
        },
    ];

    return (
        <section className="py-24 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-base-content mb-6">
                        Por que escolher a <span className="text-primary">ServiceHub</span>?
                    </h2>
                    <p className="text-xl text-base-content/70">
                        Oferecemos a melhor experiência em contratação de serviços, com segurança e praticidade que você merece.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div key={idx} className="group p-8 bg-base-100 rounded-2xl border border-base-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <Icon size={28} className={feature.color} />
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
