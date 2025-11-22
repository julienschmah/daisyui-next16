'use client';

import { Input } from '@/components/ui';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES } from '@/mocks/services';
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
    <div className="bg-[#1a1a1a] text-white rounded-xl p-6 shadow-xl border border-white/5 sticky top-24">
      <div className="flex items-center gap-2 mb-8">
        <Filter className="text-white" size={20} />
        <h2 className="text-xl font-bold">Filtros</h2>
      </div>

      <div className="space-y-8">
        <div>
          <label className="text-gray-400 font-semibold mb-3 block">Buscar</label>
          <div className="relative">
            <Input
              placeholder="Ex: Encanador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500 pl-10 w-full h-12 rounded-lg"
              fullWidth
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="text-gray-400 font-semibold mb-3 block">Categorias</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${selectedCategory === null
                  ? 'bg-orange-500 border-orange-500 text-white font-medium'
                  : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500'
                }`}
            >
              Todas
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${selectedCategory === cat
                    ? 'bg-orange-500 border-orange-500 text-white font-medium'
                    : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-400 font-semibold">Preço Máximo</label>
            <span className="text-orange-500 font-bold text-lg">
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
            className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>R$ 0</span>
            <span>R$ 2000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
