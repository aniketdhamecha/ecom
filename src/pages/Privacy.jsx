import React, { useRef, useState, useEffect } from 'react';
import { Shield, FileText, RefreshCw, Truck, Database, Mail, Phone, ChevronRight } from 'lucide-react';

const Privacy = () => {
  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const contactRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSection1Visible, setIsSection1Visible] = useState(false);
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);
  const [isSection4Visible, setIsSection4Visible] = useState(false);
  const [isSection5Visible, setIsSection5Visible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

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

    const s1Observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSection1Visible(true);
        s1Observer.unobserve(entry.target);
      }
    }, observerOptions);

    const s2Observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSection2Visible(true);
        s2Observer.unobserve(entry.target);
      }
    }, observerOptions);

    const s3Observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSection3Visible(true);
        s3Observer.unobserve(entry.target);
      }
    }, observerOptions);

    const s4Observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSection4Visible(true);
        s4Observer.unobserve(entry.target);
      }
    }, observerOptions);

    const s5Observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSection5Visible(true);
        s5Observer.unobserve(entry.target);
      }
    }, observerOptions);

    const contactObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsContactVisible(true);
        contactObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (section1Ref.current) s1Observer.observe(section1Ref.current);
    if (section2Ref.current) s2Observer.observe(section2Ref.current);
    if (section3Ref.current) s3Observer.observe(section3Ref.current);
    if (section4Ref.current) s4Observer.observe(section4Ref.current);
    if (section5Ref.current) s5Observer.observe(section5Ref.current);
    if (contactRef.current) contactObserver.observe(contactRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (section1Ref.current) s1Observer.unobserve(section1Ref.current);
      if (section2Ref.current) s2Observer.unobserve(section2Ref.current);
      if (section3Ref.current) s3Observer.unobserve(section3Ref.current);
      if (section4Ref.current) s4Observer.unobserve(section4Ref.current);
      if (section5Ref.current) s5Observer.unobserve(section5Ref.current);
      if (contactRef.current) contactObserver.unobserve(contactRef.current);
    };
  }, []);

  return (
    <div className="privacy-page">
      {/* 1. Hero Header: Slides left to right, fades in */}
      <section className={`privacy-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="privacy-hero-content">
          <span className="privacy-subtitle">LEGAL COALITION MANUAL</span>
          <h1 className="privacy-title">TERMS & LEGAL POLICIES</h1>
          <p className="privacy-description">
            Last Updated: May 2026. At SHOP.CO, we hold the integrity of your shopping experience above all. 
            Review our detailed chapters on information privacy, purchases terms, cancellation refunds, 
            logistic shipping delivery timelines, and cookie consent telemetries.
          </p>
        </div>
        <div className="privacy-hero-bg-accent"></div>
      </section>

      {/* 2. Content Layout: Sidebar + 5 Sections */}
      <div className="page-container privacy-layout">
        {/* Left Floating Table of Contents */}
        <aside className="privacy-sidebar">
          <div className="privacy-toc">
            <h3>Chapters</h3>
            <ul>
              <li><a href="#privacy-policy" className="toc-link"><ChevronRight size={14} /> 1. Privacy Policy</a></li>
              <li><a href="#terms" className="toc-link"><ChevronRight size={14} /> 2. Terms & Conditions</a></li>
              <li><a href="#refund" className="toc-link"><ChevronRight size={14} /> 3. Refund Policy</a></li>
              <li><a href="#shipping" className="toc-link"><ChevronRight size={14} /> 4. Shipping Policy</a></li>
              <li><a href="#cookies" className="toc-link"><ChevronRight size={14} /> 5. Cookie Policy</a></li>
            </ul>
          </div>
        </aside>

        {/* Right Sections Stack */}
        <div className="privacy-content-stack">
          {/* Chapter 1: Privacy Policy - Slides left-to-right on reveal */}
          <section 
            id="privacy-policy" 
            className={`privacy-section-block ${isSection1Visible ? 'visible' : ''}`} 
            ref={section1Ref}
          >
            <div className="privacy-section-header">
              <div className="privacy-icon-box">
                <Shield size={22} />
              </div>
              <h2>1. Privacy Policy</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                We gather specific personal details when you interact with our e-commerce portal. This includes identity identifiers 
                (name, delivery address, contact email), transaction profiles (processed card records securely tokenized under PCI standards), 
                and browsing telemetry (device type, active shopping cart sessions).
              </p>
              <p>
                This data is acquired directly when you create a SHOP.CO account, make a purchase, or submit reviews, as well as 
                automatically through tracking pixels configured to enhance site caching speed and safety parameters.
              </p>
              <ul>
                <li><strong>Secure Tokenization:</strong> Credit card records are handled strictly by secure downstream payment nodes (Visa, Mastercard, PayPal) and are never stored on local servers.</li>
                <li><strong>Information Control:</strong> You retain the full entitlement to request export, correction, or absolute profile erasure ("Right to be Forgotten") at any time.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 2: Terms & Conditions - Slides right-to-left on reveal */}
          <section 
            id="terms" 
            className={`privacy-section-block ${isSection2Visible ? 'visible' : ''}`} 
            ref={section2Ref}
          >
            <div className="privacy-section-header">
              <div className="privacy-icon-box">
                <FileText size={22} />
              </div>
              <h2>2. Terms & Conditions</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                By accessing the SHOP.CO website and purchasing our custom deconstructed capsular garments, you agree to comply with and 
                be bound by our core utilization conditions. Our portals are restricted to legal purchasing entities of 16 years of age or older.
              </p>
              <p>
                All graphic elements, typographic collections, product layouts, and combed cotton capsule designs featured on the platform 
                represent intellectual property protected under global copyright frameworks.
              </p>
              <ul>
                <li><strong>Purchase Eligibility:</strong> You must supply authentic address metrics, full name elements, and active credit authorization credentials during checkout.</li>
                <li><strong>Silhouette Modifications:</strong> We reserve the right to modify capsule counts, pricing scales, or discontinue specific structural denim lines without prior notice.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 3: Refund Policy - Slides left-to-right on reveal */}
          <section 
            id="refund" 
            className={`privacy-section-block ${isSection3Visible ? 'visible' : ''}`} 
            ref={section3Ref}
          >
            <div className="privacy-section-header">
              <div className="privacy-icon-box">
                <RefreshCw size={22} />
              </div>
              <h2>3. Refund Policy</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                We want you to be 100% confident in your look. If a deconstructed tee, tipping polo, or stretch denim jeans does not 
                fit your style coordinates, we offer a **30-day hassle-free return and exchange guarantee**.
              </p>
              <p>
                Garments must be returned unworn, unwashed, carrying their original label tags, and packed inside original boxes. 
                Pre-paid shipping labels can be downloaded instantly inside your online order history panel.
              </p>
              <ul>
                <li><strong>Refund Channels:</strong> Refunds are credited back to the original funding payment channel (Mastercard, Apple Pay, PayPal, etc.) within 5-7 business days of warehouse inspection.</li>
                <li><strong>Exchanges:</strong> Size exchanges are processed immediately upon DHL drop-off scan, ensuring you receive your combed cotton replacement as quickly as possible.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 4: Shipping Policy - Slides right-to-left on reveal */}
          <section 
            id="shipping" 
            className={`privacy-section-block ${isSection4Visible ? 'visible' : ''}`} 
            ref={section4Ref}
          >
            <div className="privacy-section-header">
              <div className="privacy-icon-box">
                <Truck size={22} />
              </div>
              <h2>4. Shipping Policy</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                SHOP.CO ships globally to over 50 countries, utilizing premium courier services including FedEx Premium, DHL Express, 
                and USPS Priority Mail to guarantee that your capsule packages arrive secure and uncompromised.
              </p>
              <p>
                Standard domestic shipping is free for all orders over $100. Express shipping is flat-rate at $15 with a quick dispatch 
                interval of 1-2 business days domestically. International timeline estimates are calculated dynamically at checkout.
              </p>
              <ul>
                <li><strong>Tracking Integration:</strong> Once dispatch occurs, you will receive a tracked logistics link and SMS notifications detailing the live delivery trajectory of your package.</li>
                <li><strong>Duty Fees:</strong> International consignments may be subject to customs customs duty taxes, which must be fulfilled by the recipient upon arrival scan.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 5: Cookie Policy - Slides left-to-right on reveal */}
          <section 
            id="cookies" 
            className={`privacy-section-block ${isSection5Visible ? 'visible' : ''}`} 
            ref={section5Ref}
          >
            <div className="privacy-section-header">
              <div className="privacy-icon-box">
                <Database size={22} />
              </div>
              <h2>5. Cookie Policy</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                We use cookies and active session tracking tokens to compile analytics, persist your shopping cart items, 
                stabilize login sessions, and optimize the overall loading speed of deconstructed catalog grids.
              </p>
              <p>
                Cookies are tiny metadata files stored on your browser. By continuing to shop our combed cotton capsular catalog, 
                you consent to cookie usage according to the following configurations:
              </p>
              <ul>
                <li><strong>Essential Cookies:</strong> Critical for persisting selected garment size options, cart arrays, and secure checkout sessions.</li>
                <li><strong>Performance Cookies:</strong> Telemetry systems like Google Analytics that study user movement trends to refine portal features.</li>
                <li><strong>Opt-out Choices:</strong> You can completely configure your browser parameters to drop cookies, though this may disable standard cart storages.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* 3. Contact Help banner at bottom: Slides left to right */}
      <section className={`privacy-contact-section page-container ${isContactVisible ? 'visible' : ''}`} ref={contactRef}>
        <div className="privacy-contact-card">
          <div className="privacy-contact-text">
            <h2>LEGAL OR COMPLIANCE QUESTIONS?</h2>
            <p>If you have any questions regarding data encryption, GDPR/CCPA consumer rights, shipping custom terms, or would like to request profile deletion, email our legal team.</p>
          </div>
          <div className="privacy-contact-details">
            <a href="mailto:legal@shop.co" className="privacy-mail-btn">
              <Mail size={18} />
              <span>legal@shop.co</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
