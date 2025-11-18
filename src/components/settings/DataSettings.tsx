'use client';

import { Card, Button, Input, Select } from '@/components/ui';
import { FileText, Download, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function DataSettings() {
  const [apiKey, setApiKey] = useState('sk_live_••••••••••••••••••••••••');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert('Chave copiada!');
  };

  const handleRegenerateApiKey = () => {
    if (confirm('Tem certeza? Todas as integrações que usam a chave atual deixarão de funcionar.')) {
      setApiKey('sk_live_newkey' + Math.random().toString(36).substr(2, 9) + '...');
      alert('Chave regenerada!');
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Exportar Dados" icon={<Download size={24} />} shadow="sm">
        <div className="space-y-4">
          <p className="text-sm text-base-content/70">
            Baixe uma cópia dos seus dados em formato CSV
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button fullWidth variant="outline">
              Pedidos
            </Button>
            <Button fullWidth variant="outline">
              Profissionais
            </Button>
            <Button fullWidth variant="outline">
              Clientes
            </Button>
            <Button fullWidth variant="outline">
              Transações
            </Button>
          </div>
          <Button fullWidth variant="secondary">
            Exportar Tudo
          </Button>
        </div>
      </Card>

      <Card title="Chave de API" icon={<FileText size={24} />} shadow="sm">
        <div className="space-y-4">
          <p className="text-sm text-base-content/70">
            Use a chave de API para integrar com sistemas externos
          </p>
          <div className="flex gap-2">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="input input-bordered input-primary flex-1"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? '🙈' : '👁️'}
            </Button>
            <Button size="sm" onClick={handleCopyApiKey} className="gap-2">
              <Copy size={16} /> Copiar
            </Button>
          </div>
          <div className="alert alert-warning">
            <span>⚠️ Nunca compartilhe sua chave de API. Ela concede acesso total à sua conta.</span>
          </div>
          <Button fullWidth variant="outline" onClick={handleRegenerateApiKey}>
            Regenerar Chave
          </Button>
        </div>
      </Card>

      <Card title="Retenção de Dados" icon={<Trash2 size={24} />} shadow="sm">
        <div className="space-y-4">
          <Select
            label="Período de Retenção de Logs"
            fullWidth
            options={[
              { value: '30', label: '30 dias' },
              { value: '90', label: '90 dias' },
              { value: '180', label: '180 dias' },
              { value: '365', label: '1 ano' },
              { value: 'never', label: 'Indefinidamente' },
            ]}
            defaultValue="90"
          />
          <Select
            label="Remover Dados de Pedidos Antigos"
            fullWidth
            options={[
              { value: 'never', label: 'Nunca' },
              { value: '1year', label: 'Após 1 ano' },
              { value: '2years', label: 'Após 2 anos' },
            ]}
            defaultValue="never"
          />
          <Button fullWidth>Salvar Preferências</Button>
          <div className="alert alert-error">
            <span>⚠️ A exclusão de dados é permanente e não pode ser desfeita.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
