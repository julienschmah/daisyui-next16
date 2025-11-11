'use client';

import { useState } from 'react';

interface RequiredField {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: string;
}

export function RequiredFieldsSettings() {
  const [fields, setFields] = useState<RequiredField[]>([
    {
      id: 'nome',
      name: 'Nome',
      description: 'Nome completo do usuário/cliente',
      required: true,
      category: 'Dados Pessoais',
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Endereço de email',
      required: true,
      category: 'Dados Pessoais',
    },
    {
      id: 'telefone',
      name: 'Telefone',
      description: 'Número de telefone',
      required: false,
      category: 'Dados Pessoais',
    },
    {
      id: 'endereco',
      name: 'Endereço',
      description: 'Endereço completo',
      required: true,
      category: 'Endereço',
    },
    {
      id: 'cpf',
      name: 'CPF',
      description: 'Cadastro de Pessoas Físicas',
      required: false,
      category: 'Documentação',
    },
    {
      id: 'empresa',
      name: 'Empresa',
      description: 'Nome da empresa/instituição',
      required: false,
      category: 'Dados Profissionais',
    },
  ]);

  const toggleField = (fieldId: string) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId ? { ...field, required: !field.required } : field
      )
    );
  };

  const categories = Array.from(new Set(fields.map((f) => f.category)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">✓ Campos Obrigatórios</h2>
        <p className="text-base-content/70">Configure quais campos são obrigatórios no sistema</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">{category}</h3>
            <div className="space-y-3">
              {fields
                .filter((f) => f.category === category)
                .map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3 bg-base-300 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-primary">{field.name}</p>
                      <p className="text-sm text-base-content/70">{field.description}</p>
                    </div>
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={() => toggleField(field.id)}
                        className="checkbox checkbox-primary"
                      />
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}

      <div className="alert alert-info">
        <span>ℹ️ Campos marcados com ✓ serão obrigatórios ao preencher formulários.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">📋 Resumo</h3>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Campos Obrigatórios:</span>
                <span className="ml-2 text-primary font-bold">
                  {fields.filter((f) => f.required).length}
                </span>
              </p>
              <p>
                <span className="font-semibold">Campos Opcionais:</span>
                <span className="ml-2 text-warning font-bold">
                  {fields.filter((f) => !f.required).length}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">💾 Ações</h3>
            <button className="btn btn-primary mt-4 w-full">Salvar Alterações</button>
            <button className="btn btn-ghost mt-2 w-full">Restaurar Padrão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
