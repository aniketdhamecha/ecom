import React, { useEffect, useState } from 'react';
import { RefreshCw, ShieldAlert, Cpu } from 'lucide-react';

const Maintenance = () => {
  const [animate, setAnimate] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Simulating a system check, in a real environment it would check if server is active
      alert("System check completed. Uptime countdown active. The store is still undergoing scheduled database optimization.");
    }, 1500);
  };

  return (
    <div className="security-page-wrapper">
      <div className={`security-card-box ${animate ? 'reveal-active' : ''}`}>
        
        {/* Animated Radar Pulse Box */}
        <div className="radar-ping-box">
          <div className="radar-outer-ring"></div>
          <div className="radar-inner-ring"></div>
          <div className="radar-core-badge">
            <Cpu size={32} />
          </div>
        </div>

        <span className="security-alert-label warning">
          <ShieldAlert size={12} />
          <span>SCHEDULED MAINTENANCE IN PROGRESS</span>
        </span>

        <h1 className="security-title">UNDER CONSTRUCTION</h1>
        <p className="security-description">
          We are currently optimizing our cloud database segments and expanding combed cotton logistics grids 
          to improve transaction speeds.
        </p>

        {/* Dynamic estimated progress counter bar */}
        <div className="maintenance-progress-meter">
          <div className="progress-labels">
            <span>Server Uptime Progress</span>
            <span>72% completed</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: '72%' }}></div>
          </div>
          <span className="estimated-counter-txt">Estimated time remaining: <strong>02h 14m</strong></span>
        </div>

        {/* Action button */}
        <div className="security-quick-routes">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="sec-route-btn primary full-width justify-center"
          >
            <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
            <span>{isRefreshing ? 'Checking System...' : 'Refresh Portal State'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Maintenance;
