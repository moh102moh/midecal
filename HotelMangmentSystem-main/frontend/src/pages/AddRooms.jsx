import React, { useContext, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import '../css/AddRooms.css'

function AddRooms() {
  const { user } = useContext(AuthContext)

  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: "",
    number: "",
    type: "",
    size: "",
    price: "",
    image: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      const file = files[0]
      setForm({ ...form, image: file })
      setPreview(URL.createObjectURL(file))
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("number", form.number)
      formData.append("type", form.type)
      formData.append("size", form.size)
      formData.append("price", form.price)
      if (form.image) formData.append("image", form.image)

      const res = await fetch("https://hotelmangmentsystem.onrender.com/room/addRoom", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "failed add room")

      alert("Room Added Successfully")
      setForm({ name: "", number: "", type: "", size: "", price: "", image: null })
      setPreview(null)
    } catch (error) {
      console.error("Error on the Added", error)
      setError(error.message)
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="unauthorized">
        <p>Only Admin can Add Rooms</p>
      </div>
    )
  }

  return (
    <div className="add-rooms-container">
      <h2 className="form-title">Add New Room</h2>
      {error && <p className="error-message">{error}</p>}

      <form className="room-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Room Number</label>
          <input type="number" name="number" value={form.number} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Room Type</label>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">-- Select Type --</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="form-group">
          <label>Room Size (m²)</label>
          <input type="number" name="size" value={form.size} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Room Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" className="preview-image" />}
        </div>

        <button type="submit" className="submit-btn">Add Room</button>
      </form>
    </div>
  )
}

export default AddRooms
