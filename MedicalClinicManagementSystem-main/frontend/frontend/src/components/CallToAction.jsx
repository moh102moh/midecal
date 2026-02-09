import React from 'react';

function CallToAction() {
    return (
        <section className='bg-[#0097a5] text-white py-20 relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
            <div className='absolute bottom-0 right-0 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000'></div>
            
            <div className='max-w-4xl mx-auto text-center px-4 relative z-10'>
                {/* Emergency Badge */}
                <div className='inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-6 animate-bounce'>
                    <i className='fas fa-exclamation-triangle'></i>
                    <span className='font-bold'>24/7 EMERGENCY</span>
                </div>

                {/* Main Heading */}
                <h3 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
                    In an Emergency? 
                    <span className='block text-cyan-200 mt-2'>Need Immediate Help?</span>
                </h3>

                {/* Description */}
                <p className='text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed'>
                    Our medical team is available <span className='font-bold text-white'>24/7</span> to provide 
                    urgent care and immediate assistance when you need it most
                </p>

                {/* Stats */}
                <div className='flex justify-center gap-8 mb-10'>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-white'>15 min</div>
                        <div className='text-blue-100 text-sm'>Avg. Response Time</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-white'>24/7</div>
                        <div className='text-blue-100 text-sm'>Emergency Service</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-white'>100+</div>
                        <div className='text-blue-100 text-sm'>Experts On Duty</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                    <button className='group relative bg-white text-[#0097a5] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]'>
                        <div className='flex items-center justify-center gap-3'>
                            <i className='fas fa-calendar-check'></i>
                            <span>Make Appointment</span>
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-r from-white to-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>
                    </button>
                    
                    <button className='group relative bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]'>
                        <div className='flex items-center justify-center gap-3'>
                            <i className='fas fa-phone-alt animate-pulse'></i>
                            <span>Call Emergency</span>
                        </div>
                    </button>
                </div>

                {/* Emergency Contact */}
                <div className='mt-10 bg-white/10 backdrop-blur-sm p-4 rounded-xl inline-block'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='bg-red-500 p-3 rounded-full animate-pulse'>
                            <i className='fas fa-phone text-white text-xl'></i>
                        </div>
                        <div className='text-left'>
                            <div className='text-sm text-blue-200'>Emergency Hotline</div>
                            <div className='text-2xl font-bold tracking-wider'>1-800-MED-HELP</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom styles for animations */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.3; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce {
                    animation: bounce 2s infinite;
                }
            `}</style>
        </section>
    );
}

export default CallToAction;