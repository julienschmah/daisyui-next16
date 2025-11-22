'use client';

import { Card, Button, Input } from '@/components/ui';
import { Bell, Mail, Smartphone } from 'lucide-react';

export function DashboardSettings() {
  return (
    <div className="space-y-6">
      <Card title="Notificações por Email" icon={<Mail size={24} />} shadow="sm">
        <div className="space-y-4">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Pedidos</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Mensagens</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Relatórios Semanais</span>
            <input type="checkbox" className="checkbox checkbox-primary" />
          </label>
        </div>
      </Card>

      <Card title="Notificações em Tempo Real" icon={<Bell size={24} />} shadow="sm">
        <div className="space-y-4">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Sons de notificação</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Desktop</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
          </label>
        </div>
      </Card>

      <Card title="Contato de Emergência" icon={<Smartphone size={24} />} shadow="sm">
        <div className="space-y-4">
          <Input
            label="Telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            fullWidth
          />
          <Input
            label="Email de Backup"
            type="email"
            placeholder="backup@email.com"
            fullWidth
          />
          <Button fullWidth className="mt-4">Salvar</Button>
        </div>
      </Card>
    </div>
  );
}
