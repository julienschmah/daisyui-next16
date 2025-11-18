'use client';

import { useState } from 'react';
import {
  Header,
  Card,
  Button,
  Modal,
  Text,
  Badge,
  Select,
  Toggle,
  Accordion,
  AccordionItemProps,
  Info,
} from '@/components/ui';

import AnimatedMulti from '@/components/ui/AnimatedMulti';

/* const typeOptions: MultiSelectOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'tipo1', label: 'Tipo 1' },
  { value: 'tipo2', label: 'Tipo 2' },
  { value: 'tipo3', label: 'Tipo 3' },
];

const finalidadeOptions: MultiSelectOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'industrial', label: 'Industrial' },
]; */

interface RequiredField {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: string;
  icon?: string;
  typeFilter?: string[];
  purposeFilter?: string[];
}

export function RequiredFieldsSettings() {
  const [fields, setFields] = useState<RequiredField[]>([
    {
      id: 'tipo',
      name: 'Tipo',
      description: 'Tipo de registro',
      required: true,
      category: 'Campo',
      icon: '📋',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'categoria',
      name: 'Categoria',
      description: 'Categoria principal',
      required: true,
      category: 'Campo',
      icon: '🏷️',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'finalidade',
      name: 'Finalidade',
      description: 'Finalidade do registro',
      required: true,
      category: 'Campo',
      icon: '🎯',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'referencia',
      name: 'Referência Auxiliar',
      description: 'Campo de referência',
      required: false,
      category: 'Campo',
      icon: '🔗',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'estado',
      name: 'Estado Atual',
      description: 'Status atual do item',
      required: true,
      category: 'Campo',
      icon: '📊',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'preco_venda',
      name: 'Preço Venda',
      description: 'Preço de venda',
      required: true,
      category: 'Preços',
      icon: '💰',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'preco_locacao',
      name: 'Preço Locação',
      description: 'Preço de locação',
      required: false,
      category: 'Preços',
      icon: '💳',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
    {
      id: 'valor_iptu',
      name: 'Valor IPTU',
      description: 'Valor do IPTU',
      required: false,
      category: 'Valores',
      icon: '📄',
      typeFilter: ['todos'],
      purposeFilter: ['todos'],
    },
  ]);

  const [expandedFields, setExpandedFields] = useState<{ [key: string]: boolean }>({});
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Campo']);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedField, setSelectedField] = useState<RequiredField | null>(null);

  const toggleFieldExpanded = (fieldId: string) => {
    setExpandedFields((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const updateField = (fieldId: string, updates: Partial<RequiredField>) => {
    setFields(fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)));
  };

  const toggleField = (field: RequiredField) => {
    setSelectedField(field);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    if (selectedField) {
      updateField(selectedField.id, { required: !selectedField.required });
    }
    setShowConfirm(false);
    setSelectedField(null);
  };

  const categories = Array.from(new Set(fields.map((f) => f.category)));
  const getFieldsByCategory = (category: string) => fields.filter((f) => f.category === category);
  const requiredCount = fields.filter((f) => f.required).length;
  const optionalCount = fields.filter((f) => !f.required).length;

  // Build accordion items for each category
  const buildCategoryAccordionItems = (): AccordionItemProps[] => {
    return categories.map((category) => {
      const categoryFields = getFieldsByCategory(category);
      const fieldAccordionItems: AccordionItemProps[] = categoryFields.map((field) => ({
        id: field.id,
        title: field.name,
        subtitle: field.description,
        icon: field.icon,
        badge: (
          <Badge variant={field.required ? 'error' : 'info'} className="text-xs font-medium">
            {field.required ? 'Obrigatório' : 'Opcional'}
          </Badge>
        ),
        children: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-medium text-sm text-base-content">Obrigatório?</label>
              <Toggle
                checked={field.required}
                onChange={() => toggleField(field)}
                size="md"
                color="primary"
              />
            </div>

            <div className="h-px bg-base-300" />

            <div className="space-y-3">
              <label className="text-xs font-semibold text-base-content/70 uppercase tracking-wide">
                Filtros
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-base-content/80 mb-1.5 block">
                    Tipo
                  </label>
                  <AnimatedMulti 
                    
                 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-base-content/80 mb-1.5 block">
                    Finalidade
                  </label>
                  <AnimatedMulti 
                   
                 
                  />

                </div>
              </div>
            </div>

            <Button variant="primary" fullWidth className="font-medium text-sm py-2">
              Ver Opções
            </Button>
          </div>
        ),
      }));

      return {
        id: category,
        title: category,
        children: <Accordion items={fieldAccordionItems} expandedIds={Object.keys(expandedFields).filter((k) => expandedFields[k] && fieldAccordionItems.some((fi) => fi.id === k))} onToggle={toggleFieldExpanded} />,
      };
    });
  };

  return (
    <div className="space-y-6">
      <Header
        title="Campos Obrigatórios"
        subtitle="Configure quais campos são obrigatórios no formulário"
        icon="✓"
      />

      <Accordion
        items={buildCategoryAccordionItems()}
        expandedIds={expandedCategories}
        onToggle={toggleCategory}
        allowMultiple={true}
      />

      <Card className="flex gap-2 items-start">
        <Info size={18} className="text-info flex-shrink-0 mt-0.5" />
        <span className="text-sm text-base-content/80">
          Campos marcados com <span className="font-bold text-error">*</span> são obrigatórios. As alterações afetam todos os formulários do sistema.
        </span>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
            Obrigatórios
          </div>
          <div className="text-3xl font-bold text-error">{requiredCount}</div>
          <div className="text-sm text-base-content/60 mt-1">campos obrigatórios</div>
        </Card>

        <Card>
          <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
            Opcionais
          </div>
          <div className="text-3xl font-bold text-info">{optionalCount}</div>
          <div className="text-sm text-base-content/60 mt-1">campos opcionais</div>
        </Card>

        <Card>
          <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
            Total
          </div>
          <div className="text-3xl font-bold text-base-content">{fields.length}</div>
          <div className="text-sm text-base-content/60 mt-1">campos no total</div>
        </Card>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="ghost" className="font-semibold">
          Restaurar Padrão
        </Button>
        <Button variant="primary" className="font-semibold px-8">
          Salvar Alterações
        </Button>
      </div>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar Mudança"
        icon="⚠️"
        size="sm"
      >
        <div className="space-y-4">
          <Text color="muted">
            Tem certeza que deseja{' '}
            <span className="font-semibold">
              {selectedField?.required ? 'tornar opcional' : 'tornar obrigatório'}
            </span>{' '}
            o campo <span className="font-bold">{selectedField?.name}</span>?
          </Text>
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
