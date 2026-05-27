import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Lock, Loader2, CheckCircle } from 'lucide-react';

const AccessDenied = () => {
  const [animate, setAnimate] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle'); // 'idle', 'sending', 'success'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRequestAccess = () => {
    setRequestStatus('sending');
    setTimeout(() => {
      setRequestStatus('success');
      alert("Access authorization ticket raised dynamically! Security keys dispatched to system logs.");
    }, 1800);
  };

  return (
    <div className="security-page-wrapper">
      <div className={`security-card-box ${animate ? 'reveal-active' : ''}`}>
        
        {/* Shield Alert Badge */}
        <div className="security-badge-shield error">
          <div className="badge-shield-glow"></div>
          <Lock size={36} className="glow-icon" />
        </div>

        <span className="security-alert-label error">
          <ShieldAlert size={12} />
          <span>FIREWALL EXCEPTION - ACCESS RESTRICTED</span>
        </span>

        <h1 className="security-title">ACCESS DENIED</h1>
        <p className="security-description">
          Your active session credentials do not contain authorization headers required to view this combed cotton 
          merchant console page.
        </p>

        {/* Security parameters box */}
        <div className="security-parameters-card">
          <div className="parameter-row">
            <span className="lbl">Client IP Marker:</span>
            <span className="val font-mono">192.168.42.105</span>
          </div>
          <div className="parameter-row">
            <span className="lbl">Requested Scope:</span>
            <span className="val font-mono">/admin-dashboard/*</span>
          </div>
          <div className="parameter-row">
            <span className="lbl">Security Incident Code:</span>
            <span className="val font-mono">INC_AUTH_403_SEC</span>
          </div>
        </div>

        {/* Dynamic button states */}
        <div className="security-quick-routes vertical">
          {requestStatus !== 'success' ? (
            <button 
              onClick={handleRequestAccess}
              disabled={requestStatus === 'sending'}
              className="sec-route-btn primary full-width justify-center"
            >
              {requestStatus === 'sending' ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Requesting Access Keys...</span>
                </>
              ) : (
                <>
                  <span>Raise Security Ticket</span>
                </>
              )}
            </button>
          ) : (
            <div className="security-success-banner">
              <CheckCircle size={14} />
              <span>Ticket raised successfully (INC-9941-A)</span>
            </div>
          )}

          <Link to="/" className="sec-route-btn secondary full-width justify-center">
            <ArrowLeft size={16} />
            <span>Return to Home Portal</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AccessDenied;
