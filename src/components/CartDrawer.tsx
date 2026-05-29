import React, { useState, useMemo } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Gift, Percent, CreditCard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // as percentage, e.g. 10 or 15
  const [appliedCouponName, setAppliedCouponName] = useState<string>('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  
  // Shipping details form
  const [address, setAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (appliedDiscount <= 0) return 0;
    return subtotal * (appliedDiscount / 100);
  }, [subtotal, appliedDiscount]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 199 ? 0 : 19.90;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal - discountAmount + shippingCost;
  }, [subtotal, discountAmount, shippingCost]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const normalized = couponCode.trim().toUpperCase();
    
    if (normalized === 'PETCO10') {
      setAppliedDiscount(10);
      setAppliedCouponName('PETCO10');
      setCouponSuccess('Cupom PETCO10 aplicado: 10% de Desconto!');
      setCouponCode('');
    } else if (normalized === 'AURA15') {
      setAppliedDiscount(15);
      setAppliedCouponName('AURA15');
      setCouponSuccess('Cupom AURA15 aplicado: 15% de Desconto Premium!');
      setCouponCode('');
    } else if (normalized === 'FRETETOP') {
      setCouponSuccess('Cupom FRETETOP: Frete grátis liberado!');
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido. Tente PETCO10 ou AURA15');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setAppliedCouponName('');
    setCouponSuccess('');
    setCouponError('');
  };

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('shipping');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !address) {
      setCouponError('Preencha seu nome e o endereço de entrega.');
      return;
    }
    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'success') {
      onClearCart();
    }
    setCheckoutStep('cart');
    setClientName('');
    setAddress('');
    handleRemoveCoupon();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAndReset}
            className="fixed inset-0 bg-brand-deep z-50 cursor-pointer"
          />

          {/* Sliding Panel */}
          <motion.div
            id="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-brand-cream shadow-2xl z-50 flex flex-col h-full border-l border-brand-forest/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-forest/10 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-3 text-brand-deep">
                <ShoppingBag className="h-6 w-6 text-brand-clay" />
                <span className="font-display font-extrabold text-xl">Seu Carrinho</span>
                <span className="text-xs bg-brand-forest/10 text-brand-forest px-2.5 py-0.5 rounded-full font-bold">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <button
                id="cart-close-btn"
                onClick={handleCloseAndReset}
                className="p-2 -mr-2 rounded-full hover:bg-brand-deep/5 text-brand-deep/80 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dynamic Step Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* STEP 1: CART LIST */}
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length > 0 ? (
                    <div className="space-y-4" id="cart-items-list">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-brand-forest/5 shadow-sm"
                        >
                          {/* Item Thumbnail */}
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-xl border border-brand-forest/10"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Item info & controls */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="font-display font-bold text-sm text-brand-deep truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-brand-deep/50 block">
                              Unitário: R$ {item.product.price.toFixed(2).replace('.', ',')}
                            </p>
                            
                            {/* Controls row */}
                            <div className="flex items-center justify-between pt-1">
                              {/* Quantity selectors */}
                              <div className="flex items-center border border-brand-deep/10 rounded-lg overflow-hidden bg-brand-cream/50">
                                <button
                                  id={`qty-minus-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-brand-deep/5 text-brand-deep transition-colors cursor-pointer"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 text-xs font-semibold text-brand-deep">
                                  {item.quantity}
                                </span>
                                <button
                                  id={`qty-plus-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-brand-deep/5 text-brand-deep transition-colors cursor-pointer"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              {/* Remover item button */}
                              <button
                                id={`remove-item-${item.product.id}`}
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1.5 text-brand-deep/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                aria-label="Remover"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-24 space-y-4">
                      <div className="bg-brand-forest/5 p-6 rounded-full text-brand-forest/40">
                        <ShoppingBag className="h-12 w-12" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-brand-deep">Seu carrinho está vazio</h4>
                      <p className="text-xs text-brand-deep/50 max-w-xs leading-relaxed">
                        Navegue pelas nossas seções superiores e adicione itens para ver o resumo de frete e finalização!
                      </p>
                      <button
                        onClick={onClose}
                        className="bg-brand-clay text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer transition-colors hover:bg-brand-clay/90 shadow-md shadow-brand-clay/10"
                      >
                        Começar a Comprar
                      </button>
                    </div>
                  )}

                  {/* Coupon Area */}
                  {cartItems.length > 0 && (
                    <div className="bg-white p-4 rounded-2xl border border-brand-forest/5 shadow-sm space-y-3">
                      <div className="flex items-center space-x-2 text-brand-deep/80">
                        <Tag className="h-4 w-4 text-brand-clay" />
                        <span className="text-xs font-bold uppercase tracking-wider">Cupom de Desconto</span>
                      </div>
                      
                      {appliedCouponName ? (
                        <div className="flex items-center justify-between bg-brand-forest/10 p-3 rounded-xl border border-brand-forest/20">
                          <div className="flex items-center space-x-2 text-brand-forest">
                            <Percent className="h-4 w-4" />
                            <span className="text-xs font-bold">{appliedCouponName} Ativo!</span>
                          </div>
                          <button
                            id="remove-coupon-btn"
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
                          >
                            Remover
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input
                            id="coupon-input"
                            type="text"
                            placeholder="Ex: PETCO10 ou AURA15"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-3.5 py-2 bg-brand-cream/50 rounded-xl text-xs font-semibold placeholder-brand-deep/40 text-brand-deep border border-transparent focus:border-brand-clay focus:outline-none transition-colors"
                          />
                          <button
                            id="apply-coupon-btn"
                            type="submit"
                            className="bg-brand-deep hover:bg-brand-deep/90 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-transform duration-200 active:scale-95"
                          >
                            Aplicar
                          </button>
                        </form>
                      )}

                      {couponError && <p className="text-[10px] font-semibold text-red-500">{couponError}</p>}
                      {couponSuccess && <p className="text-[10px] font-semibold text-emerald-600">{couponSuccess}</p>}
                      
                      {!appliedCouponName && (
                        <div className="flex gap-1.5 items-center text-[10px] text-brand-deep/50 bg-brand-cream/30 p-2 rounded-lg">
                          <Gift className="h-3 w-3 text-brand-clay" />
                          <span>Dica: Use <b>PETCO10</b> para 10% OFF ou <b>AURA15</b> para 15%!</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: SHIPPING & CHECKOUT FORM */}
              {checkoutStep === 'shipping' && (
                <form onSubmit={handleConfirmOrder} className="space-y-5">
                  <div className="bg-white p-5 rounded-2xl border border-brand-forest/5 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-brand-deep flex items-center space-x-2 border-b border-brand-deep/5 pb-2">
                      <CreditCard className="h-4 w-4 text-brand-clay" />
                      <span>Detalhes de Entrega & Pagamento</span>
                    </h3>
                    
                    {/* Client Name entry */}
                    <div className="space-y-1">
                      <label htmlFor="client-name-input" className="text-[10px] font-bold text-brand-deep/60 uppercase">Seu Nome Completo</label>
                      <input
                        id="client-name-input"
                        type="text"
                        required
                        placeholder="Ex: Mariana Silva"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-brand-cream/50 rounded-xl text-xs text-brand-deep border border-transparent focus:border-brand-clay focus:outline-none"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-1">
                      <label htmlFor="delivery-address-input" className="text-[10px] font-bold text-brand-deep/60 uppercase">Endereço de Entrega</label>
                      <textarea
                        id="delivery-address-input"
                        required
                        rows={2}
                        placeholder="Ex: Av. Paulista, 1000 - Ap 42 - Cerqueira César, São Paulo - SP"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-brand-cream/50 rounded-xl text-xs text-brand-deep border border-transparent focus:border-brand-clay focus:outline-none resize-none"
                      />
                    </div>

                    {/* Payment methods */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-deep/60 uppercase">Método de Finalização</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          id="pay-pix-btn"
                          type="button"
                          onClick={() => setPaymentMethod('pix')}
                          className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            paymentMethod === 'pix'
                              ? 'border-brand-clay bg-brand-clay/10 text-brand-clay'
                              : 'border-brand-deep/10 bg-brand-cream/30 hover:bg-brand-cream/50 text-brand-deep/70'
                          }`}
                        >
                          Pix (5% OFF Extra)
                        </button>
                        <button
                          id="pay-card-btn"
                          type="button"
                          onClick={() => setPaymentMethod('cartao')}
                          className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            paymentMethod === 'cartao'
                              ? 'border-brand-clay bg-brand-clay/10 text-brand-clay'
                              : 'border-brand-deep/10 bg-brand-cream/30 hover:bg-brand-cream/50 text-brand-deep/70'
                          }`}
                        >
                          Cartão de Crédito
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    id="back-to-cart-btn"
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full text-center text-xs font-bold text-brand-deep/60 hover:text-brand-clay cursor-pointer block hover:underline"
                  >
                    Voltar para edição do carrinho
                  </button>
                </form>
              )}

              {/* STEP 3: ORDER SUCCESS CELEBRATION */}
              {checkoutStep === 'success' && (
                <motion.div
                  id="checkout-success-pane"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <div className="bg-emerald-550 bg-emerald-50 text-emerald-600 p-5 rounded-full relative mb-1">
                    <Sparkles className="h-10 w-10 animate-pulse" />
                    <span className="absolute -top-1 -right-1 bg-brand-clay text-white p-1 rounded-full text-[9px] font-bold">100%</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl text-brand-deep">Pedido Confirmado! 🎉</h3>
                  <p className="text-xs text-brand-deep/70 max-w-sm">
                    Parabéns, <b>{clientName}</b>! Seu pedido foi gerado com sucesso no nosso ambiente de simulação.
                  </p>
                  
                  <div className="bg-white p-4 rounded-2xl border border-brand-forest/5 text-left w-full text-xs space-y-2">
                    <p>📦 <b>Status do Pedido:</b> Separado com carinho</p>
                    <p>🚚 <b>Endereço:</b> {address}</p>
                    <p>💰 <b>Total Pago:</b> R$ {total.toFixed(2).replace('.', ',')} com {paymentMethod === 'pix' ? 'Pix' : 'Cartão de Crédito'}</p>
                    <p className="border-t border-brand-deep/5 pt-2 text-[10px] text-brand-deep/50 mt-2 text-center italic">
                      Enviamos um resumo de acompanhamento fictício para o seu e-mail do sistema. Obrigado por escolher a PetAura!
                    </p>
                  </div>

                  <button
                    id="order-done-btn"
                    onClick={handleCloseAndReset}
                    className="w-full bg-brand-forest hover:bg-brand-forest/90 text-white font-bold text-xs uppercase py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Voltar à Loja
                  </button>
                </motion.div>
              )}

            </div>

            {/* Sticky Pricing Summary Footer (only in cart & shipping step) */}
            {checkoutStep !== 'success' && cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-forest/10 bg-white space-y-4">
                <div className="space-y-2 text-xs text-brand-deep">
                  <div className="flex justify-between">
                    <span className="text-brand-deep/60">Subtotal:</span>
                    <span className="font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-brand-forest">
                      <span>Desconto ({appliedDiscount}%):</span>
                      <span className="font-bold">- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-brand-deep/60">Estimativa de Frete:</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <b className="text-brand-forest">Grátis</b>
                      ) : (
                        `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-brand-deep/5 pt-3 text-base">
                    <span className="font-bold text-brand-deep">Total Geral:</span>
                    <span className="font-extrabold text-brand-deep tracking-tight">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  {shippingCost > 0 && (
                    <p className="text-[10px] text-brand-deep/40 text-center pt-2">
                      💡 Adicione mais <b>R$ {(199 - subtotal).toFixed(2).replace('.', ',')}</b> em produtos para garantir <b>Frete Grátis!</b>
                    </p>
                  )}
                </div>

                {/* Main Action buttons */}
                {checkoutStep === 'cart' ? (
                  <button
                    id="finish-order-btn"
                    onClick={handleStartCheckout}
                    className="w-full bg-brand-clay hover:bg-brand-clay/90 text-white text-sm font-bold uppercase py-4 rounded-2xl transition-all shadow-md shadow-brand-clay/20 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Finalizar Compra</span>
                  </button>
                ) : (
                  <button
                    id="submit-order-btn"
                    onClick={handleConfirmOrder}
                    disabled={!clientName || !address}
                    className={`w-full text-sm font-bold uppercase py-4 rounded-2xl transition-all flex items-center justify-center space-x-2 ${
                      clientName && address
                        ? 'bg-brand-forest hover:bg-brand-forest/90 text-white cursor-pointer'
                        : 'bg-brand-deep/10 text-brand-deep/30 cursor-not-allowed'
                    }`}
                  >
                    <span>Confirmar Pedido Fictício</span>
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
