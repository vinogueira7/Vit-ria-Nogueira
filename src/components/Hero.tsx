import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, Percent, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onBookService: () => void;
}

export default function Hero({ onExploreProducts, onBookService }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-brand-forest/5 via-brand-cream to-brand-cream"
    >
      {/* Decorative light blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-clay/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-brand-forest/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-clay/10 border border-brand-clay/20 text-brand-clay px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cuidado Premium para seu Melhor Amigo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-deep tracking-tight leading-[1.1]"
            >
              Nutrição, alegria e <span className="text-brand-clay">bem-estar</span> em um só lugar.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-brand-deep/70 max-w-2xl mx-auto lg:mx-0 font-sans"
            >
              A PetAura oferece curadoria veterinária de alimentos naturais, brinquedos interativos inteligentes e produtos de higiene premium selecionados para elevar a longevidade e a felicidade do seu pet.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
            >
              <button
                id="hero-explore-btn"
                onClick={onExploreProducts}
                className="w-full sm:w-auto bg-brand-clay hover:bg-brand-clay/90 text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-brand-clay/35 hover:shadow-brand-clay/25 transition-all duration-350 flex items-center justify-center space-x-2.5 group cursor-pointer"
              >
                <span>Ver Produtos</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
              
              <button
                id="hero-service-btn"
                onClick={onBookService}
                className="w-full sm:w-auto bg-white hover:bg-brand-deep hover:text-white text-brand-deep border border-brand-deep/10 hover:border-transparent px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-350 cursor-pointer shadow-sm shadow-brand-deep/5"
              >
                Agendar Spa & Banho
              </button>
            </motion.div>

            {/* Quick Badges of Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-brand-deep/5 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="bg-brand-forest/10 p-2 rounded-xl text-brand-forest">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-brand-deep">Frete Rápido</h4>
                  <p className="text-[10px] text-brand-deep/60">Grátis acima de R$199</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="bg-brand-forest/10 p-2 rounded-xl text-brand-forest">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-brand-deep">Garantia Vet</h4>
                  <p className="text-[10px] text-brand-deep/60">Fórmula 100% segura</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="bg-brand-forest/10 p-2 rounded-xl text-brand-forest">
                  <Percent className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-brand-deep">Desconto Pix</h4>
                  <p className="text-[10px] text-brand-deep/60">5% OFF em toda loja</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image Composition Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none flex justify-center items-center"
            >
              {/* Organic visual background blob */}
              <div className="absolute inset-0 bg-brand-forest/10 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] scale-105 select-none -z-10 animate-pulse duration-4000" />
              
              {/* Main Image Frame with border */}
              <div className="relative border-4 border-white rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-deep/15 aspect-[4/5] w-full max-w-md group">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=700"
                  alt="Golden retriever feliz com óculos escuros de pet representando alegria"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glassmorphic Overlay for price card */}
                <div className="absolute inset-x-4 bottom-4 bg-brand-deep/45 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150"
                      alt="Gatinho"
                      className="w-10 h-10 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold">Enxoval de Gatinhos</h4>
                      <p className="text-[10px] text-white/80">9 itens essenciais</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs bg-brand-clay text-white px-2.5 py-1 rounded-lg font-bold">
                      A partir de R$ 99
                    </span>
                  </div>
                </div>
              </div>

              {/* Float Bubble 1: Rating */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-4 top-1/4 bg-white p-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-brand-forest/5"
              >
                <div className="bg-brand-clay/10 p-2 rounded-xl text-brand-clay">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-deep">⭐ 4.9 / 5.0</p>
                  <p className="text-[10px] text-brand-deep/50">Avaliação do Google</p>
                </div>
              </motion.div>

              {/* Float Bubble 2: Happy Users count */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-4 bottom-1/4 bg-white p-3 rounded-2xl shadow-xl flex items-center space-x-2 border border-brand-forest/5"
              >
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=50" className="w-6 h-6 rounded-full border-2 border-white object-cover" alt="User" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=50" className="w-6 h-6 rounded-full border-2 border-white object-cover" alt="User" />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=50" className="w-6 h-6 rounded-full border-2 border-white object-cover" alt="User" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-brand-deep leading-none">+12 mil</p>
                  <p className="text-[9px] text-brand-deep/50 leading-none">Pets felizes</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
