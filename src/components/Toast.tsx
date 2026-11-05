import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border ${
          isSuccess
            ? 'bg-[#240B07] text-[#FBF6EE] border-[#E8A838]'
            : isError
            ? 'bg-red-950 text-white border-red-500'
            : 'bg-[#2D120B] text-white border-[#8B5E3C]'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#E8A838] shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-[#E8A838] shrink-0" />}
        
        <p className="text-xs sm:text-sm font-medium flex-1">{toast.message}</p>
        
        <button
          onClick={hideToast}
          aria-label="Close notification"
          className="text-[#D8C7B5] hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
