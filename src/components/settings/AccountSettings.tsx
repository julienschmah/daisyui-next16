'use client';

import { Card, Button, Input, Select } from '@/components/ui';
import { Lock, Key, Shield } from 'lucide-react';
import { useState } from 'react';

export function AccountSettings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('As senhas não correspondem');
      return;
    }
    alert('Senha alterada com sucesso!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <Card title="Alterar Senha" icon={<Lock size={24} />} shadow="sm">
        <div className="space-y-4">
          <Input
            label="Senha Atual"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            fullWidth
            placeholder="Digite sua senha atual"
          />
          <Input
            label="Nova Senha"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            placeholder="Digite a nova senha"
            helperText="Mínimo 8 caracteres com letras, números e símbolos"
          />
          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            placeholder="Confirme a nova senha"
          />
          <Button 
            fullWidth 
            variant="primary"
            onClick={handleSave}
          >
            Atualizar Senha
          </Button>
        </div>
      </Card>

      <Card title="Segurança da Conta" icon={<Shield size={24} />} shadow="sm">
        <div className="space-y-4">
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>2FA adicionará uma camada extra de segurança à sua conta</span>
          </div>
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Autenticação de Dois Fatores (2FA)</span>
            <input type="checkbox" className="checkbox checkbox-primary" />
          </label>
          <Button fullWidth variant="outline">
            Configurar 2FA
          </Button>
        </div>
      </Card>

      <Card title="Sessões Ativas" icon={<Key size={24} />} shadow="sm">
        <div className="space-y-3">
          <div className="p-3 bg-base-100 border border-base-300 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Chrome - Windows</p>
                <p className="text-sm text-base-content/70">Último acesso: 2 minutos atrás</p>
              </div>
              <span className="badge badge-success">Agora</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 border border-base-300 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Safari - iPhone</p>
                <p className="text-sm text-base-content/70">Último acesso: 3 horas atrás</p>
              </div>
              <Button size="sm" variant="outline">Sair</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
