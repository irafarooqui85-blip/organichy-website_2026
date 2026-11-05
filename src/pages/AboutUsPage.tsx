import React from 'react';
import { useCart } from '../context/CartContext';
import { Leaf, Award, ShieldCheck, Heart, Sparkles, Check, ArrowRight } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { setCurrentPage } = useCart();

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#3B150A] to-[#1E0803] rounded-3xl p-8 sm:p-14 text-[#FBF6EE] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#E8A838]/15 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A838]">
            Our Story & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Pure Nutrition. Honest Origins.
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-2xl mx-auto leading-relaxed">
            Born out of a simple conviction: peanut butter shouldn’t need chemical emulsifiers, palm oils, or artificial flavorings. It only needs exceptional peanuts and patient slow-roasting.
          </p>
        </div>

        {/* Brand Mission & Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B2500]">
              How ORGANICHY Began
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#240B07] font-serif leading-tight">
              A Journey From Gujarat’s Fertile Soil to Every Indian Kitchen
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5041] leading-relaxed">
              In 2021, when inspecting standard grocery store peanut butter shelves in India, we noticed a disturbing pattern: almost every popular commercial jar was laden with hydrogenated palm oil to prevent separation and excessive refined cane sugars to mask low-grade roasted peanuts.
            </p>
            <p className="text-xs sm:text-sm text-[#6B5041] leading-relaxed">
              We partnered directly with organic farming cooperatives across Saurashtra—the sun-blessed region of Gujarat celebrated for cultivating India's sweetest, highest oil-grade groundnuts. We built our roasting facility in Rajkot to roast in small, controlled batches, preserving the delicate monounsaturated fatty acids and aromatic roasted oils.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#EBDCC7]">
                <span className="text-2xl font-extrabold text-[#8B2500] font-serif block">100%</span>
                <span className="text-xs text-[#7A6153]">Certified Organic Saurashtra Harvest</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#EBDCC7]">
                <span className="text-2xl font-extrabold text-[#2E7D32] font-serif block">0g</span>
                <span className="text-xs text-[#7A6153]">Palm Oil or Trans Fat Ever</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EBDCC7] bg-white p-6 max-w-md">
              <img
                src="/assets/sliced/peanut_bowl.png"
                alt="Finest roasted Saurashtra organic peanuts in hand-carved wooden bowl"
                className="w-full h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
              <div className="mt-4 p-4 rounded-xl bg-[#FAF5EE] text-center">
                <p className="text-xs font-bold text-[#240B07]">Hand-Selected Jumbo Peanuts</p>
                <p className="text-[11px] text-[#8B5E3C]">Only the top 5% harvest qualifies for ORGANICHY jars</p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Clean Label Commitments */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBDCC7] shadow-sm space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
              What We Stand For
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#240B07]">
              The ORGANICHY Clean Label Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#240B07]">Single Origin Purity</h4>
              <p className="text-xs text-[#6B5041] leading-relaxed">
                Direct farm partnerships ensure 100% traceable organic origin with fair premium compensation paid to our farming partners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#240B07]">Zero Chemical Emulsifiers</h4>
              <p className="text-xs text-[#6B5041] leading-relaxed">
                Natural oil separation is proof of purity. A gentle stir before spooning is all it takes—no synthetic binders required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#240B07]">Lab Tested for Aflatoxins</h4>
              <p className="text-xs text-[#6B5041] leading-relaxed">
                Every single incoming and outgoing batch undergoes triple NABL-accredited laboratory screening for complete peace of mind.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#240B07] text-[#E8A838] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#240B07]">Eco-Conscious Packaging</h4>
              <p className="text-xs text-[#6B5041] leading-relaxed">
                Infinitely recyclable food-grade PET jars and glass options, sealed with nitrogen gas flush to maintain freshness without plastic liners.
              </p>
            </div>
          </div>
        </div>

        {/* Tasting Moment Callout */}
        <div className="bg-[#240B07] text-[#FBF6EE] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#4A1E11] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8A838]">
              Ready to Taste the Difference?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Try our signature Crunchy or Creamy jars today.
            </h3>
            <p className="text-xs text-[#D8C7B5]">
              Enjoy fresh roasts delivered right to your doorstep. Free express shipping on all orders above ₹499.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 rounded-full bg-[#E8A838] hover:bg-[#F0B44A] text-[#240B07] font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 shrink-0"
          >
            <span>Explore All Flavours</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
