import React, { useState } from 'react';
import { PawPrint, Mail, MapPin, Calendar, Instagram, Facebook, Phone, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorSub, setErrorSub] = useState('');

  const handleSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorSub('');
    
    if (!newsEmail || !newsEmail.includes('@')) {
      setErrorSub('Por favor, informe um e-mail válido.');
      return;
    }
    setIsSubscribed(true);
    setNewsEmail('');
  };

  return (
    <footer id="footer" className="bg-brand-deep text-white/80 pt-16 pb-8 border-t border-brand-forest/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-12">
          
          {/* Brand info (Col 4) */}
          <div className="md:col-span-4 space-y-4">
            <button
              id="footer-logo-btn"
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 group focus:outline-none cursor-pointer"
            >
              <div className="bg-brand-clay text-white p-2 rounded-xl transition-transform duration-300 group-hover:scale-105">
                <PawPrint className="h-5 w-5" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Pet<span className="text-brand-clay">Aura</span>
              </span>
            </button>
            
            <p className="text-xs text-white/60 leading-relaxed font-sans font-normal">
              A PetAura nasceu com o propósito de elevar o patamar de cuidados e nutrição de cães e gatos. Oferecemos curadorias de alto padrão e serviços de banho, tosa e spa com o carinho e a excelência que seu pet merece.
            </p>

            {/* Social media connections */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                id="social-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-clay text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Instagram da PetAura"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                id="social-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-clay text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Facebook da PetAura"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                id="social-whatsapp"
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-clay text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="WhatsApp da PetAura"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Useful links (Col 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Acesso Rápido</h4>
            <ul className="space-y-2 text-xs">
              {['Produtos', 'Serviços', 'Avaliações', 'Agendamento'].map((item) => {
                const sectMap: Record<string, string> = {
                  'Produtos': 'produtos',
                  'Serviços': 'servicos',
                  'Avaliações': 'avaliacoes',
                  'Agendamento': 'servicos'
                };
                return (
                  <li key={item}>
                    <button
                      id={`footer-nav-${sectMap[item]}`}
                      onClick={() => scrollToSection(sectMap[item])}
                      className="hover:text-brand-clay transition-colors cursor-pointer text-left block"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Operational Hours / Contact details (Col 3) */}
          <div className="md:col-span-3 space-y-4 text-xs font-sans">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Como nos Encontrar</h4>
            <div className="space-y-3 font-normal">
              
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-brand-clay shrink-0 mt-0.5" />
                <span>Av. Paulista, 1000 - Bela Vista - São Paulo / SP</span>
              </div>

              <div className="flex items-start space-x-2.5">
                <Calendar className="h-4 w-4 text-brand-clay shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p><b>Seg a Sáb:</b> 08h00 - 20h00</p>
                  <p><b>Dom & Feriados:</b> 09h00 - 15h00</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="h-4 w-4 text-brand-clay shrink-0 mt-0.5" />
                <span>(11) 99999-9999</span>
              </div>

            </div>
          </div>

          {/* Newsletter subscription (Col 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Novidades e Ofertas</h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-sans font-normal">
              Inscreva-se para receber promoções especiais, convites para eventos de pet adoption e cupons de estética exclusivos no seu e-mail.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <form onSubmit={handleSubSubmit} className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-white/30" />
                    <input
                      id="newsletter-footer-email"
                      type="email"
                      required
                      placeholder="Seu melhor e-mail..."
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white/5 focus:bg-white/10 rounded-xl text-xs placeholder-white/40 text-white border border-transparent focus:border-brand-clay focus:outline-none transition-colors"
                    />
                  </div>
                  
                  {errorSub && <p className="text-[10px] text-red-400 font-medium">{errorSub}</p>}
                  
                  <button
                    id="submit-newsletter-btn"
                    type="submit"
                    className="w-full bg-brand-clay hover:bg-brand-clay/90 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                  >
                    Inscrever-se Fictício
                  </button>
                </form>
              ) : (
                <motion.div
                  id="newsletter-success-pane"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-forest/20 p-4 rounded-xl border border-brand-forest/30 text-center"
                >
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Inscrito com sucesso! 🎉</p>
                  <p className="text-[10px] text-white/70 mt-1">Obrigado! Fique atento às ofertas!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-white/40 space-y-3 sm:space-y-0 font-sans">
          <p>© 2026 PetAura Cosméticos e Nutrição Ltda. Todos os direitos reservados.</p>
          <p className="flex items-center space-x-1">
            <span>Desenvolvido com carinho para os pets</span>
            <Heart className="h-3.5 w-3.5 text-brand-clay fill-brand-clay animate-pulse" />
          </p>
        </div>

      </div>
    </footer>
  );
}
