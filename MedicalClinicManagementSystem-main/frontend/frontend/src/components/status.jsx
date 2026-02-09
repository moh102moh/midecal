import React, { useState, useEffect, useRef } from 'react';

function Status() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [animatedCounts, setAnimatedCounts] = useState({
    doctors: 0,
    departments: 0,
    research: 0,
    awards: 0
  });
  
  const sectionRef = useRef(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctorRes, departmentRes] = await Promise.all([
          fetch("https://medicalclinicmanagementsystem.onrender.com/doctors/count"),
          fetch("https://medicalclinicmanagementsystem.onrender.com/departments/count")
        ]);

        const doctorData = await doctorRes.json();
        const departmentsData = await departmentRes.json();

        setDoctorCount(doctorData || 0);
        setDepartmentCount(departmentsData || 0);
      } catch (error) {
        console.log("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Animation for counting up
  useEffect(() => {
    const animateCount = (start, end, setter, duration = 2000) => {
      const startTime = Date.now();
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + easeOutQuart * (end - start));
        
        setter(current);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    };

    if (doctorCount > 0 && departmentCount > 0 && !animationStarted.current) {
      animateCount(0, doctorCount, (val) => 
        setAnimatedCounts(prev => ({ ...prev, doctors: val })), 1500);
      animateCount(0, departmentCount, (val) => 
        setAnimatedCounts(prev => ({ ...prev, departments: val })), 1500);
      animateCount(0, 8, (val) => 
        setAnimatedCounts(prev => ({ ...prev, research: val })), 1500);
      animateCount(0, 9, (val) => 
        setAnimatedCounts(prev => ({ ...prev, awards: val })), 1500);
    }
  }, [doctorCount, departmentCount]);

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted.current) {
            animationStarted.current = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { 
      icon: "fas fa-user-md", 
      count: animatedCounts.doctors, 
      label: "Expert Doctors",
      description: "Qualified specialists",
      color: "from-blue-500 to-cyan-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      icon: "fas fa-hospital", 
      count: animatedCounts.departments, 
      label: "Departments",
      description: "Medical specialties",
      color: "from-emerald-500 to-teal-400",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    { 
      icon: "fas fa-flask", 
      count: animatedCounts.research, 
      label: "Research Labs",
      description: "Advanced facilities",
      color: "from-purple-500 to-violet-400",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    { 
      icon: "fas fa-award", 
      count: animatedCounts.awards, 
      label: "Awards Won",
      description: "Recognition & excellence",
      color: "from-amber-500 to-orange-400",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Achievements</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Years of excellence in healthcare, recognized through our milestones and dedication to patient care
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card with gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon with gradient background */}
                <div className={`inline-flex p-4 rounded-2xl ${item.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${item.icon} text-3xl ${item.iconColor}`}></i>
                </div>

                {/* Animated counter */}
                <div className="flex items-baseline mb-3">
                  <span className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-gray-800 to-gray-600">
                    {item.count}
                  </span>
                  {index === 0 && (
                    <span className="ml-2 text-2xl font-bold text-blue-600">+</span>
                  )}
                </div>

                {/* Label and description */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.label}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>

                {/* Progress bar */}
                <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${Math.min((item.count / (index === 0 ? 100 : 15)) * 100, 100)}%` 
                    }}
                  ></div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute -top-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} opacity-10`}></div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100">
            <i className="fas fa-sync-alt text-blue-500 mr-3"></i>
            <span className="text-gray-700">
              Statistics updated <span className="font-semibold text-blue-600">real-time</span> from our database
            </span>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default Status;