import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiUsers, FiStar, FiMaximize2 } from 'react-icons/fi';
import '../css/OurRooms.css';

// Import room images
import photo1 from '../img/1.jpg';
import photo2 from '../img/2.jpg';
import photo3 from '../img/3.jpg';
import photo4 from '../img/4.jpg';
import photo5 from '../img/5.jpg';
import photo6 from '../img/6.jpg';
import photo7 from '../img/7.jpg';
import photo8 from '../img/8.jpg';
import photo9 from '../img/9.jpg';
import photo10 from '../img/10.jpeg';
import photo11 from '../img/11.jpg';
import photo12 from '../img/12.jpg';
import photo13 from '../img/13.jpg';
import photo14 from '../img/14.jpg';
import photo15 from '../img/15.jpg';
import photo16 from '../img/16.jpg';
import photo17 from '../img/17.jpg';

const roomData = [
  {
    id: 1,
    title: 'Deluxe Room',
    description: 'Experience luxury in our Deluxe Rooms featuring modern design and premium amenities.',
    price: '$299',
    period: '/ night',
    size: '45 m²',
    guests: '2 Guests',
    rating: '4.8',
    features: ['King Size Bed', 'City View', 'Free WiFi', 'Mini Bar'],
    images: [photo1, photo2, photo3, photo4],
    highlights: ['Best Seller']
  },
  {
    id: 2,
    title: 'Executive Suite',
    description: 'Indulge in ultimate luxury with our Executive Suites and panoramic views.',
    price: '$499',
    period: '/ night',
    size: '75 m²',
    guests: '3 Guests',
    rating: '4.9',
    features: ['Separate Living Area', 'Panoramic View', 'Jacuzzi', 'Office Space'],
    images: [photo5, photo6, photo7, photo8],
    highlights: ['Most Popular']
  },
  {
    id: 3,
    title: 'Family Suite',
    description: 'Spacious Family Suites designed for comfort with interconnected rooms.',
    price: '$399',
    period: '/ night',
    size: '65 m²',
    guests: '4 Guests',
    rating: '4.7',
    features: ['Interconnected Rooms', 'Kitchenette', 'Extra Beds', 'Baby Cot'],
    images: [photo9, photo10, photo11, photo12],
    highlights: ['Family Friendly']
  },
  {
    id: 4,
    title: 'Presidential Suite',
    description: 'The epitome of luxury with private terrace and premium services.',
    price: '$899',
    period: '/ night',
    size: '120 m²',
    guests: '4 Guests',
    rating: '5.0',
    features: ['Private Terrace', 'Personal Butler', 'Home Theater', 'Private Gym'],
    images: [photo13, photo14, photo15, photo16],
    highlights: ['Luxury']
  }
];

function OurRooms() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState({});

  const handleViewDetails = (roomId) => {
    navigate(`/room-details/${roomId}`);
  };

  const handleBookNow = (roomId) => {
    navigate('/addBooking', { state: { roomId } });
  };

  return (
    <div className="rooms-page">
      {/* Header */}
      <div className="rooms-header">
        <h1>Our Rooms & Suites</h1>
        <p>Experience comfort and luxury in our carefully designed accommodations</p>
      </div>

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {roomData.map((room) => (
          <div key={room.id} className="room-card">
            {/* Image Section */}
            <div className="room-image-container">
              <img 
                src={room.images[selectedImage[room.id] || 0]} 
                alt={room.title}
                className="room-main-image"
              />
              
              {/* Highlights */}
              <div className="room-badges">
                {room.highlights.map((highlight, idx) => (
                  <span key={idx} className="room-badge">{highlight}</span>
                ))}
              </div>

              {/* Image Selector */}
              <div className="image-selector">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`image-dot ${(selectedImage[room.id] || 0) === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage({...selectedImage, [room.id]: idx})}
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="room-content">
              <div className="room-title-section">
                <h3>{room.title}</h3>
                <div className="room-price">
                  <span className="price">{room.price}</span>
                  <span className="period">{room.period}</span>
                </div>
              </div>

              <div className="room-meta">
                <span><FiMaximize2 /> {room.size}</span>
                <span><FiUsers /> {room.guests}</span>
                <span><FiStar /> {room.rating}</span>
              </div>

              <p className="room-description">{room.description}</p>

              <div className="room-features">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="feature">
                    <FiCheck /> {feature}
                  </div>
                ))}
              </div>

              <div className="room-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => handleViewDetails(room.id)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleBookNow(room.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="rooms-footer">
        <h2>Need Assistance?</h2>
        <p>Our team is here to help you choose the perfect room</p>
        <button className="btn-contact">Contact Us</button>
      </div>
    </div>
  );
}

export default OurRooms;