import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, OrderTrackingInfo, PageType, Product } from '../types';
import { INITIAL_ORDERS, PRODUCTS } from '../data/products';

interface CartContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  viewProductDetails: (product: Product) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string, packType?: 'single' | 'pack2' | 'pack3', quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  couponCode: string;
  discount: number;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  shippingFee: number;
  finalTotal: number;
  totalItemCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
  orders: OrderTrackingInfo[];
  createOrder: (orderData: Omit<OrderTrackingInfo, 'orderId' | 'awbNumber' | 'timeline' | 'orderDate' | 'status'>) => string;
  toast: { message: string; type?: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: `${PRODUCTS[0].id}-500g-single`,
      product: PRODUCTS[0],
      selectedSize: '500g',
      packType: 'single',
      packMultiplier: 1,
      unitPrice: 349,
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderTrackingInfo[]>(INITIAL_ORDERS);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'error' } | null>(null);

  const setCurrentPage = (page: PageType) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = (
    product: Product,
    size: string = '500g',
    packType: 'single' | 'pack2' | 'pack3' = 'single',
    quantity: number = 1
  ) => {
    const variant = product.variants.find((v) => v.size === size) || product.variants[0];
    const multiplier = packType === 'pack3' ? 3 : packType === 'pack2' ? 2 : 1;
    const discountRate = packType === 'pack3' ? 0.9 : packType === 'pack2' ? 0.95 : 1.0;
    const effectiveUnitPrice = Math.round(variant.price * multiplier * discountRate);

    const itemId = `${product.id}-${size}-${packType}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: size,
          packType,
          packMultiplier: multiplier,
          unitPrice: effectiveUnitPrice,
          quantity,
        },
      ];
    });

    showToast(`Added ${quantity} × ${product.name} (${size}) to cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORGANIC10') {
      setCouponCode('ORGANIC10');
      setDiscountPercent(0.1);
      setCouponError(null);
      showToast('Coupon ORGANIC10 applied! 10% discount', 'success');
      return true;
    }
    if (clean === 'NUTTY20') {
      setCouponCode('NUTTY20');
      setDiscountPercent(0.2);
      setCouponError(null);
      showToast('Coupon NUTTY20 applied! 20% discount', 'success');
      return true;
    }
    if (clean === 'FREESHIP') {
      setCouponCode('FREESHIP');
      setDiscountPercent(0.05);
      setCouponError(null);
      showToast('Coupon FREESHIP applied!', 'success');
      return true;
    }
    setCouponError('Invalid coupon code. Try ORGANIC10 or NUTTY20');
    showToast('Invalid coupon code', 'error');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    setCouponError(null);
    showToast('Coupon removed', 'info');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  const freeShippingThreshold = 499;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 || couponCode === 'FREESHIP' ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const createOrder = (
    orderData: Omit<OrderTrackingInfo, 'orderId' | 'awbNumber' | 'timeline' | 'orderDate' | 'status'>
  ): string => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `ORG-${randomSuffix}`;
    const newAwb = `DLV${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newOrder: OrderTrackingInfo = {
      ...orderData,
      orderId: newOrderId,
      awbNumber: newAwb,
      orderDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'confirmed',
      timeline: [
        {
          title: 'Order Confirmed',
          description: 'Payment verified and scheduled for fresh batch milling',
          timestamp: 'Just now',
          completed: true,
          current: true,
        },
        {
          title: 'Packed Hygienically',
          description: 'Awaiting nitrogen-flush seal at Rajkot Roasting Facility',
          timestamp: 'Next: In 4-6 hours',
          completed: false,
        },
        {
          title: 'Dispatched with Courier',
          description: 'Will be assigned to Delhivery Express Hub',
          timestamp: 'Expected tomorrow',
          completed: false,
        },
        {
          title: 'In Transit',
          description: 'Hub gateway processing',
          timestamp: 'In 2 days',
          completed: false,
        },
        {
          title: 'Out for Delivery',
          description: 'With local courier delivery associate',
          timestamp: 'In 3 days',
          completed: false,
        },
        {
          title: 'Delivered',
          description: 'Delivered with OTP verification',
          timestamp: 'In 3-4 days',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrderId;
  };

  return (
    <CartContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        viewProductDetails,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        couponCode,
        discount,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        shippingFee,
        finalTotal,
        totalItemCount,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        freeShippingProgress,
        orders,
        createOrder,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
