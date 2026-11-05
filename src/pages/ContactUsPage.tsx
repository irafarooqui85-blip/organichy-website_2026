import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Status');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSent(true);
      showToast('Message sent! Our support team will respond within 2 hours.', 'success');
    }
  };

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#351009] to-[#1E0803] rounded-3xl p-8 sm:p-14 text-[#FBF6EE] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8A838]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A838]">
            We're Here For You
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Contact the ORGANICHY Team
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-2xl mx-auto leading-relaxed">
            Have questions about peanut butter roast batches, wholesale deliveries, or your recent order? Reach out directly—we answer every single message with care.
          </p>
        </div>

        {/* 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#8B2500] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#240B07] font-serif">Customer Care & WhatsApp</h3>
            <p className="text-xs text-[#7A6153]">
              Speak directly with our nutrition & fulfillment team.
            </p>
            <div className="pt-2">
              <a
                href="tel:+919876543210"
                className="text-sm font-bold text-[#8B2500] block hover:underline"
              >
                +91 98765 43210
              </a>
              <span className="text-[11px] text-[#A49182]">Mon - Sat: 9:00 AM - 7:00 PM IST</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#8B2500] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#240B07] font-serif">Email Support</h3>
            <p className="text-xs text-[#7A6153]">
              For orders, inquiries, partnerships, and press.
            </p>
            <div className="pt-2">
              <a
                href="mailto:support@organichy.com"
                className="text-sm font-bold text-[#8B2500] block hover:underline"
              >
                support@organichy.com
              </a>
              <span className="text-[11px] text-[#A49182]">Average response: Under 2 hours</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#8B2500] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#240B07] font-serif">Roasting Facility & Office</h3>
            <p className="text-xs text-[#7A6153]">
              Plot 42, GIDC Food Processing Zone, Rajkot, Gujarat 360003
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#240B07] block">
                Corporate Headquarters:
              </span>
              <span className="text-[11px] text-[#7A6153]">Bandra-Kurla Complex (BKC), Mumbai 400051</span>
            </div>
          </div>
        </div>

        {/* Contact Form & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EBDCC7] shadow-sm space-y-6">
            <div className="space-y-1 border-b border-[#EBDCC7] pb-4">
              <h2 className="text-xl font-bold font-serif text-[#240B07]">
                Send Us a Message
              </h2>
              <p className="text-xs text-[#7A6153]">
                Fill out the form below and we’ll get back to you promptly.
              </p>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#240B07]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs text-[#5C3E2F] max-w-sm mx-auto">
                  Your message has been assigned ticket <strong>#ORG-TKT-{Math.floor(1000 + Math.random() * 9000)}</strong>. A team member will respond to <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2 rounded-full bg-[#240B07] text-[#E8A838] text-xs font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#240B07] block mb-1">Topic *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                    >
                      <option>Order & Delivery Status</option>
                      <option>Flavour Recommendation</option>
                      <option>Wholesale & Retail Bulk Inquiry</option>
                      <option>Nutritional & Allergen Advice</option>
                      <option>Feedback & Praise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#240B07] block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help make your ORGANICHY experience even better?"
                    className="w-full text-xs p-3 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:outline-none focus:border-[#8B2500]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Guarantee & FAQ links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] space-y-4">
              <h3 className="text-base font-bold font-serif text-[#240B07]">
                Quick Help & Self-Service
              </h3>
              <p className="text-xs text-[#7A6153] leading-relaxed">
                Looking for answers right away? Check our comprehensive guide on oil separation, storing natural peanut butter, and courier dispatch timelines.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '';
                    window.scrollTo({ top: 0 });
                  }}
                  className="p-3 rounded-xl bg-white border border-[#EBDCC7] flex items-center justify-between text-xs font-bold text-[#240B07] hover:border-[#8B2500] cursor-pointer"
                >
                  <span>Why does oil separate on top of my jar?</span>
                  <span className="text-[#8B2500]">→</span>
                </a>

                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '';
                    window.scrollTo({ top: 0 });
                  }}
                  className="p-3 rounded-xl bg-white border border-[#EBDCC7] flex items-center justify-between text-xs font-bold text-[#240B07] hover:border-[#8B2500] cursor-pointer"
                >
                  <span>How long does delivery take?</span>
                  <span className="text-[#8B2500]">→</span>
                </a>
              </div>
            </div>

            <div className="bg-[#240B07] text-[#FBF6EE] rounded-3xl p-6 sm:p-8 border border-[#4A1E11] space-y-3">
              <div className="flex items-center gap-2 text-[#E8A838]">
                <Clock className="w-5 h-5" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Operating Hours
                </h4>
              </div>
              <div className="text-xs space-y-1 text-[#D8C7B5]">
                <div className="flex justify-between">
                  <span>Customer Support:</span>
                  <span className="text-white font-semibold">9 AM - 8 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Roasting & Dispatch:</span>
                  <span className="text-white font-semibold">Monday - Saturday</span>
                </div>
                <div className="flex justify-between">
                  <span>Online Store:</span>
                  <span className="text-[#2E7D32] font-bold">Open 24/7/365</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
