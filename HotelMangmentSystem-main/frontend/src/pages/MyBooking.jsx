import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import "../css/myBooking.css";
import { FiCalendar, FiHome, FiCheckCircle, FiXCircle } from "react-icons/fi";


function MyBooking() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch("https://hotelmangmentsystem.onrender.com/book/allBooking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }
        setBookings(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setCancellingId(id);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://hotelmangmentsystem.onrender.com/book/deleteBooking/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete booking");
      }

      setBookings((prev) => prev.filter((a) => a._id !== id));
      alert("✅ Booking cancelled successfully");
    } catch (error) {
      console.error(error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setCancellingId(null);
    }
  };

  if (!user) {
    return (
      <div className="page-container">
        <div className="booking-card unauthorized-card">
          <div className="booking-header">
            <h2 className="booking-title">Access Required</h2>
            <p className="booking-subtitle">Please login to view your bookings</p>
          </div>
          <div className="unauthorized-message">
            <p>You need to be logged in to access your booking history.</p>
            <a href="/login" className="login-redirect-btn">Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="bookings-card">
        <div className="booking-header">
          <h2 className="booking-title">My Bookings</h2>
          <p className="booking-subtitle">View and manage your reservations</p>
        </div>

        <div className="bookings-content">
          {error && (
            <div className="error-container">
              <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="error-text">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <svg className="loading-spinner large" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
              <p className="loading-text">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FiCalendar />
              </div>
              <h3 className="empty-title">No Bookings Found</h3>
              <p className="empty-subtitle">You haven't made any reservations yet.</p>
              <a href="/add-booking" className="empty-action-btn">Book a Room</a>
            </div>
          ) : (
            <div className="bookings-table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>
                      <FiHome className="table-header-icon" />
                      Room
                    </th>
                    <th>
                      <FiCalendar className="table-header-icon" />
                      Check In
                    </th>
                    <th>
                      <FiCalendar className="table-header-icon" />
                      Check Out
                    </th>
                    <th>
                      <FiCheckCircle className="table-header-icon" />
                      Status
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="booking-row">
                      <td className="room-cell">
                        <div className="room-info">
                          <div className="room-name">{b.room?.name}</div>
                          <div className="room-number">Room No. {b.room?.number}</div>
                        </div>
                      </td>
                      <td>
                        <div className="date-cell">
                          <div className="date">{new Date(b.checkIn).toLocaleDateString()}</div>
                          <div className="day">{new Date(b.checkIn).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        </div>
                      </td>
                      <td>
                        <div className="date-cell">
                          <div className="date">{new Date(b.checkEnd).toLocaleDateString()}</div>
                          <div className="day">{new Date(b.checkEnd).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${b.status}`}>
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => cancelBooking(b._id)}
                          disabled={cancellingId === b._id || b.status === 'cancelled' || b.status === 'checked_out'}
                          title={b.status === 'cancelled' ? 'Already cancelled' : b.status === 'checked_out' ? 'Already checked out' : 'Cancel booking'}
                        >
                          {cancellingId === b._id ? (
                            <>
                              <svg className="loading-spinner small" viewBox="0 0 50 50">
                                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                              </svg>
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <FiXCircle />
                              Cancel
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
