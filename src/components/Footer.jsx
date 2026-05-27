import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className={`footer-wrapper ${isVisible ? 'visible' : ''}`} ref={footerRef}>
      {/* Floating Newsletter Section */}
      <div className="newsletter-banner page-container">
        <h2 className="newsletter-title">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <div className="newsletter-input-container">
            <Mail size={20} color="#a0a0a0" />
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="newsletter-submit-btn">
            {subscribed ? 'Subscribed!' : 'Subscribe to Newsletter'}
          </button>
        </form>
      </div>

      {/* Footer Content */}
      <div className="page-container">
        <div className="footer-content">
          {/* Logo & Corporate Statement */}
          <div className="footer-brand-column">
            <span className="footer-logo">SHOP.CO</span>
            <p>
              We have clothes that suits your style and which you're proud to wear.
              From women to men.
            </p>
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="footer-nav-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-column-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/career">Career</Link></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-column-title">Help</h4>
            <ul className="footer-column-links">
              <li><Link to="/support">Customer Support</Link></li>
              <li><Link to="/delivery">Delivery Details</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-column-title">Faq & Tools</h4>
            <ul className="footer-column-links">
              <li><Link to="/faq">Faq Directory</Link></li>
              <li><Link to="/wishlist">My Wishlist</Link></li>
              <li><Link to="/compare">Compare Styles</Link></li>
              <li><Link to="/orders">Orders History</Link></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-column-links">
              <li><Link to="/ebooks">Free eBooks</Link></li>
              <li><Link to="/tutorial">Development Tutorial</Link></li>
              <li><Link to="/blog">How to - Blog</Link></li>
              <li><Link to="/youtube">Youtube Playlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom row: Copyright & Payments */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            Shop.co © 2000-2026, All Rights Reserved
          </span>
          <div className="footer-payment-badges">
            {/* Visa */}
            <div className="payment-badge" aria-label="Visa">
              <svg viewBox="0 0 48 30" width="36" height="24">
                <rect width="48" height="30" rx="4" fill="#ffffff" />
                <path d="M19 8h2.6l-1.6 8.3H17.4L19 8zm14.1 0c-.6 0-1 .3-1.2.9l-3.3 7.4h2.7l.5-1.5h3.2l.3 1.5h2.4L35 8h-1.9zm-1 5.3l1.1-3.2 1.1 3.2h-2.2zM28.1 8c-1.3-.4-2.8-.2-3.8.3l.5 2.1c.9-.4 2-.6 2.8-.5.7.1 1 .4 1 .9 0 .4-.3.7-.9.9-1.2.4-2.5.6-2.5 2.1 0 1.2 1 2 2.7 2.1 1.2.1 2.5-.2 3.3-.7l-.5-2.1c-.8.4-1.8.6-2.6.5-.6 0-.8-.3-.8-.6 0-.4.4-.7.9-.9 1.2-.4 2.5-.7 2.5-2.1 0-1.2-1-2-2.7-2.1zM14 8l-2.4 5.7-.3-1.4C10.7 10 9 8.5 7.2 8h-.2L9.5 16.3h2.7L16.4 8H14z" fill="#1A1F71" />
              </svg>
            </div>
            
            {/* Mastercard */}
            <div className="payment-badge" aria-label="Mastercard">
              <svg viewBox="0 0 48 30" width="36" height="24">
                <rect width="48" height="30" rx="4" fill="#ffffff" />
                <circle cx="20" cy="15" r="9" fill="#FF5F00" opacity="0.9" />
                <circle cx="28" cy="15" r="9" fill="#EB001B" opacity="0.9" />
                <path d="M24 9.5c1.8 1.4 3 3.6 3 5.5s-1.2 4.1-3 5.5c-1.8-1.4-3-3.6-3-5.5s1.2-4.1 3-5.5z" fill="#FF5F00" />
              </svg>
            </div>

            {/* PayPal */}
            <div className="payment-badge" aria-label="PayPal">
              <svg viewBox="0 0 48 30" width="36" height="24">
                <rect width="48" height="30" rx="4" fill="#ffffff" />
                <path d="M16 8h4.5c2 0 3.3.4 3.9 1.2.5.6.6 1.4.4 2.3-.3 1.9-1.6 3.1-3.7 3.1H18.5L17.2 21H14L16 8z" fill="#003087" />
                <path d="M19 10h4.5c2 0 3.3.4 3.9 1.2.5.6.6 1.4.4 2.3-.3 1.9-1.6 3.1-3.7 3.1H21.5L20.2 23H17L19 10z" fill="#0079C1" opacity="0.6" />
                <path d="M19 10h4.5c1.8 0 3 .4 3.5 1.1.4.5.4 1.2.3 2-.3 1.9-1.6 3.1-3.7 3.1H21.5L20.2 23H17L19 10z" fill="#00457C" />
              </svg>
            </div>

            {/* Apple Pay */}
            <div className="payment-badge" aria-label="Apple Pay">
              <svg viewBox="0 0 48 30" width="36" height="24">
                <rect width="48" height="30" rx="4" fill="#ffffff" />
                <path d="M18.2 12.8c0-1.8 1.5-2.7 1.6-2.7-.8-1.2-2.1-1.4-2.6-1.4-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.5.7-3.2 1.9-1.4 2.4-.4 6 .9 8 0 .4.7 1.2 1.1 1.6.5.5 1 .9 1.5.9.5 0 .7-.3 1.3-.3.6 0 .8.3 1.4.3.6 0 1-.4 1.5-.9.6-.8.8-1.7.8-1.7-.1 0-1.5-.6-1.5-2.2zM16.5 7.6c.5-.7.9-1.6.8-2.6-.8.1-1.8.6-2.4 1.3-.5.6-.9 1.5-.8 2.5.9.1 1.9-.5 2.4-1.2z" fill="#000000" />
                <text x="21" y="20" font-family="-apple-system, sans-serif" font-weight="700" font-size="12" fill="#000000">Pay</text>
              </svg>
            </div>

            {/* Google Pay */}
            <div className="payment-badge" aria-label="Google Pay">
              <svg viewBox="0 0 48 30" width="36" height="24">
                <rect width="48" height="30" rx="4" fill="#ffffff" />
                <path d="M14.5 12.1v4.7H13v-4.7z" fill="#5F6368" />
                <path d="M18 12.5c-.3-.3-.7-.5-1.2-.5-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.5 0 .9-.2 1.2-.5v.4c0 .6-.3 1-1 1-.5 0-.9-.3-1-.7l-1.3.5c.3.8 1.1 1.4 2.3 1.4 1.5 0 2.3-1 2.3-2.6v-3.5H18v.3zm-1.1 2.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#5F6368" />
                <path d="M22.5 13.8l-1.5 3.7H20l1.3-3-.2-.5-1.5-3.5h1.4l.9 2.2z" fill="#5F6368" />
                <path d="M8.2 13.5c0-.8-.7-1.5-1.5-1.5H4v4.5H5v-1.7h1.7c.8 0 1.5-.7 1.5-1.3zm-1.5.5H5v-1h1.7c.3 0 .5.2.5.5s-.2.5-.5.5zM10.7 12c-1 0-1.7.7-1.7 1.7s.7 1.7 1.7 1.7c.5 0 .9-.2 1.2-.5l-.8-.8c-.2.2-.3.3-.4.3-.4 0-.7-.3-.7-.7h2v-.3c0-1.1-.7-1.4-1.3-1.4zm0 .8c.4 0 .6.2.6.5h-1.2c0-.3.2-.5.6-.5z" fill="#E8EAED" />
                <path d="M5.5 14h-1v-4h1c.8 0 1.5.6 1.5 1.3 0 .8-.7 1.3-1.5 1.3s-1 .5-1 1.4zm0-2.4H5v1.4h.5c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7z" fill="#4285F4" />
                <path d="M9.5 11.5c0-.8-.7-1.5-1.5-1.5H5v4.5H6v-1.7h2c.8 0 1.5-.7 1.5-1.3zm-1.5.5H6v-1h2c.3 0 .5.2.5.5s-.2.5-.5.5z" fill="#EA4335" />
                <path d="M12.5 10c-1 0-1.7.7-1.7 1.7s.7 1.7 1.7 1.7c.5 0 .9-.2 1.2-.5l-.8-.8c-.2.2-.3.3-.4.3-.4 0-.7-.3-.7-.7h2v-.3c0-1.1-.7-1.4-1.3-1.4zm0 .8c.4 0 .6.2.6.5h-1.2c0-.3.2-.5.6-.5z" fill="#FBBC05" />
                <path d="M16 11.5l-1.5 3.7h-1l1.3-3-.2-.5-1.5-3.5h1.4l.9 2.2z" fill="#34A853" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
