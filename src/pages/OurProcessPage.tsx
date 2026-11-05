import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Flame, PackageCheck, Truck, CheckCircle2, ShieldCheck, ArrowRight, Award } from 'lucide-react';

export const OurProcessPage: React.FC = () => {
  const { setCurrentPage } = useCart();
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      title: 'Select Premium Peanuts',
      subtitle: 'Saurashtra Organic Farms',
      icon: Sparkles,
      tagline: 'Top 5% harvest, optical sorting & zero moisture compromise',
      description:
        'Every journey begins in the mineral-rich soils of Saurashtra, Gujarat. Peanuts harvested here have higher natural oil contents and naturally sweet roasted notes. Incoming batches undergo automated dual-camera optical sorting to eliminate damaged, discolored, or small kernels.',
      details: [
        'Tested for Aflatoxins & microbial purity below international thresholds',
        'Moisture level precisely calibrated to 6.5% before roasting',
        'Direct procurement from organic certified smallholder farmer collectives',
      ],
      image: '/assets/sliced/peanut_bowl.png',
    },
    {
      id: 2,
      title: 'Roast with Care',
      subtitle: 'Slow Convection Drum Roasters',
      icon: Flame,
      tagline: 'Gentle temperature curve at 165°C to preserve nutrients',
      description:
        'Unlike commercial industrial processors that flash-fry or blast-roast at scorching 210°C (burning the outer oils and oxidizing delicate nutrients), ORGANICHY uses gentle convection drum roasters. The slow heat penetrates evenly to the core of every peanut, unlocking deep golden color and buttery caramel aromas.',
      details: [
        'Precision 32-minute slow-roasting thermal cycle',
        'Protects sensitive monounsaturated oleic fats from rancidity',
        'Zero added oils used during roasting—100% dry roast process',
      ],
      image: '/assets/sliced/hero_jar.png',
    },
    {
      id: 3,
      title: 'Pack Hygienically',
      subtitle: 'Cleanroom Class 100,000 & Nitrogen Flush',
      icon: PackageCheck,
      tagline: 'Nitrogen-flushed hermetic seal locking in day-one aroma',
      description:
        'After stone-cold micro-milling, the peanut butter is pumped through sterile stainless steel 316-grade pipes directly into food-grade jars. Before capping, a microscopic puff of pure food-grade nitrogen displaces residual oxygen, preventing premature oxidation without any chemical preservatives.',
      details: [
        'Automated touch-free contactless filling and induction foil sealing',
        'BPA-free recyclable food containers that block UV photo-degradation',
        'Strict batch traceability with digital QR codes on every single jar',
      ],
      image: '/assets/sliced/flavor_crunchy.png',
    },
    {
      id: 4,
      title: 'Deliver Freshness',
      subtitle: 'Direct Express Cold-Chain to Your Table',
      icon: Truck,
      tagline: 'Milled this week, on your breakfast table in days',
      description:
        'Instead of sitting in dusty distributor warehouses for six months, ORGANICHY operates on a rapid just-in-time micro-batching cycle. When you place an order on our store, your peanut butter is dispatched directly from our central roasting facility via priority air or express surface courier.',
      details: [
        'Free express courier shipping on orders above ₹499 across 19,000+ PIN codes',
        'Real-time automated SMS and WhatsApp tracking with milestone updates',
        '7-day hassle-free replacement guarantee if damaged in transit',
      ],
      image: '/assets/sliced/warehouse_pallets.png',
    },
  ];

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#351009] to-[#1E0803] rounded-3xl p-8 sm:p-14 text-[#FBF6EE] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#E8A838]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A838]">
            Craftsmanship & Hygiene
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Our 4-Step Journey to Perfection
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-2xl mx-auto leading-relaxed">
            From organic Gujarat groundnut farms into airtight nitrogen-sealed jars. Discover the passion, hygiene, and science in every spoonful.
          </p>
        </div>

        {/* 4 Interactive Process Step Tabs matching reference icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = selectedStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStep(idx)}
                className={`p-6 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center space-y-3 ${
                  isSelected
                    ? 'bg-[#240B07] text-[#FBF6EE] border-[#240B07] shadow-xl scale-102 ring-2 ring-[#E8A838]/40'
                    : 'bg-white text-[#240B07] border-[#EBDCC7] hover:border-[#8B5E3C]'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#E8A838] text-[#240B07]' : 'bg-[#FAF5EE] text-[#8B2500]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isSelected ? 'text-[#E8A838]' : 'text-[#8B5E3C]'
                  }`}>
                    Step 0{s.id}
                  </span>
                  <h3 className="text-sm font-bold mt-0.5">{s.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Deep Dive */}
        {(() => {
          const active = steps[selectedStep];
          const Icon = active.icon;
          return (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBDCC7] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8A838] text-[#240B07] flex items-center justify-center font-bold text-lg shadow-sm">
                    {active.id}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B2500]">
                      {active.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#240B07]">
                      {active.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#8B5E3C] italic">
                  "{active.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-[#6B5041] leading-relaxed">
                  {active.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#F2E5D2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#240B07] block">
                    Key Quality Controls:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5C3E2F]">
                    {active.details.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-3xl bg-[#FAF5EE] border border-[#EBDCC7] p-8 max-w-sm w-full flex items-center justify-center shadow-inner">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="max-h-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          );
        })()}

        {/* Quality Certifications Bar */}
        <div className="bg-[#240B07] text-[#FBF6EE] rounded-3xl p-8 sm:p-10 border border-[#4A1E11] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2 flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-[#E8A838]" />
            <h4 className="text-sm font-bold text-white">FSSAI Certified</h4>
            <p className="text-xs text-[#D8C7B5]">Central License No. 10020021000849</p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <Award className="w-8 h-8 text-[#E8A838]" />
            <h4 className="text-sm font-bold text-white">ISO 22000 & HACCP</h4>
            <p className="text-xs text-[#D8C7B5]">Zero contamination cleanroom packaging</p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[#E8A838]" />
            <h4 className="text-sm font-bold text-white">100% Non-GMO Verified</h4>
            <p className="text-xs text-[#D8C7B5]">Native indigenous Saurashtra seed stock</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold font-serif text-[#240B07]">
            Experience the freshness for yourself
          </h3>
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 rounded-full bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <span>Order Fresh Batch Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
