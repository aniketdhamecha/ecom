import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, StarHalf } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} size={16} fill="#ffc72c" stroke="#ffc72c" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <StarHalf key={i} size={16} fill="#ffc72c" stroke="#ffc72c" />
        );
      } else {
        stars.push(
          <Star key={i} size={16} color="#e6e6e6" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Product Image Container */}
      <div className="product-img-container">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      {/* Product Info */}
      <h3 className="product-info-title">{product.name}</h3>

      {/* Ratings */}
      <div className="rating-stars-container">
        <div className="rating-stars">{renderStars(product.rating)}</div>
        <span className="rating-text">
          {product.rating}/<span>5</span>
        </span>
      </div>

      {/* Pricing Row */}
      <div className="product-price-row">
        <span className="current-price">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="original-price">${product.originalPrice}</span>
            <span className="discount-badge">-{product.discountPercent}%</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
