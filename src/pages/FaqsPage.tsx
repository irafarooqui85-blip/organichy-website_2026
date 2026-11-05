import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqItem {
  category: 'ingredients' | 'storage' | 'shipping' | 'bulk';
  question: string;
  answer: string;
}

export const FaqsPage: React.FC = () => {
  const { setCurrentPage } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'ingredients',
      question: 'Why does oil float to the top of my ORGANICHY peanut butter jar?',
      answer:
        'Oil separation is the definitive mark of 100% pure, natural peanut butter! Commercial brands add hydrogenated palm oil or chemical diglycerides to chemically bind the oils to the solids so they never separate. Because ORGANICHY contains zero added oils or emulsifiers, the natural wholesome peanut oil rises to the surface. Simply stir the jar thoroughly with a butter knife or spoon before your first use, or store the jar upside down for easy blending!',
    },
    {
      category: 'ingredients',
      question: 'Do you add refined sugar, palm oil, or preservatives?',
      answer:
        'Never. Our Crunchy, Creamy, Classic, and High-Protein flavours have zero added sugar, zero palm oil, and zero synthetic preservatives. Our Dark Chocolate variety is sweetened lightly using unrefined organic jaggery powder and real dark cocoa—never high-fructose corn syrup or artificial sweeteners.',
    },
    {
      category: 'ingredients',
      question: 'What makes Saurashtra peanuts superior?',
      answer:
        'Saurashtra in Gujarat is recognized globally as the prime organic groundnut terroir. The semi-arid climate, mineral-abundant black cotton soil, and abundant natural sunshine produce peanuts with a higher concentration of heart-healthy monounsaturated oleic acid and an exceptionally rich, naturally sweet roasted flavor profile.',
    },
    {
      category: 'storage',
      question: 'Should I refrigerate ORGANICHY peanut butter after opening?',
      answer:
        'Refrigeration is completely optional. If you prefer a firmer, spreadable butter that prevents oil separation, keep it in the refrigerator after stirring. If you prefer a runny, silky texture that drizzles easily over oatmeal and pancakes, store it in a cool, dry cupboard away from direct sunlight.',
    },
    {
      category: 'storage',
      question: 'What is the shelf life of each jar?',
      answer:
        'Each jar has a shelf life of 9 months from the date of slow-roasting. Because our jars are sealed under inert nitrogen flush, the day-one freshness and aroma remain locked in until you break the safety induction seal.',
    },
    {
      category: 'shipping',
      question: 'How does Free Shipping work?',
      answer:
        'We offer 100% FREE Express Shipping on all orders above ₹499 across all pincodes in India. For orders below ₹499, a nominal flat express shipping charge of ₹49 is applied at checkout.',
    },
    {
      category: 'shipping',
      question: 'How long does delivery take?',
      answer:
        'Orders placed before 2:00 PM are freshly packed and dispatched the same day from our central roasting works in Rajkot. Delivery typically takes 2-3 business days for metro cities (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata) and 3-4 days for other regional locations.',
    },
    {
      category: 'shipping',
      question: 'What is your return and replacement policy?',
      answer:
        'We want you to be 100% delighted with every spoon. If your jar arrives broken, damaged, or unsealed during transit, simply send us a photo on WhatsApp (+91 98765 43210) within 7 days of delivery and we will immediately dispatch a fresh replacement jar at zero additional cost.',
    },
    {
      category: 'bulk',
      question: 'Do you supply gyms, fitness centers, and bakeries in bulk?',
      answer:
        'Yes! We offer tiered wholesale discounts starting at 24 units up to full pallet shipments for gyms, cafes, and grocers, as well as 15kg/25kg food-grade bulk buckets for bakeries. You can use our interactive Wholesale Calculator on the Bulk Orders page or submit an inquiry for a complimentary sample box.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#351009] to-[#1E0803] rounded-3xl p-8 sm:p-12 text-[#FBF6EE] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8A838]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A838]">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Everything You Want to Know
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-xl mx-auto leading-relaxed">
            Have queries about pure organic peanut butter, oil separation, or shipping? We have compiled detailed answers below.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#8B5E3C] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. oil separation, refrigeration, delivery, sugar)..."
            className="w-full text-xs sm:text-sm pl-12 pr-4 py-4 rounded-2xl border border-[#DECDBB] bg-white text-[#240B07] placeholder-[#A49182] shadow-sm focus:outline-none focus:border-[#8B2500]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'ingredients', label: 'Ingredients & Purity' },
            { id: 'storage', label: 'Storage & Shelf Life' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'bulk', label: 'Bulk & Wholesale' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#240B07] text-[#E8A838] shadow-sm'
                  : 'bg-white text-[#5C3E2F] border border-[#EBDCC7] hover:border-[#8B5E3C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-[#7A6153] space-y-2 border border-[#EBDCC7]">
              <HelpCircle className="w-8 h-8 mx-auto text-[#8B5E3C]" />
              <p className="font-bold text-sm text-[#240B07]">No matching answers found</p>
              <p className="text-xs">Try another keyword or reach out directly to customer support.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#EBDCC7] shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF5EE]/60 transition-colors"
                  >
                    <span className="text-sm font-bold text-[#240B07] font-serif">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B2500] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#240B07] text-[#E8A838]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#5C3E2F] leading-relaxed border-t border-[#F4E9DC] bg-[#FAF5EE]/40">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support CTA */}
        <div className="bg-[#FAF5EE] rounded-3xl p-8 border border-[#EBDCC7] text-center space-y-3">
          <h3 className="text-lg font-bold font-serif text-[#240B07]">
            Still have questions?
          </h3>
          <p className="text-xs text-[#7A6153] max-w-md mx-auto">
            Our friendly nutritionists and support advisors are available Monday to Saturday to answer any questions about our flavours.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-2.5 rounded-full bg-[#240B07] text-[#E8A838] font-bold text-xs uppercase tracking-wider hover:bg-[#3D1409] transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
