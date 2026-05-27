import React, { useRef, useState, useEffect } from 'react';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  Award, 
  Truck, 
  ArrowRight, 
  Search, 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronDown, 
  ChevronUp, 
  Star,
  MapPin,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const OrderHistory = () => {
  const { addToCart } = useCart();

  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const controlsRef = useRef(null);
  const ordersListRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isOrdersVisible, setIsOrdersVisible] = useState(false);

  // State management for interactions
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [expandedTracking, setExpandedTracking] = useState({}); // orderId -> boolean
  const [invoiceLoading, setInvoiceLoading] = useState({}); // orderId -> boolean

  // Scroll to top and initialize intersection observer
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -50px 0px' };

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsHeroVisible(true);
        heroObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsStatsVisible(true);
        statsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const controlsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsControlsVisible(true);
        controlsObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const ordersObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsOrdersVisible(true);
        ordersObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (controlsRef.current) controlsObserver.observe(controlsRef.current);
    if (ordersListRef.current) ordersObserver.observe(ordersListRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
      if (controlsRef.current) controlsObserver.unobserve(controlsRef.current);
      if (ordersListRef.current) ordersObserver.unobserve(ordersListRef.current);
    };
  }, []);

  // Demo Orders Data based on real products in the catalog
  const [ordersData] = useState([
    {
      id: 'ORD-98241',
      date: 'May 24, 2026',
      status: 'Delivered',
      deliveryDate: 'May 26, 2026',
      paymentMethod: 'Mastercard ending in 4821',
      address: '104 Urban Loft Dr, Apartment 4B, New York, NY 10001',
      carrier: 'DHL Express',
      trackingNumber: 'DHL-8921-9042',
      items: [
        {
          productId: 10,
          name: 'T-shirt with Tape Details',
          size: 'Medium',
          colorName: 'Black',
          colorHex: '#000000',
          quantity: 1,
          price: 120,
          image: '/images/tshirt_tape_details.png'
        },
        {
          productId: 4,
          name: 'Skinny Fit Jeans',
          size: 'Large',
          colorName: 'Indigo Blue',
          colorHex: '#2d4263',
          quantity: 1,
          price: 240,
          image: '/images/skinny_fit_jeans.png'
        }
      ],
      pricing: {
        subtotal: 360,
        discount: 72, // 20% discount
        shipping: 15,
        total: 303
      },
      trackingSteps: [
        { title: 'Order Placed', desc: 'We have received your payment and order details.', time: 'May 24, 10:14 AM', completed: true },
        { title: 'Processing', desc: 'Items selected, combed cotton garments packed.', time: 'May 24, 02:45 PM', completed: true },
        { title: 'Shipped', desc: 'Package picked up by DHL Express, departed warehouse.', time: 'May 25, 09:30 AM', completed: true },
        { title: 'Delivered', desc: 'Successfully signed for and delivered to doorstep.', time: 'May 26, 04:12 PM', completed: true }
      ]
    },
    {
      id: 'ORD-73104',
      date: 'May 26, 2026',
      status: 'Shipped',
      estimatedDelivery: 'May 29, 2026',
      paymentMethod: 'Apple Pay',
      address: '742 Maplewood Avenue, Los Angeles, CA 90025',
      carrier: 'FedEx Premium',
      trackingNumber: 'FX-7391-4820',
      items: [
        {
          productId: 2,
          name: 'Polo with Tipping Details',
          size: 'Large',
          colorName: 'Burgundy',
          colorHex: '#6b0b24',
          quantity: 1,
          price: 180,
          image: '/images/polo_tipping.png'
        },
        {
          productId: 1,
          name: 'Gradient Graphic T-shirt',
          size: 'Large',
          colorName: 'White Gradient',
          colorHex: '#ffffff',
          quantity: 2,
          price: 145,
          image: '/images/gradient_graphic_tshirt.png'
        }
      ],
      pricing: {
        subtotal: 470,
        discount: 0,
        shipping: 15,
        total: 485
      },
      trackingSteps: [
        { title: 'Order Placed', desc: 'Payment verified, preparing inventory items.', time: 'May 26, 08:30 AM', completed: true },
        { title: 'Processing', desc: 'Garments quality-checked and prepared for dispatch.', time: 'May 26, 04:15 PM', completed: true },
        { title: 'Shipped', desc: 'Departed sorting facility. In transit with FedEx.', time: 'May 27, 07:45 AM', completed: true },
        { title: 'Delivered', desc: 'Estimated delivery at front porch by 8 PM.', time: 'Pending Delivery', completed: false }
      ]
    },
    {
      id: 'ORD-49201',
      date: 'April 12, 2026',
      status: 'Delivered',
      deliveryDate: 'April 15, 2026',
      paymentMethod: 'PayPal Express',
      address: '394 Pinecrest Circle, Austin, TX 78701',
      carrier: 'USPS Priority Mail',
      trackingNumber: 'USPS-4829-1094',
      items: [
        {
          productId: 5,
          name: 'Checkered Shirt',
          size: 'Medium',
          colorName: 'Red Plaid',
          colorHex: '#ff3333',
          quantity: 1,
          price: 180,
          image: '/images/checkered_shirt.png'
        }
      ],
      pricing: {
        subtotal: 180,
        discount: 0,
        shipping: 15,
        total: 195
      },
      trackingSteps: [
        { title: 'Order Placed', desc: 'Order received.', time: 'April 12, 11:22 AM', completed: true },
        { title: 'Processing', desc: 'Brushed cotton flannel prepared.', time: 'April 12, 03:50 PM', completed: true },
        { title: 'Shipped', desc: 'Handed off to USPS sorting terminal.', time: 'April 13, 10:15 AM', completed: true },
        { title: 'Delivered', desc: 'Delivered inside mailbox, parcel secure.', time: 'April 15, 01:10 PM', completed: true }
      ]
    },
    {
      id: 'ORD-21094',
      date: 'January 15, 2026',
      status: 'Cancelled',
      cancelDate: 'January 15, 2026',
      paymentMethod: 'Visa ending in 9088',
      address: '104 Urban Loft Dr, Apartment 4B, New York, NY 10001',
      carrier: 'None',
      trackingNumber: 'N/A',
      items: [
        {
          productId: 7,
          name: 'Vertical Striped Shirt',
          size: 'Medium',
          colorName: 'Green/White',
          colorHex: '#2d6a4f',
          quantity: 1,
          price: 212,
          image: '/images/vertical_striped_shirt.png'
        }
      ],
      pricing: {
        subtotal: 212,
        discount: 42.4, // 20% discount via loyalty points
        shipping: 0,
        total: 169.6
      },
      trackingSteps: [
        { title: 'Order Placed', desc: 'Order submitted.', time: 'January 15, 03:00 PM', completed: true },
        { title: 'Cancelled', desc: 'Cancelled by customer request. Full refund processed.', time: 'January 15, 03:22 PM', completed: true, isCancelled: true }
      ]
    }
  ]);

  // Total summary states (mock stats metrics)
  const totalSpent = ordersData
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.pricing.total, 0);

  const activeShipments = ordersData.filter(o => o.status === 'Shipped').length;
  const totalItems = ordersData
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  // Toggle shipment tracking details accordion
  const toggleTracking = (orderId) => {
    setExpandedTracking(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Reorder flow - Adds all items in the order card to the cart
  const handleReorderAll = (order) => {
    order.items.forEach(item => {
      // Find original product reference to fetch full attributes if necessary
      const productObj = products.find(p => p.id === item.productId) || {
        id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        colors: [item.colorHex]
      };
      
      addToCart(productObj, item.quantity, item.size, item.colorHex);
    });

    setToastMessage(`All items from Order ${order.id} added to Cart!`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Reorder single item flow
  const handleBuyAgainSingle = (item) => {
    const productObj = products.find(p => p.id === item.productId) || {
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      colors: [item.colorHex]
    };
    
    addToCart(productObj, item.quantity, item.size, item.colorHex);

    setToastMessage(`"${item.name}" added to Cart!`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Mock Invoice download simulation
  const handleDownloadInvoice = (orderId) => {
    setInvoiceLoading(prev => ({ ...prev, [orderId]: true }));
    
    setTimeout(() => {
      setInvoiceLoading(prev => ({ ...prev, [orderId]: false }));
      
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      setToastMessage(`Invoice_${orderId}.pdf downloaded successfully!`);
      setTimeout(() => setToastMessage(''), 3500);
    }, 1500);
  };

  // Filter orders based on active status tab and search query
  const filteredOrders = ordersData.filter(order => {
    // Status Filter Tab
    let matchesTab = true;
    if (activeTab === 'Processing') {
      matchesTab = order.status === 'Processing';
    } else if (activeTab === 'Shipped') {
      matchesTab = order.status === 'Shipped';
    } else if (activeTab === 'Delivered') {
      matchesTab = order.status === 'Delivered';
    } else if (activeTab === 'Cancelled') {
      matchesTab = order.status === 'Cancelled';
    }

    // Search Query (ID, or product names)
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(query) ||
      order.items.some(item => item.name.toLowerCase().includes(query)) ||
      order.carrier.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="order-history-page">
      {/* 1. HERO HEADER: Left to Right Slide reveal + Opacity */}
      <section className={`orders-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="orders-hero-content">
          <div className="orders-breadcrumbs">
            <Link to="/">Home</Link>
            <ArrowRight size={12} />
            <Link to="/login">Account</Link>
            <ArrowRight size={12} />
            <span className="current-crumb">Order History</span>
          </div>
          <h1 className="orders-title">ORDER PORTAL</h1>
          <p className="orders-description">
            Track active consignments, download high-fidelity invoices, leave detailed product reviews, 
            and reorder custom combed cotton garments and rigid denim structures with a single click.
          </p>
        </div>
      </section>

      {/* Floating alert banner for reorders */}
      {toastMessage && (
        <div className="orders-success-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. STATS OVERVIEW: Slides up and fades */}
      <section className={`orders-stats-section page-container ${isStatsVisible ? 'visible' : ''}`} ref={statsRef}>
        <div className="orders-stats-grid">
          {/* Card 1: Silver Status */}
          <div className="orders-stat-card vip-tier">
            <div className="stat-card-glow"></div>
            <div className="stat-icon-box gold">
              <Award size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Loyalty Tier</span>
              <h3 className="stat-value">Silver Member</h3>
              <p className="stat-note">250 points to Gold status</p>
            </div>
          </div>

          {/* Card 2: Total Spent */}
          <div className="orders-stat-card">
            <div className="stat-icon-box">
              <DollarSign size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Purchased</span>
              <h3 className="stat-value">${totalSpent.toLocaleString()}</h3>
              <p className="stat-note">Excludes cancelled orders</p>
            </div>
          </div>

          {/* Card 3: Total Orders */}
          <div className="orders-stat-card">
            <div className="stat-icon-box">
              <Package size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Orders Completed</span>
              <h3 className="stat-value">{totalItems} Items</h3>
              <p className="stat-note">{ordersData.filter(o => o.status !== 'Cancelled').length} packages dispatched</p>
            </div>
          </div>

          {/* Card 4: Active Shipments */}
          <div className="orders-stat-card active-delivery">
            <div className="stat-icon-box pulse">
              <Truck size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">In Transit</span>
              <h3 className="stat-value">{activeShipments} Shipments</h3>
              <p className="stat-note">Track live logistics details</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTERS AND SEARCH: Scale reveal + Left alignment */}
      <section className={`orders-controls-section page-container ${isControlsVisible ? 'visible' : ''}`} ref={controlsRef}>
        <div className="orders-controls-wrapper">
          {/* Status filter tabs */}
          <div className="orders-filter-tabs">
            {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`orders-tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
                {tab === 'All' && <span className="tab-badge">{ordersData.length}</span>}
                {tab === 'Shipped' && activeShipments > 0 && <span className="tab-badge pulse-badge">{activeShipments}</span>}
              </button>
            ))}
          </div>

          {/* Real-time Search Box */}
          <div className="orders-search-wrapper">
            <Search size={18} className="orders-search-icon" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Product Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="orders-search-input"
            />
          </div>
        </div>
      </section>

      {/* 4. ORDERS LIST AREA: Staggered reveal left-to-right/slide-up cards */}
      <section className={`orders-list-section page-container ${isOrdersVisible ? 'visible' : ''}`} ref={ordersListRef}>
        {filteredOrders.length > 0 ? (
          <div className="orders-list">
            {filteredOrders.map((order, idx) => {
              const isTrackingOpen = expandedTracking[order.id];
              const isInvoiceLoadingState = invoiceLoading[order.id];

              return (
                <div key={order.id} className="order-block-card">
                  {/* Order Card Top Bar Header */}
                  <div className="order-card-header">
                    <div className="order-header-info">
                      <div className="meta-group">
                        <span className="meta-label">ORDER PLACED</span>
                        <span className="meta-value">{order.date}</span>
                      </div>
                      <div className="meta-group">
                        <span className="meta-label">TOTAL</span>
                        <span className="meta-value">${order.pricing.total.toFixed(2)}</span>
                      </div>
                      <div className="meta-group deliver-to-meta">
                        <span className="meta-label">SHIP TO</span>
                        <div className="meta-address-tooltip">
                          <span className="meta-value address-link">{order.address.split(',')[0]}</span>
                          <div className="tooltip-content">
                            <MapPin size={14} style={{ marginRight: '6px' }} />
                            <span>{order.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="order-header-actions">
                      <div className="order-id-group">
                        <span className="meta-label">ORDER ID</span>
                        <span className="order-id-code">{order.id}</span>
                      </div>
                      
                      {/* Status pill color classes */}
                      <span className={`status-pill ${order.status.toLowerCase()}`}>
                        {order.status === 'Delivered' && <CheckCircle size={13} />}
                        {order.status === 'Shipped' && <Truck size={13} />}
                        {order.status === 'Processing' && <Clock size={13} />}
                        {order.status === 'Cancelled' && <XCircle size={13} />}
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Card Content Body */}
                  <div className="order-card-body">
                    {/* Items Column */}
                    <div className="order-items-column">
                      {order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="order-product-row">
                          <div className="order-product-image-wrapper">
                            <img src={item.image} alt={item.name} />
                          </div>
                          
                          <div className="order-product-details">
                            <h4 className="product-title-link">
                              <Link to={`/product/${item.productId}`}>{item.name}</Link>
                            </h4>
                            <div className="product-specifications">
                              <span>Size: <strong>{item.size}</strong></span>
                              <span className="spec-separator">|</span>
                              <span className="spec-color-dot" style={{ backgroundColor: item.colorHex }} title={item.colorName}></span>
                              <span>Color: <strong>{item.colorName}</strong></span>
                              <span className="spec-separator">|</span>
                              <span>Qty: <strong>{item.quantity}</strong></span>
                            </div>
                            <span className="product-price-label">${item.price}</span>
                            
                            <div className="product-action-row-desktop">
                              <button 
                                onClick={() => handleBuyAgainSingle(item)}
                                className="action-link-btn"
                              >
                                <RefreshCw size={13} />
                                <span>Buy It Again</span>
                              </button>
                              <span className="action-divider">|</span>
                              <Link to={`/product/${item.productId}`} className="action-link-btn">
                                <Star size={13} />
                                <span>Write a review</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Order Operations Panel (Right column on desktop) */}
                    <div className="order-operations-panel">
                      {order.status !== 'Cancelled' ? (
                        <>
                          <button 
                            onClick={() => toggleTracking(order.id)}
                            className={`ops-btn tracking-toggle-btn ${isTrackingOpen ? 'active' : ''}`}
                          >
                            <Truck size={16} />
                            <span>{isTrackingOpen ? 'Hide Delivery Details' : 'Track Shipment'}</span>
                            {isTrackingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>

                          <button 
                            onClick={() => handleReorderAll(order)}
                            className="ops-btn primary-solid"
                          >
                            <RefreshCw size={16} />
                            <span>Reorder All Items</span>
                          </button>

                          <button 
                            onClick={() => handleDownloadInvoice(order.id)}
                            disabled={isInvoiceLoadingState}
                            className="ops-btn secondary-outline"
                          >
                            <FileText size={16} />
                            <span>{isInvoiceLoadingState ? 'Downloading...' : 'Get Invoice'}</span>
                          </button>
                        </>
                      ) : (
                        <div className="cancelled-card-notice">
                          <AlertCircle size={20} className="notice-icon" />
                          <div>
                            <h4>Order Cancelled</h4>
                            <p>A full refund was credited to your original payment account on {order.cancelDate}.</p>
                          </div>
                          <button 
                            onClick={() => handleReorderAll(order)}
                            className="ops-btn secondary-outline re-checkout-btn"
                          >
                            <RefreshCw size={14} />
                            <span>Re-checkout Package</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 5. COLLAPSIBLE ACCORDION: Stepper Timeline Tracker */}
                  <div className={`tracking-accordion-drawer ${isTrackingOpen ? 'expanded' : ''}`}>
                    <div className="tracking-accordion-content">
                      <div className="tracking-logistic-meta">
                        <div className="meta-tile">
                          <span className="label">LOGISTICS PARTNER</span>
                          <span className="value">{order.carrier}</span>
                        </div>
                        <div className="meta-tile">
                          <span className="label">TRACKING NUMBER</span>
                          <span className="value copyable-code">{order.trackingNumber}</span>
                        </div>
                        <div className="meta-tile">
                          <span className="label">DELIVERY SPEED</span>
                          <span className="value">Express Shipping</span>
                        </div>
                        <div className="meta-tile">
                          <span className="label">DELIVERY METHOD</span>
                          <span className="value">{order.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Animated Flow Track Stepper */}
                      <div className="timeline-stepper">
                        {order.trackingSteps?.map((step, stepIdx) => {
                          const isDone = step.completed;
                          const isLast = stepIdx === order.trackingSteps.length - 1;
                          const isCancel = step.isCancelled;

                          return (
                            <div 
                              key={stepIdx} 
                              className={`step-node ${isDone ? 'done' : ''} ${isCancel ? 'cancelled' : ''}`}
                            >
                              <div className="node-circle-indicator">
                                {isCancel ? (
                                  <XCircle size={16} />
                                ) : isDone ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  <Clock size={16} className="pulse-spin" />
                                )}
                              </div>
                              <div className="node-text-holder">
                                <h5 className="node-title">{step.title}</h5>
                                <p className="node-desc">{step.desc}</p>
                                <span className="node-time">{step.time}</span>
                              </div>
                              {!isLast && <div className={`node-connector-line ${isDone ? 'connector-done' : ''}`}></div>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="tracking-summary-footer">
                        <ShieldCheck size={16} className="secure-badge-icon" />
                        <span>SHOP.CO secure buyer protection guarantees delivery and authentic combed garment selection.</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="orders-empty-state">
            <Package size={52} className="empty-pkg-icon" />
            <h2>NO ORDERS MATCH FILTER</h2>
            <p>We couldn't find any transactions fitting your status or search keywords. Please adjust filters or try searching for another product term.</p>
            <button 
              onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
              className="orders-reset-btn"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Trust reassurance banner */}
      <section className="orders-guarantee-banner page-container">
        <div className="guarantee-card">
          <div className="guarantee-item">
            <h4>HASSLE-FREE RETURNS</h4>
            <p>Exchange or return garments within 30 days of shipment signature.</p>
          </div>
          <div className="guarantee-divider"></div>
          <div className="guarantee-item">
            <h4>EXPRESS DELIVERY</h4>
            <p>Premium packaging and tracked shipping for all members globally.</p>
          </div>
          <div className="guarantee-divider"></div>
          <div className="guarantee-item">
            <h4>LOYALTY BENCHMARKS</h4>
            <p>Earn combed-cotton points on purchases to unlock special custom capsules.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
