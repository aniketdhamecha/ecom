import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, X, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Active filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Large'); // default Large selected as per screenshot
  const [selectedStyle, setSelectedStyle] = useState('Casual'); // default Casual selected
  const [sortBy, setSortBy] = useState('Most Popular');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mobile filter drawer visibility
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync state with query parameters
  useEffect(() => {
    const searchVal = searchParams.get('search');
    const styleVal = searchParams.get('style');
    const filterVal = searchParams.get('filter');

    if (styleVal) {
      setSelectedStyle(styleVal);
    }
    
    if (filterVal === 'New') {
      setSelectedCategory('');
      setSelectedStyle('');
    } else if (filterVal === 'TopSelling') {
      setSelectedCategory('');
      setSelectedStyle('');
    }
    
    setCurrentPage(1);
  }, [location.search, searchParams]);

  // Design parameters
  const categoriesList = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  
  const colorsList = [
    { name: 'Green', value: '#01ab31' },
    { name: 'Red', value: '#ff3333' },
    { name: 'Yellow', value: '#ffc72c' },
    { name: 'Orange', value: '#e65c00' },
    { name: 'Light Blue', value: '#7fa8d8' },
    { name: 'Royal Blue', value: '#0026e6' },
    { name: 'Purple', value: '#aa3bff' },
    { name: 'Pink', value: '#e07fa1' },
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' }
  ];

  const sizesList = [
    'XX-Small', 'X-Small', 'Small', 'Medium', 
    'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'
  ];

  const stylesList = ['Casual', 'Formal', 'Party', 'Gym'];

  // 1. FILTER LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query from navbar
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // New/Top Selling special lists from shelves
    const filterQuery = searchParams.get('filter');
    if (filterQuery === 'New') {
      result = result.filter((p) => p.isNew);
    } else if (filterQuery === 'TopSelling') {
      result = result.filter((p) => p.isTopSelling);
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Dress Style filter
    if (selectedStyle) {
      result = result.filter((p) => p.style === selectedStyle);
    }

    // Color filter
    if (selectedColor) {
      result = result.filter((p) => p.colors.includes(selectedColor));
    }

    // Size filter
    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price Range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // 2. SORT LOGIC
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // 'Most Popular' (Default order or review count order)
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCategory, selectedStyle, selectedColor, selectedSize, priceRange, sortBy, searchParams]);

  // PAGINATION math
  const itemsPerPage = 9;
  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const handlePriceSliderChange = (e, index) => {
    const val = parseInt(e.target.value);
    setPriceRange((prev) => {
      const next = [...prev];
      next[index] = val;
      // Prevent overlapping
      if (index === 0 && next[0] > next[1]) {
        next[0] = next[1];
      } else if (index === 1 && next[1] < next[0]) {
        next[1] = next[0];
      }
      return next;
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedSize('Large');
    setSelectedStyle('');
    setPriceRange([50, 200]);
    setSearchParams({});
    setCurrentPage(1);
  };

  const getPageTitle = () => {
    if (searchParams.get('search')) {
      return `Search Results`;
    }
    if (selectedStyle) {
      return selectedStyle;
    }
    if (searchParams.get('filter') === 'New') {
      return 'New Arrivals';
    }
    if (searchParams.get('filter') === 'TopSelling') {
      return 'Top Selling';
    }
    return 'Shop';
  };

  return (
    <div className="shop-page page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-bar">
        <span>Home</span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="active">{getPageTitle()}</span>
      </div>

      <div className="category-layout">
        {/* FILTERS SIDEBAR (DESKTOP & DRAWER COMBINED) */}
        <aside className={`filters-sidebar ${isFilterDrawerOpen ? 'drawer-mode' : ''}`}>
          {/* Header */}
          <div className="filters-header">
            <span className="filters-title">Filters</span>
            {isFilterDrawerOpen ? (
              <button onClick={() => setIsFilterDrawerOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            ) : (
              <button 
                onClick={clearAllFilters} 
                style={{ fontSize: '12px', textDecoration: 'underline', color: '#606060' }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category List */}
          <div className="filter-section">
            <ul className="filter-category-list">
              {categoriesList.map((cat) => (
                <li
                  key={cat}
                  className={`filter-category-item ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat ? '' : cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                  <ChevronRight size={16} color="#bfbfbf" />
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Dual-Handle Slider */}
          <div className="filter-section">
            <div className="filter-section-title-row">
              <span className="filter-section-title">Price</span>
            </div>
            
            <div className="price-slider-container">
              <div className="price-range-inputs">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              
              {/* Custom dual range inputs overlayed */}
              <div style={{ position: 'relative', height: '10px', marginTop: '10px' }}>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceSliderChange(e, 0)}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    pointerEvents: 'none',
                    appearance: 'none',
                    zIndex: 2,
                    height: '0',
                    background: 'none'
                  }}
                  className="range-input-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceSliderChange(e, 1)}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    pointerEvents: 'none',
                    appearance: 'none',
                    zIndex: 2,
                    height: '0',
                    background: 'none'
                  }}
                  className="range-input-slider"
                />
                
                {/* Visual Track */}
                <div 
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '6px',
                    backgroundColor: '#e6e6e6',
                    borderRadius: '3px',
                    top: '6px'
                  }}
                ></div>
                {/* Visual Fill */}
                <div 
                  style={{
                    position: 'absolute',
                    left: `${(priceRange[0] / 300) * 100}%`,
                    right: `${100 - (priceRange[1] / 300) * 100}%`,
                    height: '6px',
                    backgroundColor: '#000000',
                    borderRadius: '3px',
                    top: '6px'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="filter-section">
            <div className="filter-section-title-row">
              <span className="filter-section-title">Colors</span>
            </div>
            <div className="color-swatches-grid">
              {colorsList.map((col) => {
                const isSelected = selectedColor === col.value;
                const isWhite = col.value === '#ffffff';
                return (
                  <button
                    key={col.name}
                    className={`color-swatch-btn ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: col.value }}
                    onClick={() => {
                      setSelectedColor(isSelected ? '' : col.value);
                      setCurrentPage(1);
                    }}
                    title={col.name}
                    aria-label={`Select color ${col.name}`}
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

          {/* Size Buttons */}
          <div className="filter-section">
            <div className="filter-section-title-row">
              <span className="filter-section-title">Size</span>
            </div>
            <div className="size-boxes-grid">
              {sizesList.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    className={`size-box-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedSize(isSelected ? '' : sz);
                      setCurrentPage(1);
                    }}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dress Styles */}
          <div className="filter-section">
            <div className="filter-section-title-row">
              <span className="filter-section-title">Dress Style</span>
            </div>
            <ul className="filter-category-list">
              {stylesList.map((sty) => (
                <li
                  key={sty}
                  className={`filter-category-item ${selectedStyle === sty ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedStyle(selectedStyle === sty ? '' : sty);
                    setCurrentPage(1);
                  }}
                >
                  {sty}
                  <ChevronRight size={16} color="#bfbfbf" />
                </li>
              ))}
            </ul>
          </div>

          {/* Apply filters for mobile */}
          {isFilterDrawerOpen && (
            <button 
              className="apply-filter-btn" 
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              Apply Filter
            </button>
          )}
        </aside>

        {/* PRODUCTS LIST GRID & HEADER */}
        <main className="product-list-container">
          {/* Header */}
          <div className="product-list-header">
            <h2 className="category-title">{getPageTitle()}</h2>
            
            <div className="product-list-meta">
              <span>
                Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
                {filteredProducts.length} Products
              </span>
              
              <div className="sort-dropdown">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="sort-select-native"
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Top Rated">Top Rated</option>
                </select>
              </div>

              {/* Mobile Filter Toggle Trigger */}
              <button 
                className="mobile-filters-trigger"
                onClick={() => setIsFilterDrawerOpen(true)}
                aria-label="Open filter options"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Grid list */}
          {pageProducts.length > 0 ? (
            <div className="products-catalog-grid">
              {pageProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '64px 0', textAlign: 'center', color: '#606060' }}>
              <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                No products found matching the criteria.
              </p>
              <button 
                onClick={clearAllFilters}
                className="shelf-view-all-btn"
                style={{ marginTop: '16px' }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Console */}
          {filteredProducts.length > itemsPerPage && (
            <div className="pagination-console">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                &larr; Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pgNum = idx + 1;
                  return (
                    <button
                      key={pgNum}
                      className={`pagination-number-btn ${currentPage === pgNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pgNum)}
                    >
                      {pgNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
