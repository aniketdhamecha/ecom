import React, { useRef, useState, useEffect } from 'react';
import { Shuffle, ArrowRight, Star, ShoppingBag, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Compare = () => {
  const { addToCart } = useCart();

  // State to hold selected product IDs for comparison (up to 3 products)
  const [selectedIds, setSelectedIds] = useState([1, 2]); // default compares product 1 & 2
  const [addedItemName, setAddedItemName] = useState('');

  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const selectorsRef = useRef(null);
  const tableRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSelectorsVisible, setIsSelectorsVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);

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

    const selectorsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSelectorsVisible(true);
        selectorsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const tableObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTableVisible(true);
        tableObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (selectorsRef.current) selectorsObserver.observe(selectorsRef.current);
    if (tableRef.current) tableObserver.observe(tableRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (selectorsRef.current) selectorsObserver.unobserve(selectorsRef.current);
      if (tableRef.current) tableObserver.unobserve(tableRef.current);
    };
  }, []);

  const handleProductChange = (index, newId) => {
    setSelectedIds((prev) => {
      const updated = [...prev];
      if (newId === '') {
        // remove comparison slot
        updated.splice(index, 1);
      } else {
        updated[index] = Number(newId);
      }
      return updated;
    });
  };

  const addComparisonSlot = () => {
    if (selectedIds.length >= 3) return;
    // Find first product ID not already in selectedIds
    const nextAvailableProduct = products.find(p => !selectedIds.includes(p.id));
    if (nextAvailableProduct) {
      setSelectedIds(prev => [...prev, nextAvailableProduct.id]);
    }
  };

  const removeComparisonSlot = (index) => {
    setSelectedIds(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, 'Medium', product.colors ? product.colors[0] : 'Black');
    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(''), 3000);
  };

  // Resolve compared product entities
  const comparedProducts = selectedIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="compare-page">
      {/* 1. Hero Header: Slides left to right, fades in */}
      <section className={`compare-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="compare-hero-content">
          <span className="compare-subtitle">DECISION HELPMATE</span>
          <h1 className="compare-title">COMPARE GARMENTS</h1>
          <p className="compare-description">
            Evaluate price matrices, size formulations, custom colors swatches, review ratings, 
            and design categories side-by-side to find the clothes that best represent your style.
          </p>
        </div>
      </section>

      {/* Live Toast alert when cart gets updated */}
      {addedItemName && (
        <div className="compare-success-toast">
          <span>"{addedItemName}" successfully added to your Cart!</span>
        </div>
      )}

      {/* 2. Selectors ribbon: Scales and fades in */}
      <section className={`compare-selectors-section page-container ${isSelectorsVisible ? 'visible' : ''}`} ref={selectorsRef}>
        <div className="compare-selectors-row">
          {selectedIds.map((selectedId, idx) => (
            <div key={idx} className="compare-dropdown-box">
              <span className="compare-slot-label">Slot {idx + 1}</span>
              <div className="compare-select-wrap">
                <select 
                  value={selectedId} 
                  onChange={(e) => handleProductChange(idx, e.target.value)}
                  className="compare-native-select"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id} disabled={selectedIds.includes(p.id) && p.id !== selectedId}>
                      {p.name} — ${p.price}
                    </option>
                  ))}
                </select>
                {selectedIds.length > 1 && (
                  <button onClick={() => removeComparisonSlot(idx)} className="compare-remove-slot-btn" aria-label="Remove slot">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {selectedIds.length < 3 && (
            <button onClick={addComparisonSlot} className="compare-add-slot-btn">
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. Comparison Specifications Matrix: Slides up staggered */}
      <section className={`compare-matrix-section page-container ${isTableVisible ? 'visible' : ''}`} ref={tableRef}>
        {comparedProducts.length > 0 ? (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-feature-header">PRODUCT DETAIL</th>
                  {comparedProducts.map(product => (
                    <th key={product.id} className="compare-product-header">
                      <div className="compare-header-card">
                        <div className="compare-header-img-wrap">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <h3 className="compare-header-title">{product.name}</h3>
                        <button 
                          onClick={() => handleAddToCart(product)} 
                          className="compare-header-cart-btn"
                        >
                          <ShoppingBag size={14} />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr>
                  <td className="feature-label-col">Price</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col highlight-price">
                      ${product.price}
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td className="feature-label-col">Rating</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col">
                      <div className="compare-stars">
                        {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                          <Star key={i} size={14} fill="#ffc72c" stroke="#ffc72c" />
                        ))}
                        <span className="compare-stars-text">({product.rating})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category Row */}
                <tr>
                  <td className="feature-label-col">Category</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col">
                      {product.category}
                    </td>
                  ))}
                </tr>

                {/* Style Fit Row */}
                <tr>
                  <td className="feature-label-col">Style Fit</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col">
                      {product.style}
                    </td>
                  ))}
                </tr>

                {/* Sizes Row */}
                <tr>
                  <td className="feature-label-col">Sizes Available</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col">
                      <div className="compare-sizes-grid">
                        {product.sizes ? product.sizes.join(', ') : 'S, M, L, XL'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Colors Row */}
                <tr>
                  <td className="feature-label-col">Colors</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col">
                      <div className="compare-colors-grid">
                        {product.colors ? product.colors.map(col => (
                          <span 
                            key={col} 
                            className="compare-color-dot" 
                            style={{ backgroundColor: col }}
                          ></span>
                        )) : 'Various'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Description Row */}
                <tr>
                  <td className="feature-label-col">Description</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="feature-value-col desc-text">
                      {product.description}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="compare-empty">
            <h2>Select Products to Compare</h2>
          </div>
        )}
      </section>
    </div>
  );
};

export default Compare;
