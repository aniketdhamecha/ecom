import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, reviews } from '../data/products';

const Home = () => {
  const navigate = useNavigate();
  
  // Refs for scroll reveal animation
  const brandsRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const topSellingRef = useRef(null);
  const dressStyleRef = useRef(null);
  const testimonialsRef = useRef(null);
  const testimonialsRowRef = useRef(null);
  const testimonialScrollTarget = useRef(0);
  const testimonialScrollAnimation = useRef(null);
  
  // Section visibility states
  const [isBrandsVisible, setIsBrandsVisible] = useState(false);
  const [isNewArrivalsVisible, setIsNewArrivalsVisible] = useState(false);
  const [isTopSellingVisible, setIsTopSellingVisible] = useState(false);
  const [isDressStyleVisible, setIsDressStyleVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);

  // Filter products for shelves
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const topSelling = products.filter((p) => p.isTopSelling).slice(0, 4);

  // Staggered trigger observers
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const brandsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsBrandsVisible(true);
        brandsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const newArrivalsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNewArrivalsVisible(true);
        newArrivalsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const topSellingObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTopSellingVisible(true);
        topSellingObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const dressStyleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsDressStyleVisible(true);
        dressStyleObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const testimonialsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTestimonialsVisible(true);
        testimonialsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (brandsRef.current) brandsObserver.observe(brandsRef.current);
    if (newArrivalsRef.current) newArrivalsObserver.observe(newArrivalsRef.current);
    if (topSellingRef.current) topSellingObserver.observe(topSellingRef.current);
    if (dressStyleRef.current) dressStyleObserver.observe(dressStyleRef.current);
    if (testimonialsRef.current) testimonialsObserver.observe(testimonialsRef.current);

    return () => {
      if (brandsRef.current) brandsObserver.unobserve(brandsRef.current);
      if (newArrivalsRef.current) newArrivalsObserver.unobserve(newArrivalsRef.current);
      if (topSellingRef.current) topSellingObserver.unobserve(topSellingRef.current);
      if (dressStyleRef.current) dressStyleObserver.unobserve(dressStyleRef.current);
      if (testimonialsRef.current) testimonialsObserver.unobserve(testimonialsRef.current);
      if (testimonialScrollAnimation.current) {
        cancelAnimationFrame(testimonialScrollAnimation.current);
      }
    };
  }, []);

  const scrollTestimonials = (direction) => {
    const element = testimonialsRowRef.current;
    if (!element) return;

    const cardWidth = window.innerWidth <= 767 ? 320 : 420;
    const offset = direction === 'left' ? -cardWidth : cardWidth;
    
    // Sync target with actual scroll position if not animating, supporting manual touch swipes seamlessly
    if (!testimonialScrollAnimation.current) {
      testimonialScrollTarget.current = element.scrollLeft;
    }
    
    // Cancel the current in-flight animation loop
    if (testimonialScrollAnimation.current) {
      cancelAnimationFrame(testimonialScrollAnimation.current);
    }

    // Accumulate target scroll and clamp it between bounds
    let target = testimonialScrollTarget.current + offset;
    const maxScroll = element.scrollWidth - element.clientWidth;
    target = Math.max(0, Math.min(target, maxScroll));
    testimonialScrollTarget.current = target;

    const start = element.scrollLeft;
    const change = target - start;
    const duration = 500; // 500ms duration for high fluid responsiveness
    let startTime = null;

    // Cubic easeOut deceleration curve (extremely smooth release)
    const easeOutCubic = (t) => (--t) * t * t + 1;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      element.scrollLeft = start + change * easeOutCubic(progress);

      if (progress < 1) {
        testimonialScrollAnimation.current = requestAnimationFrame(animateScroll);
      } else {
        element.scrollLeft = target; // force absolute precision at end of animation frame
        testimonialScrollAnimation.current = null;
      }
    };

    testimonialScrollAnimation.current = requestAnimationFrame(animateScroll);
  };

  const handleStyleClick = (styleName) => {
    navigate(`/shop?style=${encodeURIComponent(styleName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section page-container">
        <div className="hero-text-content">
          <h1 className="hero-title">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="hero-subtitle">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          <Link to="/shop" className="hero-cta-btn">
            Shop Now
          </Link>

          {/* Statistics Grid */}
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="hero-stat-number">200+</span>
              <span className="hero-stat-label">International Brands</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">2,000+</span>
              <span className="hero-stat-label">High-Quality Products</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">30,000+</span>
              <span className="hero-stat-label">Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Hero image with decorative sparkling stars */}
        <div className="hero-img-container">
          <img src="/images/hero_couple.png" alt="Stylish Streetwear Couple" />
          {/* Sparkles */}
          <div className="hero-sparkle sparkle-large">
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
              <path d="M52 0C52 28.7183 75.2817 52 104 52C75.2817 52 52 75.2817 52 104C52 75.2817 28.7183 52 0 52C28.7183 52 52 28.7183 52 0Z" fill="black" />
            </svg>
          </div>
          <div className="hero-sparkle sparkle-small">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M28 0C28 15.4637 40.5363 28 56 28C40.5363 28 28 40.5363 28 56C28 40.5363 15.4637 28 0 28C15.4637 28 28 15.4637 28 0Z" fill="black" />
            </svg>
          </div>
        </div>
      </section>

      {/* Brands Ribbon */}
      <section className={`brands-ribbon-bar ${isBrandsVisible ? 'visible' : ''}`} id="brands" ref={brandsRef}>
        <div className="page-container brands-ribbon-container">
          <span className="brand-logo-text">VERSACE</span>
          <span className="brand-logo-text">ZARA</span>
          <span className="brand-logo-text">GUCCI</span>
          <span className="brand-logo-text">PRADA</span>
          <span className="brand-logo-text">Calvin Klein</span>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className={`shelf-section page-container new-arrivals-section ${isNewArrivalsVisible ? 'visible' : ''}`} ref={newArrivalsRef}>
        <h2 className="shelf-title">New Arrivals</h2>
        <div className="shelf-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/shop?filter=New" className="shelf-view-all-btn">
          View All
        </Link>
      </section>

      {/* Top Selling Section */}
      <section className={`shelf-section page-container top-selling-section ${isTopSellingVisible ? 'visible' : ''}`} ref={topSellingRef}>
        <h2 className="shelf-title">Top Selling</h2>
        <div className="shelf-grid">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/shop?filter=TopSelling" className="shelf-view-all-btn">
          View All
        </Link>
      </section>

      {/* Browse By Dress Style section */}
      <section className={`dress-style-section page-container ${isDressStyleVisible ? 'visible' : ''}`} ref={dressStyleRef}>
        <h2 className="dress-style-title">Browse by Dress Style</h2>
        <div className="dress-style-grid">
          <div className="dress-style-card" onClick={() => handleStyleClick('Casual')}>
            <span className="dress-style-label">Casual</span>
            <img src="/images/casual_style.png" alt="Casual dress style" />
          </div>

          <div className="dress-style-card" onClick={() => handleStyleClick('Formal')}>
            <span className="dress-style-label">Formal</span>
            <img src="/images/formal_style.png" alt="Formal dress style" />
          </div>

          <div className="dress-style-card" onClick={() => handleStyleClick('Party')}>
            <span className="dress-style-label">Party</span>
            <img src="/images/party_style.png" alt="Party dress style" />
          </div>

          <div className="dress-style-card" onClick={() => handleStyleClick('Gym')}>
            <span className="dress-style-label">Gym</span>
            <img src="/images/gym_style.png" alt="Gym dress style" />
          </div>
        </div>
      </section>

      {/* Happy Customers Reviews Section */}
      <section className={`testimonials-section page-container ${isTestimonialsVisible ? 'visible' : ''}`} ref={testimonialsRef}>
        <div className="testimonials-header">
          <h2 className="testimonials-title">Our Happy Customers</h2>
          <div className="testimonials-arrows">
            <button className="arrow-btn" aria-label="Previous testimonials" onClick={() => scrollTestimonials('left')}>
              <ArrowLeft size={20} />
            </button>
            <button className="arrow-btn" aria-label="Next testimonials" onClick={() => scrollTestimonials('right')}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="testimonials-row" ref={testimonialsRowRef}>
          {reviews.map((rev) => (
            <div key={rev.id} className="testimonial-card">
              {/* Rating stars */}
              <div className="testimonial-stars">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <svg key={i} width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Checked Username */}
              <div className="testimonial-user">
                {rev.name}
                <span className="verified-badge">
                  <Check size={14} strokeWidth={4} />
                </span>
              </div>

              {/* Content */}
              <p className="testimonial-text">{rev.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
