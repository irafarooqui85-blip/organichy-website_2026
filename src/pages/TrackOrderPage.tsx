import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderTrackingInfo } from '../types';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { orders, showToast } = useCart();
  const [searchInput, setSearchInput] = useState<string>('ORG-84920');
  const [activeOrder, setActiveOrder] = useState<OrderTrackingInfo | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchInput.trim().toUpperCase();

    const matched = orders.find(
      (o) =>
        o.orderId.toUpperCase() === query ||
        o.awbNumber.toUpperCase() === query ||
        o.customerPhone.includes(query)
    );

    if (matched) {
      setActiveOrder(matched);
      showToast(`Found tracking information for Order ${matched.orderId}`, 'success');
    } else {
      setActiveOrder(null);
      showToast('No order found matching that ID or phone number', 'error');
    }
  };

  const handleSelectSample = (sampleId: string) => {
    setSearchInput(sampleId);
    const matched = orders.find((o) => o.orderId === sampleId);
    if (matched) {
      setActiveOrder(matched);
      setHasSearched(true);
    }
  };

  return (
    <div className="w-full bg-[#FBF6EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#240B07] via-[#351009] to-[#1E0803] rounded-3xl p-8 sm:p-12 text-[#FBF6EE] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8A838]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A838]">
            Live Shipment Tracker
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Track Your Fresh Batch Delivery
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-xl mx-auto leading-relaxed">
            Enter your ORGANICHY Order ID (e.g. ORG-84920) or your registered mobile number to follow real-time roasting and transit milestones.
          </p>
        </div>

        {/* Search Bar & Sample Presets */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#8B5E3C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. ORG-84920) or Phone (+91 98201...)"
                className="w-full text-xs sm:text-sm pl-12 pr-4 py-3.5 rounded-xl border border-[#DECDBB] bg-[#FAF5EE] focus:bg-white focus:border-[#8B2500] focus:outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-[#240B07] hover:bg-[#3D1409] text-[#E8A838] font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            >
              Track Order
            </button>
          </form>

          {/* Quick Demo Clickable Test Chips */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-[#7A6153] pt-1">
            <span className="font-semibold text-[#8B2500]">Test with Live Demo Orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.orderId}
                type="button"
                onClick={() => handleSelectSample(o.orderId)}
                className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all cursor-pointer ${
                  activeOrder?.orderId === o.orderId
                    ? 'bg-[#240B07] text-[#E8A838] border-[#240B07]'
                    : 'bg-[#FAF5EE] text-[#5C3E2F] border-[#DECDBB] hover:border-[#8B5E3C]'
                }`}
              >
                {o.orderId} ({o.status.replace('_', ' ')})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details View */}
        {activeOrder ? (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Order Header Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCC7] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBDCC7] pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B2500]">
                      Order Status
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide ${
                        activeOrder.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : activeOrder.status === 'out_for_delivery'
                          ? 'bg-amber-100 text-amber-900 animate-pulse'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {activeOrder.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold font-serif text-[#240B07] mt-1">
                    Order #{activeOrder.orderId}
                  </h2>
                  <p className="text-xs text-[#7A6153]">
                    Placed on {activeOrder.orderDate}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBDCC7] text-left md:text-right">
                  <span className="text-[11px] text-[#8B5E3C] block">Estimated Delivery</span>
                  <span className="text-base font-extrabold text-[#240B07]">
                    {activeOrder.estimatedDelivery}
                  </span>
                  <span className="text-[11px] text-[#2E7D32] font-semibold block mt-0.5">
                    Carrier: {activeOrder.courier} (AWB: {activeOrder.awbNumber})
                  </span>
                </div>
              </div>

              {/* Progress Milestones Timeline */}
              <div className="py-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#240B07] mb-6">
                  Shipment Progress Timeline
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-[#EBDCC7] ml-4">
                  {activeOrder.timeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Status Node Circle */}
                      <div
                        className={`absolute -left-[35px] sm:-left-[43px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          item.completed
                            ? 'bg-[#2E7D32] text-white border-white shadow-sm'
                            : 'bg-white text-stone-300 border-stone-300'
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-4 h-4 fill-[#2E7D32] text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-stone-300" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4
                            className={`text-sm font-bold ${
                              item.current
                                ? 'text-[#8B2500]'
                                : item.completed
                                ? 'text-[#240B07]'
                                : 'text-[#A49182]'
                            }`}
                          >
                            {item.title}
                            {item.current && (
                              <span className="ml-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E8A838] text-[#240B07]">
                                Current Stage
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-[#8B5E3C] font-medium">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#6B5041] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Details & Items Breakdown */}
              <div className="border-t border-[#EBDCC7] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#240B07] mb-3">
                    Items in This Parcel ({activeOrder.items.length})
                  </h4>
                  <div className="space-y-2">
                    {activeOrder.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5EE] border border-[#EBDCC7] text-xs"
                      >
                        <div>
                          <p className="font-bold text-[#240B07]">{it.name}</p>
                          <p className="text-[11px] text-[#7A6153]">
                            Flavour: {it.flavour} · Size: {it.size} · Qty: {it.quantity}
                          </p>
                        </div>
                        <span className="font-extrabold text-[#240B07]">₹{it.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-xs font-bold pt-2 px-1 text-[#240B07]">
                      <span>Total Amount Paid</span>
                      <span className="text-sm font-extrabold text-[#8B2500]">
                        ₹{activeOrder.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#240B07] mb-1">
                      Shipping Address:
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#EBDCC7] text-xs text-[#5C3E2F] space-y-1">
                      <p className="font-bold text-[#240B07]">{activeOrder.customerName}</p>
                      <p>{activeOrder.deliveryAddress}</p>
                      <p className="text-[11px] text-[#8B5E3C]">{activeOrder.customerPhone}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-[#EBDCC7] text-xs text-[#5C3E2F] space-y-1">
                    <p className="font-bold text-[#240B07]">Delivery Courier Partner:</p>
                    <p>{activeOrder.courier} — Air Waybill No. {activeOrder.awbNumber}</p>
                    <p className="text-[11px] text-[#7A6153]">You will receive an OTP via SMS prior to delivery.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          hasSearched && (
            <div className="bg-white rounded-3xl p-12 border border-[#EBDCC7] text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="text-lg font-bold font-serif text-[#240B07]">No order found</h3>
              <p className="text-xs text-[#7A6153] max-w-sm mx-auto">
                We couldn’t find any active parcel matching "{searchInput}". Please double check your order number from your confirmation SMS or email.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
};
