import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredDoctor, setHoveredDoctor] = useState(null);
    const [error, setError] = useState(null);

    // بيانات افتراضية للدكاترة
    const defaultDoctors = [
        {
            _id: "1",
            name: "Dr. Ahmed Hassan",
            specialty: "Cardiology",
            qualification: "MD, FACC, Cardiology Specialist",
            experienceYears: 15,
            bio: "Senior cardiologist with expertise in interventional cardiology and heart failure management. Published over 50 research papers in international journals.",
            available: true,
            image: "doctor1.jpg",
            rating: 4.8
        },
        {
            _id: "2",
            name: "Dr. Sarah Johnson",
            specialty: "Neurology",
            qualification: "PhD, Neurology, Board Certified",
            experienceYears: 12,
            bio: "Expert in neurological disorders including epilepsy, stroke, and multiple sclerosis. Director of Neurology Research Center.",
            available: true,
            image: "doctor2.jpg",
            rating: 4.9
        },
        {
            _id: "3",
            name: "Dr. Michael Chen",
            specialty: "Orthopedics",
            qualification: "MD, Orthopedic Surgery",
            experienceYears: 18,
            bio: "Specializes in joint replacement and sports medicine. Performed over 2000 successful orthopedic surgeries.",
            available: false,
            image: "doctor3.jpg",
            rating: 4.7
        },
        {
            _id: "4",
            name: "Dr. Fatima Al-Mansoori",
            specialty: "Pediatrics",
            qualification: "MD, Pediatric Medicine",
            experienceYears: 10,
            bio: "Pediatric specialist with focus on child development and preventive care. Certified in pediatric emergency medicine.",
            available: true,
            image: "doctor4.jpg",
            rating: 4.9
        },
        {
            _id: "5",
            name: "Dr. Robert Williams",
            specialty: "Dermatology",
            qualification: "Dermatology Specialist, Board Certified",
            experienceYears: 14,
            bio: "Expert in cosmetic and medical dermatology. Pioneer in laser treatments and skin cancer prevention.",
            available: true,
            image: "doctor5.jpg",
            rating: 4.8
        },
        {
            _id: "6",
            name: "Dr. Lisa Park",
            specialty: "Ophthalmology",
            qualification: "MD, Ophthalmology, LASIK Specialist",
            experienceYears: 11,
            bio: "Specializes in cataract surgery and refractive procedures. Performed over 5000 successful eye surgeries.",
            available: true,
            image: "doctor6.jpg",
            rating: 4.9
        }
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const res = await fetch("https://medicalclinicmanagementsystem.onrender.com/doctors/allDoctors")
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                
                if (data && data.length > 0) {
                    // خذ أول 6 دكاترة أو أقل إذا المتاح أقل
                    const doctorsToShow = data.slice(0, 6);
                    setDoctors(doctorsToShow);
                } else {
                    // استخدم البيانات الافتراضية إذا لم يكن هناك بيانات
                    setDoctors(defaultDoctors.slice(0, 3));
                    setError("Showing sample doctors. Real data will load when available.");
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError("Unable to load doctors. Showing sample information.");
                
                // استخدم البيانات الافتراضية في حالة الخطأ
                setDoctors(defaultDoctors.slice(0, 3));
            } finally {
                setIsLoading(false);
            }
        }
        fetchDoctors();
    }, []);

    const getSpecialtyColor = (specialty) => {
        const colors = {
            'Cardiology': 'from-red-500 to-pink-500',
            'Neurology': 'from-purple-500 to-indigo-500',
            'Orthopedics': 'from-blue-500 to-cyan-500',
            'Pediatrics': 'from-green-500 to-emerald-500',
            'Dermatology': 'from-amber-500 to-orange-500',
            'Ophthalmology': 'from-teal-500 to-cyan-400',
            'Surgery': 'from-blue-600 to-purple-500',
            'Dentistry': 'from-cyan-500 to-blue-400',
            'default': 'from-[#0097a5] to-blue-600'
        };

        const normalizedSpecialty = specialty?.toLowerCase();
        for (const [key, color] of Object.entries(colors)) {
            if (normalizedSpecialty?.includes(key.toLowerCase())) {
                return color;
            }
        }
        return colors.default;
    };

    const getSpecialtyIcon = (specialty) => {
        const icons = {
            'Cardiology': 'fas fa-heart-pulse',
            'Neurology': 'fas fa-brain',
            'Orthopedics': 'fas fa-bone',
            'Pediatrics': 'fas fa-baby',
            'Dermatology': 'fas fa-allergies',
            'Ophthalmology': 'fas fa-eye',
            'Surgery': 'fas fa-syringe',
            'Dentistry': 'fas fa-tooth',
            'default': 'fas fa-user-md'
        };

        const normalizedSpecialty = specialty?.toLowerCase();
        for (const [key, icon] of Object.entries(icons)) {
            if (normalizedSpecialty?.includes(key.toLowerCase())) {
                return icon;
            }
        }
        return icons.default;
    };

    const getImageUrl = (doctor) => {
        // إذا كان لدينا صورة من السيرفر
        if (doctor?.image && !doctor.image.startsWith('doctor')) {
            return `https://medicalclinicmanagementsystem.onrender.com/uploads/${doctor.image}`;
        }
        
        // صور افتراضية بناءً على التخصص
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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        return (
            <div className="flex text-amber-500">
                {[...Array(5)].map((_, index) => {
                    if (index < fullStars) {
                        return <i key={index} className="fas fa-star"></i>;
                    } else if (index === fullStars && hasHalfStar) {
                        return <i key={index} className="fas fa-star-half-alt"></i>;
                    } else {
                        return <i key={index} className="far fa-star"></i>;
                    }
                })}
            </div>
        );
    };

    if (isLoading) {
        return (
            <section className='relative py-20 overflow-hidden bg-blue-50'>
                <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 z-0'></div>
                
                <div className='absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
                <div className='absolute top-0 right-0 w-72 h-72 bg-[#0097a5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
                <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
                
                <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center py-20'>
                        <div className='inline-block relative'>
                            <div className='animate-spin rounded-full h-16 w-16 border-4 border-[#0097a5] border-t-transparent mx-auto'></div>
                        </div>
                        <p className='mt-6 text-gray-700 text-lg font-medium'>Loading our expert doctors...</p>
                        <div className='w-32 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='relative py-20 overflow-hidden bg-blue-50'>
            {/* خلفية متدرجة مع تأثيرات */}
            <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 z-0'></div>
            
            {/* تأثيرات الخلفية الجمالية */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
            <div className='absolute top-0 right-0 w-72 h-72 bg-[#0097a5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
            <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
            
            {/* نقاط زخرفية */}
            <div className='absolute top-10 left-10 w-6 h-6 bg-[#0097a5] rounded-full opacity-10'></div>
            <div className='absolute bottom-10 right-10 w-10 h-10 bg-blue-300 rounded-full opacity-10'></div>
            <div className='absolute top-1/2 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-20'></div>
            
            {/* محتوى الصفحة */}
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* العنوان الرئيسي */}
                <div className='text-center mb-16'>
                    <div className='inline-block relative'>
                        <h2 className='text-4xl md:text-5xl font-bold text-[#0097a5] mb-4 relative z-10'>
                            Meet Our <span className='text-blue-800'>Expert Doctors</span>
                        </h2>
                        <div className='absolute -bottom-2 left-1/4 w-1/2 h-2 bg-blue-100 rounded-full z-0'></div>
                    </div>
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mb-8 rounded-full'></div>
                    <p className='text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm'>
                        Our team of board-certified specialists is dedicated to providing exceptional healthcare with compassion and expertise.
                        Each doctor brings years of experience and specialized knowledge to ensure the best possible care.
                    </p>
                    
                    {/* رسالة الخطأ */}
                    {error && (
                        <div className='mt-6 inline-flex items-center p-4 bg-yellow-50/90 backdrop-blur-sm border border-yellow-200 rounded-xl text-yellow-800 shadow-lg'>
                            <i className="fas fa-exclamation-triangle mr-3 text-lg"></i>
                            <span className='text-sm font-medium'>{error}</span>
                        </div>
                    )}
                </div>

                {/* شبكة عرض الأطباء */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
                    {doctors.map((doc) => {
                        const specialtyColor = getSpecialtyColor(doc?.specialty);
                        const specialtyIcon = getSpecialtyIcon(doc?.specialty);
                        const imageUrl = getImageUrl(doc);
                        
                        return (
                            <div 
                                key={doc?._id}
                                className='group relative'
                                onMouseEnter={() => setHoveredDoctor(doc?._id)}
                                onMouseLeave={() => setHoveredDoctor(null)}
                            >
                                {/* تأثير الخلفية */}
                                <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0097a5]/20 to-blue-100/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500'></div>
                                
                                <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 group-hover:border-blue-200/50'>
                                    {/* صورة الطبيب */}
                                    <div className='relative h-64 overflow-hidden'>
                                        <img 
                                            className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'
                                            src={imageUrl} 
                                            alt={`Dr. ${doc?.name}`}
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                                            }}
                                        />
                                        
                                        {/* طبقة متدرجة */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                        
                                        {/* شارة التخصص */}
                                        <div className='absolute top-4 right-4'>
                                            <span className={`bg-gradient-to-r ${specialtyColor} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm shadow-lg`}>
                                                <i className={specialtyIcon}></i>
                                                {doc?.specialty}
                                            </span>
                                        </div>
                                        
                                        {/* محتوى الظهور عند التحويم */}
                                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                            <Link 
                                                to={`/doctor/${doc?._id}`}
                                                className='bg-white/95 backdrop-blur-sm text-[#0097a5] px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-xl'
                                            >
                                                <i className="fas fa-user-md"></i>
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>

                                    {/* معلومات الطبيب */}
                                    <div className='p-6'>
                                        <div className='flex items-start justify-between mb-4'>
                                            <div>
                                                <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#0097a5] transition-colors duration-300'>
                                                    {doc?.name}
                                                </h3>
                                                <p className='text-gray-600 mt-1 text-sm'>{doc?.qualification}</p>
                                            </div>
                                            <div className='text-right'>
                                                <div className='text-2xl font-bold text-[#0097a5]'>
                                                    {doc?.experienceYears}+
                                                </div>
                                                <div className='text-sm text-gray-500'>Years Exp</div>
                                            </div>
                                        </div>

                                        <p className='text-gray-700 text-sm mb-4 line-clamp-2 bg-blue-50/50 p-3 rounded-lg'>
                                            {doc?.bio || `Expert ${doc?.specialty} specialist with ${doc?.experienceYears} years of experience.`}
                                        </p>

                                        {/* التقييم والتوفر */}
                                        <div className='flex items-center justify-between pt-4 border-t border-gray-100/50'>
                                            <div className='flex items-center gap-2'>
                                                {renderStars(doc?.rating || 4.8)}
                                                <span className='text-sm text-gray-600'>{doc?.rating || 4.8}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <div className={`w-2 h-2 rounded-full ${doc?.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                                <span className='text-sm text-gray-600'>
                                                    {doc?.available ? 'Available Now' : 'On Leave'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* زر عرض الملف الشخصي للجوال */}
                                        <div className='mt-6 md:hidden'>
                                            <Link 
                                                to={`/doctor/${doc?._id}`}
                                                className='block w-full bg-gradient-to-r from-blue-50/80 to-[#0097a5]/10 text-[#0097a5] text-center py-3 rounded-xl font-semibold hover:from-blue-100 hover:to-[#0097a5]/20 transition-all duration-300 border border-blue-100/50'
                                            >
                                                View Full Profile
                                            </Link>
                                        </div>
                                    </div>

                                    {/* إجراء سريع للحجز */}
                                    <div className='px-6 pb-6 hidden md:block'>
                                        <div className='flex gap-3'>
                                            <Link 
                                                to={`/doctor/${doc?._id}`}
                                                className='flex-1 text-center bg-gradient-to-r from-[#0097a5] to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                                            >
                                                Book Now
                                            </Link>
                                            <Link 
                                                to={`/doctor/${doc?._id}`}
                                                className='flex-1 text-center bg-gray-100/80 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200/80 transition-all duration-300 transform hover:-translate-y-1'
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* تأثير التوهج عند التحويم */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${specialtyColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* قسم عرض جميع الأطباء */}
                <div className='text-center'>
                    <div className='inline-flex flex-col items-center gap-6'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-[#0097a5] to-blue-600 rounded-full blur-xl opacity-30 animate-pulse'></div>
                            <Link 
                                to="/allDoctors"
                                className='relative bg-gradient-to-r from-[#0097a5] to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 flex items-center gap-3 group'
                            >
                                <span>View All Doctors</span>
                                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
                            </Link>
                        </div>
                        
                        <p className='text-gray-700 max-w-md bg-white/50 backdrop-blur-sm p-4 rounded-xl'>
                            Explore our complete team of {doctors.length * 3}+ medical specialists across various departments
                        </p>
                    </div>
                </div>

                {/* شريط الإحصائيات */}
                <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>5000+</div>
                        <div className='text-gray-700 font-medium'>Patients Treated</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>98%</div>
                        <div className='text-gray-700 font-medium'>Success Rate</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>24/7</div>
                        <div className='text-gray-700 font-medium'>Emergency Support</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>50+</div>
                        <div className='text-gray-700 font-medium'>Expert Doctors</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                </div>
            </div>
            
            {/* خطوط زخرفية في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
        </section>
    );
}

export default Doctors;