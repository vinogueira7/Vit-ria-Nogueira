import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key | string | number;
  product: Product;
  onAddToCart: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (p: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}: ProductCardProps) {
  // Translate category for visuals
  const categoryLabels: Record<string, string> = {
    alimentos: 'Ração & Petiscos',
    brinquedos: 'Brinquedos',
    acessorios: 'Acessórios',
    saude: 'Saúde & Cuidados'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden border border-brand-forest/5 hover:border-brand-clay/15 shadow-sm hover:shadow-xl transition-all duration-350 flex flex-col h-full group"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-brand-cream/40">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Favorite Heart Toggle */}
        <button
          id={`favorite-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-brand-deep/70 hover:text-red-500 active:scale-90 transition-all duration-300 cursor-pointer z-10"
          aria-label={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>

        {/* Floating Category Tag */}
        <span className="absolute bottom-4 left-4 bg-brand-deep/75 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {categoryLabels[product.category]}
        </span>

        {/* Custom badge label if exists */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-brand-clay text-white text-[10px] font-extrabold px-3 py-1 rounded-xl shadow-md uppercase tracking-wide">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          
          {/* Star Rating & Reviews */}
          <div className="flex items-center space-x-1.5">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-brand-deep/50">
              {product.rating.toFixed(1)} ({product.reviewsCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-gray-900 group-hover:text-brand-clay transition-colors duration-200 text-base leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Description summary */}
          <p className="text-xs text-brand-deep/60 line-clamp-2 font-normal leading-relaxed">
            {product.description}
          </p>

          {/* Specs tags if available */}
          {product.specs && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {product.specs.weight && (
                <span className="text-[9px] bg-brand-forest/5 text-brand-forest/80 font-medium px-2 py-0.5 rounded-md">
                  {product.specs.weight}
                </span>
              )}
              {product.specs.brand && (
                <span className="text-[9px] bg-brand-forest/5 text-brand-forest/80 font-medium px-2 py-0.5 rounded-md">
                  {product.specs.brand}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom pricing & CTA */}
        <div className="pt-4 mt-4 border-t border-brand-deep/5 flex items-center justify-between">
          <div className="space-y-0.5">
            {product.originalPrice && (
              <span className="text-xs text-brand-deep/40 line-through block font-medium">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-lg font-extrabold text-brand-deep tracking-tight block">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="p-3 bg-brand-forest hover:bg-brand-forest/90 text-white rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-brand-forest/10 cursor-pointer flex items-center justify-center"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
