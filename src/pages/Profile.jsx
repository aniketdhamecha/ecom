import React, { useRef, useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Lock, 
  Award, 
  Camera, 
  CheckCircle, 
  ArrowRight,
  ShieldAlert,
  Save,
  Plus,
  Trash2,
  LockKeyhole,
  FileDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Scroll reveal refs
  const heroRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  // Scroll reveal visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Active tab selection
  const [activeTab, setActiveTab] = useState('details');

  // Form input states
  const [name, setName] = useState('Alex M. Sterling');
  const [email, setEmail] = useState('alex.sterling@example.com');
  const [phone, setPhone] = useState('+1 (212) 555-0144');
  const [gender, setGender] = useState('Prefer Not to Say');
  const [sizePreference, setSizePreference] = useState('Large');
  const [pantSize, setPantSize] = useState('32x30');

  // Loading & Toast states
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [exportLoading, setExportLoading] = useState(false);

  // Virtual addresses database state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      type: 'Default Shipping',
      street: '104 Urban Loft Dr, Apartment 4B',
      city: 'New York, NY 10001',
      recipient: 'Alex Sterling',
      phone: '+1 (212) 555-0144'
    },
    {
      id: 'addr-2',
      type: 'Billing Address',
      street: '394 Pinecrest Circle',
      city: 'Austin, TX 78701',
      recipient: 'Alex Sterling',
      phone: '+1 (512) 555-0199'
    }
  ]);

  // Virtual credit cards database state
  const [cards, setCards] = useState([
    {
      id: 'card-1',
      brand: 'Mastercard',
      ending: '4821',
      expiry: '08/29',
      holder: 'ALEX STERLING',
      isDefault: true
    },
    {
      id: 'card-2',
      brand: 'Visa',
      ending: '9088',
      expiry: '12/28',
      holder: 'ALEX STERLING',
      isDefault: false
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

    const sidebarObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSidebarVisible(true);
        sidebarObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const contentObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsContentVisible(true);
        contentObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (sidebarRef.current) sidebarObserver.observe(sidebarRef.current);
    if (contentRef.current) contentObserver.observe(contentRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (sidebarRef.current) sidebarObserver.unobserve(sidebarRef.current);
      if (contentRef.current) contentObserver.unobserve(contentRef.current);
    };
  }, []);

  // Save personal details form handler
  const handleSaveDetails = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setToastMsg('Profile parameters saved securely!');
      setShowToast(true);
      
      setTimeout(() => setShowToast(false), 3500);
    }, 1500);
  };

  // Mock GDPR data exporter
  const handleExportData = () => {
    setExportLoading(true);
    setTimeout(() => {
      setExportLoading(false);
      setToastMsg('GDPR data exported! file_alex_sterling.json downloaded.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }, 1800);
  };

  // Mock delete address
  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    setToastMsg('Shipping address removed successfully.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Mock delete card
  const handleDeleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
    setToastMsg('Payment method removed.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="profile-page">
      {/* 1. HERO HEADER: Left to Right Slide reveal + Opacity */}
      <section className={`profile-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="profile-hero-content">
          <div className="profile-avatar-row">
            <div className="avatar-holder-box">
              <User size={38} className="avatar-icon" />
              <button className="avatar-camera-btn" aria-label="Upload Avatar">
                <Camera size={14} />
              </button>
            </div>
            
            <div className="profile-hero-text">
              <div className="hero-status-row">
                <span className="profile-subtitle">MEMBER PORTAL</span>
                <span className="loyalty-badge-pill">
                  <Award size={12} style={{ marginRight: '4px' }} /> Silver Tier
                </span>
              </div>
              <h1 className="profile-title">{name}</h1>
              <p className="profile-description">
                Joined: August 2024 • Member ID: #SHOP-90421 • Sizing: **{sizePreference} / {pantSize}**
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating success toast upon sending updates */}
      {showToast && (
        <div className="profile-success-toast">
          <CheckCircle size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 2. SPLIT LAYOUT: Sidebar Menu + Workspace panels */}
      <div className="page-container profile-layout">
        {/* Left Column: Sidebar Menu - Slides left to right */}
        <aside className={`profile-sidebar ${isSidebarVisible ? 'visible' : ''}`} ref={sidebarRef}>
          <div className="profile-menu">
            <h3>Account Settings</h3>
            <ul>
              <li>
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`profile-menu-btn ${activeTab === 'details' ? 'active' : ''}`}
                >
                  <User size={16} />
                  <span>Personal Details</span>
                  <ChevronRightDummy />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`profile-menu-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                >
                  <MapPin size={16} />
                  <span>Shipping Addresses</span>
                  <ChevronRightDummy />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('payments')}
                  className={`profile-menu-btn ${activeTab === 'payments' ? 'active' : ''}`}
                >
                  <CreditCard size={16} />
                  <span>Payment Methods</span>
                  <ChevronRightDummy />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`profile-menu-btn ${activeTab === 'security' ? 'active' : ''}`}
                >
                  <Lock size={16} />
                  <span>Security & GDPR</span>
                  <ChevronRightDummy />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('loyalty')}
                  className={`profile-menu-btn ${activeTab === 'loyalty' ? 'active' : ''}`}
                >
                  <Award size={16} />
                  <span>Loyalty & Rewards</span>
                  <ChevronRightDummy />
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Column: Dynamic workspace panels - Slides right to left */}
        <main className={`profile-workspace ${isContentVisible ? 'visible' : ''}`} ref={contentRef}>
          
          {/* Panel A: Personal Details */}
          {activeTab === 'details' && (
            <div className="workspace-panel-card animate-workspace-tab">
              <div className="panel-header">
                <h3>Personal Details</h3>
                <p>Verify your details, select default fit sizing parameters, and manage checkout details.</p>
              </div>

              <form onSubmit={handleSaveDetails} className="profile-inputs-form">
                <div className="profile-inputs-grid">
                  <div className="profile-input-group">
                    <label className="input-label">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="profile-field-input"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label className="input-label">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="profile-field-input"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label className="input-label">Telephone hotline *</label>
                    <input 
                      type="text" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="profile-field-input"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label className="input-label">Gender Preference</label>
                    <select 
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)}
                      className="profile-select-field"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer Not to Say">Prefer Not to Say</option>
                    </select>
                  </div>

                  {/* Sizing presets coordinates */}
                  <div className="profile-input-group">
                    <label className="input-label">Tee/Outerwear Size FIT</label>
                    <select 
                      value={sizePreference} 
                      onChange={(e) => setSizePreference(e.target.value)}
                      className="profile-select-field"
                    >
                      <option value="Small">Small Fit</option>
                      <option value="Medium">Medium Fit</option>
                      <option value="Large">Large Street Fit (Oversized)</option>
                      <option value="X-Large">X-Large Street Fit</option>
                    </select>
                  </div>

                  <div className="profile-input-group">
                    <label className="input-label">Jeans Waist Sizing</label>
                    <select 
                      value={pantSize} 
                      onChange={(e) => setPantSize(e.target.value)}
                      className="profile-select-field"
                    >
                      <option value="30x30">30x30 Slim</option>
                      <option value="32x30">32x30 Standard</option>
                      <option value="34x32">34x32 Rigid Street</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="profile-submit-btn"
                >
                  {isSaving ? (
                    <>
                      <div className="profile-spinner"></div>
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Updates</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Panel B: Shipping Addresses */}
          {activeTab === 'addresses' && (
            <div className="workspace-panel-card animate-workspace-tab">
              <div className="panel-header">
                <h3>Shipping Addresses</h3>
                <p>Register multiple shipping locations. Default settings apply to standard checkout processes.</p>
              </div>

              <div className="addresses-grid">
                {addresses.map((addr) => (
                  <div key={addr.id} className="address-display-card">
                    <div className="address-card-header">
                      <span className="address-badge">{addr.type}</span>
                      <button 
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="delete-address-btn"
                        aria-label="Delete address"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="address-card-body">
                      <h4>{addr.recipient}</h4>
                      <p className="address-street">{addr.street}</p>
                      <p className="address-city">{addr.city}</p>
                      <p className="address-phone"><Phone size={12} style={{ marginRight: '6px' }} /> {addr.phone}</p>
                    </div>
                  </div>
                ))}

                {/* Add new address slot card */}
                <button className="add-address-card-slot">
                  <Plus size={24} />
                  <span>Add New Address</span>
                </button>
              </div>
            </div>
          )}

          {/* Panel C: Payment Methods */}
          {activeTab === 'payments' && (
            <div className="workspace-panel-card animate-workspace-tab">
              <div className="panel-header">
                <h3>Payment Methods</h3>
                <p>Manage tokenized card arrays. SHOP.CO encryption standards safeguard billing telemetry.</p>
              </div>

              <div className="cards-grid">
                {cards.map((card) => (
                  <div key={card.id} className="payment-display-card">
                    <div className="card-brand-row">
                      <span className="brand-logo-txt">{card.brand}</span>
                      {card.isDefault && <span className="default-badge">DEFAULT</span>}
                    </div>
                    
                    <div className="card-number-row">
                      <span>••••</span>
                      <span>••••</span>
                      <span>••••</span>
                      <span className="card-last-digits">{card.ending}</span>
                    </div>

                    <div className="card-details-row">
                      <div>
                        <span className="lbl">CARD HOLDER</span>
                        <span className="val">{card.holder}</span>
                      </div>
                      <div>
                        <span className="lbl">EXPIRES</span>
                        <span className="val">{card.expiry}</span>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteCard(card.id)}
                        className="delete-card-inline-btn"
                        aria-label="Remove card"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add payment card slot */}
                <button className="add-card-slot">
                  <CreditCard size={24} />
                  <span>Register New Card</span>
                </button>
              </div>
            </div>
          )}

          {/* Panel D: Security Settings & GDPR */}
          {activeTab === 'security' && (
            <div className="workspace-panel-card animate-workspace-tab">
              <div className="panel-header">
                <h3>Security & GDPR Controls</h3>
                <p>Adjust account passwords, telemetry cookies preferences, or exercise CCPA right-to-forget parameters.</p>
              </div>

              <div className="security-subsections-stack">
                {/* Reset Password Form */}
                <div className="security-block-segment">
                  <h4 className="segment-title"><LockKeyhole size={18} /> Modify Account Password</h4>
                  <form onSubmit={(e) => { e.preventDefault(); setToastMsg('Password revised successfully!'); setShowToast(true); setTimeout(() => setShowToast(false), 3500); }} className="security-inline-form">
                    <div className="profile-input-group">
                      <label className="input-label">Current Password</label>
                      <input type="password" required className="profile-field-input" placeholder="••••••••" />
                    </div>
                    <div className="profile-input-group">
                      <label className="input-label">New Password</label>
                      <input type="password" required className="profile-field-input" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="security-action-btn">Revise Password</button>
                  </form>
                </div>

                {/* GDPR Options */}
                <div className="security-block-segment gdpr-box">
                  <h4 className="segment-title"><ShieldAlert size={18} /> Consumer Telemetry & Privacy Laws</h4>
                  <p className="gdpr-explanation">
                    According to General Data Protection Regulations (GDPR) and California Consumer Privacy Act (CCPA) standards, 
                    you are entitled to export stored purchase data or demand absolute profile database erasure.
                  </p>
                  
                  <div className="gdpr-action-row">
                    <button 
                      onClick={handleExportData} 
                      disabled={exportLoading}
                      className="gdpr-export-btn"
                    >
                      <FileDown size={16} />
                      <span>{exportLoading ? 'Exporting...' : 'Export Telemetry File'}</span>
                    </button>

                    <button 
                      onClick={() => { if(window.confirm('WARNING: Demanding absolute erasure will permanently drop all rewards points, order history lists, and addresses. Do you wish to continue?')) { alert('Secure erasure command filed. Your profile will be deleted in 12 hours.'); } }}
                      className="gdpr-delete-account-btn"
                    >
                      <Trash2 size={16} />
                      <span>Delete My Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel E: Loyalty & Rewards points */}
          {activeTab === 'loyalty' && (
            <div className="workspace-panel-card animate-workspace-tab">
              <div className="panel-header">
                <h3>Loyalty Tier Dashboard</h3>
                <p>Accumulate combed fashion points on deconstructed purchases. Unlock limited capsule collections.</p>
              </div>

              <div className="loyalty-split-layout">
                {/* Holographic Card panel */}
                <div className="virtual-card-container">
                  <div className="holographic-card">
                    <div className="holographic-glare"></div>
                    <div className="holo-top">
                      <span className="card-brand">SHOP.CO CAPSULE</span>
                      <span className="card-vip-label">VIP PASS</span>
                    </div>
                    
                    <div className="holo-middle">
                      <Award size={36} className="medal-icon" />
                      <div>
                        <h4 className="holder-name">{name}</h4>
                        <span className="tier-name">SILVER CARD LEVEL</span>
                      </div>
                    </div>

                    <div className="holo-bottom">
                      <span className="points-balance">250 POINTS</span>
                      <span className="card-id">#SHOP-90421</span>
                    </div>
                  </div>
                </div>

                {/* Progress detail panel */}
                <div className="loyalty-progression-col">
                  <div className="progress-details-tile">
                    <div className="tile-text">
                      <h4>Points Progression</h4>
                      <span><strong>250</strong> / 500 points</span>
                    </div>
                    <div className="points-meter-bar">
                      <div className="points-fill" style={{ width: '50%' }}></div>
                    </div>
                    <p className="points-tip">Earn 250 points more to secure Gold Tier and unlock free worldwide shipping capsules.</p>
                  </div>

                  {/* Staggered point list history */}
                  <div className="points-history-block">
                    <h4>Points History</h4>
                    <ul className="points-history-list">
                      <li className="history-item">
                        <span className="evt">Purchased ORD-98241</span>
                        <span className="pts positive">+30 PTS</span>
                      </li>
                      <li className="history-item">
                        <span className="evt">Purchased ORD-73104</span>
                        <span className="pts positive">+47 PTS</span>
                      </li>
                      <li className="history-item">
                        <span className="evt">Loyalty Member Sign-Up</span>
                        <span className="pts positive">+173 PTS</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

// Dummy icons components for clean look in lists
const ChevronRightDummy = () => (
  <span className="menu-chevron-indicator">
    <ArrowRight size={14} />
  </span>
);

export default Profile;
