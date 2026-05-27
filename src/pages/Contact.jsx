import React, { useRef, useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Compass, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  User,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  // Scroll reveal refs
  const heroRef = useRef(null);
  const formSectionRef = useRef(null);
  const showroomSectionRef = useRef(null);

  // Scroll reveal visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isShowroomVisible, setIsShowroomVisible] = useState(false);

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Personal Styling Advice');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  
  // Submit actions states
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Showroom locations explorer state
  const [selectedShowroom, setSelectedShowroom] = useState('NY');

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

    const formObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsFormVisible(true);
        formObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const showroomObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsShowroomVisible(true);
        showroomObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (formSectionRef.current) formObserver.observe(formSectionRef.current);
    if (showroomSectionRef.current) showroomObserver.observe(showroomSectionRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (formSectionRef.current) formObserver.unobserve(formSectionRef.current);
      if (showroomSectionRef.current) showroomObserver.unobserve(showroomSectionRef.current);
    };
  }, []);

  // Flags details database
  const showroomLocations = {
    NY: {
      city: 'New York',
      name: 'SoHo Flagship Store',
      address: '104 Greene Street, SoHo, New York, NY 10012',
      hours: 'Mon - Sat: 10:00 AM - 08:00 PM | Sun: 11:00 AM - 06:00 PM',
      phone: '+1 (212) 555-0144',
      leadStylist: 'Marcus Vance, Chief Designer',
      specialty: ' Streetwear Styling & Combed Cotton Capsules'
    },
    LN: {
      city: 'London',
      name: 'Covent Garden Capsule',
      address: '42 Monmouth Street, Seven Dials, London WC2H 9EP',
      hours: 'Mon - Sat: 10:00 AM - 07:00 PM | Sun: 12:00 PM - 06:00 PM',
      phone: '+44 20 7946 0958',
      leadStylist: 'Elena Rostova, Senior Stylist',
      specialty: ' Tailoring Transitions & Smart-Casual Outfits'
    },
    TK: {
      city: 'Tokyo',
      name: 'Shibuya Denim Hub',
      address: '5-12-1 Jingumae, Shibuya-ku, Tokyo 150-0001',
      hours: 'Mon - Sun: 11:00 AM - 08:00 PM',
      phone: '+81 3 5555 0192',
      leadStylist: 'Koji Tanaka, Master of Denim',
      specialty: ' Rigid Raw Indigo & Structural Stretch denim fits'
    }
  };

  // Submit Contact Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setShowToast(true);
      
      // Reset inputs
      setName('');
      setEmail('');
      setOrderId('');
      setMessage('');
      setSubject('Personal Styling Advice');

      setTimeout(() => setShowToast(false), 4500);
    }, 1800);
  };

  return (
    <div className="contact-page">
      {/* 1. HERO HEADER: Slides left to right, fades in */}
      <section className={`contact-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="contact-hero-content">
          <span className="contact-subtitle">STYLING COALITION COURIER</span>
          <h1 className="contact-title">CONTACT SHOP.CO</h1>
          <p className="contact-description">
            Have questions regarding combed fabric weights, custom drop-shoulder fitment guidelines, 
            or want to request personal showroom styling advice? Pitch our creative styling crew or 
            legal resolution team instantly.
          </p>
        </div>
      </section>

      {/* Floating success toast upon sending messages */}
      {showToast && (
        <div className="contact-success-toast">
          <CheckCircle size={18} />
          <span>Message transmitted! We will reach out within 2 hours.</span>
        </div>
      )}

      {/* 2. SPLIT LAYOUT: Form + Contact Info */}
      <section 
        className={`contact-form-section page-container ${isFormVisible ? 'visible' : ''}`} 
        ref={formSectionRef}
      >
        <div className="contact-split-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-column">
            <div className="contact-info-cards-stack">
              {/* Card 1: Styling Hotline */}
              <div className="contact-info-card">
                <div className="info-card-icon-box">
                  <Phone size={20} />
                </div>
                <div className="info-card-content">
                  <h4>Styling Hotline</h4>
                  <p className="info-value">+1 (800) 555-0199</p>
                  <p className="info-subtext">Call 24/7 for order cancellations or delivery updates.</p>
                </div>
              </div>

              {/* Card 2: Resolution Mail */}
              <div className="contact-info-card">
                <div className="info-card-icon-box">
                  <Mail size={20} />
                </div>
                <div className="info-card-content">
                  <h4>Resolution Desk</h4>
                  <p className="info-value">support@shop.co</p>
                  <p className="info-subtext">Email us for general issues. Responds in under 2 hours.</p>
                </div>
              </div>

              {/* Card 3: Flagship Showrooms */}
              <div className="contact-info-card">
                <div className="info-card-icon-box">
                  <Globe size={20} />
                </div>
                <div className="info-card-content">
                  <h4>Global Showrooms</h4>
                  <p className="info-value">New York • London • Tokyo</p>
                  <p className="info-subtext">Book in-person sizing assessments in our styling hubs.</p>
                </div>
              </div>
            </div>

            {/* Reassurance Badge */}
            <div className="contact-reassurance-box">
              <ShieldCheck size={18} className="reassurance-icon" />
              <span>SHOP.CO secure SSL tokenization guarantees complete profile privacy and GDPR/CCPA data export options.</span>
            </div>
          </div>

          {/* Right Column: Submission Form Card */}
          <div className="contact-form-card">
            <div className="form-card-header">
              <h3>TRANSMIT AN INQUIRY</h3>
              <p>Type your message below and receive custom styling or logistics feedback.</p>
            </div>

            <form onSubmit={handleSubmitForm} className="contact-inputs-form">
              <div className="contact-input-row">
                <div className="contact-input-group">
                  <label className="input-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact-field-input"
                  />
                </div>
                
                <div className="contact-input-group">
                  <label className="input-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="contact-field-input"
                  />
                </div>
              </div>

              <div className="contact-input-row">
                <div className="contact-input-group">
                  <label className="input-label">Inquiry Subject *</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="contact-select-field"
                  >
                    <option value="Personal Styling Advice">Personal Styling Advice</option>
                    <option value="Active Order Assistance">Active Order Assistance</option>
                    <option value="Press & Partnerships">Press & Partnerships</option>
                    <option value="General Inquiry">Other General Inquiry</option>
                  </select>
                </div>

                <div className="contact-input-group">
                  <label className="input-label">Order ID (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="ORD-73104" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="contact-field-input"
                  />
                </div>
              </div>

              <div className="contact-input-group">
                <label className="input-label">Message *</label>
                <textarea 
                  required 
                  rows="6"
                  placeholder="Describe your styling sizing questions or packaging logistics requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="contact-textarea-field"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="contact-submit-btn"
              >
                {isSending ? (
                  <>
                    <div className="sending-spinner"></div>
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FLAGSHIP SHOWROOM EXPLORER: Staggered reveal */}
      <section 
        className={`contact-showroom-section page-container ${isShowroomVisible ? 'visible' : ''}`} 
        ref={showroomSectionRef}
      >
        <div className="showroom-title-block">
          <span className="subtitle">EXPERIENCE OUR SILHOUETTES</span>
          <h2>FLAGSHIP SHOWROOMS</h2>
          <p>Click on any styling flagship location to inspect showroom details, specific specialties, and active opening hours.</p>
        </div>

        {/* Tab Cards row */}
        <div className="showroom-cards-grid">
          {Object.keys(showroomLocations).map((key) => {
            const loc = showroomLocations[key];
            const isSelected = selectedShowroom === key;

            return (
              <div 
                key={key} 
                onClick={() => setSelectedShowroom(key)}
                className={`showroom-tab-card ${isSelected ? 'active' : ''}`}
              >
                <div className="showroom-card-header">
                  <MapPin size={20} className="map-pin-icon" />
                  <h3>{loc.city}</h3>
                </div>
                <h4 className="showroom-building-name">{loc.name}</h4>
                <p className="showroom-address-brief">{loc.address.split(',')[0]}, {loc.address.split(',')[1]}</p>
                
                <span className="card-explore-pill">
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Display Panel for Selected Showroom */}
        <div className="showroom-explorer-panel">
          <div className="explorer-glow-overlay"></div>
          <div className="explorer-split">
            {/* Details panel */}
            <div className="explorer-details-col">
              <span className="explorer-tag">FLAGSHIP DIRECTORY</span>
              <h3 className="explorer-city-title">{showroomLocations[selectedShowroom].city} Hub</h3>
              <h4 className="explorer-building">{showroomLocations[selectedShowroom].name}</h4>
              
              <div className="explorer-meta-deck">
                <div className="explorer-meta-row">
                  <MapPin size={18} className="meta-icon" />
                  <div>
                    <h5>Address</h5>
                    <p>{showroomLocations[selectedShowroom].address}</p>
                  </div>
                </div>

                <div className="explorer-meta-row">
                  <Clock size={18} className="meta-icon" />
                  <div>
                    <h5>Operating Hours</h5>
                    <p>{showroomLocations[selectedShowroom].hours}</p>
                  </div>
                </div>

                <div className="explorer-meta-row">
                  <Phone size={18} className="meta-icon" />
                  <div>
                    <h5>Direct Hotline</h5>
                    <p>{showroomLocations[selectedShowroom].phone}</p>
                  </div>
                </div>

                <div className="explorer-meta-row">
                  <User size={18} className="meta-icon" />
                  <div>
                    <h5>Lead Stylist & Director</h5>
                    <p><strong>{showroomLocations[selectedShowroom].leadStylist}</strong></p>
                    <p className="specialty-label">Specialty: {showroomLocations[selectedShowroom].specialty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Graphic Mock panel */}
            <div className="explorer-map-graphic-col">
              <div className="map-grid-graphic">
                <div className="map-radar-ring"></div>
                <div className="map-radar-core"></div>
                <div className="map-showroom-tag">
                  <Compass size={16} />
                  <span>SHOP.CO Flagship Identified</span>
                </div>
                
                <div className="visual-pin-location text-label-pin">
                  {showroomLocations[selectedShowroom].name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate guarantee bar */}
      <section className="contact-guarantee-banner page-container">
        <div className="contact-guarantee-card">
          <div className="guarantee-block">
            <h4>2-HOUR RESPONSIVENESS</h4>
            <p>Our sizing support crew responds to email submissions inside 2 business hours.</p>
          </div>
          <div className="guarantee-vert-sep"></div>
          <div className="guarantee-block">
            <h4>FLAGSHIP TRY-ON SESSIONS</h4>
            <p>Book deconstructed garment fittings with dedicated styling directors in our hubs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
