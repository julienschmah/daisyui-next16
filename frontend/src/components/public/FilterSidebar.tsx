'use client';

import { Input } from '@/components/ui';
import { Search, Filter } from 'lucide-react';
// import { CATEGORIES } from '@/mocks/services'; // Removed mock import
const CATEGORIES = ['Eletricista', 'Encanador'];
import { formatCurrency } from '@/lib/helpers';

interface FilterSidebarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  clearFilters: () => void;
}

export function FilterSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  clearFilters
}: FilterSidebarProps) {
  return (
    <div className="bg-base-100 text-base-content rounded-xl p-6 shadow-xl border border-base-300 sticky top-24">
      <div className="flex items-center gap-2 mb-8">
        <Filter className="text-primary" size={20} />
        <h2 className="text-xl font-bold">Filtros</h2>
      </div>

      <div className="space-y-8">
        <div>
          <label className="text-base-content/60 font-semibold mb-3 block">Buscar</label>
          <div className="relative">
            <Input
              placeholder="Ex: Encanador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-base-200 border-base-300 text-base-content placeholder:text-base-content/40 focus:border-primary focus:ring-primary pl-10 w-full h-12 rounded-lg"
              fullWidth
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          </div>
        </div>

        <div>
          <label className="text-base-content/60 font-semibold mb-3 block">Categorias</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border font-medium ${selectedCategory === null
                ? 'bg-primary border-primary text-primary-content'
                : 'bg-transparent border-base-300 text-base-content/70 hover:border-primary hover:text-primary'
                }`}
            >
              Todas
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border font-medium ${selectedCategory === cat
                  ? 'bg-primary border-primary text-primary-content'
                  : 'bg-transparent border-base-300 text-base-content/70 hover:border-primary hover:text-primary'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-base-content/60 font-semibold">Preço Máximo</label>
            <span className="text-primary font-bold text-lg">
              {formatCurrency(priceRange[1])}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="range range-primary range-sm"
          />
          <div className="flex justify-between text-xs text-base-content/40 mt-2">
            <span>R$ 0</span>
            <span>R$ 2000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
