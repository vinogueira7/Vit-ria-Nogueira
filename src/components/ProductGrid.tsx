import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, FilterX, PawPrint } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface ProductGridProps {
  onAddToCart: (p: Product) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (p: Product) => void;
}

type PetTypeFilter = 'all' | 'dogs' | 'cats' | 'others';
type CategoryFilter = 'all' | 'alimentos' | 'brinquedos' | 'acessorios' | 'saude';
type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

export default function ProductGrid({
  onAddToCart,
  favorites,
  onToggleFavorite
}: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState<PetTypeFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const petTypes = [
    { label: 'Todos os Pets', value: 'all', icon: PawPrint },
    { label: 'Cães 🐕', value: 'dogs' },
    { label: 'Gatos 🐈', value: 'cats' },
    { label: 'Aves / Outros 🦜', value: 'others' },
  ];

  const categories = [
    { label: 'Todas Categorias', value: 'all' },
    { label: 'Ração e Petiscos', value: 'alimentos' },
    { label: 'Brinquedos', value: 'brinquedos' },
    { label: 'Acessórios', value: 'acessorios' },
    { label: 'Saúde e Higiene', value: 'saude' },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.specs?.brand && p.specs.brand.toLowerCase().includes(q))
      );
    }

    if (selectedPet !== 'all') {
      result = result.filter((p) => p.petType === selectedPet);
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort evaluation
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedPet, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPet('all');
    setSelectedCategory('all');
    setSortBy('relevance');
  };

  return (
    <section id="produtos" className="py-16 md:py-24 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
            Explore nossa Boutique Canina & Felina
          </h2>
          <p className="text-sm sm:text-base text-brand-deep/70 font-sans">
            Compre produtos com garantia de saúde do seu bichinho. Navegue entre as melhores ofertas e dê o melhor mimo para quem alegra o seu lar todos os dias!
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-forest/5 mb-10 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-deep/30" />
              <input
                id="product-search-input"
                type="text"
                placeholder="O que seu pet precisa hoje? (Ex: Ração Premium, Fonte de água, Coleira...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-brand-cream/40 focus:bg-white rounded-2xl text-brand-deep placeholder-brand-deep/40 text-sm border border-transparent focus:border-brand-clay focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Controls (Sort and Mobile Filters button) */}
            <div className="flex items-center space-x-3 self-end lg:self-auto w-full lg:w-auto">
              
              <div className="relative flex-1 lg:flex-none">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-deep/40" />
                <select
                  id="product-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full lg:w-48 pl-10 pr-8 py-3 bg-brand-cream/40 focus:bg-white rounded-2xl text-brand-deep/80 text-xs font-semibold border border-transparent focus:border-brand-clay focus:outline-none transition-colors cursor-pointer appearance-none"
                >
                  <option value="relevance">Mais Relevantes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
              </div>

              <button
                id="mobile-filters-trigger"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden p-3 bg-brand-forest/15 hover:bg-brand-forest/20 text-brand-forest rounded-2xl transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Ver Filtros"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>

          </div>

          {/* PET FILTER PILLS (Desktop & Tab) */}
          <div className="hidden lg:flex items-center justify-between border-t border-brand-deep/5 pt-5 gap-4">
            
            {/* Pet Type Selectors */}
            <div className="flex items-center space-x-2">
              {petTypes.map((pet) => {
                const Icon = pet.icon;
                const isSelected = selectedPet === pet.value;
                return (
                  <button
                    key={pet.value}
                    id={`pet-filter-${pet.value}`}
                    onClick={() => setSelectedPet(pet.value as PetTypeFilter)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-clay text-white shadow-md shadow-brand-clay/20'
                        : 'bg-brand-cream/50 hover:bg-brand-cream text-brand-deep/80'
                    }`}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    <span>{pet.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dot Divider */}
            <div className="h-6 w-px bg-brand-deep/10" />

            {/* Category Selectors */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-xl">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    id={`cat-filter-${cat.value}`}
                    onClick={() => setSelectedCategory(cat.value as CategoryFilter)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-brand-forest/15 text-brand-forest font-bold'
                        : 'text-brand-deep/70 hover:bg-brand-cream/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* MOBILE FILTER ACCORDION */}
          <AnimatePresence>
            {showFiltersMobile && (
              <motion.div
                id="mobile-filters-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden space-y-4 pt-4 border-t border-brand-deep/5 overflow-hidden"
              >
                {/* Pet types */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-brand-deep/50 tracking-wider">Filtrar por Pet</h4>
                  <div className="flex flex-wrap gap-2">
                    {petTypes.map((pet) => (
                      <button
                        key={pet.value}
                        id={`mob-pet-filter-${pet.value}`}
                        onClick={() => setSelectedPet(pet.value as PetTypeFilter)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          selectedPet === pet.value
                            ? 'bg-brand-clay text-white'
                            : 'bg-brand-cream text-brand-deep/80'
                        }`}
                      >
                        {pet.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-brand-deep/50 tracking-wider">Filtrar por Categoria</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        id={`mob-cat-filter-${cat.value}`}
                        onClick={() => setSelectedCategory(cat.value as CategoryFilter)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          selectedCategory === cat.value
                            ? 'bg-brand-forest text-white'
                            : 'bg-brand-cream text-brand-deep/80'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Dynamic products list */}
        <div id="products-catalog-area">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    isFavorite={!!favorites[product.id]}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-3xl border border-brand-forest/5 shadow-inner"
              >
                <div className="bg-brand-clay/10 p-5 rounded-full text-brand-clay mb-4">
                  <FilterX className="h-10 w-10 animate-bounce" id="filter-x-icon" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-deep">Nenhum produto encontrado</h3>
                <p className="text-sm text-brand-deep/50 max-w-sm mt-2">
                  Não encontramos nada para "{searchQuery}" ou com as opções filtradas. Tente mudar os termos da busca ou limpe o filtro atual.
                </p>
                <button
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="mt-6 bg-brand-deep hover:bg-brand-deep/90 text-white font-semibold text-xs uppercase px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Limpar Todos os Filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
