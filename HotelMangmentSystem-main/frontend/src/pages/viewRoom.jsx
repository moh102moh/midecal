import React, { useEffect, useState } from 'react';
import '../css/viewRoom.css'; 

function ViewRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchedRoom = async () => {
      try {
        const res = await fetch("https://hotelmangmentsystem.onrender.com/room/allRoom");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "failed to show rooms");
        }
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedRoom();
  }, []);

  return (
    <div className="rooms-container">
      <h1 className="title">All Rooms</h1>
      <div className="rooms-grid">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="room-card">
              <img src={`https://hotelmangmentsystem.onrender.com/uploads/${room?.image}`} alt={room.name} className="room-image" />
              <div className="room-info">
                <h2>{room.name}</h2>
                <p><strong>Number:</strong> {room.number}</p>
                <p><strong>Type:</strong> {room.type}</p>
                <p><strong>Size:</strong> {room.size} m²</p>
                <p><strong>Price:</strong> ${room.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-rooms">No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default ViewRoom;
