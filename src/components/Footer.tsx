import React from 'react';
import { useCart } from '../context/CartContext';
import { PageType } from '../types';
import { Instagram, Youtube, Facebook, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useCart();

  const handleNav = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#180804] text-[#D8C7B5] pt-16 pb-8 border-t border-[#3B150A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column + Script Accent Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#301209]">
          
          {/* Brand & Socials Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold tracking-tight text-[#FBF6EE] font-serif uppercase">
                  ORGANICHY
                </span>
                <span className="w-2 h-2 rounded-xs bg-[#2E7D32]" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E8A838] mt-1 font-sans">
                Pure · Nutritious · Delicious
              </span>
            </div>

            <p className="text-xs text-[#B8A494] leading-relaxed max-w-sm pt-2">
              India's premier organic peanut butter crafted from the finest Saurashtra harvest. 
              Zero hydrogenated oils, zero palm fat, and zero chemical stabilizers. Goodness in every single spoon.
            </p>

            {/* Follow Us */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FBF6EE] mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#2A1008] border border-[#4A1E11] flex items-center justify-center text-[#E8DAC0] hover:text-[#E8A838] hover:border-[#E8A838] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[#2A1008] border border-[#4A1E11] flex items-center justify-center text-[#E8DAC0] hover:text-[#E8A838] hover:border-[#E8A838] transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#2A1008] border border-[#4A1E11] flex items-center justify-center text-[#E8DAC0] hover:text-[#E8A838] hover:border-[#E8A838] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#pinterest"
                  aria-label="Pinterest"
                  className="w-9 h-9 rounded-full bg-[#2A1008] border border-[#4A1E11] flex items-center justify-center text-[#E8DAC0] hover:text-[#E8A838] hover:border-[#E8A838] transition-colors font-bold text-xs"
                >
                  P
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FBF6EE]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Shop Flavours
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('process')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bulk-order')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Bulk Orders (B2B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FBF6EE]">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('track-order')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer flex items-center gap-1 text-[#E8A838] font-semibold"
                >
                  <span>Track Order</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8A838] inline-block" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FBF6EE]">
              Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Shipping Policy (Free ₹499+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  Refund & Cancellation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E8A838] transition-colors cursor-pointer"
                >
                  FSSAI Organic Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Script Accent Banner matching reference */}
          <div className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right space-y-1">
            <div className="p-4 rounded-2xl bg-[#240B07]/60 border border-[#3E160C] backdrop-blur-xs">
              <span className="text-2xl sm:text-3xl text-[#E8A838] font-script tracking-wide block">
                Eat Healthy
              </span>
              <div className="flex items-center justify-center lg:justify-end gap-1.5 text-2xl sm:text-3xl text-[#FBF6EE] font-script">
                <span>Live Happy</span>
                <Heart className="w-5 h-5 text-[#E8A838] fill-[#E8A838] inline" />
              </div>
              <p className="text-[10px] text-[#A69181] mt-2 max-w-[150px]">
                100% pure organic peanuts, roasted fresh daily
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright line matching reference */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E897A] gap-4 text-center sm:text-left">
          <p>© 2026 ORGANICHY. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <span className="text-[#E8A838]">🧡</span>
            <span>for a Healthier You</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
