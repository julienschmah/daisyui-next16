'use client';

import { Button } from '@/components/ui';
import { ArrowRight, CheckCircle, Star, Users, Zap, Award } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-primary via-purple-500 to-secondary text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-48 -right-48" />
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-48 -left-48" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32 min-h-screen flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Encontre os Melhores Profissionais
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Conectamos você aos profissionais mais qualificados para resolver qualquer problema. Rápido, seguro e confiável.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <Link href="/servicos">
                <Button variant="accent" size="lg" className="w-full md:w-auto">
                  Explorar Serviços
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="w-full md:w-auto text-white border-white hover:bg-white/10">
                Saber Mais
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24">
              <div>
                <div className="text-4xl font-bold mb-2">2.500+</div>
                <p className="text-white/80">Profissionais Verificados</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15K+</div>
                <p className="text-white/80">Serviços Concluídos</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9★</div>
                <p className="text-white/80">Avaliação Média</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              Por que nos escolher?
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Oferecemos a melhor experiência em contratação de profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Profissionais Verificados',
                description: 'Todos os profissionais passam por verificação rigorosa de qualificações',
              },
              {
                icon: Zap,
                title: 'Rápido e Eficiente',
                description: 'Agendamento em poucos minutos com confirmação instantânea',
              },
              {
                icon: Award,
                title: 'Garantia de Qualidade',
                description: 'Garantia de satisfação ou seu dinheiro de volta',
              },
              {
                icon: Users,
                title: 'Suporte 24/7',
                description: 'Tim de suporte sempre pronto para ajudar',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 bg-base-200 rounded-xl border border-base-300 hover:border-primary transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-base-100 to-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              Como Funciona?
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Três passos simples para encontrar o profissional perfeito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Busque um Serviço',
                description: 'Explore nossa seleção de profissionais e serviços especializados',
              },
              {
                step: '2',
                title: 'Escolha e Agende',
                description: 'Selecione o profissional e escolha a data/hora que melhor combina',
              },
              {
                step: '3',
                title: 'Aproveite o Serviço',
                description: 'Avalie o profissional após o atendimento para ajudar outros clientes',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-base-100 p-8 rounded-xl border-2 border-primary/20 hover:border-primary transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-base-content mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base-content/70">
                    {item.description}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-primary rounded-full items-center justify-center text-white z-10">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              Categorias Populares
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Encontre serviços em diversos segmentos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '🔧 Encanamento',
              '⚡ Elétrica',
              '🧹 Limpeza',
              '🎨 Pintura',
              '🪵 Carpintaria',
              '❄️ HVAC',
              '🌱 Paisagismo',
              '🛠️ Reparos',
            ].map((cat, idx) => (
              <button
                key={idx}
                className="p-6 bg-base-200 hover:bg-primary hover:text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              O que os clientes dizem
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Histórias reais de clientes satisfeitos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Carlos M.',
                role: 'Cliente',
                text: 'Encontrei um ótimo encanador em poucos minutos. Muito profissional e rápido!',
                rating: 5,
              },
              {
                name: 'Ana P.',
                role: 'Cliente',
                text: 'Serviço excelente de pintura. A qualidade foi exatamente como esperado.',
                rating: 5,
              },
              {
                name: 'João L.',
                role: 'Cliente',
                text: 'A plataforma é muito fácil de usar. Voltaria a usar com certeza!',
                rating: 4,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-base-200 p-8 rounded-xl border border-base-300 hover:border-primary transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={16} className="fill-warning text-warning" />
                    ))}
                </div>
                <p className="text-base-content/80 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-base-content">{testimonial.name}</p>
                  <p className="text-sm text-base-content/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para encontrar o profissional ideal?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comece agora e descubra profissionais qualificados perto de você
          </p>
          <Link href="/servicos">
            <Button variant="accent" size="lg" className="w-full md:w-auto">
              Explorar Serviços Agora
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
