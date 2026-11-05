import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PageType } from '../types';
import { Search, ShoppingBag, Truck, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    totalItemCount,
    setIsCartOpen,
    setIsSearchOpen,
    viewProductDetails,
  } = useCart();

  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageType; hasDropdown?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop', hasDropdown: true },
    { label: 'About Us', page: 'about' },
    { label: 'Our Process', page: 'process' },
    { label: 'Bulk Order', page: 'bulk-order' },
    { label: 'FAQs', page: 'faqs' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 1. Top Announcement Bar matching reference */}
      <div className="bg-[#240B07] text-[#E8DAC0] text-xs py-2 px-4 font-medium transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          {/* Left item */}
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#E8A838]" />
            <span>Free Shipping on orders above ₹499</span>
          </div>

          {/* Center item */}
          <div className="hidden md:flex items-center gap-1.5 text-[#FBF6EE]">
            <span>🤍</span>
            <span className="font-semibold text-white">India's Favourite Peanut Butter</span>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentPage('track-order')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span className="text-[#8B5E3C]">|</span>
            <button
              onClick={() => setCurrentPage('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Help
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar matching reference */}
      <div className="bg-[#FBF6EE] border-b border-[#EBDCC7] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo Zone */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex flex-col items-start text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#240B07] font-serif uppercase">
                ORGANICHY
              </span>
              <span className="inline-block w-2 h-2 rounded-xs bg-[#2E7D32] mb-1.5" title="100% Organic Certified" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8B5E3C] -mt-1 font-sans">
              Pure · Nutritious · Delicious
            </span>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                        isActive
                          ? 'text-[#8B2500] font-bold underline underline-offset-8 decoration-2'
                          : 'text-[#2D120B] hover:text-[#8B2500]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isShopDropdownOpen ? 'rotate-180 text-[#8B2500]' : 'text-[#8B5E3C]'
                        }`}
                      />
                    </button>

                    {/* Shop Mega Dropdown */}
                    {isShopDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[#EBDCC7] p-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="p-2 border-b border-[#F4E9DC] mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C]">
                            Browse Flavours
                          </span>
                          <button
                            onClick={() => {
                              setCurrentPage('shop');
                              setIsShopDropdownOpen(false);
                            }}
                            className="text-xs text-[#8B2500] font-bold hover:underline cursor-pointer"
                          >
                            View All →
                          </button>
                        </div>
                        <div className="space-y-1">
                          {PRODUCTS.slice(0, 4).map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                viewProductDetails(p);
                                setIsShopDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#FBF6EE] transition-colors text-left group cursor-pointer"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 object-contain rounded-md bg-amber-50/50 p-1 group-hover:scale-105 transition-transform"
                              />
                              <div>
                                <p className="text-xs font-bold text-[#240B07] group-hover:text-[#8B2500]">
                                  {p.flavourLabel}
                                </p>
                                <p className="text-[11px] text-[#7A6153] line-clamp-1">{p.tagline}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => setCurrentPage(link.page)}
                  className={`text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                    isActive
                      ? 'text-[#8B2500] font-bold underline underline-offset-8 decoration-2'
                      : 'text-[#2D120B] hover:text-[#8B2500]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Flavours"
              className="p-2.5 rounded-full text-[#38180E] hover:bg-[#F0E4D3] transition-colors cursor-pointer"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Track Order Quick Link */}
            <button
              onClick={() => setCurrentPage('track-order')}
              aria-label="Track Order"
              className="p-2.5 rounded-full text-[#38180E] hover:bg-[#F0E4D3] transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
              title="Track your order"
            >
              <ShieldCheck className="w-5 h-5 text-[#8B2500]" />
              <span className="text-xs font-bold text-[#2D120B]">Track</span>
            </button>

            {/* Shopping Cart Button matching reference style */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2.5 rounded-full bg-[#240B07] text-[#FBF6EE] hover:bg-[#3B150A] transition-transform active:scale-95 cursor-pointer shadow-sm flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#E8A838]" />
              {totalItemCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8A838] text-[#240B07] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs border border-white">
                  {totalItemCount}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 bg-[#8B5E3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2.5 rounded-lg text-[#240B07] hover:bg-[#F0E4D3] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF6EE] border-b border-[#EBDCC7] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setCurrentPage(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
                  currentPage === link.page
                    ? 'bg-[#240B07] text-[#E8A838]'
                    : 'text-[#240B07] hover:bg-[#F0E4D3]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EBDCC7] flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentPage('track-order');
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#8B2500] flex items-center gap-1.5 py-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>Track Active Orders</span>
            </button>

            <button
              onClick={() => {
                setIsCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="bg-[#E8A838] text-[#240B07] text-xs font-bold px-4 py-2 rounded-lg"
            >
              Cart ({totalItemCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
