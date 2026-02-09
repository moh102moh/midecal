import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import '../css/addBooking.css'
import { FiCalendar, FiHome, FiCheckCircle, FiClock } from 'react-icons/fi'

function AddBooking() {
  const { user } = useContext(AuthContext)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    room: "",
    checkIn: "",
    checkEnd: "",
    status: ""
  })

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://hotelmangmentsystem.onrender.com/room/allRoom")
        if (!res.ok) throw new Error('Failed to fetch rooms')
        const data = await res.json()
        setRooms(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching rooms:", error)
        setError("Failed to load available rooms")
      } finally {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem("token")
    setLoading(true)

    try {
      const res = await fetch("https://hotelmangmentsystem.onrender.com/book/addBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        alert("✅ Booking Added Successfully")
        setForm({ room: "", checkIn: "", checkEnd: "", status: "" })
      } else {
        setError(data.message || "Failed to Add Booking")
      }
    } catch (err) {
      console.error("Error adding booking:", err)
      setError("Error while adding booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="booking-card unauthorized-card">
          <div className="booking-header">
            <h2 className="booking-title">Access Required</h2>
            <p className="booking-subtitle">Please login to make a booking</p>
          </div>
          <div className="unauthorized-message">
            <p>You need to be logged in to access the booking system.</p>
            <a href="/login" className="login-redirect-btn">Go to Login</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="booking-card">
        <div className="booking-header">
          <h2 className="booking-title">Create New Booking</h2>
          <p className="booking-subtitle">Fill in the details below to reserve a room</p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-container">
              <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="error-text">{error}</span>
            </div>
          )}

          <div className="input-group">
            <div className="input-icon">
              <FiHome />
            </div>
            <select
              name="room"
              value={form.room}
              onChange={handleChange}
              className="form-input"
              required
              disabled={loading}
            >
              <option value="">-- Choose a Room --</option>
              {rooms.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name} (Room No. {r.number})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FiCalendar />
            </div>
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="form-input"
              required
              disabled={loading}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FiCalendar />
            </div>
            <input
              type="date"
              name="checkEnd"
              value={form.checkEnd}
              onChange={handleChange}
              className="form-input"
              required
              disabled={loading}
              min={form.checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FiCheckCircle />
            </div>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input"
              required
              disabled={loading}
            >
              <option value="">-- Select Status --</option>
              <option value="reserved">Reserved</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="form-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="loading-spinner" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiClock />
                Create Booking
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBooking