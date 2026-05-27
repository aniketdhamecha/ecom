import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    promoCode,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState({ success: null, message: '' });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput.trim());
    setPromoFeedback({ success: result.success, message: result.message });
    setPromoInput('');

    // Clear feedback message after 4 seconds
    setTimeout(() => {
      setPromoFeedback({ success: null, message: '' });
    }, 4000);
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
  };

  if (checkoutSuccess) {
    return (
      <div className="page-container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div 
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '40px',
            border: '1px solid #e6e6e6',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 10px 30px rgba(0,0,0,0.05)'
          }}
        >
          <div 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#01ab31',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '32px'
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Order Placed!</h2>
          <p style={{ color: '#606060', lineHeight: '1.6', marginBottom: '32px' }}>
            Congratulations! Your order has been placed successfully. We are preparing
            your stylish items for delivery.
          </p>
          <Link to="/shop" className="checkout-btn">
            Continue Shopping <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-bar">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="active">Cart</span>
      </div>

      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart-layout">
          {/* Left Column: Items */}
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div key={item.variationId} className="cart-item-card">
                {/* Product Photo */}
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Text Info */}
                <div className="cart-item-info">
                  <div className="cart-item-title-row">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <button
                      className="cart-item-delete-btn"
                      onClick={() => removeFromCart(item.variationId)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="cart-item-meta">
                    <span>
                      Size: <span style={{ color: '#606060', fontWeight: '400' }}>{item.selectedSize}</span>
                    </span>
                    <span>
                      Color:{' '}
                      <span 
                        style={{ 
                          color: '#606060', 
                          fontWeight: '400',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span 
                          style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: item.selectedColor,
                            border: '1px solid #d9d9d9'
                          }}
                        ></span>
                        {item.selectedColor === '#ffffff' 
                          ? 'White' 
                          : item.selectedColor === '#000000' 
                          ? 'Black' 
                          : item.selectedColor === '#ff3333'
                          ? 'Red'
                          : item.selectedColor === '#aa3bff'
                          ? 'Purple'
                          : item.selectedColor === '#6b0b24'
                          ? 'Burgundy'
                          : item.selectedColor === '#2d4263'
                          ? 'Blue'
                          : 'Selected Color'}
                      </span>
                    </span>
                  </div>

                  <div className="cart-item-bottom-row">
                    <span className="cart-item-price">${item.price}</span>
                    
                    {/* Quantity toggler */}
                    <div className="quantity-controller" style={{ height: '40px', padding: '0 12px', gap: '16px' }}>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.variationId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-number" style={{ fontSize: '14px', width: '16px' }}>{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.variationId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-sidebar">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-value">${subtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row">
                <span>Discount (-20%)</span>
                <span className="summary-value discount">-${discountAmount}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className="summary-value">${deliveryFee}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span className="summary-value">${total}</span>
            </div>

            {/* Promo Code Coupon Application */}
            <form onSubmit={handleApplyPromo} className="promo-code-container">
              <div className="promo-input-box">
                <Tag size={18} color="#a0a0a0" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
              </div>
              <button type="submit" className="promo-apply-btn">
                Apply
              </button>
            </form>

            {/* Coupon feedback */}
            {promoCode && (
              <div className="promo-badge">
                <span>Code "DISCOUNT20" active</span>
                <button 
                  onClick={removePromoCode} 
                  style={{ fontWeight: '700', cursor: 'pointer', color: 'inherit' }}
                >
                  ✕
                </button>
              </div>
            )}

            {promoFeedback.message && (
              <div 
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: promoFeedback.success ? '#01ab31' : '#ff3333',
                  textAlign: 'left',
                  marginTop: '-8px'
                }}
              >
                {promoFeedback.message}
              </div>
            )}

            {/* Go to Checkout */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Go to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart-state">
          <svg 
            viewBox="0 0 24 24" 
            width="80" 
            height="80" 
            fill="none" 
            stroke="#bfbfbf" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2 style={{ fontSize: '24px', color: '#000000' }}>Your cart is empty</h2>
          <p>Explore our catalog to find clothes that matches your style!</p>
          <Link to="/shop" className="continue-shopping-btn">
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
