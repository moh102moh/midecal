import React from 'react';
import AboutUs from '../img/about.jpg';

function About() {
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
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
                {/* العنوان الرئيسي */}
                <div className='text-center mb-16'>
                    <div className='inline-block relative'>
                        <h2 className='text-4xl md:text-5xl font-bold text-[#0097a5] mb-4 relative z-10'>
                            About <span className='text-blue-800'>Us</span>
                        </h2>
                        <div className='absolute -bottom-2 left-1/4 w-1/2 h-2 bg-blue-100 rounded-full z-0'></div>
                    </div>
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mb-8 rounded-full'></div>
                    <p className='text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm'>
                        We are dedicated to providing high-quality healthcare services with modern facilities and compassionate care.
                        Our mission is to ensure every patient receives the attention and treatment they deserve.
                    </p>
                </div>

                {/* المحتوى الرئيسي */}
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    {/* الصورة */}
                    <div className='relative group'>
                        <div className='absolute -inset-4 bg-gradient-to-r from-blue-200 to-[#0097a5] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:-translate-y-1 transition duration-300'>
                            <img 
                                src={AboutUs} 
                                alt='Our medical team' 
                                className='w-full h-auto object-cover transform group-hover:scale-105 transition duration-700'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500'></div>
                        </div>
                        <div className='absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition duration-300'>
                            <div className='flex items-center'>
                                <div className='bg-gradient-to-br from-[#0097a5] to-blue-600 text-white p-2 rounded-lg mr-3'>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className='font-bold text-gray-800'>Modern Facilities</p>
                                    <p className='text-sm text-gray-600'>State-of-the-art equipment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* النص */}
                    <div className='space-y-8'>
                        <div className='bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-50 hover:shadow-xl transition duration-300 transform hover:-translate-y-1'>
                            <div className='flex items-start mb-6'>
                                <div className='bg-gradient-to-br from-blue-50 to-white p-3 rounded-xl mr-4 shadow-inner'>
                                    <svg className="w-8 h-8 text-[#0097a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className='text-2xl font-bold text-gray-800 leading-tight'>
                                    We are committed to providing trusted healthcare services with skilled professionals, advanced technology, and compassionate care to ensure your well-being.
                                </h3>
                            </div>
                            
                            <div className='bg-gradient-to-r from-blue-50/80 to-white/80 p-6 rounded-xl border-l-4 border-[#0097a5] backdrop-blur-sm'>
                                <p className='text-[#0097a5] font-semibold text-lg mb-2'>Our Mission:</p>
                                <p className='text-gray-700 leading-relaxed'>
                                    We strive to deliver exceptional healthcare with a patient-first approach, combining expert medical knowledge, modern facilities, and compassionate care to improve lives and build healthier communities.
                                </p>
                            </div>
                        </div>

                        {/* نقاط إضافية */}
                        <div className='grid sm:grid-cols-2 gap-6'>
                            <div className='bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 hover:border-blue-200 transition duration-300 transform hover:-translate-y-1'>
                                <div className='flex items-center mb-3'>
                                    <div className='bg-gradient-to-br from-blue-50 to-white p-2 rounded-lg mr-3 shadow-inner'>
                                        <svg className="w-5 h-5 text-[#0097a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </div>
                                    <h4 className='font-bold text-gray-800'>Expert Team</h4>
                                </div>
                                <p className='text-gray-600 text-sm'>Highly skilled medical professionals with years of experience.</p>
                            </div>

                            <div className='bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 hover:border-blue-200 transition duration-300 transform hover:-translate-y-1'>
                                <div className='flex items-center mb-3'>
                                    <div className='bg-gradient-to-br from-blue-50 to-white p-2 rounded-lg mr-3 shadow-inner'>
                                        <svg className="w-5 h-5 text-[#0097a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </div>
                                    <h4 className='font-bold text-gray-800'>Advanced Technology</h4>
                                </div>
                                <p className='text-gray-600 text-sm'>Cutting-edge medical equipment for accurate diagnosis.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* إحصاءات */}
                <div className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>500+</div>
                        <div className='text-gray-600 font-medium'>Patients Treated</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>50+</div>
                        <div className='text-gray-600 font-medium'>Expert Doctors</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>24/7</div>
                        <div className='text-gray-600 font-medium'>Emergency Service</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                    <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group'>
                        <div className='text-3xl font-bold text-[#0097a5] mb-2 group-hover:scale-110 transition duration-300'>98%</div>
                        <div className='text-gray-600 font-medium'>Patient Satisfaction</div>
                        <div className='w-16 h-1 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                    </div>
                </div>
            </div>
            
            {/* خطوط زخرفية في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
        </section>
    );
}

export default About;