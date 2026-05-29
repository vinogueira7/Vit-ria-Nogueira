import React, { useState } from 'react';
import { Calendar, Clock, Smile, Users, Info, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { Service } from '../types';

export default function ConsultationSection() {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES_DATA[0]);
  const [petName, setPetName] = useState('');
  const [petWeight, setPetWeight] = useState('p'); // p, m, g
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [clientPhone, setClientPhone] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !bookingDate || !bookingTime || !clientPhone) {
      alert('Favor preencher todos os campos do agendamento.');
      return;
    }
    setIsBooked(true);
  };

  const handleResetBooking = () => {
    setPetName('');
    setBookingDate('');
    setBookingTime('');
    setClientPhone('');
    setIsBooked(false);
  };

  return (
    <section id="servicos" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs bg-brand-forest/10 border border-brand-forest/20 text-brand-forest px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Cuidados Integrados e Estética
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
            Serviços de Estética & Bem-Estar Premium
          </h2>
          <p className="text-sm sm:text-base text-brand-deep/60 leading-relaxed font-sans">
            Seu pet merece um atendimento cinco estrelas. Oferecemos pacotes completos com profissionais treinados, água aquecida controlada e produtos dermatologicamente testados de nível internacional.
          </p>
        </div>

        {/* Dynamic Split Layout: Left service chooser, Right Booking Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="agendamento">
          
          {/* Left Side: Services lists & specs details (Col 7) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-lg text-brand-deep border-b border-brand-deep/5 pb-3">
                Escolha o Pacote Ideal para o seu Amiguinho
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SERVICES_DATA.map((srv) => {
                  const isChosen = selectedService.id === srv.id;
                  return (
                    <button
                      key={srv.id}
                      id={`service-select-${srv.id}`}
                      onClick={() => {
                        setSelectedService(srv);
                        setIsBooked(false); // Reset confirmation if they shift packages
                      }}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                        isChosen
                          ? 'border-brand-clay bg-brand-clay/[0.03] shadow-md shadow-brand-clay/10 ring-2 ring-brand-clay/10'
                          : 'border-brand-deep/5 hover:border-brand-deep/20 bg-brand-cream/20'
                      }`}
                    >
                      {isChosen && (
                        <div className="absolute right-3 top-3 bg-brand-clay text-white p-0.5 rounded-full">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <h4 className="font-body font-bold text-xs text-brand-deep line-clamp-1">{srv.title}</h4>
                      <p className="text-[10px] text-brand-deep/50 mt-1 line-clamp-1">Duração: {srv.duration}</p>
                      <p className="text-sm font-extrabold text-brand-deep mt-2">
                        R$ {srv.price.toFixed(2).replace('.', ',')}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Featured Service info */}
            <div className="bg-brand-cream/35 rounded-3xl p-6 border border-brand-forest/5 flex-1 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Product Info Left (Col 7) */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-brand-forest/10 text-brand-forest text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  <Sparkles className="h-3 w-3" />
                  <span>Destaque Premium</span>
                </div>
                
                <h4 className="font-display font-extrabold text-xl text-brand-deep">
                  {selectedService.title}
                </h4>
                
                <p className="text-xs text-brand-deep/70 font-normal leading-relaxed">
                  {selectedService.description}
                </p>

                {/* Benefits lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {selectedService.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-clay" />
                      <span className="text-[11px] text-brand-deep/80 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service picture right shadow (Col 5) */}
              <div className="md:col-span-5 relative group h-48 md:h-full overflow-hidden rounded-2xl w-full">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="object-cover w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-4 left-4 bg-brand-deep text-white px-2.5 py-1 text-[10px] font-semibold rounded-lg">
                  Estética PetAura
                </div>
              </div>

            </div>

          </div>

          {/* Right Side: Appointment booking Card (Col 5) */}
          <div className="lg:col-span-5">
            <div className="bg-brand-deep text-white p-6 sm:p-8 rounded-[2rem] shadow-xl relative top-0 flex flex-col justify-between h-full">
              
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display font-extrabold text-xl">Agendamento Expresso</h3>
                      <p className="text-xs text-white/60 mt-1">Marque o banho ou estética do seu pet em segundos:</p>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      
                      {/* Name of pet */}
                      <div className="space-y-1">
                        <label htmlFor="pet-name-booking" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                          Nome do Pet
                        </label>
                        <input
                          id="pet-name-booking"
                          type="text"
                          required
                          placeholder="Ex: Toddy, Pipoca, Amora..."
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white/10 focus:bg-white/15 rounded-xl text-white text-xs placeholder-white/30 border border-transparent focus:border-brand-clay focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Pet Size chooser */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Porte do Pet</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'Pequeno (até 8kg)', val: 'p' },
                            { label: 'Médio (8-20kg)', val: 'm' },
                            { label: 'Grande (20kg+)', val: 'g' },
                          ].map((item) => (
                            <button
                              key={item.val}
                              id={`breed-size-${item.val}`}
                              type="button"
                              onClick={() => setPetWeight(item.val)}
                              className={`py-2 rounded-lg text-center font-bold text-[10px] uppercase transition-colors cursor-pointer ${
                                petWeight === item.val
                                  ? 'bg-brand-clay text-white'
                                  : 'bg-white/10 hover:bg-white/15 text-white/80'
                              }`}
                            >
                              {item.label.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date & slots */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="booking-date" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                            Escolher Data
                          </label>
                          <input
                            id="booking-date"
                            type="date"
                            required
                            min={today}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/10 rounded-xl text-white text-xs border border-transparent focus:border-brand-clay focus:outline-none [color-scheme:dark]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="booking-time" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                            Horário
                          </label>
                          <select
                            id="booking-time"
                            required
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/10 rounded-xl text-white text-xs border border-transparent focus:border-brand-clay focus:outline-none"
                          >
                            <option value="" className="text-brand-deep">Selecione...</option>
                            <option value="09:00" className="text-brand-deep">09:00</option>
                            <option value="11:30" className="text-brand-deep">11:30</option>
                            <option value="14:00" className="text-brand-deep">14:00</option>
                            <option value="16:30" className="text-brand-deep">16:30</option>
                          </select>
                        </div>
                      </div>

                      {/* Client Phone for receipt SMS */}
                      <div className="space-y-1">
                        <label htmlFor="booking-phone" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                          Celular do Tutor (WhatsApp)
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          required
                          placeholder="Ex: (11) 99999-9999"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white/10 focus:bg-white/15 rounded-xl text-white text-xs placeholder-white/30 border border-transparent focus:border-brand-clay focus:outline-none"
                        />
                      </div>

                      {/* Confirm CTA */}
                      <button
                        id="submit-booking-btn"
                        type="submit"
                        className="w-full bg-brand-clay hover:bg-brand-clay/95 text-white text-xs uppercase tracking-wider font-bold py-4 rounded-xl shadow-lg cursor-pointer transition-transform duration-200 active:scale-95"
                      >
                        Agendar Horário Fictício
                      </button>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, Math: 0.95 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 h-full py-10"
                    id="booking-success-block"
                  >
                    <div className="bg-brand-clay/10 text-brand-clay p-4 rounded-full border border-brand-clay/20">
                      <Calendar className="h-10 w-10 animate-bounce" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-2xl text-white">Horário Reservado!</h4>
                      <p className="text-xs text-white/70 max-w-sm">
                        Agendado com sucesso para o pet <b>{petName}</b>. Um especialista da PetAura entrará em contato para confirmar a disponibilidade de transporte.
                      </p>
                    </div>

                    <div className="bg-white/5 text-left w-full rounded-2xl p-4 text-xs space-y-2.5 border border-white/5">
                      <p className="flex justify-between">
                        <span className="text-white/60">Serviço:</span>
                        <b className="text-white">{selectedService.title}</b>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/60">Data / Hora:</span>
                        <b className="text-white">{bookingDate.split('-').reverse().join('/')} às {bookingTime}</b>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/60">Porte Escolhido:</span>
                        <b className="text-white uppercase">{petWeight === 'p' ? 'Pequeno' : petWeight === 'm' ? 'Médio' : 'Grande'}</b>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/60">WhatsApp:</span>
                        <b className="text-white">{clientPhone}</b>
                      </p>
                    </div>

                    <button
                      id="reset-booking-btn"
                      onClick={handleResetBooking}
                      className="w-full bg-white text-brand-deep hover:bg-brand-deep/10 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer border border-transparent hover:border-white/10 hover:text-white"
                    >
                      Agendar Outro Pet
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
