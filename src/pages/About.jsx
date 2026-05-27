import React, { useRef, useState, useEffect } from 'react';
import { Award, Compass, Globe, Sparkles, Shirt, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [isValuesVisible, setIsValuesVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    // Scroll automatically to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observerOptions = { threshold: 0.15 };

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsHeroVisible(true);
        heroObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const storyObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsStoryVisible(true);
        storyObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const valuesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsValuesVisible(true);
        valuesObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsStatsVisible(true);
        statsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (storyRef.current) storyObserver.observe(storyRef.current);
    if (valuesRef.current) valuesObserver.observe(valuesRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (storyRef.current) storyObserver.unobserve(storyRef.current);
      if (valuesRef.current) valuesObserver.unobserve(valuesRef.current);
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className="about-page">
      {/* 1. Hero Section: Slide-in text from left, slide-in graphic/image from right */}
      <section className={`about-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="about-hero-text">
          <span className="about-subtitle">WHO WE ARE</span>
          <h1 className="about-title">
            WE REVOLUTIONIZE THE WAY YOU DRESS
          </h1>
          <p className="about-description">
            Founded with a singular vision, SHOP.CO was designed to bridge the gap between high-end 
            contemporary styling and everyday accessibility. We believe that garments are not just 
            fabrics you wear, but expressions of your unique identity, tailored to bring out your 
            confidence and character.
          </p>
          <div className="about-cta-row">
            <Link to="/shop" className="about-cta-primary">
              Explore Collection
            </Link>
            <a href="#story" className="about-cta-secondary">
              Our Journey
            </a>
          </div>
        </div>

        <div className="about-hero-graphic-container">
          <div className="about-hero-backdrop"></div>
          <img 
            src="/images/hero_couple.png" 
            alt="Sleek streetwear style models" 
            className="about-hero-img" 
          />
          {/* Deco absolute elements */}
          <div className="about-deco-box"></div>
        </div>
      </section>

      {/* 2. Stats Row: Fades in with scale */}
      <section className={`about-stats-ribbon ${isStatsVisible ? 'visible' : ''}`} ref={statsRef}>
        <div className="page-container about-stats-grid">
          <div className="about-stat-card">
            <span className="about-stat-num">200+</span>
            <span className="about-stat-label">International Brands</span>
          </div>
          <div className="about-stat-card">
            <span className="about-stat-num">2,000+</span>
            <span className="about-stat-label">High-Quality Products</span>
          </div>
          <div className="about-stat-card">
            <span className="about-stat-num">30,000+</span>
            <span className="about-stat-label">Happy Customers</span>
          </div>
          <div className="about-stat-card">
            <span className="about-stat-num">15+</span>
            <span className="about-stat-label">Global Hubs</span>
          </div>
        </div>
      </section>

      {/* 3. Our Story Section: Slide-in text from right, slide-in image from left */}
      <section id="story" className={`about-story-section page-container ${isStoryVisible ? 'visible' : ''}`} ref={storyRef}>
        <div className="about-story-img-container">
          <img 
            src="/images/casual_style.png" 
            alt="Crafting premium fabrics" 
            className="about-story-img"
          />
          <div className="about-story-deco"></div>
        </div>

        <div className="about-story-text">
          <span className="about-subtitle">OUR TIMELINE</span>
          <h2 className="about-story-title">THE STORY BEHIND SHOP.CO</h2>
          <p className="about-story-desc">
            It began in 2000 with a small, dedicated design workshop crafting tailored menswear. 
            Over two decades, our unwavering commitment to structural integrity, custom HSL dyed color palettes, 
            and premium combed cotton helped us capture attention globally. 
          </p>
          <p className="about-story-desc">
            Today, we are a global hub for streetwear and formal aesthetics alike, shipping meticulously curated 
            capsules to over 50 countries. Every button, every stitch, and every silhouette continues to represent 
            our original promise: uncompromising quality, bespoke comfort, and timeless designs.
          </p>
        </div>
      </section>

      {/* 4. Values Section: Staggered bottom-reveals */}
      <section className={`about-values-section page-container ${isValuesVisible ? 'visible' : ''}`} ref={valuesRef}>
        <div className="about-values-header">
          <span className="about-subtitle">OUR PILLARS</span>
          <h2 className="about-values-title">THE PHILOSOPHY WE WEAR</h2>
        </div>

        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="about-value-icon-box">
              <Award size={24} />
            </div>
            <h3 className="about-value-card-title">Unrivaled Quality</h3>
            <p className="about-value-card-desc">
              From combed organic cottons to dynamic stretch denim formulas, we source only the finest base materials built to endure.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-icon-box">
              <Sparkles size={24} />
            </div>
            <h3 className="about-value-card-title">Timeless Curation</h3>
            <p className="about-value-card-desc">
              We design beyond rapid seasonal micro-trends, engineering elegant, versatile capsules that elevate your daily wardrobe.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-icon-box">
              <Globe size={24} />
            </div>
            <h3 className="about-value-card-title">Global Perspective</h3>
            <p className="about-value-card-desc">
              With design teams scattered across Paris, Tokyo, and New York, our garments blend diverse cultural elements into unified streetwear.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3 className="about-value-card-title">Customer First</h3>
            <p className="about-value-card-desc">
              From size exchanges to lightning-fast shipping, our entire operational flow is optimized around your convenience and confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
