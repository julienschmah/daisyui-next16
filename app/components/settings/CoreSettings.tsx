'use client';

import { useState } from 'react';
import { Header, Card, Modal, Text, Button } from '@/app/components/UI';
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
          <Button
            onClick={() => setShowThemeInfo(true)}
            className="btn btn-sm btn-ghost"
          >
            ℹ️ Ajuda
          </Button>
        }
      />

      <Card title="Seleção de Tema" shadow="lg">
        <Text variant="subtitle" color="muted" className="mb-8">
          Escolha um tema para personalizar as cores e aparência de toda a sua experiência.
          Sua seleção será salva automaticamente em seu navegador.
        </Text>
        
        <div className="divider"></div>
        <ThemeSelector />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Temas Diversos" icon="✨">
          <Text variant="subtitle" size="sm">
            Escolha entre 35 temas diferentes, desde tons claros até paletas escuras e vibrantes. Cada tema oferece uma experiência visual única.
          </Text>
        </Card>
        
        <Card title="Salvo Automaticamente" icon="💾">
          <Text variant="subtitle" size="sm">
            Sua escolha de tema é salva automaticamente no armazenamento local e restaurada quando você retorna.
          </Text>
        </Card>
        
        <Card title="Mudança Instantânea" icon="🎯">
          <Text variant="subtitle" size="sm">
            Altere o tema em tempo real e veja as cores se transformarem instantaneamente em toda a interface.
          </Text>
        </Card>

        <Card title="Suporte a Dark Mode" icon="🌗">
          <Text variant="subtitle" size="sm">
            Temas claros e escuros disponíveis, com detecção automática das preferências do sistema.
          </Text>
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
            <Text variant="label" color="primary" className="mb-2 block">O que é um Tema?</Text>
            <Text variant="subtitle" size="sm">
              Um tema é um conjunto de cores e estilos que define a aparência visual de toda a aplicação.
            </Text>
          </div>
          <div>
            <Text variant="label" color="primary" className="mb-2 block">Como Funciona?</Text>
            <Text variant="subtitle" size="sm">
              Ao selecionar um tema, todas as cores da interface mudam instantaneamente para as cores desse tema.
            </Text>
          </div>
          <div>
            <Text variant="label" color="primary" className="mb-2 block">Persistência</Text>
            <Text variant="subtitle" size="sm">
              Seu tema escolhido é salvo no navegador e carregado automaticamente na próxima visita.
            </Text>
          </div>
          <div>
            <Text variant="label" color="primary" className="mb-2 block">Disponíveis</Text>
            <Text variant="subtitle" size="sm">
              35 temas incríveis estão disponíveis, incluindo temas claros, escuros e temas especiais.
            </Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}
