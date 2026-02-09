import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AllDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [hoveredDoctor, setHoveredDoctor] = useState(null);

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
            rating: 4.8,
            languages: ["Arabic", "English", "French"]
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
            rating: 4.9,
            languages: ["English", "Spanish"]
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
            rating: 4.7,
            languages: ["English", "Chinese", "Japanese"]
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
            rating: 4.9,
            languages: ["Arabic", "English", "German"]
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
            rating: 4.8,
            languages: ["English", "Italian"]
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
            rating: 4.9,
            languages: ["English", "Korean", "Japanese"]
        },
        {
            _id: "7",
            name: "Dr. James Wilson",
            specialty: "Surgery",
            qualification: "General Surgery, Board Certified",
            experienceYears: 20,
            bio: "Senior surgeon specializing in laparoscopic and minimally invasive surgeries. Head of Surgery Department.",
            available: true,
            image: "doctor7.jpg",
            rating: 4.8,
            languages: ["English", "Portuguese"]
        },
        {
            _id: "8",
            name: "Dr. Maria Rodriguez",
            specialty: "Dentistry",
            qualification: "DDS, Orthodontics Specialist",
            experienceYears: 13,
            bio: "Orthodontist with expertise in braces, Invisalign, and pediatric dentistry. Award-winning dental professional.",
            available: true,
            image: "doctor8.jpg",
            rating: 4.9,
            languages: ["Spanish", "English", "French"]
        },
        {
            _id: "9",
            name: "Dr. David Miller",
            specialty: "Emergency Medicine",
            qualification: "MD, Emergency Medicine",
            experienceYears: 9,
            bio: "Emergency medicine specialist with trauma care expertise. Works in our 24/7 emergency department.",
            available: true,
            image: "doctor9.jpg",
            rating: 4.7,
            languages: ["English", "Russian"]
        },
        {
            _id: "10",
            name: "Dr. Sophia Chen",
            specialty: "Oncology",
            qualification: "MD, Medical Oncology",
            experienceYears: 16,
            bio: "Medical oncologist specializing in breast cancer and hematological malignancies. Clinical researcher.",
            available: false,
            image: "doctor10.jpg",
            rating: 4.9,
            languages: ["Chinese", "English", "Mandarin"]
        },
        {
            _id: "11",
            name: "Dr. Thomas Brown",
            specialty: "Radiology",
            qualification: "MD, Diagnostic Radiology",
            experienceYears: 12,
            bio: "Diagnostic radiologist with expertise in MRI, CT scans, and interventional radiology.",
            available: true,
            image: "doctor11.jpg",
            rating: 4.6,
            languages: ["English", "German"]
        },
        {
            _id: "12",
            name: "Dr. Emily Davis",
            specialty: "Psychiatry",
            qualification: "MD, Psychiatry, Child & Adolescent",
            experienceYears: 8,
            bio: "Psychiatrist specializing in child and adolescent mental health. Cognitive behavioral therapy expert.",
            available: true,
            image: "doctor12.jpg",
            rating: 4.8,
            languages: ["English", "French", "Arabic"]
        }
    ];

    const specialties = [
        'all', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
        'Dermatology', 'Ophthalmology', 'Surgery', 'Dentistry',
        'Emergency Medicine', 'Oncology', 'Radiology', 'Psychiatry'
    ];

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
            'Emergency Medicine': 'from-red-600 to-orange-500',
            'Oncology': 'from-purple-600 to-pink-500',
            'Radiology': 'from-gray-600 to-blue-400',
            'Psychiatry': 'from-indigo-500 to-purple-500',
            'default': 'from-[#0097a5] to-blue-600'
        };
        return colors[specialty] || colors.default;
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
            'Emergency Medicine': 'fas fa-ambulance',
            'Oncology': 'fas fa-stethoscope',
            'Radiology': 'fas fa-x-ray',
            'Psychiatry': 'fas fa-brain',
            'default': 'fas fa-user-md'
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
            'Ophthalmology': 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Surgery': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Dentistry': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Emergency Medicine': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Oncology': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Radiology': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'Psychiatry': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
        
        return defaultImages[doctor?.specialty] || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        return (
            <div className="flex text-amber-500 text-sm">
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
                    setDoctors(data);
                } else {
                    setDoctors(defaultDoctors);
                    setError("Showing sample doctors. Real data will load when available.");
                }
            } catch (error) {
                console.log("Error fetching doctors:", error);
                setError("Unable to load doctors. Showing sample information.");
                setDoctors(defaultDoctors);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDoctors();
    }, []);

    // فلترة وترتيب الدكاترة
    const filteredDoctors = doctors
        .filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
            return matchesSearch && matchesSpecialty;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'experience':
                    return b.experienceYears - a.experienceYears;
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

    if (isLoading) {
        return (
            <section className='relative min-h-screen overflow-hidden bg-blue-50 py-20'>
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
        <section className='relative min-h-screen overflow-hidden bg-blue-50'>
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
            <div className='relative z-10'>
                {/* الهيدر الرئيسي */}
                <div className='bg-gradient-to-r from-[#0097a5] to-blue-600 py-16'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='text-center'>
                            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                                Our Medical <span className='text-blue-200'>Team</span>
                            </h1>
                            <div className='w-32 h-1.5 bg-gradient-to-r from-blue-300 to-cyan-300 mx-auto mb-6 rounded-full'></div>
                            <p className='text-xl text-white/90 max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-2xl'>
                                Meet our team of board-certified specialists dedicated to providing exceptional healthcare with compassion and expertise.
                            </p>
                        </div>
                    </div>
                </div>

                {/* قسم الفلترة والبحث */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='relative group mb-8'>
                        {/* تأثير الخلفية */}
                        <div className='absolute -inset-1 bg-gradient-to-r from-[#0097a5]/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
                        
                        <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 p-6'>
                            {/* شريط أعلى متدرج */}
                            <div className='h-1.5 bg-gradient-to-r from-[#0097a5] to-blue-600 absolute top-0 left-0 right-0'></div>
                            
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                                {/* حقل البحث */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                                        <i className="fas fa-search text-[#0097a5] mr-2 text-sm"></i>
                                        Search Doctors
                                    </label>
                                    <div className='relative pr-8'>
                                        <input
                                            type='text'
                                            placeholder='Search by name or specialty...'
                                            className='w-full px-4 py-3 pl-12 border border-gray-200/50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097a5]/30 focus:border-[#0097a5] sm:text-sm bg-white/80 backdrop-blur-sm'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                            <i className="fas fa-search"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* فلترة التخصص */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                                        <i className="fas fa-stethoscope text-[#0097a5] mr-2 text-sm"></i>
                                        Specialty
                                    </label>
                                    <select
                                        className='w-full px-4 py-3 border border-gray-200/50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097a5]/30 focus:border-[#0097a5] sm:text-sm bg-white/80 backdrop-blur-sm'
                                        value={selectedSpecialty}
                                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                                    >
                                        {specialties.map(specialty => (
                                            <option key={specialty} value={specialty}>
                                                {specialty === 'all' ? 'All Specialties' : specialty}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* الترتيب */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                                        <i className="fas fa-sort text-[#0097a5] mr-2 text-sm"></i>
                                        Sort By
                                    </label>
                                    <select
                                        className='w-full px-4 py-3 border border-gray-200/50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097a5]/30 focus:border-[#0097a5] sm:text-sm bg-white/80 backdrop-blur-sm'
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value='name'>Name (A-Z)</option>
                                        <option value='experience'>Experience (High to Low)</option>
                                        <option value='rating'>Rating (High to Low)</option>
                                    </select>
                                </div>
                            </div>

                            {/* رسالة الخطأ */}
                            {error && (
                                <div className='mb-4 bg-gradient-to-r from-amber-50/90 to-yellow-100/90 backdrop-blur-sm border border-amber-200 p-4 rounded-xl'>
                                    <div className='flex items-center'>
                                        <i className="fas fa-exclamation-triangle text-amber-600 mr-3"></i>
                                        <span className='text-amber-800 text-sm'>{error}</span>
                                    </div>
                                </div>
                            )}

                            {/* معلومات النتائج */}
                            <div className='flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100/50'>
                                <div className='text-gray-700 font-medium'>
                                    Showing <span className='text-[#0097a5] font-bold'>{filteredDoctors.length}</span> doctors
                                </div>
                                <div className='flex items-center gap-6'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></div>
                                        <span className='text-sm text-gray-600'>Available Now</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-3 h-3 rounded-full bg-red-500'></div>
                                        <span className='text-sm text-gray-600'>On Leave</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* شبكة عرض الأطباء */}
                    {filteredDoctors.length === 0 ? (
                        <div className='text-center py-16'>
                            <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-[#0097a5]/20 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                                <i className="fas fa-user-md text-4xl text-[#0097a5]"></i>
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-2'>No Doctors Found</h3>
                            <p className='text-gray-700 max-w-md mx-auto mb-6'>
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedSpecialty('all');
                                }}
                                className='inline-flex items-center gap-2 bg-gradient-to-r from-[#0097a5] to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1'
                            >
                                <i className="fas fa-times"></i>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {filteredDoctors.map((doctor) => (
                                <div 
                                    key={doctor._id} 
                                    className='group relative'
                                    onMouseEnter={() => setHoveredDoctor(doctor._id)}
                                    onMouseLeave={() => setHoveredDoctor(null)}
                                >
                                    {/* تأثير الخلفية */}
                                    <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0097a5]/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500'></div>
                                    
                                    <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 group-hover:border-blue-200/50'>
                                        {/* صورة الطبيب */}
                                        <div className='relative h-56 overflow-hidden'>
                                            <img
                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                                src={getImageUrl(doctor)}
                                                alt={`Dr. ${doctor.name}`}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                                                }}
                                            />
                                            
                                            {/* شارة التخصص */}
                                            <div className='absolute top-4 right-4'>
                                                <span className={`bg-gradient-to-r ${getSpecialtyColor(doctor.specialty)} text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-sm`}>
                                                    <i className={getSpecialtyIcon(doctor.specialty)}></i>
                                                    {doctor.specialty}
                                                </span>
                                            </div>
                                            
                                            {/* مؤشر التوفر */}
                                            <div className='absolute top-4 left-4'>
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${doctor.available ? 'bg-green-500' : 'bg-red-500'} backdrop-blur-sm shadow-lg`}>
                                                    <i className={`fas ${doctor.available ? 'fa-check' : 'fa-clock'} text-white text-sm`}></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* معلومات الطبيب */}
                                        <div className='p-6'>
                                            <div className='mb-4'>
                                                <h3 className='text-xl font-bold text-gray-800 mb-1 group-hover:text-[#0097a5] transition-colors duration-300'>
                                                    <Link to={`/doctor/${doctor._id}`} className='hover:text-blue-800'>
                                                        {doctor.name}
                                                    </Link>
                                                </h3>
                                                <p className='text-gray-600 text-sm mb-2'>{doctor.qualification}</p>
                                                
                                                {/* التقييم */}
                                                <div className='flex items-center gap-2 mb-3'>
                                                    {renderStars(doctor.rating || 4.8)}
                                                    <span className='text-sm text-gray-600'>{doctor.rating || 4.8}</span>
                                                    <span className='text-sm text-gray-500'>({Math.floor(Math.random() * 100) + 50} reviews)</span>
                                                </div>
                                                
                                                {/* الخبرة */}
                                                <div className='flex items-center gap-3 text-gray-700 mb-3'>
                                                    <i className="fas fa-briefcase text-[#0097a5]"></i>
                                                    <span className='text-sm'>{doctor.experienceYears} years experience</span>
                                                </div>
                                                
                                                {/* اللغات */}
                                                <div className='flex items-center gap-3 text-gray-700'>
                                                    <i className="fas fa-language text-[#0097a5]"></i>
                                                    <span className='text-sm'>
                                                        {doctor.languages ? doctor.languages.slice(0, 2).join(', ') : 'English'}
                                                        {doctor.languages && doctor.languages.length > 2 && '...'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* أزرار الإجراءات */}
                                            <div className='flex gap-3 pt-4 border-t border-gray-100/50'>
                                                <Link
                                                    to={`/doctor/${doctor._id}`}
                                                    className='flex-1 text-center bg-gradient-to-r from-[#0097a5] to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                                                >
                                                    <i className="fas fa-calendar-alt mr-2"></i>
                                                    Book Now
                                                </Link>
                                                <Link
                                                    to={`/doctor/${doctor._id}`}
                                                    className='flex-1 text-center bg-gray-100/80 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-200/80 transition-all duration-300 transform hover:-translate-y-1'
                                                >
                                                    <i className="fas fa-user-md mr-2"></i>
                                                    Profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* الإحصائيات */}
                    <div className='mt-12 grid grid-cols-1 md:grid-cols-4 gap-6'>
                        <div className='bg-gradient-to-r from-[#0097a5] to-blue-600 text-white p-6 rounded-2xl text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1'>
                            <div className='text-3xl font-bold mb-2'>{doctors.length}</div>
                            <div className='text-sm opacity-90'>Total Doctors</div>
                            <div className='w-16 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 mx-auto mt-4 rounded-full'></div>
                        </div>
                        <div className='bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1'>
                            <div className='text-3xl font-bold mb-2'>
                                {doctors.filter(d => d.available).length}
                            </div>
                            <div className='text-sm opacity-90'>Available Now</div>
                            <div className='w-16 h-1 bg-gradient-to-r from-emerald-300 to-green-300 mx-auto mt-4 rounded-full'></div>
                        </div>
                        <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1'>
                            <div className='text-3xl font-bold mb-2'>{specialties.length - 1}</div>
                            <div className='text-sm opacity-90'>Specialties</div>
                            <div className='w-16 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-4 rounded-full'></div>
                        </div>
                        <div className='bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1'>
                            <div className='text-3xl font-bold mb-2'>
                                {doctors.reduce((sum, d) => sum + d.experienceYears, 0)}
                            </div>
                            <div className='text-sm opacity-90'>Total Years Experience</div>
                            <div className='w-16 h-1 bg-gradient-to-r from-orange-300 to-amber-300 mx-auto mt-4 rounded-full'></div>
                        </div>
                    </div>

                    {/* نص إرشادي */}
                    <div className='mt-8 text-center'>
                        <p className='text-gray-700 bg-white/50 backdrop-blur-sm p-4 rounded-xl'>
                            Can't find what you're looking for?{' '}
                            <Link to="/contact" className='font-bold text-[#0097a5] hover:text-blue-800 transition-colors duration-200'>
                                Contact our support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* خطوط زخرفية في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
        </section>
    );
}

export default AllDoctors;