import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    amountNeededForFreeShipping,
    freeShippingProgress,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    setCurrentPage,
    viewProductDetails,
    addToCart,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  // Upsell suggestion: a product not yet in cart
  const upsellProduct =
    PRODUCTS.find((p) => !cartItems.some((item) => item.product.id === p.id)) || PRODUCTS[2];

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#FBF6EE] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6 bg-white rounded-3xl p-10 sm:p-14 border border-[#EBDCC7] shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B5E3C] mx-auto">
            <ShoppingBag className="w-10 h-10 opacity-60" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-[#240B07]">Your Cart is Empty</h1>
          <p className="text-sm text-[#7A6153] max-w-md mx-auto">
            It looks like you haven’t added any delicious organic peanut butter to your bag yet. 
            Discover our fresh crunchy and creamy jars!
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-8 py-3.5 rounded-full bg-[#240B07] text-[#E8A838] font-bold text-xs uppercase tracking-wider hover:bg-[#3D1409] transition-transform hover:scale-105 cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Flavours</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EBDCC7] pb-6">
          <div>
            <h1 className="text-3xl font-extrabold font-serif text-[#240B07]">
              Shopping Cart
            </h1>
            <p className="text-xs text-[#8B5E3C] mt-1">
              Review your items and proceed to express checkout.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-[#8B5E3C] hover:text-red-700 underline font-semibold self-start sm:self-auto cursor-pointer"
          >
            Clear Cart
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#FAF5EE] rounded-2xl p-5 border border-[#EBDCC7]">
          {amountNeededForFreeShipping <= 0 ? (
            <div className="flex items-center gap-2 text-sm font-bold text-[#2E7D32]">
              <Sparkles className="w-5 h-5 text-[#2E7D32]" />
              <span>You have unlocked FREE Express Delivery on this order!</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-[#240B07]">
                <span>Add <strong className="text-[#8B2500]">₹{amountNeededForFreeShipping}</strong> more to get FREE Express Delivery!</span>
                <span>{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#E4D1BA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C77826] to-[#E8A838] rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Layout: Left Table, Right Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#EBDCC7] shadow-sm divide-y divide-[#F2E5D2]">
              {cartItems.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* Thumbnail & Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      onClick={() => viewProductDetails(item.product)}
                      className="w-20 h-20 rounded-2xl bg-[#FAF5EE] p-2 flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2500]">
                        {item.product.flavourLabel}
                      </span>
                      <h3
                        onClick={() => viewProductDetails(item.product)}
                        className="text-sm font-bold text-[#240B07] hover:text-[#8B2500] cursor-pointer truncate"
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#7A6153]">
                        Size: <strong className="text-[#240B07]">{item.selectedSize}</strong>
                        {item.packType !== 'single' && (
                          <span className="ml-2 font-semibold text-[#2E7D32]">
                            ({item.packType === 'pack2' ? 'Pack of 2' : 'Value Pack of 3'})
                          </span>
                        )}
                      </p>
                      <span className="text-xs font-semibold text-[#8B5E3C] sm:hidden block pt-1">
                        ₹{item.unitPrice} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="flex items-center border border-[#DECDBB] rounded-xl bg-[#FAF5EE]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 px-3 text-[#240B07] hover:bg-[#EBDCC7] rounded-l-xl transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#240B07] min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 px-3 text-[#240B07] hover:bg-[#EBDCC7] rounded-r-xl transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-20">
                      <span className="text-base font-extrabold text-[#240B07]">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-[#A49182] block">
                          ₹{item.unitPrice} / item
                        </span>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#A49182] hover:text-red-700 transition-colors cursor-pointer"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Instructions & Note */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBDCC7] shadow-sm space-y-2">
              <label className="text-xs font-bold text-[#240B07] block">
                Order Notes / Delivery Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Please ring bell twice or leave package at security..."
                className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Upsell Suggestion */}
            {upsellProduct && (
              <div className="bg-gradient-to-r from-amber-50 to-[#FAF5EE] rounded-3xl p-5 border border-[#EBDCC7] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={upsellProduct.image}
                    alt={upsellProduct.name}
                    className="w-14 h-14 object-contain"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2500]">
                      Add to Complete Your Pantry
                    </span>
                    <h4 className="text-xs font-bold text-[#240B07]">{upsellProduct.name} (350g)</h4>
                    <p className="text-xs font-semibold text-[#8B5E3C]">₹{upsellProduct.variants[0].price}</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(upsellProduct, '350g', 'single', 1)}
                  className="px-4 py-2 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  + Add for ₹{upsellProduct.variants[0].price}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-6">
            <h2 className="text-lg font-bold font-serif text-[#240B07] border-b border-[#EBDCC7] pb-4">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-4 h-4" />
                    <span>Coupon {couponCode} (-₹{discount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <label className="text-xs font-bold text-[#240B07] block">Apply Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. ORGANIC10"
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] focus:border-[#8B2500] focus:outline-none uppercase bg-[#FAF5EE]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#240B07] text-[#E8A838] text-xs font-bold rounded-xl hover:bg-[#3D1409] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                  <p className="text-[10px] text-[#8B5E3C]">Try code <strong>ORGANIC10</strong> for 10% off</p>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#5C3E2F] pt-2 border-t border-[#F2E5D2]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#240B07]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Discount</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#240B07]">
                  {shippingFee === 0 ? <span className="text-[#2E7D32] font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes (12% GST)</span>
                <span className="font-semibold text-[#240B07]">Included in Price</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#240B07] pt-3 border-t border-[#F2E5D2]">
                <span>Total Amount</span>
                <span className="text-xl text-[#8B2500] font-extrabold">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full py-4 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('shop')}
                className="w-full py-2.5 text-xs font-bold text-[#8B5E3C] hover:text-[#240B07] text-center cursor-pointer"
              >
                ← Continue Shopping
              </button>
            </div>

            <div className="pt-2 border-t border-[#F2E5D2] space-y-2 text-[11px] text-[#7A6153]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8B2500]" />
                <span>Express 2-3 Day Delivery Across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>100% Secure Checkout with 256-Bit SSL</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
