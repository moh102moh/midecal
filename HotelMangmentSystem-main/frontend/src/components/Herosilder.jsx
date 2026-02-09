import React from 'react';
import '../css/HeroSlider.css';
import { Link } from 'react-router-dom';

function Heroslider() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Dubai Hotel</h1>
          <p className="hero-subtitle">
            Experience luxury and comfort in the heart of Dubai. Your perfect getaway awaits.
          </p>
          <div className="hero-buttons">
            <Link to="/our-rooms" className="hero-btn primary-btn">
              Explore Rooms
            </Link>
            <Link to="/about" className="hero-btn secondary-btn">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Heroslider;