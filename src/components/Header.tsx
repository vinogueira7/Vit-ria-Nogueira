import { useState, useEffect } from 'react';
import { PawPrint, ShoppingCart, Menu, X, Heart, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartItemsCount: number;
  onCartOpen: () => void;
  scrollToSection: (id: string) => void;
  favoritesCount: number;
  onFavoritesOpen: () => void;
}

export default function Header({
  cartItemsCount,
  onCartOpen,
  scrollToSection,
  favoritesCount,
  onFavoritesOpen
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Produtos', id: 'produtos' },
    { name: 'Serviços Premium', id: 'servicos' },
    { name: 'Avaliações', id: 'avaliacoes' },
    { name: 'Agendamento', id: 'agendamento' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm border-b border-brand-forest/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <button
            id="logo-button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 group focus:outline-none cursor-pointer"
          >
            <div className="bg-brand-clay text-white p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-md shadow-brand-clay/20">
              <PawPrint className="h-6 w-6" id="header-paw-icon" />
            </div>
            <span
              id="logo-text"
              className="font-display font-extrabold text-2xl tracking-tight text-brand-deep"
            >
              Pet<span className="text-brand-clay">Aura</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="font-sans font-medium text-brand-deep/80 hover:text-brand-clay transition-colors duration-200 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-brand-clay after:transition-all after:duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Icons Bar */}
          <div id="header-icons" className="flex items-center space-x-4">
            
            {/* Contact quick CTA */}
            <a
              id="whatsapp-callout"
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-2 bg-brand-forest/10 hover:bg-brand-forest/15 text-brand-forest px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Dúvidas? Fale Conosco</span>
            </a>

            {/* Favorites Icon */}
            <button
              id="favorites-toggle-btn"
              onClick={onFavoritesOpen}
              className="p-2.5 rounded-full hover:bg-brand-forest/5 text-brand-deep/80 hover:text-red-500 transition-all duration-200 relative cursor-pointer"
              aria-label="Ver Favoritos"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={favoritesCount}
                  className="absolute -top-0.5 -right-0.5 bg-red-550 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-cream"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="cart-toggle-btn"
              onClick={onCartOpen}
              className="p-2.5 rounded-full bg-brand-deep/5 hover:bg-brand-deep/10 text-brand-deep transition-all duration-200 relative cursor-pointer group"
              aria-label="Abrir Carrinho"
            >
              <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartItemsCount}
                  className="absolute -top-1 -right-1 bg-brand-clay text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-brand-cream shadow-sm"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full hover:bg-brand-deep/5 text-brand-deep md:hidden cursor-pointer"
              aria-label="Alternar Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-cream border-b border-brand-forest/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-link-${item.id}`}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left font-sans font-semibold text-brand-deep/90 hover:text-brand-clay text-base py-2 border-b border-brand-deep/5"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 flex items-center justify-between">
                <a
                  id="mobile-whatsapp-btn"
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-brand-forest text-white w-full py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-brand-forest/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
