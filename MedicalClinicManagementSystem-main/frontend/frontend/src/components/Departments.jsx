import React, { useState, useEffect } from 'react';

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredDepartment, setHoveredDepartment] = useState(null);
    const [error, setError] = useState(null);

    // بيانات افتراضية
    const defaultDepartments = [
        {
            _id: "1",
            name: "Cardiology",
            description: "Our Cardiology department specializes in the diagnosis and treatment of heart diseases. We offer comprehensive cardiac care including preventive cardiology, interventional procedures, and cardiac rehabilitation programs with state-of-the-art technology."
        },
        {
            _id: "2",
            name: "Neurology",
            description: "The Neurology department provides advanced care for disorders of the nervous system. Our team of neurologists and neurosurgeons treat conditions such as epilepsy, stroke, multiple sclerosis, Parkinson's disease, and other neurological disorders."
        },
        {
            _id: "3",
            name: "Orthopedics",
            description: "Our Orthopedics department specializes in musculoskeletal conditions. We offer comprehensive bone and joint care including joint replacement surgeries, sports medicine, spine care, and trauma surgery with minimally invasive techniques."
        },
        {
            _id: "4",
            name: "Pediatrics",
            description: "The Pediatrics department provides compassionate care for infants, children, and adolescents. Our pediatricians and specialists offer complete healthcare services from routine check-ups to complex medical conditions in a child-friendly environment."
        },
        {
            _id: "5",
            name: "Dermatology",
            description: "Our Dermatology department offers comprehensive skin, hair, and nail care. We treat various skin conditions including acne, psoriasis, eczema, skin cancer, and provide cosmetic dermatology services using the latest technologies."
        },
        {
            _id: "6",
            name: "Ophthalmology",
            description: "The Ophthalmology department specializes in eye care and vision health. We provide services ranging from routine eye examinations to complex eye surgeries including cataract surgery, LASIK, glaucoma treatment, and retinal disorders."
        },
        {
            _id: "7",
            name: "Emergency",
            description: "Our Emergency department operates 24/7 to provide immediate medical attention for acute illnesses and injuries. Equipped with advanced life support systems and staffed by emergency medicine specialists for critical care situations."
        },
        {
            _id: "8",
            name: "Oncology",
            description: "The Oncology department offers comprehensive cancer care including diagnosis, chemotherapy, radiation therapy, and surgical oncology. We provide personalized treatment plans with a multidisciplinary approach to cancer care."
        }
    ];

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const response = await fetch("https://medicalclinicmanagementsystem.onrender.com/departments/allDepartment");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data && data.length > 0) {
                    setDepartments(data);
                    setActiveTab(data[0]._id);
                } else {
                    // إذا كانت البيانات فارغة، استخدم البيانات الافتراضية
                    setDepartments(defaultDepartments);
                    setActiveTab(defaultDepartments[0]._id);
                }
            } catch (err) {
                console.error('Failed to fetch departments:', err);
                setError('Unable to load departments. Showing default information.');
                
                // استخدم البيانات الافتراضية في حالة الخطأ
                setDepartments(defaultDepartments);
                setActiveTab(defaultDepartments[0]._id);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    const getDepartmentIcon = (departmentName) => {
        const icons = {
            'Cardiology': 'fas fa-heart-pulse',
            'Neurology': 'fas fa-brain',
            'Orthopedics': 'fas fa-bone',
            'Pediatrics': 'fas fa-baby',
            'Dermatology': 'fas fa-allergies',
            'Ophthalmology': 'fas fa-eye',
            'Radiology': 'fas fa-x-ray',
            'Emergency': 'fas fa-ambulance',
            'Surgery': 'fas fa-syringe',
            'Oncology': 'fas fa-stethoscope',
            'default': 'fas fa-hospital'
        };

        const normalizedName = departmentName?.toLowerCase();
        for (const [key, icon] of Object.entries(icons)) {
            if (normalizedName?.includes(key.toLowerCase())) {
                return icon;
            }
        }
        return icons.default;
    };

    const getDepartmentColor = (departmentName) => {
        const colors = {
            'Cardiology': 'from-red-500 to-pink-500',
            'Neurology': 'from-purple-500 to-indigo-500',
            'Orthopedics': 'from-blue-500 to-cyan-500',
            'Pediatrics': 'from-green-500 to-emerald-500',
            'Dermatology': 'from-amber-500 to-orange-500',
            'Ophthalmology': 'from-teal-500 to-cyan-400',
            'Radiology': 'from-gray-600 to-blue-400',
            'Emergency': 'from-red-600 to-orange-500',
            'Surgery': 'from-blue-600 to-purple-500',
            'Oncology': 'from-purple-600 to-pink-500',
            'default': 'from-[#0097a5] to-blue-500'
        };

        const normalizedName = departmentName?.toLowerCase();
        for (const [key, color] of Object.entries(colors)) {
            if (normalizedName?.includes(key.toLowerCase())) {
                return color;
            }
        }
        return colors.default;
    };

    const activeDepartment = departments.find(dep => dep._id === activeTab);

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
                        <p className='mt-6 text-gray-700 text-lg font-medium'>Loading departments...</p>
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
                            Our Medical <span className='text-blue-800'>Departments</span>
                        </h2>
                        <div className='absolute -bottom-2 left-1/4 w-1/2 h-2 bg-blue-100 rounded-full z-0'></div>
                    </div>
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mb-8 rounded-full'></div>
                    <p className='text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm'>
                        Explore our specialized medical departments staffed with expert doctors and equipped with advanced technology.
                        Each department is dedicated to providing exceptional care in their respective fields.
                    </p>
                    
                    {/* رسالة الخطأ */}
                    {error && (
                        <div className='mt-6 inline-flex items-center p-4 bg-yellow-50/90 backdrop-blur-sm border border-yellow-200 rounded-xl text-yellow-800 shadow-lg'>
                            <i className="fas fa-exclamation-triangle mr-3 text-lg"></i>
                            <span className='text-sm font-medium'>{error}</span>
                        </div>
                    )}
                </div>

                <div className='grid lg:grid-cols-3 gap-8'>
                    {/* القائمة الجانبية */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8'>
                            <div className='mb-6'>
                                <h3 className='text-xl font-bold text-gray-800 mb-2 flex items-center'>
                                    <i className="fas fa-stethoscope text-[#0097a5] mr-3"></i>
                                    Specialized Departments
                                </h3>
                                <p className='text-gray-600 text-sm bg-blue-50/50 p-3 rounded-lg'>Select a department to view details</p>
                            </div>
                            
                            <div className='space-y-3 max-h-[500px] overflow-y-auto pr-2'>
                                {departments.map((dep) => {
                                    const isActive = activeTab === dep._id;
                                    const colorClass = getDepartmentColor(dep.name);
                                    
                                    return (
                                        <div
                                            key={dep._id}
                                            className='relative group'
                                            onMouseEnter={() => setHoveredDepartment(dep._id)}
                                            onMouseLeave={() => setHoveredDepartment(null)}
                                        >
                                            <button
                                                onClick={() => handleTabClick(dep._id)}
                                                className={`relative w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                                                    isActive 
                                                    ? `bg-gradient-to-r ${colorClass} text-white shadow-lg transform -translate-y-1` 
                                                    : 'bg-gray-50 hover:bg-white hover:shadow-md text-gray-800 hover:-translate-y-1'
                                                }`}
                                            >
                                                {/* الأيقونة */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                                                    isActive 
                                                    ? 'bg-white/20' 
                                                    : `bg-gradient-to-br ${colorClass} text-white`
                                                }`}>
                                                    <i className={`${getDepartmentIcon(dep.name)} text-lg`}></i>
                                                </div>
                                                
                                                {/* معلومات القسم */}
                                                <div className='flex-1 text-left'>
                                                    <h4 className={`font-bold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                                        {dep.name}
                                                    </h4>
                                                    <p className={`text-sm mt-1 ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
                                                        {dep.description?.substring(0, 50)}...
                                                    </p>
                                                </div>
                                                
                                                {/* المؤشر */}
                                                <div className={`transition-transform duration-300 ${
                                                    isActive ? 'rotate-90' : ''
                                                }`}>
                                                    <i className={`fas fa-chevron-right ${isActive ? 'text-white' : 'text-gray-400'}`}></i>
                                                </div>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* المحتوى الرئيسي */}
                    <div className='lg:col-span-2'>
                        {activeDepartment ? (
                            <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 group'>
                                {/* رأس القسم */}
                                <div className={`bg-gradient-to-r ${getDepartmentColor(activeDepartment.name)} p-8`}>
                                    <div className='flex flex-col md:flex-row md:items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center'>
                                                <i className={`${getDepartmentIcon(activeDepartment.name)} text-2xl text-white`}></i>
                                            </div>
                                            <div>
                                                <h3 className='text-3xl font-bold text-white'>{activeDepartment.name}</h3>
                                                <p className='text-white/90 mt-1'>Specialized Medical Department</p>
                                            </div>
                                        </div>
                                        <div className='mt-4 md:mt-0'>
                                            <span className='inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm'>
                                                <i className="fas fa-user-md mr-2"></i>
                                                Expert Team Available
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* محتوى القسم */}
                                <div className='p-8'>
                                    <div className='grid md:grid-cols-2 gap-8'>
                                        <div>
                                            <div className='bg-gradient-to-br from-blue-50/80 to-white/80 p-6 rounded-xl border-l-4 border-[#0097a5] backdrop-blur-sm mb-6'>
                                                <h4 className='text-xl font-bold text-gray-800 mb-4 flex items-center'>
                                                    <i className="fas fa-info-circle text-[#0097a5] mr-3"></i>
                                                    Department Overview
                                                </h4>
                                                <p className='text-gray-700 leading-relaxed'>
                                                    {activeDepartment.description}
                                                </p>
                                            </div>
                                            
                                            {/* المميزات الرئيسية */}
                                            <div className='mt-8'>
                                                <h5 className='text-lg font-bold text-gray-800 mb-4 flex items-center'>
                                                    <i className="fas fa-star text-amber-500 mr-2"></i>
                                                    Key Features
                                                </h5>
                                                <div className='space-y-3'>
                                                    {[
                                                        "Advanced diagnostic equipment",
                                                        "24/7 emergency services",
                                                        "Multidisciplinary team",
                                                        "Patient-centered care",
                                                        "Research and innovation"
                                                    ].map((feature, index) => (
                                                        <div key={index} className='flex items-center gap-3 bg-white/50 p-3 rounded-lg'>
                                                            <div className='w-2 h-2 bg-[#0097a5] rounded-full'></div>
                                                            <span className='text-gray-800'>{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            {/* الإحصائيات */}
                                            <div className='bg-gradient-to-br from-gray-50/80 to-white/80 rounded-xl p-6 border border-gray-200/50 backdrop-blur-sm'>
                                                <h4 className='text-xl font-bold text-gray-800 mb-6 flex items-center'>
                                                    <i className="fas fa-chart-line text-[#0097a5] mr-3"></i>
                                                    Department Statistics
                                                </h4>
                                                
                                                <div className='space-y-6'>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex items-center gap-3'>
                                                            <div className='w-12 h-12 bg-blue-100/80 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                                                                <i className="fas fa-user-md text-[#0097a5]"></i>
                                                            </div>
                                                            <div>
                                                                <p className='text-sm text-gray-600'>Specialists</p>
                                                                <p className='text-2xl font-bold text-gray-800'>15+</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center gap-3'>
                                                            <div className='w-12 h-12 bg-green-100/80 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                                                                <i className="fas fa-bed text-green-600"></i>
                                                            </div>
                                                            <div>
                                                                <p className='text-sm text-gray-600'>Beds</p>
                                                                <p className='text-2xl font-bold text-gray-800'>50+</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className='pt-6 border-t border-gray-200/50'>
                                                        <div className='flex items-center gap-3 mb-4'>
                                                            <div className='w-12 h-12 bg-purple-100/80 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                                                                <i className="fas fa-calendar-check text-purple-600"></i>
                                                            </div>
                                                            <div>
                                                                <p className='text-sm text-gray-600'>Annual Procedures</p>
                                                                <p className='text-2xl font-bold text-gray-800'>2,500+</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* زر الحجز */}
                                            <div className='mt-8'>
                                                <button className='w-full bg-gradient-to-r from-[#0097a5] to-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group'>
                                                    <i className="fas fa-calendar-alt group-hover:rotate-12 transition duration-300"></i>
                                                    Book an Appointment
                                                </button>
                                                <p className='text-center text-gray-600 text-sm mt-3 backdrop-blur-sm p-2 rounded-lg'>
                                                    <i className="fas fa-clock text-[#0097a5] mr-2"></i>
                                                    Emergency services available 24/7
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center'>
                                <div className='w-20 h-20 bg-gradient-to-br from-blue-100 to-[#0097a5]/20 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                                    <i className="fas fa-hospital text-4xl text-[#0097a5]"></i>
                                </div>
                                <h3 className='text-2xl font-bold text-gray-600 mb-3'>Select a Department</h3>
                                <p className='text-gray-600'>Choose a department from the list to view detailed information</p>
                                <div className='w-32 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-6 rounded-full'></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* معلومات إضافية */}
                <div className='mt-16 bg-gradient-to-r from-blue-50/80 to-[#0097a5]/10 rounded-2xl p-8 border border-blue-100/50 backdrop-blur-sm'>
                    <div className='grid md:grid-cols-3 gap-8'>
                        <div className='text-center group'>
                            <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1'>
                                <i className="fas fa-clock text-2xl text-[#0097a5]"></i>
                            </div>
                            <h4 className='font-bold text-gray-800 mb-2'>24/7 Availability</h4>
                            <p className='text-gray-700 text-sm'>Emergency departments open round the clock</p>
                            <div className='w-12 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                        </div>
                        <div className='text-center group'>
                            <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1'>
                                <i className="fas fa-user-md text-2xl text-[#0097a5]"></i>
                            </div>
                            <h4 className='font-bold text-gray-800 mb-2'>Expert Team</h4>
                            <p className='text-gray-700 text-sm'>Board-certified specialists in each department</p>
                            <div className='w-12 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                        </div>
                        <div className='text-center group'>
                            <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1'>
                                <i className="fas fa-microscope text-2xl text-[#0097a5]"></i>
                            </div>
                            <h4 className='font-bold text-gray-800 mb-2'>Advanced Technology</h4>
                            <p className='text-gray-700 text-sm'>Latest medical equipment and technology</p>
                            <div className='w-12 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* خطوط زخرفية في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
        </section>
    );
}

export default Departments;