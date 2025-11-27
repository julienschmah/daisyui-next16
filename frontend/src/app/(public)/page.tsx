'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button, Typography, Card } from '@/components/ui';
import { RequestModal } from '@/components/requests/RequestModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const openRequestModal = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={selectedCategory}
      />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-20 bg-gradient-to-b from-base-100 to-base-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Typography variant="h1" className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Qual profissional você precisa hoje?
          </Typography>
          <Typography variant="body1" className="text-xl text-base-content/70 mb-8">
            Conectamos você aos melhores eletricistas e encanadores da região em minutos.
            Rápido, seguro e sem complicação.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
          {/* Electrician Card */}
          <div onClick={() => openRequestModal('Eletricista')} className="group cursor-pointer">
            <Card className="h-full border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-base-100">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={48} />
                </div>
                <Typography variant="h3" className="font-bold mb-3">Eletricista</Typography>
                <Typography className="text-base-content/60 mb-6">
                  Instalações, reparos na fiação, quadros de distribuição e mais.
                </Typography>
                <Button variant="outline" className="group-hover:btn-primary w-full">
                  Solicitar Eletricista <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Plumber Card */}
          <div onClick={() => openRequestModal('Encanador')} className="group cursor-pointer">
            <Card className="h-full border-2 border-transparent hover:border-info transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-base-100">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wrench size={48} />
                </div>
                <Typography variant="h3" className="font-bold mb-3">Encanador</Typography>
                <Typography className="text-base-content/60 mb-6">
                  Vazamentos, desentupimentos, instalações hidráulicas e mais.
                </Typography>
                <Button variant="outline" className="group-hover:btn-info w-full">
                  Solicitar Encanador <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100 border-t border-base-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Profissionais Verificados</h3>
              <p className="text-base-content/60">Todos os prestadores passam por uma rigorosa verificação.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Orçamento Rápido</h3>
              <p className="text-base-content/60">Receba aceites de profissionais próximos em poucos minutos.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Pagamento Seguro</h3>
              <p className="text-base-content/60">Garantia de serviço realizado ou seu dinheiro de volta.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
