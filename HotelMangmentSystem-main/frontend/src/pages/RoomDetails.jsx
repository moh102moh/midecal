import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUsers, FiMaximize2, FiStar, FiCheck, FiCalendar } from 'react-icons/fi';
import '../css/RoomDetails.css';
const roomData = [
  {
    id: 1,
    title: 'Deluxe Room',
    description: 'Experience luxury in our Deluxe Rooms featuring modern design and premium amenities.',
    fullDescription: 'Our Deluxe Rooms offer a perfect blend of comfort and sophistication. Featuring floor-to-ceiling windows with stunning city views, king-size beds with premium linens, and a spacious marble bathroom with rain shower.',
    price: '$299',
    period: '/ night',
    size: '45 m²',
    guests: '2 Guests',
    rating: '4.8',
    features: ['King Size Bed', 'City View', 'Free WiFi', 'Mini Bar', 'Smart TV', 'Coffee Maker'],
    images: ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Minibar', 'Safe', 'Work Desk', 'Hairdryer']
  },
  {
    id: 2,
    title: 'Executive Suite',
    description: 'Premium suite with spacious living area and executive lounge access.',
    fullDescription: 'The Executive Suite offers a separate living room, luxury bathroom with bathtub, premium bedding, and exclusive executive lounge benefits.',
    price: '$450',
    period: '/ night',
    size: '70 m²',
    guests: '3 Guests',
    rating: '4.9',
    features: ['King Bed', 'Living Room', 'Ocean View', 'Mini Bar', 'Smart TV', 'Jacuzzi'],
    images: ['/img/5.jpg', '/img/6.jpg', '/img/7.jpg', '/img/8.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Coffee Machine', 'Bathtub', 'Safe']
  },
  {
    id: 3,
    title: 'Family Room',
    description: 'Comfortable space designed for families with children.',
    fullDescription: 'Spacious family room with two queen beds, child-friendly amenities, and a relaxing seating area perfect for family stays.',
    price: '$350',
    period: '/ night',
    size: '60 m²',
    guests: '4 Guests',
    rating: '4.7',
    features: ['2 Queen Beds', 'Garden View', 'Free WiFi', 'Mini Fridge', 'Smart TV'],
    images: ['/img/9.jpg', '/img/10.jpg', '/img/11.jpg', '/img/12.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Fridge', 'Safe']
  },
  {
    id: 4,
    title: 'Standard Room',
    description: 'Affordable comfort with modern amenities.',
    fullDescription: 'Our Standard Room offers cozy accommodation with essential amenities, perfect for business or short stays.',
    price: '$199',
    period: '/ night',
    size: '30 m²',
    guests: '2 Guests',
    rating: '4.5',
    features: ['Queen Bed', 'Free WiFi', 'Smart TV', 'Work Desk'],
    images: ['/img/13.jpg', '/img/14.jpg', '/img/15.jpg', '/img/16.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Work Desk']
  },
 {
  id: 5,
  title: 'Presidential Suite',
  description: 'Ultimate luxury with panoramic city views.',
  fullDescription: 'The Presidential Suite offers unmatched luxury with private dining area, grand living room, premium king bed, spa-style bathroom, and breathtaking panoramic views.',
  price: '$999',
  period: '/ night',
  size: '120 m²',
  guests: '4 Guests',
  rating: '5.0',
  features: ['King Bed', 'Private Dining', 'Panoramic View', 'Jacuzzi', 'Smart TV'],
  images: ['/img/17.jpg', '/img/16.jpg', '/img/14.jpg', '/img/13.jpg'],
  amenities: ['Free WiFi', 'Air Conditioning', 'Private Bar', 'Jacuzzi', 'Safe', 'Butler Service']
}

  
];

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // بيانات الغرف من OurRooms


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
