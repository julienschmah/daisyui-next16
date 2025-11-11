'use client';

import { useState } from 'react';
import { Header, Card, Button, List, Modal, type ListItem } from '@/app/components/UI';

interface RequiredField {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: string;
  icon?: string;
}

export function RequiredFieldsSettings() {
  const [fields, setFields] = useState<RequiredField[]>([
    {
      id: 'nome',
      name: 'Nome',
      description: 'Nome completo do usuário/cliente',
      required: true,
      category: 'Dados Pessoais',
      icon: '👤',
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Endereço de email',
      required: true,
      category: 'Dados Pessoais',
      icon: '📧',
    },
    {
      id: 'telefone',
      name: 'Telefone',
      description: 'Número de telefone',
      required: false,
      category: 'Dados Pessoais',
      icon: '📱',
    },
    {
      id: 'endereco',
      name: 'Endereço',
      description: 'Endereço completo',
      required: true,
      category: 'Endereço',
      icon: '🏠',
    },
    {
      id: 'cpf',
      name: 'CPF',
      description: 'Cadastro de Pessoas Físicas',
      required: false,
      category: 'Documentação',
      icon: '📄',
    },
    {
      id: 'empresa',
      name: 'Empresa',
      description: 'Nome da empresa/instituição',
      required: false,
      category: 'Dados Profissionais',
      icon: '🏢',
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const toggleField = (fieldId: string) => {
    setSelectedField(fieldId);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    if (selectedField) {
      setFields(
        fields.map((field) =>
          field.id === selectedField ? { ...field, required: !field.required } : field
        )
      );
    }
    setShowConfirm(false);
    setSelectedField(null);
  };

  const categories = Array.from(new Set(fields.map((f) => f.category)));

  const getFieldsByCategory = (category: string) => {
    return fields
      .filter((f) => f.category === category)
      .map((field) => ({
        id: field.id,
        icon: field.icon,
        label: field.name,
        description: field.description,
        badge: field.required ? 'Obrigatório' : 'Opcional',
        badgeColor: field.required ? 'error' : 'info',
        action: (
          <input
            type="checkbox"
            checked={field.required}
            onChange={() => toggleField(field.id)}
            className="checkbox checkbox-primary"
          />
        ),
      } as ListItem));
  };

  return (
    <div className="space-y-6">
      <Header
        title="Campos Obrigatórios"
        subtitle="Configure quais campos são obrigatórios no sistema"
        icon="✓"
      />

      {categories.map((category) => (
        <Card key={category} title={category} shadow="lg">
          <List items={getFieldsByCategory(category)} variant="bordered" />
        </Card>
      ))}

      <div className="alert alert-info">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>Campos marcados com "Obrigatório" serão exigidos ao preencher formulários.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Resumo" icon="📋" shadow="md">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
              <span className="font-semibold text-primary">Campos Obrigatórios:</span>
              <span className="badge badge-error text-lg font-bold">
                {fields.filter((f) => f.required).length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg">
              <span className="font-semibold text-primary">Campos Opcionais:</span>
              <span className="badge badge-info text-lg font-bold">
                {fields.filter((f) => !f.required).length}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Ações" icon="💾" shadow="md">
          <div className="space-y-3">
            <Button variant="primary" fullWidth>
              Salvar Alterações
            </Button>
            <Button variant="ghost" fullWidth>
              Restaurar Padrão
            </Button>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar Mudança"
        icon="⚠️"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-base-content/70">
            Tem certeza que deseja {selectedField && fields.find(f => f.id === selectedField)?.required ? 'tornar opcional' : 'tornar obrigatório'} este campo?
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmToggle}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
