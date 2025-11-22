'use client';

import { useState } from 'react';
import { ServiceCard, ServiceListItem, Input, Button, Typography, Badge } from '@/components/ui';
import { FilterSidebar } from '@/components/public/FilterSidebar';
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
            <FilterSidebar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />
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
