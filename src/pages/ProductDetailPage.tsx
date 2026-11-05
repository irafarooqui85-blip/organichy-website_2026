import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import {
  Star,
  ShieldCheck,
  Truck,
  Leaf,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Check,
  CheckCircle2,
  Share2,
  Heart,
  ChevronRight,
  Flame,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setCurrentPage,
    setIsCartOpen,
    showToast,
  } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('500g');
  const [packType, setPackType] = useState<'single' | 'pack2' | 'pack3'>('single');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'nutrition' | 'ingredients' | 'how-to-use'>('nutrition');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const currentVariant =
    selectedProduct.variants.find((v) => v.size === selectedSize) || selectedProduct.variants[0];

  const packMultiplier = packType === 'pack3' ? 3 : packType === 'pack2' ? 2 : 1;
  const packDiscount = packType === 'pack3' ? 0.9 : packType === 'pack2' ? 0.95 : 1.0;
  const unitPrice = Math.round(currentVariant.price * packMultiplier * packDiscount);
  const originalTotalPrice = currentVariant.originalPrice * packMultiplier;

  const images = selectedProduct.additionalImages && selectedProduct.additionalImages.length > 0
    ? selectedProduct.additionalImages
    : [selectedProduct.image, '/assets/sliced/hero_jar.png', '/assets/sliced/peanut_toast.png'];

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Delivery available! Estimated delivery within 2-3 business days.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, packType, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, packType, quantity);
    setCurrentPage('checkout');
  };

  const handleFlavourSwitch = (newProduct: Product) => {
    setSelectedProduct(newProduct);
    setActiveImgIdx(0);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewText) {
      selectedProduct.reviews.unshift({
        id: `rev-${Date.now()}`,
        author: reviewName,
        rating: reviewRating,
        date: 'Today',
        title: 'Verified Customer Review',
        comment: reviewText,
        verified: true,
      });
      setIsWriteReviewOpen(false);
      setReviewName('');
      setReviewText('');
      showToast('Thank you for reviewing! Your feedback is live.', 'success');
    }
  };

  return (
    <div className="w-full bg-[#FBF6EE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#8B5E3C]">
          <button onClick={() => setCurrentPage('home')} className="hover:underline cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#BFA58A]" />
          <button onClick={() => setCurrentPage('shop')} className="hover:underline cursor-pointer">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#BFA58A]" />
          <span className="font-bold text-[#240B07] truncate">{selectedProduct.name}</span>
        </nav>

        {/* Top Product Section: Left Gallery, Right Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative bg-white rounded-3xl p-8 border border-[#EBDCC7] shadow-sm flex items-center justify-center min-h-[420px]">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {selectedProduct.badge && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#240B07] text-[#E8A838] shadow-sm">
                    {selectedProduct.badge}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8A838]/20 text-[#8B2500]">
                  100% Organic Saurashtra Harvest
                </span>
              </div>

              <img
                src={images[activeImgIdx] || selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-80 sm:max-h-96 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Pickers */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-20 h-20 rounded-2xl p-2 bg-white border-2 flex items-center justify-center transition-all cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-[#8B2500] shadow-md scale-105'
                      : 'border-[#EBDCC7] hover:border-[#8B5E3C] opacity-75'
                  }`}
                >
                  <img src={img} alt="" className="w-16 h-16 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6 bg-white/70 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-[#EBDCC7] shadow-sm">
            
            {/* Flavour & Title */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B2500]">
                  ORGANICHY {selectedProduct.flavourLabel}
                </span>
                <div className="flex items-center text-[#E8A838]">
                  <Star className="w-4 h-4 fill-[#E8A838]" />
                  <span className="text-sm font-bold text-[#240B07] ml-1">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-xs text-[#8B5E3C] ml-1">
                    ({selectedProduct.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#240B07] font-serif mt-1">
                {selectedProduct.name}
              </h1>
              <p className="text-sm text-[#8B5E3C] font-semibold mt-1">
                {selectedProduct.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#6B5041] leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Flavour Switcher */}
            <div className="space-y-2 pt-2 border-t border-[#F2E5D2]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#240B07] block">
                Select Flavour:
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleFlavourSwitch(p)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedProduct.id === p.id
                        ? 'bg-[#240B07] text-[#E8A838] shadow-xs'
                        : 'bg-[#FBF6EE] text-[#5C3E2F] border border-[#DECDBB] hover:border-[#8B5E3C]'
                    }`}
                  >
                    {p.flavourLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Jar Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-[#240B07]">
                  Select Jar Weight:
                </span>
                <span className="text-[#8B5E3C]">Currently selected: {selectedSize}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedProduct.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedSize(v.size)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedSize === v.size
                        ? 'bg-[#240B07] text-[#E8A838] border-[#240B07] shadow-sm font-bold'
                        : 'bg-[#FBF6EE] text-[#240B07] border-[#DECDBB] hover:border-[#8B5E3C]'
                    }`}
                  >
                    <span className="text-xs block font-bold">{v.size}</span>
                    <span className="text-[11px] block mt-0.5 opacity-90">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pack Bundle Options (Save More) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#240B07] block">
                Bundle & Save:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPackType('single')}
                  className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                    packType === 'single'
                      ? 'border-[#8B2500] bg-[#8B2500]/5 font-bold text-[#8B2500]'
                      : 'border-[#DECDBB] bg-white text-[#5C3E2F]'
                  }`}
                >
                  <span className="block font-bold">Single Jar</span>
                  <span className="text-[10px] text-[#8B5E3C]">Standard</span>
                </button>

                <button
                  onClick={() => setPackType('pack2')}
                  className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer relative ${
                    packType === 'pack2'
                      ? 'border-[#8B2500] bg-[#8B2500]/5 font-bold text-[#8B2500]'
                      : 'border-[#DECDBB] bg-white text-[#5C3E2F]'
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-[#2E7D32] text-white text-[9px] px-1.5 rounded-full font-bold">
                    5% OFF
                  </span>
                  <span className="block font-bold">Pack of 2</span>
                  <span className="text-[10px] text-[#2E7D32]">Popular Choice</span>
                </button>

                <button
                  onClick={() => setPackType('pack3')}
                  className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer relative ${
                    packType === 'pack3'
                      ? 'border-[#8B2500] bg-[#8B2500]/5 font-bold text-[#8B2500]'
                      : 'border-[#DECDBB] bg-white text-[#5C3E2F]'
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-[#8B2500] text-white text-[9px] px-1.5 rounded-full font-bold">
                    10% OFF
                  </span>
                  <span className="block font-bold">Pack of 3</span>
                  <span className="text-[10px] text-[#8B2500]">Best Value</span>
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="pt-4 border-t border-[#F2E5D2] flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#240B07] font-serif">
                ₹{unitPrice}
              </span>
              <span className="text-sm text-[#A49182] line-through">
                ₹{originalTotalPrice}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#2E7D32]/10 text-[#2E7D32]">
                Save ₹{originalTotalPrice - unitPrice}
              </span>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="flex items-center border border-[#DECDBB] rounded-xl bg-[#FAF5EE] h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#240B07] hover:bg-[#EBDCC7] rounded-l-xl transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#240B07] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#240B07] hover:bg-[#EBDCC7] rounded-r-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 w-full h-12 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 w-full h-12 rounded-xl bg-[#E8A838] hover:bg-[#F0B44A] text-[#240B07] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-4 border-t border-[#F2E5D2]">
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit delivery PIN code"
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] focus:border-[#8B2500] focus:outline-none bg-[#FBF6EE]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#DECDBB] hover:border-[#8B2500] text-xs font-bold text-[#240B07] cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] text-[#2E7D32] font-semibold mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{pincodeStatus}</span>
                </p>
              )}
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#6B5041]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8B2500]" />
                <span>Free Shipping over ₹499</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>FSSAI Certified Batch</span>
              </div>
            </div>

          </div>
        </div>

        {/* Nutritional Facts, Ingredients, and Usage Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBDCC7] shadow-sm space-y-6">
          <div className="flex border-b border-[#EBDCC7] gap-8">
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'nutrition'
                  ? 'border-b-2 border-[#8B2500] text-[#8B2500]'
                  : 'text-[#8B5E3C] hover:text-[#240B07]'
              }`}
            >
              Nutritional Facts
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'border-b-2 border-[#8B2500] text-[#8B2500]'
                  : 'text-[#8B5E3C] hover:text-[#240B07]'
              }`}
            >
              100% Clean Ingredients
            </button>
            <button
              onClick={() => setActiveTab('how-to-use')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'how-to-use'
                  ? 'border-b-2 border-[#8B2500] text-[#8B2500]'
                  : 'text-[#8B5E3C] hover:text-[#240B07]'
              }`}
            >
              How to Enjoy
            </button>
          </div>

          {activeTab === 'nutrition' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-base font-bold text-[#240B07] font-serif mb-2">
                  Nutritional Value per Serving ({selectedProduct.nutrition.servingSize})
                </h3>
                <p className="text-xs text-[#7A6153] mb-4">
                  Naturally packed with plant-based protein, healthy monounsaturated fatty acids, and essential micronutrients.
                </p>
                <div className="divide-y divide-[#F2E5D2] border border-[#EBDCC7] rounded-2xl overflow-hidden text-xs">
                  <div className="flex justify-between p-2.5 bg-[#FAF5EE] font-bold">
                    <span>Nutrient</span>
                    <span>Amount</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Calories</span>
                    <span className="font-semibold">{selectedProduct.nutrition.calories} kcal</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#FFF9F2] text-[#8B2500] font-bold">
                    <span>Protein</span>
                    <span>{selectedProduct.nutrition.protein}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Total Carbohydrates</span>
                    <span>{selectedProduct.nutrition.carbs}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Dietary Fiber</span>
                    <span>{selectedProduct.nutrition.dietaryFiber}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Total Healthy Fats</span>
                    <span>{selectedProduct.nutrition.fat}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Added Sugar</span>
                    <span className="text-[#2E7D32] font-bold">{selectedProduct.nutrition.addedSugar}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Sodium</span>
                    <span>{selectedProduct.nutrition.sodium}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF5EE] rounded-2xl p-6 border border-[#EBDCC7] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B2500]">
                  Nutritional Highlights
                </h4>
                <ul className="space-y-2 text-xs text-[#5C3E2F]">
                  {selectedProduct.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#2E7D32] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4 text-xs text-[#5C3E2F] leading-relaxed">
              <h3 className="text-base font-bold text-[#240B07] font-serif">
                What Goes Into Every Single Jar
              </h3>
              <p>
                We source exclusively from certified organic farmers in Saurashtra, Gujarat, celebrated worldwide for the richest natural oil content and aromatic flavor.
              </p>
              <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7]">
                <span className="font-bold text-[#240B07] block mb-1">Ingredients:</span>
                <p className="text-sm font-semibold text-[#8B2500]">
                  {selectedProduct.ingredients.join(', ')}.
                </p>
              </div>
              <p className="text-[11px] text-[#7A6153]">
                *Allergen Advice: Contains Peanuts. Processed in a dedicated peanut facility that does not handle gluten, soy, or dairy.
              </p>
            </div>
          )}

          {activeTab === 'how-to-use' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C3E2F]">
              <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-2">
                <span className="font-bold text-[#240B07] text-sm block">1. Sourdough & Toast</span>
                <p>Thickly spread over warm toasted sourdough or multigrain bread. Top with banana slices and chia seeds.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-2">
                <span className="font-bold text-[#240B07] text-sm block">2. Protein Smoothies</span>
                <p>Blend 2 tablespoons with chilled almond milk, whey protein, and frozen berries for post-workout satiety.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-2">
                <span className="font-bold text-[#240B07] text-sm block">3. Straight from the Spoon</span>
                <p>Enjoy one heaping spoonful as a clean afternoon energy boost. Zero guilt, pure natural satisfaction.</p>
              </div>
            </div>
          )}
        </div>

        {/* Customer Reviews & Write Review Modal */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBDCC7] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EBDCC7] pb-6">
            <div>
              <h3 className="text-2xl font-bold font-serif text-[#240B07]">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-[#E8A838]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E8A838]" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#240B07]">
                  {selectedProduct.rating} out of 5
                </span>
                <span className="text-xs text-[#8B5E3C]">
                  ({selectedProduct.reviews.length} verified reviews)
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#240B07] text-[#E8A838] hover:bg-[#3D1409] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Write a Review
            </button>
          </div>

          {/* Review Cards */}
          <div className="space-y-4">
            {selectedProduct.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#240B07]">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#A49182]">{rev.date}</span>
                </div>

                <div className="flex items-center text-[#E8A838]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E8A838]" />
                  ))}
                </div>

                <h4 className="text-xs font-bold text-[#240B07]">{rev.title}</h4>
                <p className="text-xs text-[#5C3E2F] leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Write a Review */}
        {isWriteReviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FBF6EE] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EBDCC7] shadow-2xl space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#240B07]">
                Review {selectedProduct.name}
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating ? 'fill-[#E8A838] text-[#E8A838]' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us what you love about this flavour..."
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#DECDBB] text-xs font-bold text-[#240B07] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#240B07] text-[#E8A838] text-xs font-bold cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
