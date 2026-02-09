import React from 'react';
import '../css/About.css';
import aboutHotel from '../img/about.jpg';
import { FiAward, FiMapPin, FiUsers } from 'react-icons/fi';

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-subtitle">About Our Hotel</h2>
            <h1 className="about-title">Hotel Dubai</h1>
            <p className="about-description">
              Established in 2022, Hotel Dubai represents the pinnacle of luxury hospitality 
              in the United Arab Emirates. Our commitment to excellence and innovation has 
              positioned us as a premier destination for travelers seeking unparalleled comfort 
              and service.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <FiAward />
                </div>
                <div className="feature-text">
                  <h3>Premium Quality</h3>
                  <p>5-star luxury experience</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <FiMapPin />
                </div>
                <div className="feature-text">
                  <h3>Prime Location</h3>
                  <p>Heart of Dubai city</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <FiUsers />
                </div>
                <div className="feature-text">
                  <h3>Expert Team</h3>
                  <p>Professional hospitality staff</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img src={aboutHotel} alt="Hotel Dubai exterior" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;