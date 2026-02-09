import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUsers, FiMaximize2, FiStar, FiCheck, FiCalendar } from 'react-icons/fi';
import '../css/RoomDetails.css';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // بيانات الغرف من OurRooms
  const roomData = [
    {
      id: 1,
      title: 'Deluxe Room',
      description: 'Experience luxury in our Deluxe Rooms featuring modern design and premium amenities.',
      fullDescription: 'Our Deluxe Rooms offer a perfect blend of comfort and sophistication. Featuring floor-to-ceiling windows with stunning city views, king-size beds with premium linens, and a spacious marble bathroom with rain shower. Includes complimentary high-speed WiFi, 55" smart TV, Nespresso machine, and access to our executive lounge.',
      price: '$299',
      period: '/ night',
      size: '45 m²',
      guests: '2 Guests',
      rating: '4.8',
      features: ['King Size Bed', 'City View', 'Free WiFi', 'Mini Bar', 'Smart TV', 'Coffee Maker'],
      images: ['../img/1.jpg', '../img/2.jpg', '../img/3.jpg', '../img/4.jpg'],
      amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Minibar', 'Safe', 'Work Desk', 'Hairdryer']
    },
    // ... بيانات الغرف الأخرى
  ];

  useEffect(() => {
    const foundRoom = roomData.find(r => r.id === parseInt(id));
    setRoom(foundRoom);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="error-container">
        <h2>Room not found</h2>
        <p>The room you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="room-details-page">
      <div className="room-details-container">
        {/* Room Images */}
        <div className="room-images">
          <div className="main-image">
            <img src={room.images[selectedImage]} alt={room.title} />
          </div>
          <div className="thumbnail-images">
            {room.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${room.title} view ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Room Info */}
        <div className="room-info-section">
          <h1 className="room-title">{room.title}</h1>
          
          <div className="room-meta">
            <span><FiUsers /> {room.guests}</span>
            <span><FiMaximize2 /> {room.size}</span>
            <span><FiStar /> {room.rating} Rating</span>
          </div>

          <div className="room-price-section">
            <div className="price">
              <span className="amount">{room.price}</span>
              <span className="period">{room.period}</span>
            </div>
            <button className="book-now-btn">
              <FiCalendar /> Book Now
            </button>
          </div>

          <div className="room-description">
            <h3>Description</h3>
            <p>{room.fullDescription || room.description}</p>
          </div>

          <div className="room-features">
            <h3>Room Features</h3>
            <div className="features-grid">
              {room.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <FiCheck /> {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="room-amenities">
            <h3>Amenities</h3>
            <div className="amenities-list">
              {room.amenities.map((amenity, index) => (
                <span key={index} className="amenity-badge">{amenity}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;