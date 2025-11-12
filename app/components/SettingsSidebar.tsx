'use client';

import { useState } from 'react';
import { Text } from './UI';
import { Lightbulb } from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export function SettingsSidebar({ onSectionChange }: { onSectionChange: (section: string) => void }) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sections: SettingsSection[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      description: 'Visão geral do sistema',
    },
    {
      id: 'configurar-dashboard',
      title: 'Configurar Dashboard',
      icon: '⚙️',
      description: 'Escolha widgets a exibir',
    },
    {
      id: 'cores',
      title: 'Cores',
      icon: '🎨',
      description: 'Define o tema do sistema',
    },
    {
      id: 'marca-dagua',
      title: 'Marca d\'água/Capas',
      icon: '🏷️',
      description: 'Personalize marcas e capas',
    },
    {
      id: 'modulos',
      title: 'Módulos',
      icon: '⚙️',
      description: 'Gerencie módulos ativos',
    },
    {
      id: 'campos-obrigatorios',
      title: 'Campos Obrigatórios',
      icon: '✓',
      description: 'Configure campos obrigatórios',
    },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionChange(sectionId);
  };

  return (
    <aside className="w-80 bg-base-200 min-h-screen p-6 border-r border-base-300 overflow-y-auto hidden lg:block">
      <div className="mb-8">
        <Text variant="label" size="xl" weight="bold" color="primary" className="mb-2 block">
          ⚙️ Configurações
        </Text>
        <Text variant="subtitle" color="muted">Gerencie todas as opções do seu sistema</Text>
      </div>

      <div className="divider my-4"></div>

      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-primary text-primary-content shadow-lg'
                : 'hover:bg-base-300 text-base-content'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{section.icon}</span>
              <div className="flex-1">
                <Text variant="label" weight="semibold" size="base">{section.title}</Text>
                <Text variant="caption" size="xs">{section.description}</Text>
              </div>
            </div>
          </button>
        ))}
      </nav>

      <div className="divider my-6"></div>

      <div className="bg-base-300 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Lightbulb size={16} className="text-warning flex-shrink-0 mt-1" />
          <Text variant="caption" color="muted">
            <span className="font-semibold">Dica:</span> Todas as mudanças são salvas automaticamente. Use o menu ao lado para navegar entre as configurações.
          </Text>
        </div>
      </div>
    </aside>
  );
}
