import React, { useRef, useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useCart();

  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);

  // Status message for cart actions
  const [addedItemName, setAddedItemName] = useState('');

  useEffect(() => {
    // Scroll automatically to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observerOptions = { threshold: 0.1 };

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsHeroVisible(true);
        heroObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const gridObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsGridVisible(true);
        gridObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (gridRef.current) gridObserver.unobserve(gridRef.current);
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1, 'Medium', product.colors ? product.colors[0] : 'Black');
    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(''), 3000);
  };

  return (
    <div className="wishlist-page">
      {/* 1. Hero Header: Slides left to right, fades in */}
      <section className={`wishlist-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="wishlist-hero-content">
          <span className="wishlist-subtitle">YOUR FAVORITES</span>
          <h1 className="wishlist-title">MY WISHLIST</h1>
          <p className="wishlist-description">
            Keep track of the bespoke garments, combed cotton tees, and structural denim fits 
            you love. Add them to your cart instantly when you are ready to embody your style.
          </p>
        </div>
      </section>

      {/* Live Toast alert when cart gets updated */}
      {addedItemName && (
        <div className="wishlist-success-toast">
          <span>"{addedItemName}" successfully added to your Cart!</span>
        </div>
      )}

      {/* 2. Grid Area or Empty State */}
      <section className={`wishlist-grid-section page-container ${isGridVisible ? 'visible' : ''}`} ref={gridRef}>
        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((product, idx) => (
              <div key={product.id} className="wishlist-card">
                {/* Image panel */}
                <div className="wishlist-img-wrapper">
                  <img src={product.image} alt={product.name} />
                  {/* Remove hover button */}
                  <button 
                    onClick={() => toggleWishlist(product)} 
                    className="wishlist-remove-btn"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Info panel */}
                <div className="wishlist-info">
                  <h3 className="wishlist-card-title">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="wishlist-stars-row">
                    <div className="wishlist-stars">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                        <Star key={i} size={14} fill="#ffc72c" stroke="#ffc72c" />
                      ))}
                    </div>
                    <span className="wishlist-rating-val">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="wishlist-price-row">
                    <span className="wishlist-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="wishlist-original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart CTA */}
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    className="wishlist-cart-btn"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty-state">
            <div className="wishlist-heart-box">
              <Heart size={44} className="wishlist-empty-heart" />
            </div>
            <h2>YOUR WISHLIST IS EMPTY</h2>
            <p>You haven't saved any contemporary apparel items yet. Browse our collections to find clothes that matches your style.</p>
            <Link to="/shop" className="wishlist-explore-btn">
              <span>Explore Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
