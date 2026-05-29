import { X, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onAddToCart
}: FavoritesDrawerProps) {
  
  const favoritedProducts = PRODUCTS_DATA.filter((p) => !!favorites[p.id]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="favorites-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-deep/60 z-50 cursor-pointer"
          />

          {/* Sliding Panel */}
          <motion.div
            id="favorites-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 max-w-sm w-full bg-brand-cream shadow-2xl z-50 flex flex-col h-full border-l border-brand-forest/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-forest/10 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2 text-brand-deep">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="font-display font-extrabold text-lg">Seus Favoritos</span>
                <span className="text-xs bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full font-bold">
                  {favoritedProducts.length}
                </span>
              </div>
              <button
                id="favorites-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-brand-deep/5 text-brand-deep/80 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {favoritedProducts.length > 0 ? (
                favoritedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center space-x-3 bg-white p-3.5 rounded-2xl border border-brand-forest/5 shadow-sm"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-xl border border-brand-forest/10"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-brand-deep truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs font-bold text-brand-deep mt-0.5">
                        R$ {p.price.toFixed(2).replace('.', ',')}
                      </p>
                      
                      <div className="flex items-center space-x-2.5 mt-1">
                        <button
                          id={`fav-buy-${p.id}`}
                          onClick={() => {
                            onAddToCart(p);
                            // Optional: notify success
                          }}
                          className="text-[10px] font-bold text-brand-forest hover:text-brand-forest/80 cursor-pointer flex items-center space-x-1"
                        >
                          <ShoppingCart className="h-3 w-3" />
                          <span>Adicionar</span>
                        </button>
                        
                        <span className="text-brand-deep/10 text-[9px]">•</span>

                        <button
                          id={`fav-remove-${p.id}`}
                          onClick={() => onToggleFavorite(p)}
                          className="text-[10px] font-bold text-red-550 text-red-500 hover:underline cursor-pointer"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                  <div className="bg-red-50 p-6 rounded-full text-red-400">
                    <Heart className="h-10 w-10" />
                  </div>
                  <h4 className="font-display font-bold text-md text-brand-deep">Nenhum favorito</h4>
                  <p className="text-xs text-brand-deep/50 max-w-xs leading-relaxed">
                    Clique no coração dos cartões de produtos na nossa boutique para salvar seus queridinhos aqui!
                  </p>
                </div>
              )}
            </div>

            {/* Bottom action */}
            <div className="p-6 border-t border-brand-forest/10 bg-white">
              <button
                id="favorites-continue-btn"
                onClick={onClose}
                className="w-full bg-brand-deep hover:bg-brand-deep/90 text-white font-bold text-xs uppercase py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Continuar Navegando
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
