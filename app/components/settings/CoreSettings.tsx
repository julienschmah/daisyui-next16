'use client';

import { ThemeSelector } from '@/app/components/ThemeSelector';

export function CoreSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">🎨 Cores - Tema do Sistema</h2>
        <p className="text-base-content/70">Escolha o tema que define as cores de todo o sistema</p>
      </div>

      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">Seleção de Tema</h3>
          <p className="text-base-content/70 mb-8">
            Escolha um tema para personalizar as cores e aparência de toda a sua experiência.
            Sua seleção será salva automaticamente em seu navegador.
          </p>
          
          <div className="divider"></div>
          <ThemeSelector />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">✨ Temas Diversos</h3>
            <p className="text-sm text-base-content/70">
              Escolha entre 35 temas diferentes, desde tons claros até paletas escuras e vibrantes. Cada tema oferece uma experiência visual única.
            </p>
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">💾 Salvo Automaticamente</h3>
            <p className="text-sm text-base-content/70">
              Sua escolha de tema é salva automaticamente no armazenamento local e restaurada quando você retorna.
            </p>
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">🎯 Mudança Instantânea</h3>
            <p className="text-sm text-base-content/70">
              Altere o tema em tempo real e veja as cores se transformarem instantaneamente em toda a interface.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">🌗 Suporte a Dark Mode</h3>
            <p className="text-sm text-base-content/70">
              Temas claros e escuros disponíveis, com detecção automática das preferências do sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
