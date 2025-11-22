'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typography, Modal, Button } from '@/components/ui';
import { Lightbulb, ChevronLeft, Settings } from 'lucide-react';

export interface SettingsSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  component: React.ComponentType;
}

interface SettingsLayoutProps {
  sections: SettingsSection[];
  backHref: string;
  backLabel?: string;
}

export function SettingsLayout({
  sections,
  backHref,
  backLabel = 'Voltar',
}: SettingsLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const currentSection = sections.find((s) => s.id === activeSection);
  const CurrentComponent = currentSection?.component;

  const handleGoBack = () => {
    if (hasChanges) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    setHasChanges(false);
  };

  return (
    <div className="flex gap-0">
      <aside className="w-80 bg-base-200 min-h-screen p-6 border-r border-base-300 overflow-y-auto hidden lg:block">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Settings size={24} className="text-primary" />
            <Typography variant="label" size="xl" weight="bold" color="primary">
              Configurações
            </Typography>
          </div>
          <Typography variant="subtitle" color="muted">Gerencie todas as opções</Typography>
        </div>

        <div className="divider my-4"></div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeSection === section.id
                ? 'bg-primary text-primary-content shadow-lg'
                : 'hover:bg-base-300 text-base-content'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="label"
                    weight="semibold"
                    size="base"
                    className="truncate"
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    size="xs"
                    className="line-clamp-2"
                  >
                    {section.description}
                  </Typography>
                </div>
              </div>
            </button>
          ))}
        </nav>

        <div className="divider my-6"></div>

        <div className="bg-base-300 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-warning flex-shrink-0 mt-1" />
            <Typography variant="caption" color="muted">
              <span className="font-semibold">Dica:</span> Todas as mudanças são salvas
              automaticamente.
            </Typography>
          </div>
        </div>

        <Link href={backHref}>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ChevronLeft size={18} />
            {backLabel}
          </Button>
        </Link>
      </aside>

      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">
                {sections.find((s) => s.id === activeSection)?.icon}
              </span>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  {currentSection?.title}
                </h1>
                <p className="text-base-content/70">
                  {currentSection?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 py-2 rounded text-sm transition-all ${activeSection === section.id
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-200 hover:bg-base-300'
                    }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div className="divider my-4"></div>
          </div>

          {CurrentComponent && <CurrentComponent />}
        </div>
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Mudanças não salvas"
      >
        <div className="space-y-4">
          <Typography variant="body">
            Você tem alterações não salvas. Deseja sair mesmo assim?
          </Typography>
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => setShowConfirmModal(false)}
            >
              Continuar editando
            </Button>
            <Link href={backHref}>
              <Button variant="primary" onClick={handleConfirmBack}>
                Sair sem salvar
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
