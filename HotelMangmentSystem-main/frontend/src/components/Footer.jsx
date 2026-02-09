import React from 'react';
import '../css/Footer.css';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Hotel Dubai</h3>
            <p className="footer-description">
              Experience luxury and comfort in the heart of Dubai. Your perfect getaway awaits.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                <FiTwitter />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="column-title">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>Dubai Marina, Dubai, UAE</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>info@hoteldubai.com</span>
              </div>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="column-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/our-rooms">Rooms & Suites</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hotel Dubai. All rights reserved.</p>
          <p>mohamadit102@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;