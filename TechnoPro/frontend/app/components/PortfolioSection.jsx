import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const PortfolioSection = () => {
  const projects = [
    { id: 1, title: "Hotel Management System", description: "A comprehensive hotel management system including bookings, room management, and performance reports.", image: "/images/Portfolio1.jpg", technologies: ["MySql", "JavaScript", "React", "Bootstrap"], link: "https://hotel-mangment-system-txva.vercel.app/", pageTitle: "Hotel Management System", pageDescription: "A complete platform for managing hotel operations including booking system, room management, billing, and performance reports." },
    { id: 2, title: "Medical Clinic System", description: "A medical clinic management system including patient appointments, medical records, and billing.", image: "/images/Portfolio2.jpg", technologies: ["React", "Node.js", "MongoDB", "Express"], link: "https://medical-clinic-management-system.vercel.app/", pageTitle: "Medical Clinic Management System", pageDescription: "An integrated solution for managing medical clinics including appointment scheduling, electronic health records, staff management, and billing systems." },
    { id: 3, title: "Learning Management System", description: "A complete educational platform including courses, tests, and progress tracking.", image: "/images/Portfolio3.jpg", technologies: ["Next.js", "MySql", "Express", "Node.js"], link: "https://lms-demo.vercel.app", pageTitle: "Learning Management System", pageDescription: "A comprehensive digital educational platform for creating and managing educational content, student assessment, progress tracking, and interactive learning." },
    { id: 4, title: "Electronics E-Commerce", description: "An e-commerce store specialized in electronics with secure payment and enhanced user experience.", image: "/images/Portfolio4.jpg", technologies: ["React.js", "Express", "PostgreSQL", "Payment APIs"], link: "https://electronics-store.vercel.app", pageTitle: "Electronics E-Commerce Store", pageDescription: "A complete e-commerce platform for electronic devices with advanced categories, review system, secure payment, and customized user experience." }
  ];

  const [activeCards, setActiveCards] = useState({});

  const handleCardClick = (id, link) => {
    setActiveCards(prev => ({ ...prev, [id]: true }));
    setTimeout(() => { setActiveCards(prev => ({ ...prev, [id]: false })); }, 300);
    window.open(link, '_blank');
  };

  const handleButtonClick = (e, link) => {
    e.stopPropagation();
    window.open(link, '_blank');
  };

  return (
    <section className="py-28 relative text-white">
      <img src="/images/image.png" alt="Decorative Background Top Right" className="absolute -top-10 md:-top-40 lg:-top-80 left-8 md:left-16 lg:left-28 w-[20%] h-auto max-w-none z-0 pointer-events-none opacity-60 md:opacity-100" style={{ transform: 'scale(1.5)', transformOrigin: 'top right' }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 pb-18">
          <h2 className="text-3xl font-semibold text-primary-400 mb-2">Portfolio</h2>
          <h1 className="text-4xl md:text-6xl font-semibold text-white">What We Have Built</h1>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">Explore our outstanding projects that combine modern design with advanced technologies</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-gradient-to-br from-cyan-600/20 to-blue-800/20 rounded-xl overflow-hidden backdrop-blur-sm border border-cyan-500/20 transition-all duration-300 cursor-pointer hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10" onClick={() => handleCardClick(project.id, project.link)} style={{ transform: activeCards[project.id] ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.3s ease' }}>
              <div className="absolute inset-0 -z-1">
                <img src={project.image} alt={`${project.title} Preview`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300"></div>
                <div className={`absolute inset-0 transition-colors duration-300 ${activeCards[project.id] ? 'bg-black/70' : 'bg-transparent'}`}></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="relative z-10 p-4 h-full flex flex-col justify-between min-h-[400px]">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs font-medium bg-white/30 rounded-full text-white backdrop-blur-sm border border-white/20 group-hover:bg-white/40 transition-colors duration-300">{tech}</span>
                  ))}
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-cyan-100 transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-gray-200 mb-4 group-hover:text-gray-100 transition-colors duration-300">{project.description}</p>
                  <div className="flex justify-end">
                    <div className="inline-flex items-center gap-2 cursor-pointer relative group/btn" role="button" onClick={(e) => handleButtonClick(e, project.link)} onKeyDown={(e) => e.key === 'Enter' && handleButtonClick(e, project.link)} tabIndex={0}>
                      <span className="text-md font-medium text-cyan-200 group-hover/btn:text-cyan-100 transition-colors duration-300">Visit</span>
                      <div className="relative h-4 w-4 md:h-6 md:w-6">
                        <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out bg-cyan-200 group-hover/btn:bg-cyan-100 ${activeCards[project.id] ? 'scale-90' : ''}`}>
                          <IoIosArrowForward className={`text-lg transition-all duration-300 text-black group-hover:text-black group-hover:-rotate-45 group-hover:scale-110`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;