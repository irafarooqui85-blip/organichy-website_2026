import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, viewProductDetails } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.flavourLabel.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.benefits.some((b) => b.toLowerCase().includes(query))
        );
      })
    : PRODUCTS;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#FBF6EE] rounded-2xl shadow-2xl border border-[#EBDCC7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EBDCC7] bg-white">
          <Search className="w-5 h-5 text-[#8B5E3C]" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flavours (Crunchy, Dark Chocolate, Creamy, High Protein)..."
            className="w-full text-base text-[#240B07] placeholder-[#A49182] bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-[#8B5E3C] hover:text-[#240B07] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F0E4D3] text-[#240B07] hover:bg-[#E2D2BD] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 bg-[#F8F2E7] border-b border-[#EBDCC7] flex items-center gap-2 overflow-x-auto text-xs text-[#6B4E3D]">
          <span className="font-semibold text-[#8B2500] shrink-0">Popular:</span>
          {['Crunchy', 'Dark Chocolate', 'Creamy', 'High Protein', 'No Added Sugar'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#DECDBB] hover:border-[#8B2500] text-[#240B07] transition-colors whitespace-nowrap cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#8B5E3C]">
              <p className="font-medium text-base">No peanut butter matched "{searchQuery}"</p>
              <p className="text-xs mt-1 text-[#A49182]">Try searching for "crunchy", "chocolate", or "creamy"</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  viewProductDetails(product);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EFE5D8] hover:border-[#8B2500] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-amber-50/60 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8B2500] uppercase tracking-wider">
                        {product.flavourLabel}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8A838]/20 text-[#240B07]">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#240B07] group-hover:text-[#8B2500] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#7A6153] line-clamp-1">{product.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-right">
                  <div>
                    <span className="text-sm font-extrabold text-[#240B07] block">
                      ₹{product.variants[0].price}
                    </span>
                    <span className="text-[10px] text-[#8B5E3C] line-through">
                      ₹{product.variants[0].originalPrice}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F5EADB] group-hover:bg-[#240B07] text-[#240B07] group-hover:text-[#E8A838] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
