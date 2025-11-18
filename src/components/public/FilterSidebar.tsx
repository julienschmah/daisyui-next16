'use client';

import { useState } from 'react';
import { Button, Input, Select, Badge, Toggle } from '@/components/ui';
import { Search, MapPin, DollarSign, Star } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    rating: '',
    available: true,
  });

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-base-100 border border-base-300 rounded-lg p-6 space-y-6 sticky top-24">
      {/* Categoria */}
      <div>
        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
          <Search size={18} />
          Categoria
        </h3>
        <Select
          fullWidth
          selectSize="sm"
          options={[
            { value: '', label: 'Todas' },
            { value: 'plumbing', label: 'Encanamento' },
            { value: 'electrical', label: 'Elétrica' },
            { value: 'cleaning', label: 'Limpeza' },
            { value: 'painting', label: 'Pintura' },
            { value: 'carpentry', label: 'Carpintaria' },
            { value: 'hvac', label: 'HVAC' },
            { value: 'landscaping', label: 'Paisagismo' },
          ]}
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
      </div>

      {/* Localização */}
      <div>
        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
          <MapPin size={18} />
          Localização
        </h3>
        <Input
          placeholder="Digite sua localidade"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          fullWidth
          inputSize="sm"
        />
      </div>

      {/* Faixa de Preço */}
      <div>
        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
          <DollarSign size={18} />
          Faixa de Preço
        </h3>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Mínimo"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            fullWidth
            inputSize="sm"
          />
          <Input
            type="number"
            placeholder="Máximo"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            fullWidth
            inputSize="sm"
          />
        </div>
      </div>

      {/* Avaliação Mínima */}
      <div>
        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
          <Star size={18} />
          Avaliação Mínima
        </h3>
        <Select
          fullWidth
          selectSize="sm"
          options={[
            { value: '', label: 'Qualquer uma' },
            { value: '4', label: '⭐⭐⭐⭐ (4+)' },
            { value: '4.5', label: '⭐⭐⭐⭐+ (4.5+)' },
            { value: '5', label: '⭐⭐⭐⭐⭐ (5.0)' },
          ]}
          value={filters.rating}
          onChange={(e) => handleChange('rating', e.target.value)}
        />
      </div>

      {/* Disponível Agora */}
      <div>
        <Toggle
          label="Disponível nos próximos 7 dias"
          checked={filters.available}
          onChange={(e) => handleChange('available', e.target.checked)}
        />
      </div>

      {/* Botão Limpar */}
      <Button
        variant="ghost"
        fullWidth
        onClick={() => {
          setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            location: '',
            rating: '',
            available: true,
          });
        }}
      >
        Limpar Filtros
      </Button>
    </div>
  );
}
