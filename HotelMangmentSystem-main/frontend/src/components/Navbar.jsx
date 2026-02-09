import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { AuthContext } from '../components/context/AuthContext';
import '../css/Navbar.css';
import { FiMenu, FiX, FiHome, FiInfo, FiLogOut, FiLogIn, FiUserPlus, FiPlus, FiEye, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { MdHotel } from 'react-icons/md';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container" onClick={() => navigate('/')}>
          <MdHotel className="logo-icon" />
          <h2 className="logo-text">Hotel Dubai</h2>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li><RouterLink to="/"><FiHome /> Home</RouterLink></li>
          <li><Link smooth to="/#our-rooms"><FiBookOpen /> Our Rooms</Link></li>
          <li><Link smooth to="/#about"><FiInfo /> About</Link></li>

          {user && user.role === 'admin' && (
            <>
              <li><RouterLink to="/addRoom"><FiPlus /> Add Room</RouterLink></li>
              <li><RouterLink to="/allRooms"><FiEye /> View Rooms</RouterLink></li>
            </>
          )}

          {user && user.role === 'user' && (
            <>
              <li><RouterLink to="/addBooking"><FiCalendar /> Book Now</RouterLink></li>
              <li><RouterLink to="/myBooking"><FiCalendar /> My Bookings</RouterLink></li>
            </>
          )}

          {!user ? (
            <>
              <li><RouterLink to="/login" className="nav-btn login-btn"><FiLogIn /> Login</RouterLink></li>
              <li><RouterLink to="/register" className="nav-btn register-btn"><FiUserPlus /> Register</RouterLink></li>
            </>
          ) : (
            <li>
              <button className="nav-btn logout-btn" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo-container" onClick={() => { navigate('/'); closeMenu(); }}>
            <MdHotel className="logo-icon" />
            <h2 className="logo-text">Hotel Dubai</h2>
          </div>
        </div>

        <ul className="mobile-nav-links">
          <li><RouterLink to="/" onClick={closeMenu}><FiHome /> Home</RouterLink></li>
          <li><Link smooth to="/#our-rooms" onClick={closeMenu}><FiBookOpen /> Our Rooms</Link></li>
          <li><Link smooth to="/#about" onClick={closeMenu}><FiInfo /> About</Link></li>

          {user && user.role === 'admin' && (
            <>
              <li><RouterLink to="/addRoom" onClick={closeMenu}><FiPlus /> Add Room</RouterLink></li>
              <li><RouterLink to="/allRooms" onClick={closeMenu}><FiEye /> View Rooms</RouterLink></li>
            </>
          )}

          {user && user.role === 'user' && (
            <>
              <li><RouterLink to="/addBooking" onClick={closeMenu}><FiCalendar /> Book Now</RouterLink></li>
              <li><RouterLink to="/myBooking" onClick={closeMenu}><FiCalendar /> My Bookings</RouterLink></li>
            </>
          )}

          {!user ? (
            <>
              <li><RouterLink to="/login" onClick={closeMenu} className="mobile-btn login-btn"><FiLogIn /> Login</RouterLink></li>
              <li><RouterLink to="/register" onClick={closeMenu} className="mobile-btn register-btn"><FiUserPlus /> Register</RouterLink></li>
            </>
          ) : (
            <li>
              <button className="mobile-btn logout-btn" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}

export default Navbar;