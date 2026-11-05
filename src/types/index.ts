export type PageType =
  | 'home'
  | 'shop'
  | 'product-details'
  | 'about'
  | 'process'
  | 'bulk-order'
  | 'cart'
  | 'checkout'
  | 'contact'
  | 'faqs'
  | 'track-order';

export type FlavourId =
  | 'crunchy'
  | 'creamy'
  | 'chocolate'
  | 'classic'
  | 'honey-roast'
  | 'high-protein';

export interface ProductVariant {
  size: string; // e.g. "350g", "500g", "1kg", "2.5kg"
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  flavour: FlavourId;
  flavourLabel: string;
  tagline: string;
  description: string;
  shortDescription: string;
  image: string;
  additionalImages?: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  badge?: string;
  nutrition: {
    servingSize: string;
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    dietaryFiber: string;
    sugar: string;
    addedSugar: string;
    sodium: string;
  };
  ingredients: string[];
  benefits: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string; // generated e.g. `${productId}-${size}-${pack}`
  product: Product;
  selectedSize: string;
  packType: 'single' | 'pack2' | 'pack3';
  packMultiplier: number;
  unitPrice: number;
  quantity: number;
}

export interface OrderTrackingInfo {
  orderId: string;
  awbNumber: string;
  courier: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'confirmed' | 'packed' | 'dispatched' | 'in_transit' | 'out_for_delivery' | 'delivered';
  items: {
    name: string;
    flavour: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
}
