'use client';

import { Card, Button, Input, Select, Badge } from '@/components/ui';
import { MailOpen, Bell, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    messages: true,
    promotions: false,
    weeklyReport: true,
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    enabled: true,
    sound: true,
    desktop: true,
    vibration: false,
  });

  return (
    <div className="space-y-6">
      <Card title="Notificações por Email" icon={<MailOpen size={24} />} shadow="sm">
        <div className="space-y-4">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Atualizações de Pedidos</span>
            <input
              type="checkbox"
              checked={emailNotifications.orderUpdates}
              onChange={(e) =>
                setEmailNotifications({
                  ...emailNotifications,
                  orderUpdates: e.target.checked,
                })
              }
              className="checkbox checkbox-primary"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Mensagens</span>
            <input
              type="checkbox"
              checked={emailNotifications.messages}
              onChange={(e) =>
                setEmailNotifications({
                  ...emailNotifications,
                  messages: e.target.checked,
                })
              }
              className="checkbox checkbox-primary"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Promoções</span>
            <input
              type="checkbox"
              checked={emailNotifications.promotions}
              onChange={(e) =>
                setEmailNotifications({
                  ...emailNotifications,
                  promotions: e.target.checked,
                })
              }
              className="checkbox checkbox-primary"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Relatório Semanal</span>
            <input
              type="checkbox"
              checked={emailNotifications.weeklyReport}
              onChange={(e) =>
                setEmailNotifications({
                  ...emailNotifications,
                  weeklyReport: e.target.checked,
                })
              }
              className="checkbox checkbox-primary"
            />
          </label>
          <Button fullWidth>Salvar Preferências de Email</Button>
        </div>
      </Card>

      <Card title="Notificações em Tempo Real" icon={<Bell size={24} />} shadow="sm">
        <div className="space-y-4">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Habilitar notificações</span>
            <input
              type="checkbox"
              checked={inAppNotifications.enabled}
              onChange={(e) =>
                setInAppNotifications({
                  ...inAppNotifications,
                  enabled: e.target.checked,
                })
              }
              className="checkbox checkbox-primary"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Som de notificação</span>
            <input
              type="checkbox"
              checked={inAppNotifications.sound}
              onChange={(e) =>
                setInAppNotifications({
                  ...inAppNotifications,
                  sound: e.target.checked,
                })
              }
              disabled={!inAppNotifications.enabled}
              className="checkbox checkbox-primary"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Notificações Desktop</span>
            <input
              type="checkbox"
              checked={inAppNotifications.desktop}
              onChange={(e) =>
                setInAppNotifications({
                  ...inAppNotifications,
                  desktop: e.target.checked,
                })
              }
              disabled={!inAppNotifications.enabled}
              className="checkbox checkbox-primary"
            />
          </label>
          <Button fullWidth>Salvar Preferências de Notificação</Button>
        </div>
      </Card>

      <Card title="Resumo de Atividade" icon={<CheckCircle size={24} />} shadow="sm">
        <div className="space-y-3">
          <Select
            label="Frequência de Resumos"
            fullWidth
            options={[
              { value: 'daily', label: 'Diário' },
              { value: 'weekly', label: 'Semanal' },
              { value: 'monthly', label: 'Mensal' },
              { value: 'never', label: 'Nunca' },
            ]}
            defaultValue="weekly"
          />
          <Input
            label="Horário Preferido"
            type="time"
            fullWidth
            defaultValue="09:00"
          />
          <Button fullWidth>Salvar</Button>
        </div>
      </Card>

      <div className="alert alert-warning">
        <AlertCircle size={20} />
        <span>
          Algumas notificações críticas sempre serão enviadas independentemente das suas
          preferências
        </span>
      </div>
    </div>
  );
}
