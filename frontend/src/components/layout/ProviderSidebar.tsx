'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    DollarSign,
    Briefcase,
    Settings,
    LogOut,
    MapPin
} from 'lucide-react';
import { logout } from '@/actions/auth';

const menuItems = [
    { href: '/prestador', label: 'Visão Geral', icon: LayoutDashboard },
    { href: '/prestador/mural', label: 'Mural de Oportunidades', icon: MapPin }, // New link
    { href: '/prestador/disponibilidade', label: 'Agenda & Horários', icon: Calendar },
    { href: '/prestador/financeiro', label: 'Financeiro', icon: DollarSign },
    { href: '/prestador/servicos', label: 'Meus Serviços', icon: Briefcase },
    { href: '/prestador/configuracoes', label: 'Configurações', icon: Settings },
];

export function ProviderSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-base-200 h-screen fixed left-0 top-0 flex flex-col border-r border-base-300">
            <div className="p-6 border-b border-base-300">
                <div className="text-2xl font-bold text-primary">ServiceHub</div>
                <div className="text-xs text-base-content/60 uppercase tracking-wider mt-1">Área do Profissional</div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-primary text-primary-content shadow-md'
                                : 'hover:bg-base-300 text-base-content'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-base-300">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-3 w-full text-error hover:bg-error/10 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
}
