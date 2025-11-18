'use client';

import { useState } from 'react';
import { Header, Button, Input } from '@/components/ui';
import { FilterSidebar, ServiceCard } from '@/components/public';
import { Search } from 'lucide-react';

// Mock data - serviços disponíveis
const mockServices = [
  {
    id: 1,
    title: 'Reparo de Torneira',
    description: 'Conserto profissional de torneiras com garantia',
    price: 150,
    unit: 'serviço',
    professional: { name: 'João Silva' },
    rating: 4.8,
    reviews: 124,
    location: 'São Paulo, SP',
    availability: 'Disponível hoje',
    category: 'Encanamento',
  },
  {
    id: 2,
    title: 'Instalação de Luminárias',
    description: 'Instalação segura de luminárias e spots',
    price: 200,
    unit: 'serviço',
    professional: { name: 'Carlos Oliveira' },
    rating: 4.9,
    reviews: 89,
    location: 'São Paulo, SP',
    availability: 'Disponível amanhã',
    category: 'Elétrica',
  },
  {
    id: 3,
    title: 'Limpeza Profissional',
    description: 'Limpeza completa de ambientes residenciais',
    price: 250,
    unit: 'hora',
    professional: { name: 'Maria Santos' },
    rating: 5.0,
    reviews: 156,
    location: 'São Paulo, SP',
    availability: 'Disponível hoje',
    category: 'Limpeza',
  },
  {
    id: 4,
    title: 'Pintura de Parede',
    description: 'Pintura profissional com materiais de qualidade',
    price: 400,
    unit: 'ambiente',
    professional: { name: 'Pedro Costa' },
    rating: 4.7,
    reviews: 67,
    location: 'São Paulo, SP',
    availability: 'Disponível em 2 dias',
    category: 'Pintura',
  },
  {
    id: 5,
    title: 'Conserto de Portão',
    description: 'Reparo e manutenção de portões automáticos',
    price: 180,
    unit: 'serviço',
    professional: { name: 'Roberto Ferreira' },
    rating: 4.6,
    reviews: 45,
    location: 'São Paulo, SP',
    availability: 'Disponível amanhã',
    category: 'Carpintaria',
  },
  {
    id: 6,
    title: 'Ar Condicionado - Limpeza',
    description: 'Limpeza profissional e manutenção preventiva',
    price: 120,
    unit: 'serviço',
    professional: { name: 'Lucas Almeida' },
    rating: 4.9,
    reviews: 98,
    location: 'São Paulo, SP',
    availability: 'Disponível hoje',
    category: 'HVAC',
  },
  {
    id: 7,
    title: 'Paisagismo Residencial',
    description: 'Projeto e execução de jardins e paisagismo',
    price: 500,
    unit: 'projeto',
    professional: { name: 'Ana Paula' },
    rating: 5.0,
    reviews: 78,
    location: 'São Paulo, SP',
    availability: 'Disponível em 3 dias',
    category: 'Paisagismo',
  },
  {
    id: 8,
    title: 'Troca de Piso',
    description: 'Remoção e instalação profissional de pisos',
    price: 350,
    unit: 'metro',
    professional: { name: 'Mateus Gomes' },
    rating: 4.8,
    reviews: 112,
    location: 'São Paulo, SP',
    availability: 'Disponível em 2 dias',
    category: 'Carpintaria',
  },
];

export default function ServicosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [filters, setFilters] = useState({});

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, filters);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (search: string, appliedFilters: any) => {
    let filtered = mockServices;

    // Filtro por busca
    if (search) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por categoria
    if (appliedFilters.category) {
      filtered = filtered.filter((s) =>
        s.category.toLowerCase().includes(appliedFilters.category.toLowerCase())
      );
    }

    // Filtro por preço
    if (appliedFilters.minPrice) {
      filtered = filtered.filter((s) => s.price >= parseFloat(appliedFilters.minPrice));
    }
    if (appliedFilters.maxPrice) {
      filtered = filtered.filter((s) => s.price <= parseFloat(appliedFilters.maxPrice));
    }

    // Filtro por localização
    if (appliedFilters.location) {
      filtered = filtered.filter((s) =>
        s.location.toLowerCase().includes(appliedFilters.location.toLowerCase())
      );
    }

    // Filtro por avaliação
    if (appliedFilters.rating) {
      filtered = filtered.filter((s) => s.rating >= parseFloat(appliedFilters.rating));
    }

    setFilteredServices(filtered);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Encontre o Profissional Perfeito</h1>
        <p className="text-lg text-white/90 mb-8">
          Serviços confiáveis de profissionais verificados para qualquer necessidade
        </p>

        {/* Barra de Busca Principal */}
        <div className="flex gap-2">
          <Input
            placeholder="O que você precisa? (ex: encanador, eletricista...)"
            fullWidth
            inputSize="lg"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            icon={<Search size={20} />}
          />
          <Button variant="accent" size="lg">
            Buscar
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Filtros */}
        <div className="lg:col-span-1">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Grid de Serviços */}
        <div className="lg:col-span-3">
          {/* Cabeçalho */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content">
              Serviços Disponíveis
            </h2>
            <p className="text-sm text-base-content/70 mt-2">
              {filteredServices.length} resultado{filteredServices.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-base-100 rounded-lg border border-base-300">
              <p className="text-lg text-base-content/70">
                Nenhum serviço encontrado com esses filtros
              </p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({});
                  setFilteredServices(mockServices);
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
