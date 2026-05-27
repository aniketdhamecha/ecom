import React, { useRef, useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === '/register';

  // Refs for scroll reveal animations
  const panelRef = useRef(null);
  const formRef = useRef(null);

  // Intersection visibility states
  const [isVisible, setIsVisible] = useState(false);

  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Scroll automatically to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => {
      if (panelRef.current) {
        observer.unobserve(panelRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      setSuccessMsg(`Welcome to SHOP.CO, ${name}! Your account has been created successfully.`);
    } else {
      setSuccessMsg(`Welcome back! You have successfully signed in.`);
    }
    setTimeout(() => {
      setSuccessMsg('');
      navigate('/');
    }, 2500);
  };

  return (
    <div className="auth-page">
      <div className={`auth-container page-container ${isVisible ? 'visible' : ''}`} ref={panelRef}>
        {/* Left Side: Brand Showcase Panel (Slides left-to-right) */}
        <div className="auth-showcase-panel">
          <div className="auth-showcase-overlay"></div>
          <div className="auth-showcase-content">
            <span className="auth-showcase-badge">
              <Sparkles size={14} /> NEW SEASON ARRIVALS
            </span>
            <h2 className="auth-showcase-title">
              EMBODY YOUR INDIVIDUAL STYLE
            </h2>
            <p className="auth-showcase-text">
              Join SHOP.CO to access bespoke combed cotton capsules, dynamic stretch denim fits, 
              and global curated capsules tailored for your confidence.
            </p>
            <div className="auth-showcase-stars">
              <svg width="44" height="44" viewBox="0 0 104 104" fill="none">
                <path d="M52 0C52 28.7183 75.2817 52 104 52C75.2817 52 52 75.2817 52 104C52 75.2817 28.7183 52 0 52C28.7183 52 52 28.7183 52 0Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel (Slides right-to-left, fades up) */}
        <div className="auth-form-panel" ref={formRef}>
          <div className="auth-form-header">
            <h1 className="auth-form-title">
              {isRegister ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="auth-form-subtitle">
              {isRegister ? 'Register to start shopping and get 20% off.' : 'Enter your credentials to access your portal.'}
            </p>
          </div>

          {successMsg && (
            <div className="auth-success-toast">
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-inputs-form">
            {isRegister && (
              <div className="auth-input-group">
                <label className="auth-input-label">Full Name</label>
                <div className="auth-input-box">
                  <User size={18} className="auth-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input-field"
                  />
                </div>
              </div>
            )}

            <div className="auth-input-group">
              <label className="auth-input-label">Email Address</label>
              <div className="auth-input-box">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input-field"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-input-label">Password</label>
              <div className="auth-input-box">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="auth-options-row">
                <div className="auth-remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="/forgot-password" className="auth-forgot-link">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              <span>{isRegister ? 'Register Now' : 'Sign In'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Social login divider */}
          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          {/* Social buttons */}
          <div className="auth-social-buttons">
            <button className="auth-social-btn" type="button">
              <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px' }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button className="auth-social-btn" type="button">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ marginRight: '6px' }}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.1.08.2.12.3.12.87 0 1.95-.57 2.51-1.45z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <p className="auth-toggle-link-row">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <Link to="/login" className="auth-toggle-link">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link to="/register" className="auth-toggle-link">
                  Sign Up
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
