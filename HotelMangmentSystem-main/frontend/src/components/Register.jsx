import React, { useContext, useState } from 'react'
import '../css/Register.css';
import { AuthContext } from './context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi'

function Register() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("https://hotelmangmentsystem.onrender.com/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Something went wrong");
            }
            if (data.token) {
                login(data.token);
                navigate('/');
            }
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="register-card">
                <div className="register-header">
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">Enter your details to register</p>
                </div>
                
                <form className="register-form" onSubmit={handleSubmit}>
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
                            <FiUser />
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <FiMail />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <FiPhone />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <FiLock />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                            minLength="6"
                        />
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
                                Creating Account...
                            </>
                        ) : 'Register'}
                    </button>

                    <div className="login-link">
                        Already have an account? 
                        <Link to="/login" className="link-text">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register