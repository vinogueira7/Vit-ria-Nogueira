import { Star, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default function Testimonials() {
  return (
    <section id="avaliacoes" className="py-16 md:py-24 bg-brand-cream/30 border-y border-brand-forest/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs bg-brand-clay/10 border border-brand-clay/20 text-brand-clay px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Histórias de Sucesso
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
            Tutores Felizes, Pets Saudáveis
          </h2>
          <p className="text-sm text-brand-deep/60 leading-relaxed font-sans">
            Centenas de lares já transformaram o dia a dia de seus filhos de quatro patas com as soluções e curadorias da PetAura. Veja o depoimento sincero de quem mais entende de amor.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-[2rem] p-8 border border-brand-forest/5 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 relative flex flex-col justify-between"
            >
              {/* Quote Icon watermark */}
              <MessageSquareQuote className="absolute top-6 right-6 h-12 w-12 text-brand-clay/5 select-none" />

              <div className="space-y-4 relative">
                
                {/* 5 Stars Rating info */}
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? 'fill-yellow-400' : 'text-gray-100'}`}
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-brand-deep/70 italic leading-relaxed font-normal">
                  "{t.comment}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-brand-deep/5">
                <img
                  src={t.petImage}
                  alt={t.petName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-clay/20"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-sm text-brand-deep truncate">
                    {t.ownerName}
                  </h4>
                  <p className="text-[10px] text-brand-deep/50 uppercase font-bold tracking-wide">
                    Tutor do {t.petName} ({t.petBreed})
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic bottom numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 mt-12 border-t border-brand-deep/5 text-center">
          <div>
            <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-clay" id="stat-1">99.2%</h4>
            <p className="text-[10px] sm:text-xs text-brand-deep/50 font-bold uppercase tracking-wider mt-1">Satisfação</p>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep" id="stat-2">+12k</h4>
            <p className="text-[10px] sm:text-xs text-brand-deep/50 font-bold uppercase tracking-wider mt-1">Clientes Satisfeitos</p>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-clay" id="stat-3">100%</h4>
            <p className="text-[10px] sm:text-xs text-brand-deep/50 font-bold uppercase tracking-wider mt-1">Natural & Seguro</p>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep" id="stat-4">+500</h4>
            <p className="text-[10px] sm:text-xs text-brand-deep/50 font-bold uppercase tracking-wider mt-1">Pedidos Diários</p>
          </div>
        </div>

      </div>
    </section>
  );
}
