import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Building2, Calculator, CheckCircle2, Truck, Package, ShieldCheck, Mail, Phone, Send } from 'lucide-react';

export const BulkOrderPage: React.FC = () => {
  const { showToast } = useCart();

  // Calculator State
  const [calcFlavour, setCalcFlavour] = useState<'crunchy' | 'creamy' | 'chocolate' | 'classic'>('crunchy');
  const [calcSize, setCalcSize] = useState<'500g' | '1kg' | '2.5kg' | '15kg'>('1kg');
  const [calcQuantity, setCalcQuantity] = useState<number>(50);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('Gym & Fitness Center');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gstin, setGstin] = useState('');
  const [requestSample, setRequestSample] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  // Wholesale pricing logic
  const basePrices: Record<string, number> = {
    '500g': 349,
    '1kg': 599,
    '2.5kg': 1299,
    '15kg': 5999,
  };

  const getDiscountPercent = (qty: number) => {
    if (qty >= 200) return 0.35;
    if (qty >= 100) return 0.28;
    if (qty >= 50) return 0.22;
    if (qty >= 24) return 0.15;
    return 0.10;
  };

  const retailUnit = basePrices[calcSize];
  const discountRate = getDiscountPercent(calcQuantity);
  const wholesaleUnit = Math.round(retailUnit * (1 - discountRate));
  const totalWholesale = wholesaleUnit * calcQuantity;
  const totalRetail = retailUnit * calcQuantity;
  const totalSavings = totalRetail - totalWholesale;

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnquiryRef(ref);
    setIsSubmitted(true);
    showToast(`Bulk enquiry submitted! Reference ID: ${ref}`, 'success');
  };

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#351009] to-[#1E0803] rounded-3xl p-8 sm:p-14 text-[#FBF6EE] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8A838]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A838]">
            For Businesses & Retailers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Wholesale & Bulk Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-2xl mx-auto leading-relaxed">
            Partner with ORGANICHY for bulk supply to gyms, CrossFit boxes, healthy cafes, organic retail stores, and bakeries. Tiered wholesale pricing, customized white-labeling, and zero freight charges on pallet orders.
          </p>
        </div>

        {/* 2-Column: Left Wholesale Calculator, Right B2B Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Wholesale Calculator */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 border-b border-[#EBDCC7] pb-4">
              <Calculator className="w-5 h-5 text-[#8B2500]" />
              <h2 className="text-lg font-bold font-serif text-[#240B07]">
                Live Wholesale Cost Calculator
              </h2>
            </div>

            {/* Choose Flavour */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#240B07] block">
                Select Flavour:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['crunchy', 'creamy', 'chocolate', 'classic'] as const).map((flv) => (
                  <button
                    key={flv}
                    type="button"
                    onClick={() => setCalcFlavour(flv)}
                    className={`p-2.5 rounded-xl border capitalize font-semibold transition-all cursor-pointer ${
                      calcFlavour === flv
                        ? 'bg-[#240B07] text-[#E8A838] border-[#240B07]'
                        : 'bg-[#FAF5EE] text-[#5C3E2F] border-[#DECDBB] hover:border-[#8B5E3C]'
                    }`}
                  >
                    {flv}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#240B07] block">
                Packaging Size:
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {(['500g', '1kg', '2.5kg', '15kg'] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setCalcSize(sz)}
                    className={`py-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      calcSize === sz
                        ? 'bg-[#240B07] text-[#E8A838] border-[#240B07]'
                        : 'bg-[#FAF5EE] text-[#5C3E2F] border-[#DECDBB] hover:border-[#8B5E3C]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-[#240B07]">
                  Order Quantity (Units):
                </label>
                <span className="text-base font-extrabold text-[#8B2500]">
                  {calcQuantity} units
                </span>
              </div>
              <input
                type="range"
                min={24}
                max={500}
                step={1}
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(Number(e.target.value))}
                className="w-full accent-[#8B2500] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8B5E3C]">
                <span>24 units (10% off)</span>
                <span>50 units (22% off)</span>
                <span>100+ (28% off)</span>
                <span>200+ (35% off)</span>
              </div>
            </div>

            {/* Calculation Breakdown Box */}
            <div className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-3">
              <div className="flex justify-between text-xs text-[#5C3E2F]">
                <span>Standard Retail Price / unit</span>
                <span className="line-through text-[#A49182]">₹{retailUnit}</span>
              </div>

              <div className="flex justify-between text-xs font-bold text-[#2E7D32]">
                <span>Wholesale Discount ({Math.round(discountRate * 100)}%)</span>
                <span>-₹{retailUnit - wholesaleUnit} / unit</span>
              </div>

              <div className="flex justify-between text-xs font-bold text-[#240B07] border-t border-[#DECDBB] pt-2">
                <span>Wholesale Unit Cost</span>
                <span className="text-sm font-extrabold text-[#8B2500]">₹{wholesaleUnit}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#240B07] border-t border-[#DECDBB] pt-2">
                <span>Estimated Total</span>
                <span className="text-xl text-[#240B07]">₹{totalWholesale.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-100/70 border border-emerald-300 text-center">
                <span className="text-xs font-bold text-emerald-900">
                  🎉 Your Total Business Savings: ₹{totalSavings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#7A6153] space-y-1">
              <p>• GST invoice provided with full input tax credit eligibility (12% GST).</p>
              <p>• Doorstep pallet delivery across all Tier-1 and Tier-2 Indian cities within 3-5 days.</p>
            </div>
          </div>

          {/* Right Column: B2B Enquiry & Sample Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EBDCC7] shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 border-b border-[#EBDCC7] pb-4">
              <Building2 className="w-5 h-5 text-[#8B2500]" />
              <div>
                <h2 className="text-lg font-bold font-serif text-[#240B07]">
                  Submit B2B Enquiry & Request Free Sample Box
                </h2>
                <p className="text-xs text-[#7A6153]">
                  Receive customized pricing and a complimentary tasting kit within 24 hours.
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#240B07]">
                  Enquiry Received!
                </h3>
                <p className="text-xs text-[#5C3E2F] max-w-md mx-auto">
                  Thank you, <strong>{contactName}</strong>! Our B2B relationship manager has received your inquiry for <strong>{companyName}</strong>. Reference ID: <strong className="text-[#8B2500]">{enquiryRef}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] max-w-sm mx-auto text-xs text-[#5C3E2F]">
                  <p>A corporate representative will call your registered phone <strong>{phone}</strong> today with formal quotation & sample tracking details.</p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#240B07] text-[#E8A838] font-bold text-xs uppercase cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">
                      Business / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Iron Gym Fitness / Healthy Bakes"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">
                      Business Category *
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    >
                      <option>Gym & Fitness Center</option>
                      <option>Health Food Cafe & Shake Bar</option>
                      <option>Retail Supermarket & Grocery</option>
                      <option>Bakery & Confectionery</option>
                      <option>Corporate Gifting & Hampers</option>
                      <option>Sports Academy & Athletics</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="business@example.com"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">
                      Phone / WhatsApp *
                    </label>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">GSTIN (Optional)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="27AAAAA0000A1Z5"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">
                    Requirements & Estimated Monthly Volume
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your requirements (e.g., 100 jars of Crunchy 1kg monthly for gym front desk, sample requested)..."
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>

                {/* Sample Request Checkbox */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-[#E4D1BA] flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="sampleCheckbox"
                    checked={requestSample}
                    onChange={(e) => setRequestSample(e.target.checked)}
                    className="w-4 h-4 accent-[#8B2500] cursor-pointer"
                  />
                  <label htmlFor="sampleCheckbox" className="text-xs text-[#240B07] font-semibold cursor-pointer">
                    Send a complimentary 4-Flavour Tasting Kit to our business address (Free of charge)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Request</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Benefits for B2B Partners */}
        <div className="bg-[#FAF5EE] rounded-3xl p-8 border border-[#EBDCC7] grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Package className="w-6 h-6 text-[#8B2500] shrink-0 mt-1" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-[#240B07]">Custom Sizes Available</h4>
              <p className="text-[#6B5041]">From 350g retail jars to 25kg bakery bulk containers with pump fittings.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-[#2E7D32] shrink-0 mt-1" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-[#240B07]">Zero Freight on Pallets</h4>
              <p className="text-[#6B5041]">Free door delivery across India for all palletized orders of 50+ units.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#E8A838] shrink-0 mt-1" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-[#240B07]">Marketing & Display Support</h4>
              <p className="text-[#6B5041]">Free acrylic display stands, counter wobblers, and promotional brochures for your gym counter.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
