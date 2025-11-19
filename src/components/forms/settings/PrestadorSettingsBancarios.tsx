'use client';

import { useState } from 'react';
import { Card, Header, Input, Button, Typography } from '@/components/ui';

export function PrestadorSettingsBancarios() {
  const [bancarios, setBancarios] = useState({
    banco: 'Banco do Brasil',
    agencia: '1234',
    conta: '12345-6',
    titular: 'João Silva',
  });

  return (
    <div className="space-y-6">
      <Header
        title="Dados Bancários"
        subtitle="Configure sua conta para recebimentos"
        icon="🏦"
      />

      <div className="alert alert-warning">
        <Typography variant="body" weight="semibold">
          ⚠️ Informações de segurança
        </Typography>
        <Typography variant="caption" className="mt-1">
          Os dados bancários são criptografados e usados apenas para transferências de seu saldo.
        </Typography>
      </div>

      <Card title="Dados Bancários" bordered>
        <div className="space-y-4">
          <Input
            label="Banco"
            type="text"
            value={bancarios.banco}
            fullWidth
            onChange={(e) => setBancarios({ ...bancarios, banco: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Agência"
              type="text"
              value={bancarios.agencia}
              fullWidth
              onChange={(e) =>
                setBancarios({ ...bancarios, agencia: e.target.value })
              }
            />
            <Input
              label="Conta"
              type="text"
              value={bancarios.conta}
              fullWidth
              onChange={(e) => setBancarios({ ...bancarios, conta: e.target.value })}
            />
          </div>
          <Input
            label="Titular da Conta"
            type="text"
            value={bancarios.titular}
            fullWidth
            onChange={(e) => setBancarios({ ...bancarios, titular: e.target.value })}
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
