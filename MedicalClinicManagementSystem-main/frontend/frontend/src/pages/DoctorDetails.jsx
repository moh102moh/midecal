import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, Star, Award, Users, Phone, Mail, MapPin, Briefcase, GraduationCap, Globe, Shield } from 'lucide-react'

function DoctorDetails() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('overview');

    // بيانات افتراضية للطبيب
    const defaultDoctor = {
        _id: "1",
        name: "Dr. Ahmed Hassan",
        specialty: "Cardiology",
        qualification: "MD, FACC, Cardiology Specialist",
        experienceYears: 15,
        description: "Senior cardiologist with expertise in interventional cardiology and heart failure management. Published over 50 research papers in international journals and participated in numerous international conferences as a keynote speaker.",
        bio: "Dr. Ahmed is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. He specializes in complex coronary interventions, structural heart disease, and preventive cardiology. He completed his fellowship at Johns Hopkins Hospital and has been recognized with multiple awards for his contributions to cardiovascular research.",
        education: [
            { degree: "MBBS", institution: "Cairo University", year: "2005" },
            { degree: "MD in Cardiology", institution: "Harvard Medical School", year: "2010" },
            { degree: "Fellowship in Interventional Cardiology", institution: "Johns Hopkins Hospital", year: "2012" }
        ],
        certifications: [
            "American Board of Internal Medicine - Cardiology",
            "Fellow of American College of Cardiology (FACC)",
            "Certified Cardiac Device Specialist"
        ],
        languages: ["Arabic", "English", "French"],
        consultationFee: 200,
        availableSlots: [
            { day: "Monday", time: "9:00 AM - 5:00 PM" },
            { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
            { day: "Wednesday", time: "2:00 PM - 8:00 PM" },
            { day: "Thursday", time: "9:00 AM - 5:00 PM" },
            { day: "Saturday", time: "10:00 AM - 4:00 PM" }
        ],
        rating: 4.8,
        totalReviews: 127,
        hospital: "Medicare General Hospital",
        department: "Cardiology Department",
        phone: "+1 (555) 123-4567",
        email: "ahmed.hassan@medicarehospital.com",
        image: "doctor1.jpg",
        available: true,
        procedures: [
            "Coronary Angiography",
            "Angioplasty and Stenting",
            "Pacemaker Implantation",
            "Echocardiography",
            "Stress Testing"
        ],
        awards: [
            "Best Cardiologist Award 2022",
            "Excellence in Patient Care 2021",
            "Research Innovation Award 2020"
        ]
    };

    const getSpecialtyColor = (specialty) => {
        const colors = {
            'Cardiology': 'from-red-500 to-pink-500',
            'Neurology': 'from-purple-500 to-indigo-500',
            'Orthopedics': 'from-blue-500 to-cyan-500',
            'Pediatrics': 'from-green-500 to-emerald-500',
            'Dermatology': 'from-amber-500 to-orange-500',
            'Ophthalmology': 'from-teal-500 to-cyan-400',
            'Surgery': 'from-blue-600 to-purple-500',
            'default': 'from-gray-600 to-blue-500'
        };
        return colors[specialty] || colors.default;
    };

    const getSpecialtyIcon = (specialty) => {
        const icons = {
            'Cardiology': '❤️',
            'Neurology': '🧠',
            'Orthopedics': '🦴',
            'Pediatrics': '👶',
            'Dermatology': '🔬',
            'Ophthalmology': '👁️',
            'default': '👨‍⚕️'
        };
        return icons[specialty] || icons.default;
    };

    const getImageUrl = (doctor) => {
        if (doctor?.image && !doctor.image.startsWith('doctor')) {
            return `https://medicalclinicmanagementsystem.onrender.com/uploads/${doctor.image}`;
        }
        
        const defaultImages = {
            'Cardiology': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Neurology': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Orthopedics': 'https://images.unsplash.com/photo-1530026405189-8745d6d5f9cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Pediatrics': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Dermatology': 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Ophthalmology': 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
        
        return defaultImages[doctor?.specialty] || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    };

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const res = await fetch(`https://medicalclinicmanagementsystem.onrender.com/doctors/${id}`);
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                
                if (data) {
                    // دمج البيانات من السيرفر مع البيانات الافتراضية
                    setDoctor({ ...defaultDoctor, ...data });
                } else {
                    setDoctor(defaultDoctor);
                    setError("Showing sample information. Real data will load when available.");
                }
            } catch (error) {
                console.log(error);
                setError("Unable to load doctor details. Showing sample information.");
                setDoctor(defaultDoctor);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDoctor();
    }, [id]);

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    <Star 
                        key={index} 
                        size={16} 
                        className={`${index < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                    />
                ))}
                <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading doctor details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Doctor Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl"></div>
                                <img 
                                    src={getImageUrl(doctor)} 
                                    alt={doctor.name}
                                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{doctor.name}</h1>
                                <div className="flex items-center space-x-4">
                                    <span className={`bg-gradient-to-r ${getSpecialtyColor(doctor.specialty)} text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2`}>
                                        <span>{getSpecialtyIcon(doctor.specialty)}</span>
                                        {doctor.specialty}
                                    </span>
                                    {doctor.available ? (
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            Available Now
                                        </span>
                                    ) : (
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                            On Leave
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="mt-6 md:mt-0 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center space-x-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{doctor.experienceYears}+</div>
                                    <div className="text-white/80 text-sm">Years Exp</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{doctor.rating}</div>
                                    <div className="text-white/80 text-sm">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{doctor.totalReviews}</div>
                                    <div className="text-white/80 text-sm">Reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Doctor Info */}
                    <div className="lg:col-span-2">
                        {/* Navigation Tabs */}
                        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
                            <div className="flex space-x-2">
                                {['overview', 'education', 'schedule', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelectedTab(tab)}
                                        className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            selectedTab === tab
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {selectedTab === 'overview' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Briefcase size={24} className="text-blue-600" />
                                            Professional Overview
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {doctor.bio || doctor.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Shield size={20} className="text-blue-600" />
                                            Medical Procedures
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {doctor.procedures?.map((procedure, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-gray-700">{procedure}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Award size={20} className="text-blue-600" />
                                            Awards & Certifications
                                        </h3>
                                        <div className="space-y-3">
                                            {doctor.certifications?.map((cert, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                                        <Award size={16} className="text-white" />
                                                    </div>
                                                    <span className="text-gray-700">{cert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'education' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <GraduationCap size={24} className="text-blue-600" />
                                        Education & Qualifications
                                    </h2>
                                    {doctor.education?.map((edu, index) => (
                                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                                            <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                            <p className="text-gray-600">{edu.institution}</p>
                                            <p className="text-gray-500 text-sm">{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedTab === 'schedule' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <Calendar size={24} className="text-blue-600" />
                                        Availability Schedule
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {doctor.availableSlots?.map((slot, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-800">{slot.day}</span>
                                                    <Clock size={16} className="text-gray-400" />
                                                </div>
                                                <p className="text-gray-600 mt-1">{slot.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'reviews' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Patient Reviews</h2>
                                            <div className="flex items-center gap-4 mt-2">
                                                {renderStars(doctor.rating)}
                                                <span className="text-gray-600">({doctor.totalReviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Sample Reviews */}
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((review) => (
                                            <div key={review} className="border border-gray-200 rounded-xl p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                                                            <Users size={20} className="text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-800">Patient {review}</h4>
                                                            <div className="flex items-center gap-2">
                                                                {renderStars(4.5)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-500 text-sm">2 weeks ago</span>
                                                </div>
                                                <p className="text-gray-600">
                                                    "Dr. {doctor.name.split(' ')[1]} provided exceptional care and took the time to explain everything thoroughly."
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Appointment & Contact */}
                    <div className="space-y-6">
                        {/* Appointment Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Book an Appointment</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Consultation Fee</span>
                                    <span className="text-2xl font-bold text-blue-600">${doctor.consultationFee}</span>
                                </div>
                                
                                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                    <Calendar size={20} />
                                    Book Appointment Now
                                </button>
                                
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-gray-600 text-sm text-center">
                                        Average waiting time: 15-20 minutes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Phone size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="font-medium text-gray-800">{doctor.phone}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Mail size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="font-medium text-gray-800">{doctor.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <MapPin size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Hospital</p>
                                        <p className="font-medium text-gray-800">{doctor.hospital}</p>
                                        <p className="text-sm text-gray-600">{doctor.department}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Languages & Quick Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Languages Spoken</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {doctor.languages?.map((lang, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-medium">
                                        <Globe size={14} className="inline mr-1" />
                                        {lang}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Patient Satisfaction</span>
                                    <span className="font-bold text-green-600">96%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Emergency Response</span>
                                    <span className="font-bold text-blue-600">24/7</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Insurance Accepted</span>
                                    <span className="font-bold text-purple-600">Yes</span>
                                </div>
                            </div>
                        </div>

                        {/* Back to Doctors */}
                        <Link
                            to="/allDoctors"
                            className="block w-full bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200 text-center"
                        >
                            ← Back to All Doctors
                        </Link>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="fixed bottom-4 right-4 max-w-md">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-lg">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-yellow-800">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorDetails