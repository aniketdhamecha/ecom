import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Search, HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Faq = () => {
  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const accordionRef = useRef(null);
  const contactRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [isAccordionVisible, setIsAccordionVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  // Accordion state: store index of expanded question
  const [expandedIndex, setExpandedIndex] = useState(null);
  // Active category filter state
  const [activeCategory, setActiveCategory] = useState('All');
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

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

    const categoriesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsCategoriesVisible(true);
        categoriesObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const accordionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsAccordionVisible(true);
        accordionObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const contactObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsContactVisible(true);
        contactObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (categoriesRef.current) categoriesObserver.observe(categoriesRef.current);
    if (accordionRef.current) accordionObserver.observe(accordionRef.current);
    if (contactRef.current) contactObserver.observe(contactRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (categoriesRef.current) categoriesObserver.unobserve(categoriesRef.current);
      if (accordionRef.current) accordionObserver.unobserve(accordionRef.current);
      if (contactRef.current) contactObserver.unobserve(contactRef.current);
    };
  }, []);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqData = [
    {
      category: 'Orders',
      question: 'How do I track my SHOP.CO order?',
      answer: 'Once your order is shipped, we will instantly send you an email confirmation containing a tracking number and a direct tracking link. You can also view live shipment details by logging into your SHOP.CO Account and selecting the "Manage Deliveries" tab.'
    },
    {
      category: 'Orders',
      question: 'Can I cancel or modify my order after placing it?',
      answer: 'We process orders extremely quickly to ensure rapid delivery. You can modify or cancel your order within 30 minutes of placing it by clicking the cancel link in your order confirmation email or calling customer support. After 30 minutes, the order is locked for dispatch and must be processed as a standard return.'
    },
    {
      category: 'Shipping',
      question: 'What are your global shipping rates and timelines?',
      answer: 'We ship to over 50 countries! Standard domestic shipping is free for all orders above $100 and takes 3-5 business days. Express shipping is flat-rate at $15 and takes 1-2 business days. International shipping fees vary by location and are calculated dynamically at checkout, usually taking 7-14 business days.'
    },
    {
      category: 'Returns',
      question: 'What is your return and exchange policy?',
      answer: 'We want you to be 100% confident in your style! We offer a 30-day hassle-free return and exchange policy. Garments must be unworn, unwashed, and carry original labels. Return shipping labels are fully prepaid and can be downloaded instantly from our online returns console.'
    },
    {
      category: 'Sizing',
      question: 'How do I choose the correct garment size?',
      answer: 'Every product page features a detailed fit guide and size table. If you are between sizes, we generally recommend choosing the larger size for a relaxed, structural streetwear aesthetic, or your standard size for tailored styles. Our dynamic combed cotton is pre-shrunk, so it will retain its size after washing.'
    },
    {
      category: 'Payments',
      question: 'What payment options do you support?',
      answer: 'We support all major payment processors including Visa, Mastercard, PayPal, Apple Pay, Google Pay, and Klarna (pay in 3 interest-free installments). All payments are encrypted and secured using advanced SSL and tokenization systems.'
    },
    {
      category: 'General',
      question: 'Are your materials ethically and sustainably sourced?',
      answer: 'Absolutely. We believe in sustainable styling. Over 80% of our contemporary apparel is crafted using organic combed cotton, recycled polyester blends, and dynamic eco-denim. We work only with certified fair-labor facilities.'
    }
  ];

  // Filter FAQs based on active category and search query
  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Orders', 'Shipping', 'Returns', 'Sizing', 'Payments', 'General'];

  return (
    <div className="faq-page">
      {/* 1. Hero Section: Slide-in text from left, slide-in search bar from right */}
      <section className={`faq-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="faq-hero-text">
          <span className="faq-subtitle">FAQ HELP CONSOLE</span>
          <h1 className="faq-title">HOW CAN WE HELPMATE YOU?</h1>
          <p className="faq-description">
            Search our comprehensive database for answers to shipping, order modifications, custom sizing fitment, 
            refund guidelines, and structural fabric design materials.
          </p>
        </div>

        <div className="faq-hero-search-box">
          <div className="faq-search-wrapper">
            <Search size={22} className="faq-search-icon" />
            <input 
              type="text" 
              placeholder="Search questions or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
          </div>
        </div>
      </section>

      {/* 2. Categories Filters: Fades in with scale */}
      <section className={`faq-categories-section ${isCategoriesVisible ? 'visible' : ''}`} ref={categoriesRef}>
        <div className="page-container">
          <div className="faq-categories-row">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedIndex(null); // collapse accordions on category switch
                }}
                className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Accordion Deck: Staggered slide up & fade-in */}
      <section className={`faq-accordion-section page-container ${isAccordionVisible ? 'visible' : ''}`} ref={accordionRef}>
        {filteredFaqs.length > 0 ? (
          <div className="faq-accordion-container">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <button 
                    className="faq-question-btn"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-icon-holder">
                      <ChevronDown size={20} className="faq-chevron-icon" />
                    </span>
                  </button>
                  
                  {/* Grid-based high-performance transition drawer */}
                  <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
                    <div className="faq-answer-content">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="faq-no-results">
            <HelpCircle size={48} className="faq-no-results-icon" />
            <h3>No results found for "{searchQuery}"</h3>
            <p>Try searching with simpler terms or browse under the categories above.</p>
          </div>
        )}
      </section>

      {/* 4. Contact panel at bottom: Slides left to right */}
      <section className={`faq-contact-section page-container ${isContactVisible ? 'visible' : ''}`} ref={contactRef}>
        <div className="faq-contact-card">
          <div className="faq-contact-text-col">
            <h2>STILL HAVE QUESTIONS?</h2>
            <p>If you couldn't find the answers in our help console, please contact our support team. We're available 24/7.</p>
          </div>
          <div className="faq-contact-options">
            <a href="mailto:support@shop.co" className="faq-contact-btn">
              <Mail size={18} />
              <span>Email Support</span>
            </a>
            <a href="tel:+18005550199" className="faq-contact-btn outline">
              <Phone size={18} />
              <span>Call +1 (800) 555-0199</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
