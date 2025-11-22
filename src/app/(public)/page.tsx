'use client';

import { Hero } from '@/components/public/Hero';
import { Features } from '@/components/public/Features';
import { HowItWorks } from '@/components/public/HowItWorks';
import { Testimonials } from '@/components/public/Testimonials';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />

      {/* Categories Section - Kept inline for now as it's simple, but could be a component */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Categorias Populares
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Encontre serviços em diversos segmentos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: '🔧 Encanamento', count: '120+ pros' },
              { name: '⚡ Elétrica', count: '85+ pros' },
              { name: '🧹 Limpeza', count: '200+ pros' },
              { name: '🎨 Pintura', count: '90+ pros' },
              { name: '🪵 Carpintaria', count: '45+ pros' },
              { name: '❄️ HVAC', count: '30+ pros' },
              { name: '🌱 Paisagismo', count: '60+ pros' },
              { name: '🛠️ Reparos', count: '150+ pros' },
            ].map((cat, idx) => (
              <button
                key={idx}
                className="group p-6 bg-base-200 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                <div className="font-bold text-lg mb-1">{cat.name}</div>
                <div className="text-sm text-base-content/60 group-hover:text-white/80">{cat.count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Pronto para transformar sua casa?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Não perca tempo procurando. Encontre o profissional ideal em minutos.
          </p>
          <Link href="/servicos">
            <Button variant="accent" size="lg" className="px-10 h-14 text-lg shadow-xl hover:scale-105 transition-transform bg-white text-primary hover:bg-gray-100 border-none">
              Começar Agora
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
