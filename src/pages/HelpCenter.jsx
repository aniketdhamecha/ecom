import React, { useRef, useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Truck, 
  RefreshCw, 
  Ruler, 
  CreditCard, 
  HelpCircle,
  Send,
  X,
  Phone,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  // Scroll reveal refs
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const chatRef = useRef(null);

  // Scroll reveal visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [likesCount, setLikesCount] = useState({}); // articleId -> likes count
  
  // Live Chat messages state
  const [messages, setMessages] = useState([
    { 
      sender: 'agent', 
      text: "Hello! Welcome to the SHOP.CO Help & Live Support Desk. I'm Sophia, your virtual fashion assistant. How can I helpmate your style experience today?" 
    }
  ]);

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

    const chatObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsChatVisible(true);
        chatObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (categoriesRef.current) categoriesObserver.observe(categoriesRef.current);
    if (chatRef.current) chatObserver.observe(chatRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (categoriesRef.current) categoriesObserver.unobserve(categoriesRef.current);
      if (chatRef.current) chatObserver.unobserve(chatRef.current);
    };
  }, []);

  // Quick Help articles database
  const helpArticles = [
    {
      id: 'art-1',
      category: 'Shipping',
      title: 'How can I track my active shipment?',
      desc: 'DHL Express, USPS, and FedEx courier parcels carry live tracking. Once packed, your tracking number is issued via SMS/Email and logged inside your Order History panel.',
      link: '/orders'
    },
    {
      id: 'art-2',
      category: 'Returns',
      title: 'What is your 30-day refund policy?',
      desc: 'We support hassle-free returns on all combed-cotton apparel, tipped athletic polos, and rigid stretch denim lines. Products must be unwashed, carrying raw label tags.',
      link: '/privacy'
    },
    {
      id: 'art-3',
      category: 'Sizing',
      title: 'Sizing FIT guidelines for oversized cuts',
      desc: 'For broad dropped-shoulder fits, we suggest selecting your normal baseline size. If you prefer a tailored outline, select one scale size down.',
      link: '/faq'
    },
    {
      id: 'art-4',
      category: 'Payments',
      title: 'Supported payment networks & codes',
      desc: 'We accept Apple Pay, PayPal, Google Pay, and major Visa/Mastercard credit accounts. Enter Coupon DISCOUNT20 during checkout to apply a simulated 20% order reduction.',
      link: '/cart'
    },
    {
      id: 'art-5',
      category: 'Account',
      title: 'Managing addresses & profile files',
      desc: 'Access your account profile via your User portal to amend contact details, export telemetry files, request secure erasure, or verify your silver tier rewards points.',
      link: '/orders'
    },
    {
      id: 'art-6',
      category: 'Returns',
      title: 'Size exchange logistics drop locations',
      desc: 'Generate pre-paid labels inside the online console. Bring the parcel to your nearest local DHL drop collection depot. Size swaps launch instantly upon terminal scan.',
      link: '/orders'
    }
  ];

  // Auto scroll messages to bottom of chat
  const chatBottomRef = useRef(null);
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Handle support BOT replies based on user selection or keywords
  const triggerBotReply = (userQuery) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botText = '';
      const query = userQuery.toLowerCase();

      // Smart Bot response matcher
      if (query.includes('track') || query.includes('ship') || query.includes('delivery')) {
        botText = "You can track active shipments dynamically inside your account! Go to our Order History page, find your package card, and click 'Track Shipment' to reveal live FedEx/DHL transit timelines.";
      } else if (query.includes('size') || query.includes('fit') || query.includes('shoulder')) {
        botText = "Our streetwear catalog uses broad dropped-shoulder tailoring. We general suggest ordering your standard size for a premium relaxed drape. Check out our FIT chart inside the Sizing Help category below.";
      } else if (query.includes('refund') || query.includes('return') || query.includes('cancel')) {
        botText = "We offer a 30-day return policy. Download pre-paid labels inside your portal. Once DHL scans the barcode, your size exchange or original card refund will be processed immediately!";
      } else if (query.includes('coupon') || query.includes('promo') || query.includes('discount')) {
        botText = "Yes! You can use active promo code **DISCOUNT20** in your shopping cart during checkout to apply an instant 20% discount on all combed staples.";
      } else if (query.includes('cotton') || query.includes('denim') || query.includes('garment')) {
        botText = "Our contemporary collections are built using organic long-staple Combed Cotton jersey and heavy structural stretch denim. They are pre-shrunk and built to resist standard pilling and wash wear.";
      } else {
        botText = "Thank you for message! I have logged your request. If you need urgent live support, feel free to drop an email to support@shop.co or speak to an agent at +1 (800) 555-0199.";
      }

      setMessages(prev => [...prev, { sender: 'agent', text: botText }]);
    }, 1200);
  };

  // Submit custom user text query
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    triggerBotReply(userText);
  };

  // Click quick topic options
  const handleQuickTopicClick = (topicText) => {
    setMessages(prev => [...prev, { sender: 'user', text: topicText }]);
    triggerBotReply(topicText);
  };

  // Upvote helpful guide articles
  const handleLikeArticle = (id) => {
    setLikesCount(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Filter articles list based on search bar
  const filteredArticles = helpArticles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-center-page">
      {/* 1. HERO HEADER: Left to Right Slide reveal + Opacity */}
      <section className={`help-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="help-hero-content">
          <span className="help-subtitle">HELP & RESOLUTION CENTRE</span>
          <h1 className="help-title">HOW CAN WE HELPMATE YOU TODAY?</h1>
          <p className="help-description">
            Search our styled directories for sizing tables, express packaging logs, 
            and legal return frameworks. Or activate a simulated Live Chat session with 
            our styling chatbot helper.
          </p>
          
          <div className="help-hero-search-box">
            <Search size={20} className="help-search-icon" />
            <input 
              type="text" 
              placeholder="Search help articles (e.g. shipping, refund, sizing)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="help-search-input"
            />
          </div>
        </div>
      </section>

      {/* 2. LIVE CHAT PANEL: Slides left to right when reached */}
      <section className={`help-chat-section page-container ${isChatVisible ? 'visible' : ''}`} ref={chatRef}>
        <div className="chat-console-wrapper">
          {/* Header Panel */}
          <div className="chat-console-header">
            <div className="chat-agent-info">
              <div className="agent-status-dot"></div>
              <div className="agent-avatar-icon">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="agent-name">Sophia Bot</h3>
                <span className="agent-title">SHOP.CO Support Assistant</span>
              </div>
            </div>
            <div className="chat-seal-badge">
              <ShieldCheck size={16} />
              <span>SECURE DATA COMPLIANT</span>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="chat-messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-row ${msg.sender}`}>
                {msg.sender === 'agent' && (
                  <div className="agent-chat-avatar">
                    <User size={14} />
                  </div>
                )}
                <div className={`chat-message-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Animated Typing indicators */}
            {isTyping && (
              <div className="chat-bubble-row agent">
                <div className="agent-chat-avatar">
                  <User size={14} />
                </div>
                <div className="chat-message-bubble agent typing-bubble">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={chatBottomRef}></div>
          </div>

          {/* Quick-start Topic Triggers */}
          <div className="chat-quick-triggers">
            <span className="triggers-label">SUGGESTED HELP TOPICS:</span>
            <div className="triggers-row">
              <button onClick={() => handleQuickTopicClick("Track my active shipment")} className="trigger-pill">
                <Truck size={12} />
                <span>Track Shipment</span>
              </button>
              <button onClick={() => handleQuickTopicClick("Sizing guidelines request")} className="trigger-pill">
                <Ruler size={12} />
                <span>Garment Sizing FIT</span>
              </button>
              <button onClick={() => handleQuickTopicClick("Cancel/Return custom item")} className="trigger-pill">
                <RefreshCw size={12} />
                <span>Refund returns timeline</span>
              </button>
              <button onClick={() => handleQuickTopicClick("Active coupons promo code")} className="trigger-pill">
                <Tag size={12} />
                <span>Promo Discount Coupon</span>
              </button>
            </div>
          </div>

          {/* Chat text input box */}
          <form onSubmit={handleSendMessage} className="chat-input-bar">
            <input 
              type="text"
              placeholder="Ask a style or order question (e.g. refund, stretch denim)..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="chat-text-input"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* 3. HELP ARTICLES GRID: Staggered left-to-right entrance */}
      <section className={`help-grid-section page-container ${isCategoriesVisible ? 'visible' : ''}`} ref={categoriesRef}>
        <div className="help-section-title-row">
          <span className="subtitle">STYLED DIRECTORIES</span>
          <h2>KNOWLEDGE DIRECTORY</h2>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="help-grid">
            {filteredArticles.map((art) => (
              <div key={art.id} className="help-article-card">
                <div className="card-header-badge">
                  {art.category === 'Shipping' && <Truck size={14} />}
                  {art.category === 'Returns' && <RefreshCw size={14} />}
                  {art.category === 'Sizing' && <Ruler size={14} />}
                  {art.category === 'Payments' && <CreditCard size={14} />}
                  {art.category === 'Account' && <HelpCircle size={14} />}
                  <span>{art.category}</span>
                </div>
                
                <h3 className="card-title">{art.title}</h3>
                <p className="card-desc">{art.desc}</p>
                
                <div className="card-footer-buttons">
                  <button 
                    onClick={() => handleLikeArticle(art.id)}
                    className={`card-upvote-btn ${likesCount[art.id] ? 'upvoted' : ''}`}
                  >
                    <span>👍 Helpful</span>
                    {likesCount[art.id] > 0 && <span className="likes-pill">{likesCount[art.id]}</span>}
                  </button>
                  
                  <Link to={art.link} className="card-navigate-link">
                    <span>Explore Page</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="help-empty-state">
            <HelpCircle size={44} className="empty-help-icon" />
            <h3>No Help Articles Found</h3>
            <p>We couldn't locate guides fitting "{searchQuery}". Type a different styling keyword or query our Live Chat helper above.</p>
          </div>
        )}
      </section>

      {/* 4. TRIAGE CONTACT INFO BANNER */}
      <section className="help-contact-banner page-container">
        <div className="triage-card">
          <div className="triage-col">
            <Phone size={24} className="triage-icon" />
            <div>
              <h4>Call Customer Support</h4>
              <p>Speak to our styling agents directly at **+1 (800) 555-0199**. (Available 24/7)</p>
            </div>
          </div>
          <div className="triage-separator"></div>
          <div className="triage-col">
            <Mail size={24} className="triage-icon" />
            <div>
              <h4>Email Resolution Desk</h4>
              <p>File support emails to **support@shop.co**. Average response under 2 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
