import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Dumbbell,
  Ban,
  Heart,
  Crown,
  Sparkles,
  Flame,
  PackageCheck,
  Truck,
  Star,
  Mail,
  CheckCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, viewProductDetails, addToCart, showToast } = useCart();
  const [activeFlavourIdx, setActiveFlavourIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // 4 Core Flavours matching reference
  const coreFlavours = PRODUCTS.slice(0, 4);

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      quote: '“Absolutely delicious! My kids love it.”',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Rohit Mehta',
      rating: 5,
      quote: '“Best peanut butter I’ve ever had. Highly recommended!”',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sneha Verma',
      rating: 5,
      quote: '“Healthy, tasty and totally worth it!”',
      location: 'Delhi NCR',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      showToast('Thank you for joining the ORGANICHY family! Check your inbox for 10% off.', 'success');
      setNewsletterEmail('');
    }
  };

  const handleNextFlavour = () => {
    setActiveFlavourIdx((prev) => (prev + 1) % coreFlavours.length);
  };

  const handlePrevFlavour = () => {
    setActiveFlavourIdx((prev) => (prev - 1 + coreFlavours.length) % coreFlavours.length);
  };

  return (
    <div className="w-full bg-[#FBF6EE] overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Premium Full-Width Split Layout)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-gradient-to-r from-[#1E0804] via-[#280D07] to-[#120402] text-[#FBF6EE] pt-10 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Subtle luxury ambient backlights */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-[#E8A838]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[700px] h-[550px] bg-[#C77826]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          
          {/* Left Column (5 cols): Kicker, Main Brand Titles, Description, CTA & Trust Badges */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left z-20">
            
            {/* Script Kicker matching reference */}
            <div className="inline-block">
              <span className="text-3xl sm:text-4xl text-[#E8A838] font-script tracking-wide block">
                Spread the Goodness
              </span>
            </div>

            {/* Main Brand Title */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-[#FAF5EE] uppercase leading-none">
                ORGANICHY
              </h1>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF6EE] font-semibold tracking-tight">
                Peanut Butter
              </p>
            </div>

            {/* Tagline & Rich Description */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-medium text-[#E8DAC0] tracking-wide">
                Pure. Nutritious. Delicious.
              </p>
              <p className="text-xs sm:text-sm text-[#CBB8A8] max-w-md mx-auto lg:mx-0 leading-relaxed font-sans">
                Made from 100% Grade A Saurashtra organic peanuts, slow-roasted to golden perfection. Zero palm oil, zero chemical emulsifiers, zero refined sugar.
              </p>
            </div>

            {/* Golden CTA Button matching reference */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                onClick={() => setCurrentPage('shop')}
                className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E8A838] to-[#D9962A] hover:from-[#F0B44A] hover:to-[#E8A838] text-[#240B07] font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-[#E8A838]/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-[#240B07] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 4 Feature Badges row matching reference */}
            <div className="pt-6 lg:pt-8 border-t border-[#4A1E11]/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              
              {/* Badge 1: 100% Natural */}
              <div className="flex flex-col items-center space-y-1.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B5E3C] bg-[#2A1008] flex items-center justify-center text-[#E8A838] shadow-inner group-hover:border-[#E8A838] transition-colors">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-[#D8C7B5]">100% Natural</span>
              </div>

              {/* Badge 2: High Protein */}
              <div className="flex flex-col items-center space-y-1.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B5E3C] bg-[#2A1008] flex items-center justify-center text-[#E8A838] shadow-inner group-hover:border-[#E8A838] transition-colors">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-[#D8C7B5]">High Protein</span>
              </div>

              {/* Badge 3: No Added Sugar */}
              <div className="flex flex-col items-center space-y-1.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B5E3C] bg-[#2A1008] flex items-center justify-center text-[#E8A838] shadow-inner group-hover:border-[#E8A838] transition-colors">
                  <Ban className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-[#D8C7B5]">No Added Sugar</span>
              </div>

              {/* Badge 4: Healthy Choice */}
              <div className="flex flex-col items-center space-y-1.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B5E3C] bg-[#2A1008] flex items-center justify-center text-[#E8A838] shadow-inner group-hover:border-[#E8A838] transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-[#D8C7B5]">Healthy Choice</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Unboxed Large Product Scene Naturally Blended Into Background */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end w-full">
            
            {/* Ambient golden radial halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-radial from-[#E8A838]/18 via-[#C77826]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Seamless, unboxed product scene with full jar, swirl bowl, peanut bowl, table and crown emblem */}
            <div
              onClick={() => viewProductDetails(PRODUCTS[0])}
              className="relative w-full max-w-2xl lg:max-w-3xl flex items-center justify-center cursor-pointer group"
              title="Click to view ORGANICHY Crunchy Peanut Butter details"
            >
              <img
                src="/assets/sliced/hero_product_natural_blend.png"
                alt="ORGANICHY Crunchy Peanut Butter Jar with swirled peanut butter bowl, roasted peanuts and premium quality seal"
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover:scale-[1.015] transition-transform duration-500 relative z-10"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. OUR FLAVOURS — CHOOSE YOUR FAVOURITE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Heading matching reference */}
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[#C7A88B]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B5E3C]">
              OUR FLAVOURS
            </span>
            <span className="w-12 h-px bg-[#C7A88B]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#240B07] font-serif">
            Choose Your Favourite
          </h2>
        </div>

        {/* 4 Flavour Cards Grid matching reference */}
        <div className="relative">
          {/* Arrow navigation buttons matching reference */}
          <button
            onClick={handlePrevFlavour}
            aria-label="Previous flavour"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#240B07] text-[#E8A838] items-center justify-center shadow-lg hover:bg-[#3D1409] hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNextFlavour}
            aria-label="Next flavour"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#240B07] text-[#E8A838] items-center justify-center shadow-lg hover:bg-[#3D1409] hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFlavours.map((product, idx) => {
              const isSelected = activeFlavourIdx === idx;
              return (
                <div
                  key={product.id}
                  onClick={() => setActiveFlavourIdx(idx)}
                  className={`group relative bg-white/80 backdrop-blur-xs rounded-2xl p-6 border transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                    isSelected
                      ? 'border-[#8B2500] shadow-xl ring-2 ring-[#8B2500]/20 scale-[1.02]'
                      : 'border-[#EBDCC7] hover:border-[#8B5E3C] shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Jar Photography Container */}
                  <div className="w-full h-52 flex items-center justify-center relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-48 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Pill Tag with Flavour Name matching reference button */}
                  <div className="mt-2 mb-2">
                    <span
                      className={`inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                        product.flavour === 'chocolate'
                          ? 'bg-[#3A140B] text-[#E8A838]'
                          : product.flavour === 'creamy'
                          ? 'bg-[#E59A26] text-[#240B07]'
                          : product.flavour === 'crunchy'
                          ? 'bg-[#D9822B] text-white'
                          : 'bg-[#C28C42] text-white'
                      }`}
                    >
                      {product.flavourLabel}
                    </span>
                  </div>

                  {/* Tagline matching reference */}
                  <p className="text-xs text-[#7A6153] font-medium min-h-[32px] line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Price & Quick Buy */}
                  <div className="mt-4 pt-3 border-t border-[#F2E5D2] w-full flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-[#240B07]">
                        ₹{product.variants[0].price}
                      </span>
                      <span className="text-[11px] text-[#A49182] line-through ml-1.5">
                        ₹{product.variants[0].originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, '500g', 'single', 1);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#240B07] text-[#E8A838] hover:bg-[#3D1409] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewProductDetails(product);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-[#DECDBB] hover:border-[#8B2500] text-[#240B07] text-xs font-semibold cursor-pointer"
                        title="View details"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explore All Flavours CTA matching reference */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage('shop')}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#3B150A] hover:bg-[#240B07] text-[#FAF5EE] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Explore All Flavours</span>
            <ArrowRight className="w-4 h-4 text-[#E8A838] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. SPLIT SECTION: BRAND STORY (LEFT) & OUR PROCESS (RIGHT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Box: Our Brand Story matching reference */}
          <div className="lg:col-span-5 bg-white/70 backdrop-blur-xs rounded-3xl p-8 sm:p-10 border border-[#EBDCC7] shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Our Brand Story
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#240B07] font-serif leading-tight">
                Goodness in <br />Every Spoon
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5041] leading-relaxed">
                At ORGANICHY, we believe in the power of natural nutrition. Our peanut butter is made from the finest peanuts, roasted with care and packed with love. Zero chemicals, zero shortcuts.
              </p>

              <div>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E8A838] to-[#D9962A] text-[#240B07] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Roasted Peanut Bowl Photo matching reference */}
            <div className="mt-8 pt-4 flex justify-center">
              <img
                src="/assets/sliced/peanut_bowl.png"
                alt="Wooden bowl filled with fresh roasted organic peanuts"
                className="max-h-48 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Box: Our Process Card matching reference */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#2D1009] via-[#240B07] to-[#160603] text-[#FBF6EE] rounded-3xl p-8 sm:p-10 shadow-xl border border-[#3E160C] flex flex-col justify-between">
            <div className="text-center space-y-1 mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FBF6EE]">
                Our Process
              </h3>
              <p className="text-xs text-[#E8DAC0] tracking-wide">
                From Nature to Your Table
              </p>
            </div>

            {/* 4 Process Steps Connected by Arrows matching reference */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative my-auto">
              {/* Step 1: Select Premium Peanuts */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-[#E8A838] text-[#240B07] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#FBF6EE]">Select Premium</h4>
                  <p className="text-[11px] text-[#D8C7B5]">Peanuts</p>
                </div>
              </div>

              {/* Step 2: Roast with Care */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-[#E8A838] text-[#240B07] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Flame className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#FBF6EE]">Roast</h4>
                  <p className="text-[11px] text-[#D8C7B5]">with Care</p>
                </div>
              </div>

              {/* Step 3: Pack Hygienically */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-[#E8A838] text-[#240B07] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PackageCheck className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#FBF6EE]">Pack</h4>
                  <p className="text-[11px] text-[#D8C7B5]">Hygienically</p>
                </div>
              </div>

              {/* Step 4: Deliver Freshness */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-[#E8A838] text-[#240B07] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#FBF6EE]">Deliver</h4>
                  <p className="text-[11px] text-[#D8C7B5]">Freshness</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#4A1E11] text-center">
              <button
                onClick={() => setCurrentPage('process')}
                className="text-xs font-bold text-[#E8A838] hover:text-white transition-colors cursor-pointer"
              >
                Learn more about our slow-roasting craft →
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. THE GIRL TASTING WITH WOW REACTION ("Taste the Happiness")
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#200A06] text-[#FBF6EE] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden my-8">
        {/* Ambient warm gradient */}
        <div className="absolute inset-0 bg-radial from-[#3B150A] via-[#200A06] to-[#120503] opacity-80" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: The Girl Tasting with WOW reaction photo matching reference */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Playful Chalk Annotations matching reference */}
            <div className="absolute -top-3 left-4 z-20">
              <span className="text-3xl sm:text-4xl font-script text-white drop-shadow-md">
                Mmm... ♡
              </span>
            </div>

            <div className="absolute top-8 right-6 sm:right-16 z-20">
              <span className="text-4xl sm:text-5xl font-script text-[#E8A838] font-bold drop-shadow-lg transform rotate-6 inline-block">
                Wow!
              </span>
            </div>

            {/* Main Photography of Girl tasting ORGANICHY peanut butter */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#4A1E11] max-w-md w-full">
              <img
                src="/assets/sliced/girl_tasting_wow.png"
                alt="Girl tasting delicious ORGANICHY Peanut Butter with WOW delighted reaction"
                className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Taste the Happiness + Toast with Peanut Butter */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[#FAF5EE]">
                Taste the Happiness
              </h2>
              <p className="text-lg sm:text-xl font-medium text-[#E8A838]">
                Creamy, Crunchy & Irresistible!
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-md leading-relaxed">
              One bite and you’ll know why thousands across India have switched to ORGANICHY. 
              No artificial aftertaste, no palm oil coating, just genuine, hearty peanut goodness that makes you smile.
            </p>

            {/* Try Now Button matching reference */}
            <div>
              <button
                onClick={() => setCurrentPage('shop')}
                className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E8A838] to-[#D9962A] text-[#240B07] font-extrabold text-xs uppercase tracking-wider shadow-xl hover:shadow-[#E8A838]/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <span>Try Now</span>
                <ArrowRight className="w-4 h-4 text-[#240B07] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Toast slice image matching reference */}
            <div className="pt-4 flex items-center gap-4">
              <img
                src="/assets/sliced/peanut_toast.png"
                alt="Golden toasted bread with thick ORGANICHY peanut butter spread"
                className="w-48 sm:w-56 h-auto object-contain rounded-xl drop-shadow-xl"
              />
              <div className="text-left text-xs text-[#E8DAC0]">
                <p className="font-bold text-white">Pure morning fuel</p>
                <p className="text-[11px] text-[#B8A494]">9.6g protein per serving on rustic sourdough</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          5. WHAT OUR CUSTOMERS SAY (Testimonials Carousel)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-1 mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[#C7A88B]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#240B07]">
              What Our Customers Say
            </h2>
            <span className="w-12 h-px bg-[#C7A88B]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5E3C]">
            Real People. Real Love.
          </p>
        </div>

        {/* Testimonials Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#EBDCC7] shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#E8A838] shrink-0"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center text-[#E8A838]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E8A838]" />
                  ))}
                </div>
                <p className="text-xs font-bold text-[#240B07] leading-snug">
                  {t.quote}
                </p>
                <p className="text-[11px] font-semibold text-[#8B5E3C]">{t.name}</p>
                <span className="text-[10px] text-[#A49182] block">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          6. SPLIT BOTTOM CALL-TO-ACTION (Bulk Orders & Newsletter)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: Bulk Orders matching reference */}
          <div className="lg:col-span-6 bg-gradient-to-r from-[#240B07] to-[#3B150A] text-[#FBF6EE] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#4A1E11] flex flex-col sm:flex-row items-center gap-6">
            <div className="w-36 h-28 shrink-0 rounded-2xl overflow-hidden bg-black/40 border border-[#5A2514]">
              <img
                src="/assets/sliced/warehouse_pallets.png"
                alt="Bulk warehouse carton pallets"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 flex-1 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8A838]">
                For Businesses & Retailers
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#FBF6EE]">
                Bulk Orders
              </h3>
              <p className="text-xs text-[#D8C7B5] leading-relaxed">
                Partner with ORGANICHY for bulk orders and grow together. Special wholesale pricing for gyms, cafes & grocers.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('bulk-order')}
                  className="group px-5 py-2 rounded-full bg-[#E8A838] hover:bg-[#F0B44A] text-[#240B07] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Newsletter Subscription matching reference */}
          <div className="lg:col-span-6 bg-[#240B07] text-[#FBF6EE] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#4A1E11] flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8A838]/20 flex items-center justify-center text-[#E8A838]">
                <Mail className="w-5 h-5 text-[#E8A838]" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-[#FBF6EE]">
                  Join Our Healthy Food Family
                </h3>
                <p className="text-xs text-[#D8C7B5]">
                  Get exclusive offers, new arrivals & healthy recipes!
                </p>
              </div>
            </div>

            {newsletterSuccess ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32] text-xs text-white">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're in! Welcome to the ORGANICHY family. Enjoy 10% off with code ORGANIC10.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-[#240B07] text-xs focus:outline-none placeholder-[#A49182]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#E8A838] hover:bg-[#F0B44A] text-[#240B07] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
