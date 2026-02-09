import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import { AuthContext } from './context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // دالة للتعامل مع التنقل إلى الأقسام
    const handleSectionNavigation = (sectionId) => {
        closeMobileMenu();
        
        // إذا كنا في الصفحة الرئيسية، انتقل إلى القسم
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // إذا كنا في صفحة أخرى، انتقل إلى الصفحة الرئيسية
            navigate('/');
            // انتظر قليلاً ثم انتقل إلى القسم
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };

    // دالة للتعامل مع تنقل Home
    const handleHomeNavigation = () => {
        closeMobileMenu();
        
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    // دالة للروابط التي تذهب إلى أقسام
    const SectionLink = ({ to, children, sectionId, className = "" }) => {
        const handleClick = (e) => {
            e.preventDefault();
            handleSectionNavigation(sectionId);
        };

        return (
            <Link
                to={to}
                onClick={handleClick}
                className={`px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#008e9b] transition-colors duration-300 font-medium ${className}`}
            >
                {children}
            </Link>
        );
    };

    // دالة لرابط Home
    const HomeLink = ({ children, className = "" }) => {
        const handleClick = (e) => {
            e.preventDefault();
            handleHomeNavigation();
        };

        return (
            <Link
                to="/"
                onClick={handleClick}
                className={`px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#008e9b] transition-colors duration-300 font-medium ${className}`}
            >
                {children}
            </Link>
        );
    };

    // دالة للروابط التي تذهب إلى أقسام (للجوال)
    const MobileSectionLink = ({ to, children, sectionId, className = "", onClick }) => {
        const handleClick = (e) => {
            e.preventDefault();
            handleSectionNavigation(sectionId);
            if (onClick) onClick();
        };

        return (
            <Link
                to={to}
                onClick={handleClick}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 ${className}`}
            >
                {children}
            </Link>
        );
    };

    // دالة لرابط Home (للجوال)
    const MobileHomeLink = ({ children, className = "", onClick }) => {
        const handleClick = (e) => {
            e.preventDefault();
            handleHomeNavigation();
            if (onClick) onClick();
        };

        return (
            <Link
                to="/"
                onClick={handleClick}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 ${className}`}
            >
                {children}
            </Link>
        );
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* الشعار */}
                    <div className="flex-shrink-0">
                        <HomeLink className="flex items-center">
                            <img 
                                className="h-10 w-auto" 
                                src={logo} 
                                alt="Clinic Logo" 
                            />
                        </HomeLink>
                    </div>

                    {/* قائمة التنقل للشاشات الكبيرة */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* روابط التنقل الأساسية - باستخدام Link كما كانت */}
                        <HomeLink>Home</HomeLink>
                        
                        <SectionLink to="#services" sectionId="services">
                            Services
                        </SectionLink>
                        
                        <SectionLink to="#about" sectionId="about">
                            About
                        </SectionLink>
                        
                        <SectionLink to="#departments" sectionId="departments">
                            Departments
                        </SectionLink>
                        
                        <SectionLink to="#doctors" sectionId="doctors">
                            Doctors
                        </SectionLink>
                        
                        {/* روابط المدير */}
                        {user && user.role === 'admin' && (
                            <>
                                <Link
                                    to="/AddDoctor"
                                    className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-300 font-medium"
                                >
                                    <i className="fas fa-user-md mr-2"></i>
                                    Add Doctor
                                </Link>
                                <Link
                                    to="/add-department"
                                    className="px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-300 font-medium"
                                >
                                    <i className="fas fa-hospital mr-2"></i>
                                    Add Department
                                </Link>
                            </>
                        )}
                        
                        {/* روابط المستخدم */}
                        {user && user.role === 'user' && (
                            <>
                                <Link
                                    to="/addAppointment"
                                    className="px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors duration-300 font-medium"
                                >
                                    <i className="fas fa-calendar-plus mr-2"></i>
                                    Add Appointment
                                </Link>
                                <Link
                                    to="/my-appointment"
                                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#008e9b] transition-colors duration-300 font-medium"
                                >
                                    <i className="fas fa-calendar-alt mr-2"></i>
                                    My Appointments
                                </Link>
                            </>
                        )}
                        
                        {/* روابط تسجيل الدخول */}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg bg-[#008e9b] text-white hover:bg-[#007a86] transition-colors duration-300 font-medium"
                                >
                                    <i className="fas fa-sign-in-alt mr-2"></i>
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-lg border-2 border-[#008e9b] text-[#008e9b] hover:bg-[#008e9b] hover:text-white transition-colors duration-300 font-medium"
                                >
                                    <i className="fas fa-user-plus mr-2"></i>
                                    Register
                                </Link>
                            </>
                        )}
                        
                        {/* زر تسجيل الخروج */}
                        {user && (
                            <button 
                                onClick={logout}
                                className="ml-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 flex items-center"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                Logout
                            </button>
                        )}
                        
                        {/* معلومات المستخدم */}
                        {user && (
                            <div className="ml-4 flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#008e9b] rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-gray-600 font-medium">
                                    {user.name}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* زر القائمة للشاشات الصغيرة */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-[#008e9b] hover:text-[#007a86] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-transform duration-300`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* قائمة التنقل للشاشات الصغيرة */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t animate-slideDown">
                    <div className="px-4 py-3 space-y-2">
                        {/* روابط التنقل للجوال - باستخدام Link كما كانت */}
                        <MobileHomeLink>
                            <i className="fas fa-home mr-3"></i>
                            Home
                        </MobileHomeLink>
                        
                        <MobileSectionLink to="#services" sectionId="services">
                            <i className="fas fa-concierge-bell mr-3"></i>
                            Services
                        </MobileSectionLink>
                        
                        <MobileSectionLink to="#about" sectionId="about">
                            <i className="fas fa-info-circle mr-3"></i>
                            About
                        </MobileSectionLink>
                        
                        <MobileSectionLink to="#departments" sectionId="departments">
                            <i className="fas fa-hospital-alt mr-3"></i>
                            Departments
                        </MobileSectionLink>
                        
                        <MobileSectionLink to="#doctors" sectionId="doctors">
                            <i className="fas fa-user-md mr-3"></i>
                            Doctors
                        </MobileSectionLink>
                        
                        {/* روابط المدير للجوال */}
                        {user && user.role === 'admin' && (
                            <>
                                <Link
                                    to="/AddDoctor"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-300 flex items-center"
                                >
                                    <i className="fas fa-user-md mr-3"></i>
                                    Add Doctor
                                </Link>
                                <Link
                                    to="/add-department"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-300 flex items-center"
                                >
                                    <i className="fas fa-hospital mr-3"></i>
                                    Add Department
                                </Link>
                            </>
                        )}
                        
                        {/* روابط المستخدم للجوال */}
                        {user && user.role === 'user' && (
                            <>
                                <Link
                                    to="/addAppointment"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors duration-300 flex items-center"
                                >
                                    <i className="fas fa-calendar-plus mr-3"></i>
                                    Add Appointment
                                </Link>
                                <Link
                                    to="/my-appointment"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 flex items-center"
                                >
                                    <i className="fas fa-calendar-alt mr-3"></i>
                                    My Appointments
                                </Link>
                            </>
                        )}
                        
                        {/* روابط تسجيل الدخول للجوال */}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg bg-[#008e9b] text-white hover:bg-[#007a86] transition-colors duration-300 flex items-center"
                                >
                                    <i className="fas fa-sign-in-alt mr-3"></i>
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg border border-[#008e9b] text-[#008e9b] hover:bg-[#008e9b] hover:text-white transition-colors duration-300 flex items-center"
                                >
                                    <i className="fas fa-user-plus mr-3"></i>
                                    Register
                                </Link>
                            </>
                        )}
                        
                        {/* زر تسجيل الخروج للجوال */}
                        {user && (
                            <button 
                                onClick={() => {
                                    logout();
                                    closeMobileMenu();
                                }}
                                className="w-full text-left px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 flex items-center"
                            >
                                <i className="fas fa-sign-out-alt mr-3"></i>
                                Logout
                            </button>
                        )}
                        
                        {/* معلومات المستخدم للجوال */}
                        {user && (
                            <div className="px-4 py-3 border-t border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#008e9b] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-medium">{user.name}</p>
                                        <p className="text-gray-500 text-sm">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;