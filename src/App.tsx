import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ConsultationSection from './components/ConsultationSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FavoritesDrawer from './components/FavoritesDrawer';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // Safe state lazy initializers
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('petaura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('petaura_favs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [alertNotification, setAlertNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('petaura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('petaura_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Toast alert trigger
  const triggerNotification = (text: string) => {
    setAlertNotification(text);
    const timer = setTimeout(() => {
      setAlertNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  };

  // Add Item to cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerNotification(`"${product.name}" adicionado ao seu carrinho! 🛍️`);
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === id ? { ...item, quantity: qty } : item))
    );
  };

  // Remove item entirely
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Clear cart upon successful order
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Toggle favorite items list
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const copy = { ...prev };
      if (copy[product.id]) {
        delete copy[product.id];
        triggerNotification(`"${product.name}" removido dos favoritos.`);
      } else {
        copy[product.id] = true;
        triggerNotification(`"${product.name}" adicionado aos favoritos! ❤️`);
      }
      return copy;
    });
  };

  const favoritesCount = Object.keys(favorites).length;
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cross-component viewport scroll alignment
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-cream/20 flex flex-col selection:bg-brand-clay/25 selection:text-brand-deep">
      
      {/* Dynamic Popups notifications wrapper */}
      <AnimatePresence>
        {alertNotification && (
          <motion.div
            id="global-toast-notification"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-deep text-white/95 px-6 py-3.5 rounded-2xl shadow-xl shadow-brand-deep/15 flex items-center space-x-3 text-xs font-bold border border-white/10"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-450 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[240px] sm:max-w-md">{alertNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Call to Action: Scroll to shop top */}
      {cartItemsCount > 0 && !isCartOpen && (
        <motion.button
          id="floating-cart-bubble"
          initial={{ scale: 0, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 z-30 bg-brand-clay hover:bg-brand-clay/95 text-white p-4.5 rounded-full shadow-2xl flex items-center justify-center space-x-2 border-2 border-white cursor-pointer"
          onClick={() => setIsCartOpen(true)}
          aria-label="Abrir Carrinho Flutuante"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs font-black">{cartItemsCount}</span>
        </motion.button>
      )}

      {/* Header bar component */}
      <Header
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
        scrollToSection={scrollToSection}
        favoritesCount={favoritesCount}
        onFavoritesOpen={() => setIsFavoritesOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onExploreProducts={() => scrollToSection('produtos')}
          onBookService={() => scrollToSection('servicos')}
        />
        
        <ProductGrid
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        
        <ConsultationSection />
        
        <Testimonials />
      </main>

      {/* Footer component */}
      <Footer scrollToSection={scrollToSection} />

      {/* Slides Canvas and drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
