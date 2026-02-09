import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import carousel_1 from '../img/hero-carousel/hero-carousel-1.jpg';
import carousel_2 from '../img/hero-carousel/hero-carousel-2.jpg';
import carousel_3 from '../img/hero-carousel/hero-carousel-3.jpg';

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const slides = [
    {
      image: carousel_1,
      title: "Your Health, Our Priority",
      text: "We provide advanced medical care with experienced doctors, modern technology, and a caring approach for every patient."
    },
    {
      image: carousel_2,
      title: "Specialized Medical Services",
      text: "From cardiology to pediatrics, our expert teams are ready to help you and your family stay healthy and safe."
    },
    {
      image: carousel_3,
      title: "Easy Online Appointment",
      text: "Book your appointment quickly and conveniently with top doctors at your preferred time."
    },
  ];

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[85vh]">
            {/* الصورة مع تأثير خفيف */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover scale-105 animate-zoom"
              />
              
              {/* طبقة تدرج لوني فاتح للسماح برؤية النص الأسود */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
            </div>

            {/* محتوى النص */}
            <div className="relative h-full flex items-center justify-center px-4">
              <div className="max-w-4xl text-center">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  {slide.title}
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-800 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                  {slide.text}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg">
                    <span className="flex items-center justify-center gap-3">
                      <i className="fas fa-calendar-check"></i>
                      Book Appointment
                    </span>
                  </button>
                  
                  <button className="bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                    <span className="flex items-center justify-center gap-3">
                      <i className="fas fa-phone-alt"></i>
                      Contact Us
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom CSS للتحكم في مظهر النقاط فقط */}
      <style jsx>{`
        .slick-dots {
          bottom: 40px !important;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          opacity: 1;
        }
        .slick-dots li.slick-active button:before {
          color: #1e40af;
          font-size: 14px;
        }
        
        /* تأثير التكبير الخفيف للصور */
        @keyframes zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-zoom {
          animation: zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}

export default HeroSlider;