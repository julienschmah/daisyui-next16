'use client';

import { useState } from 'react';
import { Card, Header, Toggle, Input, Select, Button, Text } from '@/components/ui';

export function PrestadorSettingsGeneral() {
  const [settings, setSettings] = useState({
    notificacoes: true,
    emailNotificacoes: true,
    recebimentoAutomatico: true,
    visibilidadeHorarios: true,
  });

  return (
    <div className="space-y-6">
      <Header
        title="Configurações Gerais"
        subtitle="Personalize as preferências do seu painel"
        icon="⚙️"
      />

      <Card title="Notificações">
        <div className="space-y-4">
          <Toggle
            label="Ativar Notificações"
            helperText="Receba alertas sobre novos pedidos e mensagens"
            checked={settings.notificacoes}
            onChange={(e) =>
              setSettings({ ...settings, notificacoes: e.target.checked })
            }
          />
          <Toggle
            label="Notificações por E-mail"
            helperText="Receba resumo diário de atividades"
            checked={settings.emailNotificacoes}
            onChange={(e) =>
              setSettings({ ...settings, emailNotificacoes: e.target.checked })
            }
          />
        </div>
      </Card>

      <Card title="Configurações de Pagamento">
        <div className="space-y-4">
          <Toggle
            label="Recebimento Automático"
            helperText="Transferência automática para sua conta"
            checked={settings.recebimentoAutomatico}
            onChange={(e) =>
              setSettings({
                ...settings,
                recebimentoAutomatico: e.target.checked,
              })
            }
          />
          <Select
            label="Dia de Transferência"
            fullWidth
            options={[
              { value: '1', label: 'Todo dia 1º' },
              { value: '15', label: 'Todo dia 15' },
              { value: 'semanal', label: 'Semanalmente' },
            ]}
          />
        </div>
      </Card>

      <Card title="Disponibilidade">
        <div className="space-y-4">
          <Toggle
            label="Mostrar Horários de Funcionamento"
            helperText="Clientes podem ver quando você está disponível"
            checked={settings.visibilidadeHorarios}
            onChange={(e) =>
              setSettings({
                ...settings,
                visibilidadeHorarios: e.target.checked,
              })
            }
          />
          <Input
            label="Descrição Profissional"
            type="text"
            placeholder="Ex: Encanador com 10 anos de experiência"
            fullWidth
          />
        </div>
      </Card>

      <div className="flex gap-3 pt-6">
        <Button variant="ghost">Cancelar</Button>
        <Button variant="primary">Salvar Alterações</Button>
      </div>
    </div>
  );
}
