'use client';

import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="min-h-[90vh] bg-gradient-to-br from-primary via-purple-600 to-secondary text-white relative overflow-hidden flex items-center">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full -top-48 -right-48 blur-3xl" />
                <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full -bottom-48 -left-48 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />
            </div>

            <div className="relative container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
                    <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-sm font-semibold tracking-wide uppercase">🚀 A plataforma #1 de serviços</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
                        Encontre os <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Melhores Profissionais</span> para sua necessidade
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl lg:mx-0 mx-auto">
                        Conectamos você aos especialistas mais qualificados do mercado. Rápido, seguro e com garantia de satisfação.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href="/servicos">
                            <Button variant="accent" size="lg" className="w-full sm:w-auto px-8 text-lg h-14 shadow-xl hover:scale-105 transition-transform">
                                Explorar Serviços
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                        <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 h-14">
                            Como Funciona
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/10">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">2.5k+</div>
                            <p className="text-sm text-white/70">Profissionais</p>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">15k+</div>
                            <p className="text-sm text-white/70">Serviços</p>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">4.9</div>
                            <p className="text-sm text-white/70">Avaliação Média</p>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                            <p className="text-sm text-white/70">Suporte</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
