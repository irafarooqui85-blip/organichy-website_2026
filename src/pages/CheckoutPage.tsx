import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cartItems,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    couponCode,
    createOrder,
    setCurrentPage,
    showToast,
  } = useCart();

  // Shipping Form State
  const [fullName, setFullName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [phone, setPhone] = useState('+91 98201 44812');
  const [address, setAddress] = useState('Flat 402, Green Glen Palms');
  const [locality, setLocality] = useState('Outer Ring Road, Bellandur');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560103');

  // Delivery & Payment Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('priya@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const priorityAirCost = deliveryMethod === 'priority' ? 50 : 0;
  const grandTotal = finalTotal + priorityAirCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address || !pincode) {
      showToast('Please fill in all required delivery details', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const newId = createOrder({
        customerName: fullName,
        customerPhone: phone,
        deliveryAddress: `${address}, ${locality ? locality + ', ' : ''}${city}, ${state} ${pincode}`,
        estimatedDelivery: deliveryMethod === 'priority' ? 'Tomorrow by 2:00 PM' : 'Within 2-3 Business Days',
        courier: deliveryMethod === 'priority' ? 'Blue Dart Air Express' : 'Delhivery Surface Express',
        totalAmount: grandTotal,
        items: cartItems.map((item) => ({
          name: item.product.name,
          flavour: item.product.flavourLabel,
          size: item.selectedSize,
          quantity: item.quantity,
          price: item.unitPrice * item.quantity,
        })),
      });

      setIsProcessing(false);
      setPlacedOrderId(newId);
      showToast(`Order #${newId} placed successfully!`, 'success');
    }, 1200);
  };

  // If order placed, show full celebration receipt view
  if (placedOrderId) {
    return (
      <div className="w-full bg-[#FBF6EE] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#EBDCC7] shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D32]">
              Order Confirmed & Payment Verified
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-[#240B07]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-[#7A6153]">
              We’ve sent the confirmation receipt & tax invoice to <strong>{email}</strong>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] text-left space-y-3">
            <div className="flex justify-between items-center border-b border-[#EBDCC7] pb-3">
              <div>
                <span className="text-[11px] text-[#8B5E3C] block">Order Tracking ID</span>
                <span className="text-lg font-bold font-serif text-[#8B2500]">{placedOrderId}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#8B5E3C] block">Total Paid</span>
                <span className="text-lg font-extrabold text-[#240B07]">₹{grandTotal}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C3E2F] pt-1">
              <div>
                <span className="font-bold text-[#240B07] block mb-0.5">Shipping Address:</span>
                <p>{fullName}</p>
                <p>{address}, {locality}</p>
                <p>{city}, {state} - {pincode}</p>
                <p className="text-[11px] text-[#8B5E3C] mt-1">{phone}</p>
              </div>

              <div>
                <span className="font-bold text-[#240B07] block mb-0.5">Delivery Status:</span>
                <p className="text-[#2E7D32] font-semibold">Scheduled for Fresh Milling & Nitrogen Seal</p>
                <p className="text-[11px] text-[#7A6153] mt-1">
                  Estimated arrival: {deliveryMethod === 'priority' ? 'Tomorrow by 2:00 PM' : '2-3 Business Days'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('track-order')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#240B07] text-[#E8A838] font-bold text-xs uppercase tracking-wider hover:bg-[#3D1409] transition-transform hover:scale-105 cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track This Order Live</span>
            </button>

            <button
              onClick={() => setCurrentPage('shop')}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#DECDBB] text-[#240B07] font-bold text-xs uppercase hover:bg-[#FAF5EE] transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#FBF6EE] py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-[#240B07]">Your Cart is Empty</h2>
        <p className="text-xs text-[#7A6153]">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 rounded-full bg-[#240B07] text-[#E8A838] text-xs font-bold cursor-pointer"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#EBDCC7] pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold font-serif text-[#240B07]">
              Express Secure Checkout
            </h1>
            <p className="text-xs text-[#8B5E3C] mt-1">
              Complete your details for direct delivery from our Gujarat roasting facility.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#2E7D32] font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Delivery & Payment Details (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#EBDCC7] pb-4">
                <div className="w-7 h-7 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h2 className="text-base font-bold font-serif text-[#240B07]">
                  Delivery Address & Contact
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Recipient's Name"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#240B07] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="order-updates@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#240B07] block mb-1">House / Flat No, Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 402, Green Glen Palms"
                  className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Locality / Area</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Bellandur"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560103"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Delivery Speed */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#EBDCC7] pb-4">
                <div className="w-7 h-7 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h2 className="text-base font-bold font-serif text-[#240B07]">
                  Delivery Method
                </h2>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-[#8B2500] bg-amber-50/50 ring-1 ring-[#8B2500]'
                      : 'border-[#DECDBB] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="accent-[#8B2500]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#240B07]">Standard Express Courier</p>
                      <p className="text-[11px] text-[#7A6153]">Delivery in 2-3 business days via Delhivery</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('priority')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'priority'
                      ? 'border-[#8B2500] bg-amber-50/50 ring-1 ring-[#8B2500]'
                      : 'border-[#DECDBB] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'priority'}
                      onChange={() => setDeliveryMethod('priority')}
                      className="accent-[#8B2500]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#240B07]">Priority Air Express</p>
                      <p className="text-[11px] text-[#7A6153]">Guaranteed next-day / 48-hr priority flight courier</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#240B07]">
                    +₹50
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#EBDCC7] pb-4">
                <div className="w-7 h-7 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <h2 className="text-base font-bold font-serif text-[#240B07]">
                  Select Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'bg-[#240B07] text-[#E8A838] border-[#240B07] font-bold'
                      : 'bg-[#FAF5EE] text-[#240B07] border-[#DECDBB] hover:border-[#8B5E3C]'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-[#240B07] text-[#E8A838] border-[#240B07] font-bold'
                      : 'bg-[#FAF5EE] text-[#240B07] border-[#DECDBB] hover:border-[#8B5E3C]'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#240B07] text-[#E8A838] border-[#240B07] font-bold'
                      : 'bg-[#FAF5EE] text-[#240B07] border-[#DECDBB] hover:border-[#8B5E3C]'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-xs">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'bg-[#240B07] text-[#E8A838] border-[#240B07] font-bold'
                      : 'bg-[#FAF5EE] text-[#240B07] border-[#DECDBB] hover:border-[#8B5E3C]'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Sub-Form Details */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-2">
                  <label className="text-xs font-bold text-[#240B07] block">
                    Enter UPI ID (Google Pay, PhonePe, Paytm, BHIM)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none"
                  />
                  <p className="text-[11px] text-[#7A6153]">
                    A payment request will be sent to your UPI app upon placing order.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      defaultValue="4532 8901 2345 6789"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#240B07] block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        defaultValue="08/29"
                        className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#240B07] block mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="842"
                        maxLength={4}
                        className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-[#5C3E2F] space-y-1">
                  <p className="font-bold text-[#240B07]">Cash on Delivery Selected</p>
                  <p>You can pay via Cash or UPI QR Code directly to the delivery agent upon receipt.</p>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-2">
                  <label className="text-xs font-bold text-[#240B07] block">Select Popular Bank</label>
                  <select className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none">
                    <option>HDFC Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Review & Instant Place Order (4 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-6">
            <h2 className="text-lg font-bold font-serif text-[#240B07] border-b border-[#EBDCC7] pb-4">
              Review Bag ({cartItems.length} items)
            </h2>

            {/* Itemized Mini List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-[#F2E5D2]">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain bg-amber-50/50 rounded-lg p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#240B07] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#7A6153]">
                        {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#240B07] shrink-0">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#5C3E2F] pt-4 border-t border-[#F2E5D2]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#240B07]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Coupon Discount ({couponCode})</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-[#240B07]">
                  {shippingFee === 0 ? <span className="text-[#2E7D32] font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              {priorityAirCost > 0 && (
                <div className="flex justify-between text-[#8B2500]">
                  <span>Priority Air Handling</span>
                  <span className="font-semibold">+₹{priorityAirCost}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#240B07] pt-3 border-t border-[#F2E5D2]">
                <span>Total Amount</span>
                <span className="text-xl text-[#8B2500] font-extrabold">₹{grandTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 ${
                isProcessing ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#E8A838]" />
                  <span>Place Order (₹{grandTotal})</span>
                </>
              )}
            </button>

            <div className="space-y-2 text-[11px] text-[#7A6153] pt-2 border-t border-[#F2E5D2]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>100% Satisfaction & 7-Day Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8B2500]" />
                <span>Dispatched directly from Rajkot Roasting Facility</span>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
