'use client';

import { useState } from 'react';
import { Header, Card, Modal, Typography, Button } from '@/components/ui';
import { ThemeSelector } from '@/components/layout/ThemeSelector';

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
            variant="ghost"
            size="sm"
          >
            ℹ️ Ajuda
          </Button>
        }
      />

      <Card title="Seleção de Tema" shadow="lg">
        <Typography variant="subtitle" color="muted" className="mb-8">
          Escolha um tema para personalizar as cores e aparência de toda a sua experiência.
          Sua seleção será salva automaticamente em seu navegador.
        </Typography>

        <div className="divider"></div>
        <ThemeSelector />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Temas Diversos" icon="✨">
          <Typography variant="subtitle" size="sm">
            Escolha entre 35 temas diferentes, desde tons claros até paletas escuras e vibrantes. Cada tema oferece uma experiência visual única.
          </Typography>
        </Card>

        <Card title="Salvo Automaticamente" icon="💾">
          <Typography variant="subtitle" size="sm">
            Sua escolha de tema é salva automaticamente no armazenamento local e restaurada quando você retorna.
          </Typography>
        </Card>

        <Card title="Mudança Instantânea" icon="🎯">
          <Typography variant="subtitle" size="sm">
            Altere o tema em tempo real e veja as cores se transformarem instantaneamente em toda a interface.
          </Typography>
        </Card>

        <Card title="Suporte a Dark Mode" icon="🌗">
          <Typography variant="subtitle" size="sm">
            Temas claros e escuros disponíveis, com detecção automática das preferências do sistema.
          </Typography>
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
            <Typography variant="label" color="primary" className="mb-2 block">O que é um Tema?</Typography>
            <Typography variant="subtitle" size="sm">
              Um tema é um conjunto de cores e estilos que define a aparência visual de toda a aplicação.
            </Typography>
          </div>
          <div>
            <Typography variant="label" color="primary" className="mb-2 block">Como Funciona?</Typography>
            <Typography variant="subtitle" size="sm">
              Ao selecionar um tema, todas as cores da interface mudam instantaneamente para as cores desse tema.
            </Typography>
          </div>
          <div>
            <Typography variant="label" color="primary" className="mb-2 block">Persistência</Typography>
            <Typography variant="subtitle" size="sm">
              Seu tema escolhido é salvo no navegador e carregado automaticamente na próxima visita.
            </Typography>
          </div>
          <div>
            <Typography variant="label" color="primary" className="mb-2 block">Disponíveis</Typography>
            <Typography variant="subtitle" size="sm">
              35 temas incríveis estão disponíveis, incluindo temas claros, escuros e temas especiais.
            </Typography>
          </div>
        </div>
      </Modal>
    </div>
  );
}
