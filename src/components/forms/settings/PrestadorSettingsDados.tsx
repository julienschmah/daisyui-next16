'use client';

import { useState } from 'react';
import { Card, Header, Input, Button, Text, Badge } from '@/components/ui';

export function PrestadorSettingsDados() {
  const [dados, setDados] = useState({
    nome: 'João Silva',
    profissao: 'Encanador',
    email: 'joao@example.com',
    telefone: '(11) 99999-9999',
    cid: 'São Paulo, SP',
  });

  return (
    <div className="space-y-6">
      <Header
        title="Dados Profissionais"
        subtitle="Informações sobre seu perfil"
        icon="👤"
      />

      <Card title="Informações Pessoais">
        <div className="space-y-4">
          <Input
            label="Nome Completo"
            type="text"
            value={dados.nome}
            fullWidth
            onChange={(e) => setDados({ ...dados, nome: e.target.value })}
          />
          <Input
            label="E-mail"
            type="email"
            value={dados.email}
            fullWidth
            onChange={(e) => setDados({ ...dados, email: e.target.value })}
          />
          <Input
            label="Telefone"
            type="tel"
            value={dados.telefone}
            fullWidth
            onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
          />
        </div>
      </Card>

      <Card title="Informações Profissionais">
        <div className="space-y-4">
          <Input
            label="Profissão"
            type="text"
            value={dados.profissao}
            fullWidth
            onChange={(e) => setDados({ ...dados, profissao: e.target.value })}
          />
          <Input
            label="Cidade"
            type="text"
            value={dados.cid}
            fullWidth
            onChange={(e) => setDados({ ...dados, cid: e.target.value })}
          />
        </div>
      </Card>

      <Card title="Verificação" bordered>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="label">E-mail Verificado</Text>
              <Text variant="caption">Confirmado em 15/11/2024</Text>
            </div>
            <Badge variant="success">✓ Verificado</Badge>
          </div>
          <div className="divider my-2"></div>
          <div className="flex items-center justify-between">
            <div>
              <Text variant="label">Telefone Verificado</Text>
              <Text variant="caption">Confirmado em 14/11/2024</Text>
            </div>
            <Badge variant="success">✓ Verificado</Badge>
          </div>
        </div>
      </Card>

      <div className="flex gap-3 pt-6">
        <Button variant="ghost">Cancelar</Button>
        <Button variant="primary">Salvar Alterações</Button>
      </div>
    </div>
  );
}
