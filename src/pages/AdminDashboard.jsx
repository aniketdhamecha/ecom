import React, { useRef, useState, useEffect } from 'react';
import { 
  Shield, 
  TrendingUp, 
  ShoppingBag, 
  ShoppingCart, 
  DollarSign, 
  Truck, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Database,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  LayoutDashboard,
  BarChart3,
  Percent,
  Download,
  Layers,
  ArrowUpRight,
  PieChart,
  Package,
  Edit,
  Trash2,
  X,
  ShieldAlert,
  FileText,
  Activity,
  Terminal,
  UserCheck
} from 'lucide-react';

const AdminDashboard = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');

  // Trigger anim load states for tabs
  const [animateIn, setAnimateIn] = useState(false);

  // Scroll reveal refs
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const splitRef = useRef(null);

  // Scroll reveal visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isSplitVisible, setIsSplitVisible] = useState(false);

  // Dynamic state databases
  const [toastMessage, setToastMessage] = useState('');
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [isExporting, setIsExporting] = useState(false);

  // Sales Trend Line Graph Toggles & Coordinates
  const [graphMetric, setGraphMetric] = useState('revenue');
  const [activeNode, setActiveNode] = useState(null);

  const weeklyTrend = [
    { day: 'Mon', label: 'Monday', revenue: 14800, units: 110, rx: 50, ry: 190, ux: 50, uy: 210 },
    { day: 'Tue', label: 'Tuesday', revenue: 22100, units: 168, rx: 170, ry: 130, ux: 170, uy: 150 },
    { day: 'Wed', label: 'Wednesday', revenue: 18500, units: 142, rx: 290, ry: 160, ux: 290, uy: 180 },
    { day: 'Thu', label: 'Thursday', revenue: 31200, units: 230, rx: 410, ry: 60, ux: 410, uy: 80 },
    { day: 'Fri', label: 'Friday', revenue: 26000, units: 195, rx: 530, ry: 100, ux: 530, uy: 120 },
    { day: 'Sat', label: 'Saturday', revenue: 38900, units: 285, rx: 650, ry: 15, ux: 650, uy: 25 },
    { day: 'Sun', label: 'Sunday', revenue: 34500, units: 260, rx: 770, ry: 40, ux: 770, uy: 50 }
  ];

  // Stateful Live Error Logs Database
  const [errors, setErrors] = useState([
    { id: 'ERR-902', code: 'ERR_CART_BOUNCE', message: 'Failed checkout session security validation check', level: 'Critical', time: '17:48:12', module: 'CartService' },
    { id: 'ERR-501', code: 'SKU_INVENTORY_ALARM', message: 'Product SKU SKU-SKIN-JEAN count fell below low limit (12 units)', level: 'Warning', time: '17:21:40', module: 'InventorySync' },
    { id: 'ERR-304', code: 'COURIER_GATEWAY_TIMEOUT', message: 'FedEx Premium courier API response took >3000ms latency', level: 'Warning', time: '17:15:02', module: 'LogisticsAPI' },
    { id: 'ERR-881', code: 'STRIPE_SSL_EXCEPTION', message: 'SSL Handshake verification handshake failed with remote gateway host', level: 'Fatal', time: '16:50:55', module: 'PaymentGate' }
  ]);

  // Stateful System Audit Trails Log
  const [audits, setAudits] = useState([
    { id: 'AUD-101', time: '17:35:20', actor: 'Alex Sterling', role: 'Super Admin', action: 'Dispatched order consignment ORD-98241', type: 'Action', ip: '192.168.42.105' },
    { id: 'AUD-102', time: '17:31:12', actor: 'Alex Sterling', role: 'Super Admin', action: 'Restocked product vertical striped shirt (+50 Units)', type: 'Action', ip: '192.168.42.105' },
    { id: 'AUD-103', time: '17:28:05', actor: 'Alex Sterling', role: 'Super Admin', action: 'Exported Financial gross analytics statement to CSV', type: 'Action', ip: '192.168.42.105' },
    { id: 'AUD-104', time: '17:21:40', actor: 'System Daemon', role: 'System Core', action: 'Auto-flagged low stock warning alarm for SKU SKU-SKIN-JEAN', type: 'System', ip: '127.0.0.1' },
    { id: 'AUD-105', time: '16:50:55', actor: 'System Firewall', role: 'Security Daemon', action: 'Blocked suspicious remote API access request key exception INC_SSL_WARN', type: 'Security', ip: '185.42.92.14' }
  ]);

  const [auditFilter, setAuditFilter] = useState('All');

  // Interactive Orders Database
  const [orders, setOrders] = useState([
    { id: 'ORD-98241', customer: 'Alex Sterling', total: 303.00, status: 'Delivered', date: 'May 24, 2026', carrier: 'DHL Express' },
    { id: 'ORD-73104', customer: 'Marcus Vance', total: 485.00, status: 'Shipped', date: 'May 26, 2026', carrier: 'FedEx Premium' },
    { id: 'ORD-88204', customer: 'Sarah Miller', total: 120.00, status: 'Processing', date: 'May 27, 2026', carrier: 'Pending Dispatch' },
    { id: 'ORD-49201', customer: 'Julian Thorne', total: 195.00, status: 'Delivered', date: 'April 12, 2026', carrier: 'USPS Priority' },
    { id: 'ORD-30219', customer: 'Elena Rostova', total: 240.00, status: 'Processing', date: 'May 27, 2026', carrier: 'Pending Dispatch' }
  ]);

  // Interactive Inventory Stocks Database
  const [inventory, setInventory] = useState([
    { id: 1, name: 'T-shirt with Tape Details', sku: 'SKU-TAPE-TEE', price: 120, stock: 8, image: '/images/tshirt_tape_details.png', category: 'Tops' },
    { id: 2, name: 'Polo with Tipping Details', sku: 'SKU-TIPP-POLO', price: 180, stock: 45, image: '/images/polo_tipping.png', category: 'Casual' },
    { id: 3, name: 'Skinny Fit Jeans', sku: 'SKU-SKIN-JEAN', price: 240, stock: 12, image: '/images/skinny_fit_jeans.png', category: 'Denim' },
    { id: 4, name: 'Checkered Shirt', sku: 'SKU-CHEC-FLAN', price: 180, stock: 68, image: '/images/checkered_shirt.png', category: 'Casual' },
    { id: 5, name: 'Vertical Striped Shirt', sku: 'SKU-VERT-LINN', price: 212, stock: 5, image: '/images/vertical_striped_shirt.png', category: 'Casual' }
  ]);

  // Product Management Form Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Edit/Add fields state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: 'Tops',
    image: '/images/tshirt_tape_details.png'
  });

  const productPresets = [
    { label: 'Tape T-Shirt', path: '/images/tshirt_tape_details.png' },
    { label: 'Tipping Polo', path: '/images/polo_tipping.png' },
    { label: 'Skinny Jeans', path: '/images/skinny_fit_jeans.png' },
    { label: 'Checkered Flannel', path: '/images/checkered_shirt.png' },
    { label: 'Striped Linen', path: '/images/vertical_striped_shirt.png' }
  ];

  // Gross/Net summary metrics
  const totalRevenue = 124500;
  const netProfit = 98200;
  const avgBasketSize = 139.57;
  const customerLTV = 312.40;

  // Monthly Sales database (for CSS bar chart)
  const monthlySales = [
    { month: 'Jan', revenue: 12000, percentage: 31 },
    { month: 'Feb', revenue: 18500, percentage: 48 },
    { month: 'Mar', revenue: 24000, percentage: 63 },
    { month: 'Apr', revenue: 31200, percentage: 82 },
    { month: 'May', revenue: 38800, percentage: 100 }
  ];

  // Category shares progress metrics
  const categoryShare = [
    { name: 'T-Shirts & Tops', share: 42, color: 'stable', count: 375 },
    { name: 'Casual Polos', share: 28, color: 'warning', count: 250 },
    { name: 'Denim & Jeans', share: 20, color: 'stable', count: 178 },
    { name: 'Accessories & Shirts', share: 10, color: 'low', count: 89 }
  ];

  // Trigger tab animations when tab selection changes
  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observerOptions = { threshold: 0.1 };

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

    const splitObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSplitVisible(true);
        splitObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (splitRef.current) splitObserver.observe(splitRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
      if (splitRef.current) splitObserver.unobserve(splitRef.current);
    };
  }, [activeTab]);

  // Action Dispatch Order
  const handleDispatchOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          let nextStatus = 'Delivered';
          let carrier = 'DHL Express';
          if (order.status === 'Processing') {
            nextStatus = 'Shipped';
            carrier = 'FedEx Premium';
          }
          
          setToastMessage(`Order ${orderId} successfully updated to ${nextStatus}!`);
          setTimeout(() => setToastMessage(''), 3500);

          return { ...order, status: nextStatus, carrier };
        }
        return order;
      })
    );
  };

  // Restock Product Count
  const handleRestockProduct = (productId, name) => {
    setInventory(prevInv => 
      prevInv.map(item => {
        if (item.id === productId) {
          const updatedStock = item.stock + 50;
          
          setToastMessage(`"${name}" restocked with 50 units!`);
          setTimeout(() => setToastMessage(''), 3500);

          return { ...item, stock: updatedStock };
        }
        return item;
      })
    );
  };

  // Error Log Acknowledgement dismiss handler
  const handleAcknowledgeError = (errorId, code) => {
    setErrors(prevErrors => prevErrors.filter(err => err.id !== errorId));
    setToastMessage(`Security Incident ${code} successfully acknowledged and cleared.`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Form Editor triggers
  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setFormData({
      name: '',
      sku: 'SKU-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-TEE',
      price: '',
      stock: '',
      category: 'Tops',
      image: '/images/tshirt_tape_details.png'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      category: product.category || 'Tops',
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from the store catalog?`)) {
      setInventory(prev => prev.filter(item => item.id !== productId));
      setToastMessage(`Product "${name}" successfully removed from catalog.`);
      setTimeout(() => setToastMessage(''), 3500);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    setTimeout(() => {
      if (modalMode === 'add') {
        const newProd = {
          id: Date.now(),
          name: formData.name,
          sku: formData.sku,
          price: parseFloat(formData.price) || 0,
          stock: parseInt(formData.stock) || 0,
          category: formData.category,
          image: formData.image
        };
        setInventory(prev => [...prev, newProd]);
        setToastMessage(`Product "${formData.name}" successfully created in catalog!`);
      } else {
        setInventory(prev => prev.map(item => {
          if (item.id === selectedProduct.id) {
            return {
              ...item,
              name: formData.name,
              sku: formData.sku,
              price: parseFloat(formData.price) || 0,
              stock: parseInt(formData.stock) || 0,
              category: formData.category,
              image: formData.image
            };
          }
          return item;
        }));
        setToastMessage(`Product "${formData.name}" successfully updated!`);
      }
      
      setFormLoading(false);
      setIsModalOpen(false);
      setTimeout(() => setToastMessage(''), 3500);
    }, 1200);
  };

  // Simulated CSV Financial Export
  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToastMessage('Financial Analytics report exported to CSV successfully!');
      setTimeout(() => setToastMessage(''), 3500);
      
      const jsonStr = JSON.stringify({
        report: "Revenue Analytics Statement",
        timestamp: new Date().toISOString(),
        timeFilter,
        grossSales: totalRevenue,
        netProfit,
        profitMargin: "78.8%",
        salesByMonth: monthlySales,
        categoryBreakdown: categoryShare,
        weeklyTrend
      }, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsonStr);
      const exportFileDefaultName = `revenue_analytics_${timeFilter.toLowerCase().replace(' ', '_')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }, 1800);
  };

  // Filtered Audit Trails database
  const filteredAudits = audits.filter(item => {
    if (auditFilter === 'All') return true;
    return item.type.toLowerCase() === auditFilter.toLowerCase();
  });

  return (
    <div className="admin-page">
      {/* Dynamic Toast Alerts */}
      {toastMessage && (
        <div className="admin-success-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Structural Frame */}
      <div className="page-container admin-layout-grid">
        
        {/* SIDE BAR NAVIGATION MODULE */}
        <aside className="admin-sidebar">
          <div className="sidebar-identity">
            <div className="identity-badge">
              <Shield size={18} />
              <span>ADMIN PORTAL</span>
            </div>
            <p className="identity-domain">shop.co console</p>
          </div>

          <nav className="sidebar-menu-links">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Overview Panel</span>
            </button>

            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`sidebar-nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            >
              <BarChart3 size={18} />
              <span>Revenue Analytics</span>
            </button>

            <button 
              onClick={() => setActiveTab('products')} 
              className={`sidebar-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            >
              <Package size={18} />
              <span>Product Manager</span>
            </button>

            <button 
              onClick={() => setActiveTab('orders')} 
              className={`sidebar-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            >
              <ShoppingBag size={18} />
              <span>Orders Ledger</span>
            </button>

            <button 
              onClick={() => setActiveTab('inventory')} 
              className={`sidebar-nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            >
              <Database size={18} />
              <span>Stock Levels</span>
            </button>

            {/* Error Logs sidebar link - Added */}
            <button 
              onClick={() => setActiveTab('error-logs')} 
              className={`sidebar-nav-btn ${activeTab === 'error-logs' ? 'active' : ''}`}
            >
              <ShieldAlert size={18} />
              <span>Error Logs</span>
              {errors.length > 0 && <span className="sidebar-badge-count">{errors.length}</span>}
            </button>

            {/* Audit Logs sidebar link - Added */}
            <button 
              onClick={() => setActiveTab('audit-logs')} 
              className={`sidebar-nav-btn ${activeTab === 'audit-logs' ? 'active' : ''}`}
            >
              <FileText size={18} />
              <span>Audit Logs</span>
            </button>
          </nav>

          <div className="sidebar-footprint">
            <div className="live-status-bubble">
              <span className="bubble-pulse"></span>
              <span>Cloud Sync Online</span>
            </div>
            <span className="system-version">v2.4.1-stable</span>
          </div>
        </aside>

        {/* ACTIVE WORKSPACE PANEL */}
        <main className="admin-workspace-core">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              {/* 1. HERO HEADER */}
              <section className={`admin-hero ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
                <div className="admin-hero-content">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">MANAGEMENT CONSOLE</span>
                      <h1 className="admin-title">STORE ADMIN PANEL</h1>
                      <p className="admin-description">
                        Monitor deconstructed net revenues, track checkout cart drops, dispatch outstanding purchases, 
                        and restock inventory SKU levels instantly.
                      </p>
                    </div>
                    
                    <div className="admin-time-selectors">
                      {['Today', 'This Week', 'This Month'].map((filter) => (
                        <button 
                          key={filter}
                          onClick={() => setTimeFilter(filter)}
                          className={`time-filter-btn ${timeFilter === filter ? 'active' : ''}`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. STATS OVERVIEW */}
              <section className={`admin-stats-section ${isStatsVisible ? 'visible' : ''}`} ref={statsRef}>
                <div className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <div className="stat-card-icon-box sales">
                      <DollarSign size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Net Revenue</span>
                      <h3 className="value">${totalRevenue.toLocaleString()}</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+12.4% vs last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="stat-card-icon-box orders">
                      <ShoppingBag size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Total Packages</span>
                      <h3 className="value">{orders.length + 887} Dispatches</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+8.2% vs last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="stat-card-icon-box carts">
                      <ShoppingCart size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Active Carts</span>
                      <h3 className="value">45 Checkouts</h3>
                      <div className="trend negative">
                        <TrendingDown size={14} />
                        <span>-2.1% hourly bounce</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="stat-card-icon-box basket">
                      <Database size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Avg Order Value</span>
                      <h3 className="value">${avgBasketSize}</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+4.8% combed cotton boost</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. DUAL GRID SPLIT */}
              <div className={`admin-split-grid ${isSplitVisible ? 'visible' : ''}`} ref={splitRef}>
                {/* Ledger widget */}
                <div className="workspace-panel-card animate-admin-card">
                  <div className="panel-header">
                    <div className="panel-title-row">
                      <ShoppingBag size={20} />
                      <h3>Recent Orders Ledger</h3>
                      <button className="panel-nav-arrow" onClick={() => setActiveTab('orders')}>
                        <span className="text-link">View Full Ledger</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p>Live transaction stream. Click 'Fast Dispatch' to advance shipment state.</p>
                  </div>

                  <div className="ledger-table-wrapper">
                    <table className="ledger-table">
                      <thead>
                        <tr>
                          <th>Order Code</th>
                          <th>Customer</th>
                          <th>Subtotal</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 3).map((order) => (
                          <tr key={order.id}>
                            <td className="order-id">{order.id}</td>
                            <td className="customer-name">{order.customer}</td>
                            <td className="amount">${order.total.toFixed(2)}</td>
                            <td>
                              <span className={`status-pill ${order.status.toLowerCase()}`}>
                                {order.status === 'Delivered' && <CheckCircle size={12} />}
                                {order.status === 'Shipped' && <Truck size={12} />}
                                {order.status === 'Processing' && <Clock size={12} />}
                                <span>{order.status}</span>
                              </span>
                            </td>
                            <td className="text-right">
                              {order.status !== 'Delivered' ? (
                                <button 
                                  onClick={() => handleDispatchOrder(order.id)}
                                  className="fast-dispatch-btn"
                                >
                                  <RefreshCw size={12} className="spin-on-hover" />
                                  <span>{order.status === 'Processing' ? 'Ship' : 'Deliver'}</span>
                                </button>
                              ) : (
                                <span className="completed-label">Checked ✓</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stocks widget */}
                <div className="workspace-panel-card animate-admin-card">
                  <div className="panel-header">
                    <div className="panel-title-row">
                      <Database size={20} />
                      <h3>Stock Levels Monitor</h3>
                      <button className="panel-nav-arrow" onClick={() => setActiveTab('inventory')}>
                        <span className="text-link">Full Inventory</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p>SKU catalog volumes. Products under 15 units trigger alert badges.</p>
                  </div>

                  <div className="stock-list compact">
                    {inventory.slice(0, 3).map((item) => {
                      const isLow = item.stock < 15;
                      const fillPercent = Math.min((item.stock / 80) * 100, 100);

                      return (
                        <div key={item.id} className="stock-product-row">
                          <div className="stock-product-meta">
                            <div className="product-thumb">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="meta-text">
                              <h4>{item.name}</h4>
                              <span className="sku">{item.sku} • **${item.price}**</span>
                            </div>
                            {isLow && (
                              <span className="low-stock-badge">
                                <AlertCircle size={11} />
                                <span>LOW</span>
                              </span>
                            )}
                          </div>

                          <div className="stock-level-progression">
                            <div className="stock-meter-bar">
                              <div 
                                className={`stock-fill ${isLow ? 'low' : item.stock < 40 ? 'warning' : 'stable'}`} 
                                style={{ width: `${fillPercent}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="stock-action-row">
                            <button 
                              onClick={() => handleRestockProduct(item.id, item.name)}
                              className="restock-btn"
                            >
                              <Plus size={10} />
                              <span>Restock (+50)</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. QUICK ACTIONS BAR */}
              <section className="admin-actions-banner">
                <div className="quick-actions-card">
                  <div className="action-tile">
                    <h4>Add New Product</h4>
                    <p>Upload Combed cotton tees, Polos, or Denim lines to the active catalog.</p>
                    <button className="action-tile-btn" onClick={handleOpenAddModal}>Launch Form</button>
                  </div>
                  <div className="action-vert-sep"></div>
                  <div className="action-tile">
                    <h4>Promo Codes</h4>
                    <p>Configure custom coupons codes (e.g. DISCOUNT20) to run shopping campaigns.</p>
                    <button className="action-tile-btn">Issue Coupon</button>
                  </div>
                  <div className="action-vert-sep"></div>
                  <div className="action-tile font-red">
                    <h4>Freeze Portal</h4>
                    <p>Emergency trigger: locks checkout carts and logs off active sessions instantly.</p>
                    <button className="action-tile-btn freeze">Emergency Freeze</button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: REVENUE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              {/* ANALYTICS HERO HEADER */}
              <section className="admin-hero visible">
                <div className="admin-hero-content animate-slide-right">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">FINANCIAL PERFORMANCE</span>
                      <h1 className="admin-title">REVENUE ANALYTICS</h1>
                      <p className="admin-description">
                        Deep dive into store gross margins, monthly profit distributions, product category performance 
                        shares, and conversion funnels.
                      </p>
                    </div>

                    <div className="analytics-header-actions">
                      <div className="admin-time-selectors">
                        {['Today', 'This Week', 'This Month'].map((filter) => (
                          <button 
                            key={filter}
                            onClick={() => setTimeFilter(filter)}
                            className={`time-filter-btn ${timeFilter === filter ? 'active' : ''}`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      
                      <button 
                        onClick={handleExportCSV}
                        disabled={isExporting}
                        className="export-analytics-btn"
                      >
                        {isExporting ? (
                          <>
                            <RefreshCw size={14} className="spin" />
                            <span>Exporting...</span>
                          </>
                        ) : (
                          <>
                            <Download size={14} />
                            <span>Export CSV</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* STATS OVERVIEW CARDS */}
              <section className="admin-stats-section visible">
                <div className="admin-stats-grid">
                  <div className="admin-stat-card delay-1">
                    <div className="stat-card-icon-box sales">
                      <DollarSign size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Gross Sales</span>
                      <h3 className="value">${totalRevenue.toLocaleString()}</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+12.4% vs prev period</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-stat-card delay-2">
                    <div className="stat-card-icon-box orders">
                      <Layers size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Net Profit</span>
                      <h3 className="value">${netProfit.toLocaleString()}</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+14.8% combed cotton margin</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-stat-card delay-3">
                    <div className="stat-card-icon-box basket">
                      <Percent size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Profit Margin</span>
                      <h3 className="value">78.8%</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+1.2% cost adjustments</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-stat-card delay-4">
                    <div className="stat-card-icon-box carts">
                      <ArrowUpRight size={22} />
                    </div>
                    <div className="stat-card-details">
                      <span className="label">Cust. Lifetime Value</span>
                      <h3 className="value">${customerLTV.toFixed(2)}</h3>
                      <div className="trend positive">
                        <TrendingUp size={14} />
                        <span>+5.6% reorder loyalty index</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SALES TREND AREA GRAPH */}
              <section className="sales-trend-graph-section animate-admin-card delay-2">
                <div className="workspace-panel-card full-width relative-card">
                  <div className="panel-header-with-actions">
                    <div>
                      <div className="panel-title-row">
                        <TrendingUp size={20} className="glow-icon" />
                        <h3>Sales Trend Graph</h3>
                      </div>
                      <p>Weekly metrics report. Hover on data nodes to inspect daily purchase coordinates.</p>
                    </div>

                    <div className="graph-controls-capsule">
                      <button 
                        onClick={() => setGraphMetric('revenue')} 
                        className={`metric-toggle-pill ${graphMetric === 'revenue' ? 'active' : ''}`}
                      >
                        <DollarSign size={13} />
                        <span>Revenue ($)</span>
                      </button>
                      <button 
                        onClick={() => setGraphMetric('units')} 
                        className={`metric-toggle-pill ${graphMetric === 'units' ? 'active' : ''}`}
                      >
                        <ShoppingBag size={13} />
                        <span>Order Units (qty)</span>
                      </button>
                    </div>
                  </div>

                  <div className="svg-chart-container">
                    <div className="svg-y-scale">
                      {graphMetric === 'revenue' ? (
                        <>
                          <span>$40K</span>
                          <span>$30K</span>
                          <span>$20K</span>
                          <span>$10K</span>
                          <span>$0</span>
                        </>
                      ) : (
                        <>
                          <span>300 Qty</span>
                          <span>225 Qty</span>
                          <span>150 Qty</span>
                          <span>75 Qty</span>
                          <span>0</span>
                        </>
                      )}
                    </div>

                    <div className="svg-viewport-wrapper">
                      <div className="svg-gridlines">
                        <div className="svg-gridline-row"></div>
                        <div className="svg-gridline-row"></div>
                        <div className="svg-gridline-row"></div>
                        <div className="svg-gridline-row"></div>
                        <div className="svg-gridline-row"></div>
                      </div>

                      <svg viewBox="0 0 820 250" className="bezier-sales-svg">
                        <defs>
                          <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        <path 
                          className="graph-area-shading"
                          d={
                            graphMetric === 'revenue' 
                              ? "M 50 190 C 110 160, 110 160, 170 130 C 230 145, 230 145, 290 160 C 350 110, 350 110, 410 60 C 470 80, 470 80, 530 100 C 590 57.5, 590 57.5, 650 15 C 710 27.5, 710 27.5, 770 40 L 770 240 L 50 240 Z" 
                              : "M 50 210 C 110 180, 110 180, 170 150 C 230 165, 230 165, 290 180 C 350 130, 350 130, 410 80 C 470 100, 470 100, 530 120 C 590 72.5, 590 72.5, 650 25 C 710 37.5, 710 37.5, 770 50 L 770 240 L 50 240 Z"
                          } 
                          fill="url(#areaGlow)" 
                        />

                        <path 
                          className="graph-stroke-bezier animate-draw-path"
                          d={
                            graphMetric === 'revenue'
                              ? "M 50 190 C 110 160, 110 160, 170 130 C 230 145, 230 145, 290 160 C 350 110, 350 110, 410 60 C 470 80, 470 80, 530 100 C 590 57.5, 590 57.5, 650 15 C 710 27.5, 710 27.5, 770 40"
                              : "M 50 210 C 110 180, 110 180, 170 150 C 230 165, 230 165, 290 180 C 350 130, 350 130, 410 80 C 470 100, 470 100, 530 120 C 590 72.5, 590 72.5, 650 25 C 710 37.5, 710 37.5, 770 50"
                          }
                          fill="none" 
                          stroke="#000000" 
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {weeklyTrend.map((node, idx) => {
                          const cx = node.rx;
                          const cy = graphMetric === 'revenue' ? node.ry : node.uy;
                          const isActive = activeNode === idx;

                          return (
                            <g key={node.day} className="g-node-point">
                              {isActive && (
                                <circle 
                                  cx={cx} 
                                  cy={cy} 
                                  r="11" 
                                  fill="#000000" 
                                  opacity="0.12" 
                                  className="node-pulse-ring"
                                />
                              )}
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r="6" 
                                fill={isActive ? '#000000' : '#ffffff'} 
                                stroke="#000000" 
                                strokeWidth="2.5"
                                className="node-core"
                                onMouseEnter={() => setActiveNode(idx)}
                                onMouseLeave={() => setActiveNode(null)}
                              />
                            </g>
                          );
                        })}
                      </svg>

                      <div className="svg-x-axis">
                        {weeklyTrend.map((node) => (
                          <span key={node.day}>{node.day}</span>
                        ))}
                      </div>

                      {activeNode !== null && (
                        <div 
                          className="graph-overlay-tooltip" 
                          style={{
                            left: `${(weeklyTrend[activeNode].rx / 820) * 100}%`,
                            top: `${((graphMetric === 'revenue' ? weeklyTrend[activeNode].ry : weeklyTrend[activeNode].uy) / 250) * 100 - 24}%`
                          }}
                        >
                          <span className="tooltip-day">{weeklyTrend[activeNode].label}</span>
                          <div className="tooltip-detail-row">
                            <span className="bullet"></span>
                            <span className="lbl">Gross Sales:</span>
                            <span className="val">${weeklyTrend[activeNode].revenue.toLocaleString()}</span>
                          </div>
                          <div className="tooltip-detail-row">
                            <span className="bullet gray"></span>
                            <span className="lbl">Dispatches:</span>
                            <span className="val">{weeklyTrend[activeNode].units} Units</span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </section>

              {/* BAR CHART & CATEGORY SHARE */}
              <div className="admin-split-grid visible">
                <div className="workspace-panel-card animate-admin-card delay-2">
                  <div className="panel-header">
                    <div className="panel-title-row">
                      <BarChart3 size={20} />
                      <h3>Monthly Sales Progression</h3>
                    </div>
                    <p>Simulated revenue growth by calendar month (USD). Hover for details.</p>
                  </div>

                  <div className="chart-workspace">
                    <div className="chart-gridlines">
                      <div className="gridline-row"><span>$40K</span></div>
                      <div className="gridline-row"><span>$30K</span></div>
                      <div className="gridline-row"><span>$20K</span></div>
                      <div className="gridline-row"><span>$10K</span></div>
                      <div className="gridline-row"><span>$0</span></div>
                    </div>

                    <div className="chart-bars-container">
                      {monthlySales.map((item, idx) => (
                        <div key={item.month} className="chart-bar-column">
                          <div className="bar-interactive-block">
                            <div className="bar-tooltip">
                              <span className="tooltip-rev">${item.revenue.toLocaleString()}</span>
                              <span className="tooltip-lbl">Revenue</span>
                            </div>
                            <div 
                              className="bar-fill-indicator" 
                              style={{ 
                                height: `${item.percentage}%`,
                                transitionDelay: `${idx * 0.1}s` 
                              }}
                            >
                              <div className="bar-fill-glow"></div>
                            </div>
                          </div>
                          <span className="chart-bar-month">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="workspace-panel-card animate-admin-card delay-3">
                  <div className="panel-header">
                    <div className="panel-title-row">
                      <Layers size={20} />
                      <h3>Category Performance Share</h3>
                    </div>
                    <p>Breakdown of order volumes across major store clothing catalog tags.</p>
                  </div>

                  <div className="analytics-category-list">
                    {categoryShare.map((item) => (
                      <div key={item.name} className="analytics-category-item">
                        <div className="category-item-header">
                          <span className="category-item-name">{item.name}</span>
                          <span className="category-item-count">{item.count} items sold</span>
                        </div>

                        <div className="category-meter-wrapper">
                          <div className="category-progress-track">
                            <div 
                              className={`category-progress-fill ${item.color}`}
                              style={{ width: `${item.share}%` }}
                            ></div>
                          </div>
                          <span className="category-percentage-label">{item.share}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="category-summary-box">
                    <TrendingUp size={16} />
                    <span><strong>T-Shirts & Tops</strong> remains the top growth segment this month, claiming 42% of gross merchant orders.</span>
                  </div>
                </div>
              </div>

              {/* CONVERSION FUNNEL METRICS */}
              <section className="conversion-funnel-section">
                <div className="workspace-panel-card animate-admin-card delay-4">
                  <div className="panel-header">
                    <div className="panel-title-row">
                      <Percent size={20} />
                      <h3>Customer Conversion Funnel Flow</h3>
                    </div>
                    <p>Tracking the purchase conversion rate from store landing sessions to cargo dispatchments.</p>
                  </div>

                  <div className="funnel-container">
                    <div className="funnel-step-bar level-1">
                      <div className="funnel-step-label">
                        <span className="step-title">1. Store Traffic Sessions</span>
                        <span className="step-desc">Shop landings and page scrolls</span>
                      </div>
                      <div className="funnel-progress-wrap">
                        <div className="funnel-bar-fill" style={{ width: '100%' }}></div>
                        <span className="funnel-percentage-badge">12,400 Visits (100%)</span>
                      </div>
                    </div>

                    <div className="funnel-step-bar level-2">
                      <div className="funnel-step-label">
                        <span className="step-title">2. Add to Shopping Carts</span>
                        <span className="step-desc">Items placed in active shopping carts</span>
                      </div>
                      <div className="funnel-progress-wrap">
                        <div className="funnel-bar-fill" style={{ width: '38.8%' }}></div>
                        <span className="funnel-percentage-badge">4,820 Carts (38.8%)</span>
                      </div>
                    </div>

                    <div className="funnel-step-bar level-3">
                      <div className="funnel-step-label">
                        <span className="step-title">3. Initiated Checkouts</span>
                        <span className="step-desc">Billing and shipment steps completed</span>
                      </div>
                      <div className="funnel-progress-wrap">
                        <div className="funnel-bar-fill" style={{ width: '15.9%' }}></div>
                        <span className="funnel-percentage-badge">1,980 Forms (15.9%)</span>
                      </div>
                    </div>

                    <div className="funnel-step-bar level-4">
                      <div className="funnel-step-label">
                        <span className="step-title">4. Completed Purchases</span>
                        <span className="step-desc">Authorized transactions dispatched</span>
                      </div>
                      <div className="funnel-progress-wrap">
                        <div className="funnel-bar-fill" style={{ width: '7.2%' }}></div>
                        <span className="funnel-percentage-badge font-bold">892 Orders (7.2% overall rate)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: PRODUCT MANAGEMENT PANEL */}
          {activeTab === 'products' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              <section className="admin-hero visible">
                <div className="admin-hero-content animate-slide-right">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">STORE CATALOGUE OVERSEE</span>
                      <h1 className="admin-title">PRODUCT MANAGEMENT</h1>
                      <p className="admin-description">
                        Create, modify, and delete catalog products. Custom preset mockups, categories, SKUs, and stock limits 
                        are pushed dynamically to global dashboards.
                      </p>
                    </div>

                    <div>
                      <button 
                        onClick={handleOpenAddModal}
                        className="export-analytics-btn text-bold"
                        style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', gap: '6px' }}
                      >
                        <Plus size={15} />
                        <span>Add New Product</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="workspace-panel-card animate-admin-card full-width">
                <div className="panel-header" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div className="panel-title-row">
                    <Package size={20} />
                    <h3>Active Store Products ({inventory.length})</h3>
                  </div>
                  <p>Updates instantly. Deleting products automatically drops them from stock displays.</p>
                </div>

                <div className="ledger-table-wrapper">
                  <table className="ledger-table align-middle">
                    <thead>
                      <tr>
                        <th>Product Preview</th>
                        <th>SKU Code</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Active Stock</th>
                        <th className="text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id}>
                          <td className="product-cell">
                            <div className="product-table-item">
                              <div className="product-thumb">
                                <img src={item.image} alt={item.name} />
                              </div>
                              <span className="product-name-txt">{item.name}</span>
                            </div>
                          </td>
                          <td className="sku-code">{item.sku}</td>
                          <td>
                            <span className="category-pill-tag">
                              {item.category || 'Tops'}
                            </span>
                          </td>
                          <td className="amount-txt">${item.price.toFixed(2)}</td>
                          <td>
                            <div className="stock-count-cell">
                              <span className={`stock-count-number ${item.stock < 15 ? 'font-red' : ''}`}>
                                {item.stock} Units
                              </span>
                              {item.stock < 15 && <span className="warning-bullet-low"></span>}
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="operations-group">
                              <button 
                                onClick={() => handleOpenEditModal(item)}
                                className="action-pill-btn edit"
                                title="Edit Product details"
                              >
                                <Edit size={12} />
                                <span>Edit</span>
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(item.id, item.name)}
                                className="action-pill-btn delete"
                                title="Delete Product"
                              >
                                <Trash2 size={12} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEDICATED ORDERS LEDGER */}
          {activeTab === 'orders' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              <section className="admin-hero visible">
                <div className="admin-hero-content animate-slide-right">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">TRANSACTIONS LOG</span>
                      <h1 className="admin-title">RECENT ORDERS LEDGER</h1>
                      <p className="admin-description">
                        Monitor active transaction streams, review cargo carriers, and execute fast dispatch orders 
                        to advance shipping states.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="workspace-panel-card animate-admin-card full-width">
                <div className="panel-header">
                  <div className="panel-title-row">
                    <ShoppingBag size={20} />
                    <h3>Live Transactions Ledger</h3>
                  </div>
                  <p>Updates instantly based on terminal dispatches. Click action to advance shipment state.</p>
                </div>

                <div className="ledger-table-wrapper">
                  <table className="ledger-table">
                    <thead>
                      <tr>
                        <th>Order Code</th>
                        <th>Customer</th>
                        <th>Subtotal</th>
                        <th>Order Date</th>
                        <th>Consignment Carrier</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="order-id">{order.id}</td>
                          <td className="customer-name">{order.customer}</td>
                          <td className="amount">${order.total.toFixed(2)}</td>
                          <td className="date">{order.date}</td>
                          <td className="carrier">{order.carrier}</td>
                          <td>
                            <span className={`status-pill ${order.status.toLowerCase()}`}>
                              {order.status === 'Delivered' && <CheckCircle size={12} />}
                              {order.status === 'Shipped' && <Truck size={12} />}
                              {order.status === 'Processing' && <Clock size={12} />}
                              <span>{order.status}</span>
                            </span>
                          </td>
                          <td className="text-right">
                            {order.status !== 'Delivered' ? (
                              <button 
                                onClick={() => handleDispatchOrder(order.id)}
                                className="fast-dispatch-btn"
                              >
                                <RefreshCw size={12} className="spin-on-hover" />
                                <span>{order.status === 'Processing' ? 'Ship package' : 'Deliver'}</span>
                              </button>
                            ) : (
                              <span className="completed-label">Checked ✓</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEDICATED INVENTORY STOCK MONITOR */}
          {activeTab === 'inventory' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              <section className="admin-hero visible">
                <div className="admin-hero-content animate-slide-right">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">STORE CATALOG METRICS</span>
                      <h1 className="admin-title">STOCK LEVELS MONITOR</h1>
                      <p className="admin-description">
                        Monitor active stock volume registers, verify individual SKU prices, and perform direct inventory 
                        restocking overrides.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="workspace-panel-card animate-admin-card full-width">
                <div className="panel-header">
                  <div className="panel-title-row">
                    <Database size={20} />
                    <h3>SKU Catalog Inventory</h3>
                  </div>
                  <p>Low stock indicators automatically flag products falling under 15 units.</p>
                </div>

                <div className="stock-list full-width">
                  {inventory.map((item) => {
                    const isLow = item.stock < 15;
                    const fillPercent = Math.min((item.stock / 80) * 100, 100);

                    return (
                      <div key={item.id} className="stock-product-row expanded">
                        <div className="stock-product-meta">
                          <div className="product-thumb">
                            <img src={item.image} alt={item.name} />
                          </div>
                          
                          <div className="meta-text">
                            <h4>{item.name}</h4>
                            <span className="sku">SKU Code: <strong>{item.sku}</strong> • Catalog Price: <strong>${item.price}</strong></span>
                          </div>
                          
                          {isLow && (
                            <span className="low-stock-badge pulsing">
                              <AlertCircle size={12} />
                              <span>LOW STOCK WARNING</span>
                            </span>
                          )}
                        </div>

                        <div className="stock-level-progression flex-fill">
                          <div className="progression-header">
                            <span>Current Stock: <strong>{item.stock} units</strong></span>
                            <span>{Math.round(fillPercent)}% capacity</span>
                          </div>
                          
                          <div className="stock-meter-bar">
                            <div 
                              className={`stock-fill ${isLow ? 'low' : item.stock < 40 ? 'warning' : 'stable'}`} 
                              style={{ width: `${fillPercent}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="stock-action-row margin-left">
                          <button 
                            onClick={() => handleRestockProduct(item.id, item.name)}
                            className="restock-btn large"
                          >
                            <Plus size={14} />
                            <span>Restock (+50 Units)</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB 6: STATEFUL ERROR LOGS PANEL */}
          {activeTab === 'error-logs' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              <section className="admin-hero visible">
                <div className="admin-hero-content animate-slide-right">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">SYSTEM TELEMETRY ALARMS</span>
                      <h1 className="admin-title">ERROR REGISTRY LOGS</h1>
                      <p className="admin-description">
                        Monitor live cloud gateway exceptions, payment verification latency anomalies, and low stock alarms. 
                        Acknowledge incidents to clear active console warnings.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="workspace-panel-card animate-admin-card full-width">
                <div className="panel-header" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div className="panel-title-row">
                    <ShieldAlert size={20} className="glow-icon-error" />
                    <h3>Active Unresolved Alarms ({errors.length})</h3>
                  </div>
                  <p>Incidents verified by cloud telemetry checks. Select Acknowledge to clear rows from console dashboards.</p>
                </div>

                {errors.length > 0 ? (
                  <div className="ledger-table-wrapper">
                    <table className="ledger-table align-middle">
                      <thead>
                        <tr>
                          <th>Alarm ID</th>
                          <th>Incident Code</th>
                          <th>Module</th>
                          <th>Error Message</th>
                          <th>Severity</th>
                          <th>Timestamp</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {errors.map((err) => (
                          <tr key={err.id} className="error-log-row-interactive">
                            <td className="err-code-txt font-bold">{err.id}</td>
                            <td className="err-module-txt"><span className="err-code-capsule">{err.code}</span></td>
                            <td className="err-module-txt">{err.module}</td>
                            <td className="err-msg-txt text-left">{err.message}</td>
                            <td>
                              <span className={`err-level-badge ${err.level.toLowerCase()}`}>
                                {err.level}
                              </span>
                            </td>
                            <td className="err-time-txt font-mono">{err.time}</td>
                            <td className="text-right">
                              <button 
                                onClick={() => handleAcknowledgeError(err.id, err.code)}
                                className="action-pill-btn edit text-bold"
                                style={{ borderColor: 'var(--color-border)' }}
                              >
                                <UserCheck size={11} />
                                <span>Acknowledge</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="logs-empty-state">
                    <CheckCircle size={32} style={{ color: '#16a34a', marginBottom: '12px' }} />
                    <h4>ZERO ACTIVE ALARMS</h4>
                    <p>All core merchant pipelines, Stripe SSL certificates, and logistics gateways are operating stable.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NEW TAB 7: ADMINISTRATIVE AUDIT TRAILS PANEL */}
          {activeTab === 'audit-logs' && (
            <div className={`workspace-tab-panel ${animateIn ? 'reveal-active' : ''}`}>
              <section className="admin-hero visible">
                <div className="admin-hero-content animate-slide-right">
                  <div className="admin-header-row">
                    <div>
                      <span className="admin-subtitle">SECURITY COMPLIANCE AUDIT</span>
                      <h1 className="admin-title">SYSTEM AUDIT TRAILS</h1>
                      <p className="admin-description">
                        Inspect deconstructed timeline logs detailing staff overrides, product catalogue edits, 
                        financial CSV exports, and automatic system security caches resets.
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="admin-time-selectors">
                      {['All', 'Action', 'System', 'Security'].map((filt) => (
                        <button 
                          key={filt}
                          onClick={() => setAuditFilter(filt)}
                          className={`time-filter-btn ${auditFilter === filt ? 'active' : ''}`}
                        >
                          {filt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <div className="workspace-panel-card animate-admin-card full-width">
                <div className="panel-header" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div className="panel-title-row">
                    <FileText size={20} />
                    <h3>Compliance Audited Stream ({filteredAudits.length} Records)</h3>
                  </div>
                  <p>Read-only cryptographically signed telemetry trail log index. Non-modifiable registry files.</p>
                </div>

                <div className="audit-timeline-stream">
                  {filteredAudits.map((aud) => (
                    <div key={aud.id} className="audit-timeline-item">
                      <div className="audit-timeline-badge">
                        <Terminal size={14} className="audit-terminal-icon" />
                      </div>
                      
                      <div className="audit-timeline-content">
                        <div className="audit-meta-header">
                          <span className="audit-actor font-bold">{aud.actor}</span>
                          <span className="audit-role-pill">{aud.role}</span>
                          <span className={`audit-type-pill ${aud.type.toLowerCase()}`}>{aud.type}</span>
                          <span className="audit-ip font-mono">{aud.ip}</span>
                          <span className="audit-time font-mono">{aud.time} UTC</span>
                        </div>
                        <p className="audit-action-desc">{aud.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* OVERLAY MODAL FORM FOR ADDING / EDITING PRODUCTS */}
      {isModalOpen && (
        <div className="modal-backdrop-overlay">
          <div className="glassmorphic-modal-box">
            
            <div className="modal-header-row">
              <div className="modal-identity">
                <Package size={18} />
                <span>{modalMode === 'add' ? 'ADD PRODUCT TO CATALOG' : 'EDIT CATALOG PRODUCT'}</span>
              </div>
              <button className="modal-close-cross" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="modal-form-content" onSubmit={handleFormSubmit}>
              
              <div className="form-group-cell">
                <label className="form-label-txt">Product Label Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Combed Cotton Henley" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="modal-form-input" 
                />
              </div>

              <div className="form-grid-row">
                <div className="form-group-cell">
                  <label className="form-label-txt">SKU Identifier</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. SKU-HNLY-TEE" 
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="modal-form-input font-mono" 
                  />
                </div>

                <div className="form-group-cell">
                  <label className="form-label-txt">Category Segment</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="modal-form-select"
                  >
                    <option value="Tops">Tops / Tees</option>
                    <option value="Casual">Casual Polos / Shirts</option>
                    <option value="Denim">Denim / Jeans</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-row">
                <div className="form-group-cell">
                  <label className="form-label-txt">Retail Price ($)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    step="0.01"
                    placeholder="e.g. 120" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="modal-form-input" 
                  />
                </div>

                <div className="form-group-cell">
                  <label className="form-label-txt">Active Stock volume</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    placeholder="e.g. 40" 
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="modal-form-input" 
                  />
                </div>
              </div>

              <div className="form-group-cell">
                <label className="form-label-txt">Catalogue Image Mockup Preset</label>
                <div className="preset-graphics-selector">
                  {productPresets.map((preset) => (
                    <button 
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.path })}
                      className={`preset-thumb-btn ${formData.image === preset.path ? 'active' : ''}`}
                    >
                      <div className="preset-image-preview">
                        <img src={preset.path} alt={preset.label} />
                      </div>
                      <span className="preset-label-txt">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-action-row">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="modal-btn-action cancel"
                >
                  Cancel
                </button>
                
                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="modal-btn-action submit"
                >
                  {formLoading ? (
                    <>
                      <RefreshCw size={14} className="spin" />
                      <span>{modalMode === 'add' ? 'Creating...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{modalMode === 'add' ? 'Create Product' : 'Save Changes'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
