import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product, FlavourId } from '../types';
import { Star, Filter, ShoppingBag, Eye, Check, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { addToCart, viewProductDetails, setCurrentPage } = useCart();
  
  const [selectedFlavour, setSelectedFlavour] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('bestseller');
  const [activeSizes, setActiveSizes] = useState<Record<string, string>>({
    'organichy-crunchy': '500g',
    'organichy-creamy': '500g',
    'organichy-chocolate': '500g',
    'organichy-classic': '500g',
    'organichy-honey-roast': '500g',
    'organichy-high-protein': '1kg',
  });

  const handleSizeChange = (productId: string, size: string) => {
    setActiveSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFlavour !== 'all' && p.flavour !== selectedFlavour) {
      return false;
    }
    if (selectedSize !== 'all') {
      const hasSize = p.variants.some((v) => v.size === selectedSize);
      if (!hasSize) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') {
      const priceA = a.variants[0].price;
      const priceB = b.variants[0].price;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = a.variants[a.variants.length - 1].price;
      const priceB = b.variants[b.variants.length - 1].price;
      return priceB - priceA;
    }
    return 0;
  });

  const flavourOptions: { id: string; label: string }[] = [
    { id: 'all', label: 'All Flavours' },
    { id: 'crunchy', label: 'Crunchy' },
    { id: 'creamy', label: 'Creamy' },
    { id: 'chocolate', label: 'Dark Chocolate' },
    { id: 'classic', label: 'Classic' },
    { id: 'honey-roast', label: 'Honey Roast' },
    { id: 'high-protein', label: 'High Protein (Unsalted)' },
  ];

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#3B150A] to-[#240B07] rounded-3xl p-8 sm:p-12 text-[#FBF6EE] shadow-xl text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8A838]/10 rounded-full blur-3xl" />
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E8A838]">
            Crafted with Organic Saurashtra Peanuts
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Explore All ORGANICHY Flavours
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-xl mx-auto">
            100% natural, stone-milled peanut butter with no added palm oil, no artificial preservatives, and zero hydrogenated oils. Free delivery on orders above ₹499.
          </p>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-[#EBDCC7] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Flavour Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {flavourOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFlavour(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedFlavour === f.id
                    ? 'bg-[#240B07] text-[#E8A838] shadow-xs'
                    : 'bg-[#F4E9DC] text-[#4A2D1F] hover:bg-[#EBDCC7]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Size & Sorting Controls */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#7A6153] font-semibold">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-[#FBF6EE] border border-[#DECDBB] rounded-lg px-2.5 py-1 text-xs text-[#240B07] font-semibold focus:outline-none"
              >
                <option value="all">All Sizes</option>
                <option value="350g">350g</option>
                <option value="500g">500g</option>
                <option value="1kg">1kg</option>
                <option value="2.5kg">2.5kg Tub</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#7A6153] font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FBF6EE] border border-[#DECDBB] rounded-lg px-2.5 py-1 text-xs text-[#240B07] font-semibold focus:outline-none"
              >
                <option value="bestseller">Best Sellers</option>
                <option value="rating">Top Customer Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentSize = activeSizes[product.id] || product.variants[0].size;
            const currentVariant =
              product.variants.find((v) => v.size === currentSize) || product.variants[0];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-6 border border-[#EBDCC7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative">
                  <div className="absolute top-0 left-0 z-10 flex flex-col gap-1">
                    {product.badge && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#240B07] text-[#E8A838] shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-0 right-0 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8A838]/20 text-[#8B2500]">
                      30g Protein
                    </span>
                  </div>

                  {/* Product Jar Photography */}
                  <div
                    onClick={() => viewProductDetails(product)}
                    className="w-full h-64 flex items-center justify-center p-4 cursor-pointer relative"
                  >
                    <div className="absolute inset-8 rounded-full bg-amber-50/70 group-hover:bg-amber-100/70 transition-colors pointer-events-none" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-56 object-contain relative z-10 drop-shadow-lg group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold uppercase tracking-wider text-[#8B2500]">
                        {product.flavourLabel}
                      </span>
                      <div className="flex items-center text-[#E8A838]">
                        <Star className="w-3.5 h-3.5 fill-[#E8A838]" />
                        <span className="text-xs font-bold text-[#240B07] ml-1">
                          {product.rating}
                        </span>
                        <span className="text-[10px] text-[#8B5E3C] ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>

                    <h3
                      onClick={() => viewProductDetails(product)}
                      className="text-lg font-bold text-[#240B07] font-serif hover:text-[#8B2500] cursor-pointer line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#7A6153] line-clamp-2 mt-1">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Size Selector Buttons */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#8B5E3C]">Choose Jar Size:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.size}
                          onClick={() => handleSizeChange(product.id, v.size)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentSize === v.size
                              ? 'bg-[#240B07] text-[#E8A838] border-2 border-[#240B07]'
                              : 'bg-[#FAF5EE] text-[#5C3E2F] border border-[#DECDBB] hover:border-[#8B5E3C]'
                          }`}
                        >
                          {v.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-[#F2E5D2] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-[#240B07]">
                          ₹{currentVariant.price}
                        </span>
                        <span className="text-xs text-[#A49182] line-through">
                          ₹{currentVariant.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#2E7D32]">
                        Save ₹{currentVariant.originalPrice - currentVariant.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewProductDetails(product)}
                        className="p-2.5 rounded-xl border border-[#DECDBB] hover:border-[#8B2500] text-[#240B07] hover:bg-[#FBF6EE] transition-colors cursor-pointer"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => addToCart(product, currentSize, 'single', 1)}
                        className="px-4 py-2.5 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Bar */}
        <div className="bg-[#FAF5EE] rounded-2xl p-6 border border-[#EBDCC7] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2E7D32]" />
            <div className="text-left text-xs">
              <p className="font-bold text-[#240B07]">100% Certified Organic</p>
              <p className="text-[#7A6153]">No palm oil, no added chemicals</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-[#E8A838]" />
            <div className="text-left text-xs">
              <p className="font-bold text-[#240B07]">Fresh Micro-Batch Roasted</p>
              <p className="text-[#7A6153]">Sealed under inert nitrogen for crispness</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-6 h-6 text-[#8B2500]" />
            <div className="text-left text-xs">
              <p className="font-bold text-[#240B07]">Satisfaction Guaranteed</p>
              <p className="text-[#7A6153]">Easy returns & replacement within 7 days</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
