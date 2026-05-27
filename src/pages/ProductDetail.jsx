import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, StarHalf, Check, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  // Selector states
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState('');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));
    if (prod) {
      setProduct(prod);
      setSelectedColor(prod.colors[0]); // default to first color
      setSelectedSize(prod.sizes[1] || prod.sizes[0]); // default to second size or first
      setActiveThumb(prod.image);
      setQuantity(1);
      setIsAddedFeedback(false);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="page-container" style={{ padding: '64px 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="shelf-view-all-btn" style={{ marginTop: '16px', display: 'inline-block' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  // Helper to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={18} fill="#ffc72c" stroke="#ffc72c" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<StarHalf key={i} size={18} fill="#ffc72c" stroke="#ffc72c" />);
      } else {
        stars.push(<Star key={i} size={18} color="#e6e6e6" />);
      }
    }
    return stars;
  };

  // Recommendation shelf
  const recommendations = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="product-detail-page page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-bar">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">&gt;</span>
        <Link to="/shop">Shop</Link>
        <span className="breadcrumb-separator">&gt;</span>
        <Link to={`/shop?style=${product.style}`}>{product.style}</Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="active">{product.name}</span>
      </div>

      {/* Main detail layout */}
      <div className="product-detail-layout">
        {/* Gallery */}
        <div className="product-detail-gallery">
          {/* Thumbnails */}
          <div className="gallery-thumbs">
            <div 
              className={`gallery-thumb-item ${activeThumb === product.image ? 'active' : ''}`}
              onClick={() => setActiveThumb(product.image)}
            >
              <img src={product.image} alt={product.name} />
            </div>
            
            {/* Mocking secondary details since we have clean flat lays */}
            <div 
              className={`gallery-thumb-item ${activeThumb === 'mock-2' ? 'active' : ''}`}
              onClick={() => setActiveThumb('mock-2')}
              style={{ filter: 'hue-rotate(30deg) brightness(1.05)' }}
            >
              <img src={product.image} alt="Detail View 2" />
            </div>

            <div 
              className={`gallery-thumb-item ${activeThumb === 'mock-3' ? 'active' : ''}`}
              onClick={() => setActiveThumb('mock-3')}
              style={{ filter: 'hue-rotate(-30deg) brightness(0.95)' }}
            >
              <img src={product.image} alt="Detail View 3" />
            </div>
          </div>

          {/* Main Display */}
          <div className="gallery-main-img">
            <img 
              src={product.image} 
              alt={product.name} 
              style={{
                filter: activeThumb === 'mock-2' 
                  ? 'hue-rotate(30deg) brightness(1.05)' 
                  : activeThumb === 'mock-3' 
                  ? 'hue-rotate(-30deg) brightness(0.95)' 
                  : 'none'
              }}
            />
          </div>
        </div>

        {/* Product Details Info */}
        <div className="product-detail-info">
          <h2 className="detail-title">{product.name}</h2>
          
          {/* Ratings */}
          <div className="rating-stars-container">
            <div className="rating-stars">{renderStars(product.rating)}</div>
            <span className="rating-text" style={{ fontSize: '14px' }}>
              {product.rating}/<span style={{ fontWeight: 600 }}>5</span>
            </span>
          </div>

          {/* Pricing */}
          <div className="detail-price-row">
            <span className="detail-price">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="detail-original-price">${product.originalPrice}</span>
                <span className="discount-badge" style={{ fontSize: '13px' }}>
                  -{product.discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="detail-description">{product.description}</p>

          {/* Select Colors */}
          <div className="detail-selector-group">
            <span className="selector-label">Select Colors</span>
            <div className="color-swatches-grid">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                const isWhite = color === '#ffffff';
                return (
                  <button
                    key={color}
                    className={`color-swatch-btn ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  >
                    {isSelected && (
                      <Check 
                        className="color-swatch-check" 
                        size={14} 
                        color={isWhite ? '#000000' : '#ffffff'} 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Choose Size */}
          <div className="detail-selector-group">
            <span className="selector-label">Choose Size</span>
            <div className="size-boxes-grid">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    className={`size-box-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="detail-actions-row">
            <div className="quantity-controller">
              <button 
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <span className="qty-number">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>

            <button 
              className={`add-to-cart-btn ${isAddedFeedback ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={isAddedFeedback}
            >
              {isAddedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products Shelf */}
      {recommendations.length > 0 && (
        <section className="shelf-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <h2 className="shelf-title">You Might Also Like</h2>
          <div className="shelf-grid">
            {recommendations.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
