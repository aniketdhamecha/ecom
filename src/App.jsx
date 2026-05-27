import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Auth from './pages/Auth';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import OrderHistory from './pages/OrderHistory';
import Blog from './pages/Blog';
import HelpCenter from './pages/HelpCenter';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';
import AccessDenied from './pages/AccessDenied';
import SessionExpired from './pages/SessionExpired';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header Navigation */}
          <Navbar />

          {/* Main Routing Area */}
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/support" element={<HelpCenter />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/live-chat" element={<HelpCenter />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Technical & Security Pages */}
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/session-expired" element={<SessionExpired />} />

              {/* Wildcard 404 Error Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer Component with Newsletter Signup */}
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
