import { ThemeSelector } from '@/app/components/ThemeSelector';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Configurações</h1>
          <p className="text-base-content/70">
            Personalize a aparência do seu sistema escolhendo entre 35 temas incríveis do daisyUI
          </p>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Tema do Sistema</h2>
            <p className="text-base-content/70 mb-8">
              Escolha um tema para personalizar as cores e aparência de toda a sua experiência.
              Sua seleção será salva automaticamente.
            </p>
            
            <div className="divider"></div>
            <ThemeSelector />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">✨ Temas Diversos</h3>
              <p className="text-sm text-base-content/70">
                Escolha entre 35 temas diferentes, desde tons claros até paletas escuras e vibrantes.
              </p>
            </div>
          </div>
          
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">💾 Salvo Automaticamente</h3>
              <p className="text-sm text-base-content/70">
                Sua escolha de tema é salva automaticamente e restaurada quando você retorna.
              </p>
            </div>
          </div>
          
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">🎨 Mudança Instantânea</h3>
              <p className="text-sm text-base-content/70">
                Altere o tema em tempo real e veja as cores se transformarem instantaneamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
