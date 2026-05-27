import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, ChevronDown, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoRibbon, setShowPromoRibbon] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <div className="navbar-wrapper">
      {/* Promo Ribbon */}
      {showPromoRibbon && (
        <div className="top-ribbon">
          <span>
            Sign up and get 20% off to your first order.
            <Link to="/register" style={{ textDecoration: 'underline', fontWeight: 600, marginLeft: '4px' }}>
              Sign Up Now
            </Link>
          </span>
          <button className="close-btn" onClick={() => setShowPromoRibbon(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="navbar page-container">
        {/* Hamburger Menu (Mobile) */}
        <button 
          className="menu-toggle-btn" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          SHOP.CO
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/shop" className="nav-link-item">
              Shop <ChevronDown size={14} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop?filter=OnSale" className="nav-link-item">
              On Sale
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop?filter=New" className="nav-link-item">
              New Arrivals
            </NavLink>
          </li>
          <li>
            <a href="#brands" className="nav-link-item">
              Brands
            </a>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link-item">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Search Console */}
        <form onSubmit={handleSearchSubmit} className="search-bar-container">
          <button type="submit" aria-label="Search">
            <Search size={20} color="#606060" />
          </button>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Actions Tray */}
        <div className="nav-actions">
          {/* Mobile search button triggers navigation to shop */}
          <Link to="/shop" className="nav-action-btn mobile-filters-trigger" aria-label="Search products">
            <Search size={22} />
          </Link>
          
          <Link to="/wishlist" className="nav-action-btn" aria-label="Wishlist">
            <Heart size={22} />
          </Link>
          
          <Link to="/cart" className="nav-action-btn" aria-label="Shopping Cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </Link>
          
          <Link to="/profile" className="nav-action-btn" aria-label="User Account">
            <User size={22} />
          </Link>
        </div>
      </nav>

      {/* Mobile Nav Drawer Overlay */}
      <div 
        className={`nav-drawer-overlay ${isMenuOpen ? 'show' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-drawer-header">
          <span className="nav-brand">SHOP.CO</span>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          <li>
            <Link 
              to="/shop" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop <ChevronDown size={16} />
            </Link>
          </li>
          <li>
            <Link 
              to="/shop?filter=OnSale" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              On Sale
            </Link>
          </li>
          <li>
            <Link 
              to="/shop?filter=New" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
          </li>
          <li>
            <a 
              href="#brands" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </a>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
