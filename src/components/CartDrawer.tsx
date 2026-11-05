import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    totalItemCount,
    amountNeededForFreeShipping,
    freeShippingProgress,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    setCurrentPage,
    viewProductDetails,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleGoToCart = () => {
    setIsCartOpen(false);
    setCurrentPage('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF6EE] shadow-2xl flex flex-col border-l border-[#EBDCC7] animate-in slide-in-from-right duration-250">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 bg-[#240B07] text-[#FBF6EE] flex items-center justify-between border-b border-[#3E160C]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E8A838]" />
              <h2 className="text-base font-bold font-serif tracking-wide text-white">
                Your Shopping Bag ({totalItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 rounded-full text-[#D8C7B5] hover:text-white hover:bg-[#3D1409] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#F2E5D2] px-6 py-3 border-b border-[#E4D1BA]">
            {amountNeededForFreeShipping <= 0 ? (
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32]">
                <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                <span>Congratulations! You qualify for FREE Express Shipping!</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs text-[#240B07] mb-1.5 font-medium">
                  <span>Add <strong className="font-bold text-[#8B2500]">₹{amountNeededForFreeShipping}</strong> more for Free Shipping</span>
                  <span className="font-bold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-[#D9C4AB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C77826] to-[#E8A838] transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EFE3D2] flex items-center justify-center text-[#8B5E3C]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-lg font-bold text-[#240B07] font-serif">Your cart is empty</h3>
                <p className="text-xs text-[#7A6153] max-w-xs">
                  Discover our freshly roasted organic peanut butter jars with zero added sugar and pure crunch!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#240B07] text-[#E8A838] hover:bg-[#3D1409] font-bold text-xs transition-colors cursor-pointer"
                >
                  Explore Flavours →
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#EBDCC7] shadow-xs"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      viewProductDetails(item.product);
                      setIsCartOpen(false);
                    }}
                    className="w-16 h-16 rounded-lg bg-amber-50/50 p-1 flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B2500]">
                          {item.product.flavourLabel}
                        </span>
                        <h4
                          onClick={() => {
                            viewProductDetails(item.product);
                            setIsCartOpen(false);
                          }}
                          className="text-xs font-bold text-[#240B07] truncate cursor-pointer hover:underline"
                        >
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#A49182] hover:text-red-700 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#7A6153] mt-0.5">
                      <span>Size: {item.selectedSize}</span>
                      {item.packType !== 'single' && (
                        <span className="ml-2 font-medium text-[#2E7D32]">
                          ({item.packType === 'pack2' ? 'Pack of 2' : 'Value Pack of 3'})
                        </span>
                      )}
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#DECDBB] rounded-lg bg-[#FAF5EE]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 px-2 text-[#240B07] hover:bg-[#EBDCC7] rounded-l-lg transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#240B07] min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1 px-2 text-[#240B07] hover:bg-[#EBDCC7] rounded-r-lg transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#240B07]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-[#8B5E3C]">
                            ₹{item.unitPrice} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EBDCC7] space-y-4 shadow-lg">
              {/* Coupon Code Section */}
              {couponCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon {couponCode} applied (-₹{discount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter coupon (e.g. ORGANIC10)"
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#DECDBB] focus:border-[#8B2500] focus:outline-none uppercase bg-[#FBF6EE]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#240B07] text-[#E8A838] font-bold text-xs rounded-lg hover:bg-[#3D1409] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 -mt-2">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C4336] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#240B07]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span className="font-semibold text-[#240B07]">
                    {shippingFee === 0 ? (
                      <span className="text-[#2E7D32] font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#240B07] pt-2 border-t border-[#F2E5D2]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#8B2500]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#E8A838]" />
                </button>

                <button
                  onClick={handleGoToCart}
                  className="w-full py-2 text-xs font-semibold text-[#8B5E3C] hover:text-[#240B07] hover:underline text-center cursor-pointer"
                >
                  View Full Cart & Edit Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
