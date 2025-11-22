'use client';

import { Card, Button, Input, Select } from '@/components/ui';
import { Globe, MapPin, Languages } from 'lucide-react';

export function RegionSettings() {
  return (
    <div className="space-y-6">
      <Card title="Idioma" icon={<Languages size={24} />} shadow="sm">
        <div className="space-y-4">
          <Select
            label="Selecione o idioma"
            fullWidth
            options={[
              { value: 'pt-BR', label: 'Português (Brasil)' },
              { value: 'pt-PT', label: 'Português (Portugal)' },
              { value: 'en-US', label: 'English (USA)' },
              { value: 'es-ES', label: 'Español' },
            ]}
            defaultValue="pt-BR"
          />
          <p className="text-sm text-base-content/70">
            A interface será recarregada após a alteração do idioma
          </p>
        </div>
      </Card>

      <Card title="Localização" icon={<MapPin size={24} />} shadow="sm">
        <div className="space-y-4">
          <Select
            label="País"
            fullWidth
            options={[
              { value: 'BR', label: 'Brasil' },
              { value: 'PT', label: 'Portugal' },
              { value: 'US', label: 'Estados Unidos' },
              { value: 'MX', label: 'México' },
            ]}
            defaultValue="BR"
          />
          <Select
            label="Fuso Horário"
            fullWidth
            options={[
              { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
              { value: 'America/Manaus', label: 'Manaus (GMT-4)' },
              { value: 'Europe/Lisbon', label: 'Lisboa (GMT+0)' },
              { value: 'America/New_York', label: 'Nova York (GMT-5)' },
            ]}
            defaultValue="America/Sao_Paulo"
          />
          <Button fullWidth>Salvar Localização</Button>
        </div>
      </Card>

      <Card title="Formato de Data" icon={<Globe size={24} />} shadow="sm">
        <div className="space-y-4">
          <Select
            label="Formato"
            fullWidth
            options={[
              { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY' },
              { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY' },
              { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
            ]}
            defaultValue="dd/mm/yyyy"
          />
          <div className="alert">
            <span>Exemplo de data: 18/11/2025</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
