import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

// 11 Core Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { OurProcessPage } from './pages/OurProcessPage';
import { BulkOrderPage } from './pages/BulkOrderPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FaqsPage } from './pages/FaqsPage';
import { TrackOrderPage } from './pages/TrackOrderPage';

const AppContent: React.FC = () => {
  const { currentPage } = useCart();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-details':
        return <ProductDetailPage />;
      case 'about':
        return <AboutUsPage />;
      case 'process':
        return <OurProcessPage />;
      case 'bulk-order':
        return <BulkOrderPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'faqs':
        return <FaqsPage />;
      case 'track-order':
        return <TrackOrderPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6EE] text-[#240B07]">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
