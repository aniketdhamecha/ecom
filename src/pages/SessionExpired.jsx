import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldAlert, ArrowLeft, RefreshCw, Key, CheckCircle } from 'lucide-react';

const SessionExpired = () => {
  const [animate, setAnimate] = useState(false);
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReauthSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    
    setTimeout(() => {
      setAuthLoading(false);
      setToastMessage("Session re-authenticated successfully! Returning to active console.");
      
      setTimeout(() => {
        setToastMessage('');
        window.location.href = '/admin';
      }, 1500);
    }, 1800);
  };

  return (
    <div className="security-page-wrapper">
      {/* Floating success toast alerts */}
      {toastMessage && (
        <div className="admin-success-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className={`security-card-box ${animate ? 'reveal-active' : ''}`}>
        
        {/* Animated Timeout Clock Box */}
        <div className="security-badge-clock warning">
          <Clock size={36} className="glow-clock-icon" />
        </div>

        <span className="security-alert-label warning">
          <ShieldAlert size={12} />
          <span>SECURITY TIMEOUT - AUTH KEYS ELAPSED</span>
        </span>

        <h1 className="security-title">SESSION EXPIRED</h1>
        <p className="security-description">
          For your data privacy and financial safety, inactive combed cotton portal sessions are automatically 
          invalidated after 15 minutes of idle time.
        </p>

        {/* Password Re-authentication Form */}
        <form className="security-reauth-form" onSubmit={handleReauthSubmit}>
          <div className="reauth-form-cell">
            <label className="reauth-cell-label">Admin Passcode credentials</label>
            <div className="reauth-input-container">
              <Key size={16} className="reauth-key-icon" />
              <input 
                type="password" 
                required
                placeholder="Enter password to unlock active session..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="reauth-password-input"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={authLoading}
            className="sec-route-btn primary full-width justify-center"
            style={{ height: '46px' }}
          >
            {authLoading ? (
              <>
                <RefreshCw size={16} className="spin" />
                <span>Re-authenticating...</span>
              </>
            ) : (
              <>
                <span>Unfreeze Active Session</span>
              </>
            )}
          </button>
        </form>

        {/* Return link */}
        <div className="security-quick-routes justify-center">
          <Link to="/" className="sec-route-btn secondary full-width justify-center">
            <ArrowLeft size={16} />
            <span>Return to Home Portal</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SessionExpired;
