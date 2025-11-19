'use client';

import { useState } from 'react';
import { ServiceCard, ServiceListItem, Input, Button, Typography, Badge } from '@/components/ui';
import { MOCK_SERVICES, CATEGORIES } from '@/mocks/services';
import { Search, Filter, X, LayoutGrid, List as ListIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/helpers';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredServices = MOCK_SERVICES.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters = selectedCategory || searchTerm || priceRange[1] < 1000;

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <Typography variant="subtitle" size="xl" weight="bold" className="mb-2 text-3xl">Encontre Profissionais</Typography>
            <Typography variant="body" className="text-base-content/70">Explore os melhores serviços disponíveis na sua região</Typography>
          </div>
          
          <div className="join bg-base-100 shadow-sm">
            <button 
              className={`join-item btn btn-sm ${viewMode === 'grid' ? 'btn-active btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Visualização em Grade"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`join-item btn btn-sm ${viewMode === 'list' ? 'btn-active btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('list')}
              aria-label="Visualização em Lista"
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-base-100 p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Filter size={20} /> Filtros
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-error hover:underline flex items-center gap-1"
                  >
                    <X size={12} /> Limpar tudo
                  </button>
                )}
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Buscar</span>
                </label>
                <div className="relative">
                  <Input
                    placeholder="Ex: Encanador..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    fullWidth
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                </div>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Categorias</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={selectedCategory === null ? 'primary' : 'outline'} 
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todas
                  </Badge>
                  {CATEGORIES.map((cat) => (
                    <Badge
                      key={cat}
                      variant={selectedCategory === cat ? 'primary' : 'outline'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Preço Máximo</span>
                  <span className="label-text-alt font-bold text-primary">{formatCurrency(priceRange[1])}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="range range-primary range-xs"
                />
                <div className="w-full flex justify-between text-xs px-1 mt-2 text-base-content/50">
                  <span>R$ 0</span>
                  <span>R$ 2000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="w-full lg:w-3/4">
            {filteredServices.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "flex flex-col gap-4"
              }>
                {filteredServices.map((service) => (
                  viewMode === 'grid' ? (
                    <ServiceCard key={service.id} service={service} />
                  ) : (
                    <ServiceListItem key={service.id} service={service} />
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
                <div className="flex flex-col items-center justify-center text-base-content/50">
                  <Search size={48} className="mb-4 opacity-20" />
                  <Typography variant="subtitle" size="xl" weight="bold" className="mb-2">Nenhum serviço encontrado</Typography>
                  <Typography variant="body">Tente ajustar seus filtros ou buscar por outro termo.</Typography>
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
