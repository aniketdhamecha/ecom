import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Search, ShoppingBag } from 'lucide-react';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="security-page-wrapper">
      <div className={`security-card-box ${animate ? 'reveal-active' : ''}`}>
        
        {/* Giant Deconstructed numbers */}
        <div className="error-giant-badge">
          <span className="badge-num">4</span>
          <span className="badge-bullet-ring">
            <AlertCircle size={48} className="glow-bullet" />
          </span>
          <span className="badge-num">4</span>
        </div>

        <h1 className="security-title">PAGE NOT FOUND</h1>
        <p className="security-description">
          The requested combed cotton inventory tag, editorial chapter, or deconstructed style coordinates 
          do not exist or have been archived.
        </p>

        {/* Directory Search Form */}
        <form className="security-search-form" onSubmit={handleSearchSubmit}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tops, polos, denim..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="security-search-input"
          />
          <button type="submit" className="security-search-btn">Find Style</button>
        </form>

        {/* Quick redirect controls */}
        <div className="security-quick-routes">
          <Link to="/" className="sec-route-btn primary">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/shop" className="sec-route-btn secondary">
            <ShoppingBag size={16} />
            <span>Browse Catalogue</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
