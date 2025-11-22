'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-base-300 text-base-content pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <span className="text-primary">Service</span>Hub
                        </h3>
                        <p className="text-base-content/70 leading-relaxed">
                            Conectando você aos melhores profissionais do mercado. Qualidade, segurança e rapidez em um só lugar.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="btn btn-circle btn-ghost btn-sm hover:text-primary hover:bg-primary/10">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="btn btn-circle btn-ghost btn-sm hover:text-primary hover:bg-primary/10">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="btn btn-circle btn-ghost btn-sm hover:text-primary hover:bg-primary/10">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="btn btn-circle btn-ghost btn-sm hover:text-primary hover:bg-primary/10">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-base-content">Links Rápidos</h4>
                        <ul className="space-y-3">
                            <li><Link href="/servicos" className="link link-hover hover:text-primary transition-colors">Encontrar Profissionais</Link></li>
                            <li><Link href="/cadastro" className="link link-hover hover:text-primary transition-colors">Seja um Profissional</Link></li>
                            <li><Link href="/sobre" className="link link-hover hover:text-primary transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="link link-hover hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contato" className="link link-hover hover:text-primary transition-colors">Fale Conosco</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-base-content">Serviços Populares</h4>
                        <ul className="space-y-3">
                            <li><Link href="/servicos/limpeza" className="link link-hover hover:text-primary transition-colors">Limpeza Residencial</Link></li>
                            <li><Link href="/servicos/eletrica" className="link link-hover hover:text-primary transition-colors">Eletricista</Link></li>
                            <li><Link href="/servicos/encanamento" className="link link-hover hover:text-primary transition-colors">Encanador</Link></li>
                            <li><Link href="/servicos/pintura" className="link link-hover hover:text-primary transition-colors">Pintura</Link></li>
                            <li><Link href="/servicos/mudanca" className="link link-hover hover:text-primary transition-colors">Mudanças e Fretes</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-base-content">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                                <span className="text-base-content/70">Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-primary shrink-0" />
                                <span className="text-base-content/70">(11) 99999-9999</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-primary shrink-0" />
                                <span className="text-base-content/70">contato@servicehub.com.br</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 text-sm text-base-content/60">
                    <p>© 2025 ServiceHub. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link>
                        <Link href="/privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
