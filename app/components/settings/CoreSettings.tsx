'use client';

import { useState } from 'react';
import { Header, Card, Modal } from '@/app/components/UI';
import { ThemeSelector } from '@/app/components/ThemeSelector';

export function CoreSettings() {
  const [showThemeInfo, setShowThemeInfo] = useState(false);

  return (
    <div className="space-y-6">
      <Header
        title="Cores - Tema do Sistema"
        subtitle="Escolha o tema que define as cores de todo o sistema"
        icon="🎨"
        action={
          <button
            onClick={() => setShowThemeInfo(true)}
            className="btn btn-sm btn-ghost"
          >
            ℹ️ Ajuda
          </button>
        }
      />

      <Card title="Seleção de Tema" shadow="lg">
        <p className="text-base-content/70 mb-8">
          Escolha um tema para personalizar as cores e aparência de toda a sua experiência.
          Sua seleção será salva automaticamente em seu navegador.
        </p>
        
        <div className="divider"></div>
        <ThemeSelector />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Temas Diversos" icon="✨">
          <p className="text-sm text-base-content/70">
            Escolha entre 35 temas diferentes, desde tons claros até paletas escuras e vibrantes. Cada tema oferece uma experiência visual única.
          </p>
        </Card>
        
        <Card title="Salvo Automaticamente" icon="💾">
          <p className="text-sm text-base-content/70">
            Sua escolha de tema é salva automaticamente no armazenamento local e restaurada quando você retorna.
          </p>
        </Card>
        
        <Card title="Mudança Instantânea" icon="🎯">
          <p className="text-sm text-base-content/70">
            Altere o tema em tempo real e veja as cores se transformarem instantaneamente em toda a interface.
          </p>
        </Card>

        <Card title="Suporte a Dark Mode" icon="🌗">
          <p className="text-sm text-base-content/70">
            Temas claros e escuros disponíveis, com detecção automática das preferências do sistema.
          </p>
        </Card>
      </div>

      <Modal
        isOpen={showThemeInfo}
        onClose={() => setShowThemeInfo(false)}
        title="Sobre Temas"
        icon="ℹ️"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-primary mb-2">O que é um Tema?</h4>
            <p className="text-sm text-base-content/70">
              Um tema é um conjunto de cores e estilos que define a aparência visual de toda a aplicação.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-2">Como Funciona?</h4>
            <p className="text-sm text-base-content/70">
              Ao selecionar um tema, todas as cores da interface mudam instantaneamente para as cores desse tema.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-2">Persistência</h4>
            <p className="text-sm text-base-content/70">
              Seu tema escolhido é salvo no navegador e carregado automaticamente na próxima visita.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-2">Disponíveis</h4>
            <p className="text-sm text-base-content/70">
              35 temas incríveis estão disponíveis, incluindo temas claros, escuros e temas especiais.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
