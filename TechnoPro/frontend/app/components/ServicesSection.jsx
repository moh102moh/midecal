import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ServicesSection() {
  const services = [
    {
      title: "Website Development and Programming",
      desc: "We develop professional, fast, and secure websites that are compatible with all devices, providing a smooth user experience that reflects your brand identity."
    },
    {
      title: "Mobile Applications and Custom Systems",
      desc: "We build tailored applications and systems that help businesses manage their operations efficiently, offering flexible solutions that can scale with your growth."
    },
    {
      title: "System Analysis and Solution Design",
      desc: "We analyze business requirements and design a clear technical architecture to ensure optimal performance and minimal errors."
    },
    {
      title: "Data Analysis and Reporting",
      desc: "We transform data into accurate reports and insights to support informed decision-making and enhance overall performance."
    },
    {
      title: "Custom Software Solutions",
      desc: "We provide software solutions specifically designed to meet your current and future business needs."
    },
    {
      title: "Technical Consulting and Support",
      desc: "We offer technology consulting and ongoing technical support to ensure system stability and continuous operation."
    }
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredViewMore, setHoveredViewMore] = useState(false);
  const [cardHeight, setCardHeight] = useState("400px");
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  const handleViewMore = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    const updateCardHeight = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let height;
        
        if (containerWidth < 640) {
          height = "380px";
        } else if (containerWidth >= 640 && containerWidth < 1024) {
          height = "420px";
        } else {
          height = "450px";
        }
        
        setCardHeight(height);
      }
    };

    updateCardHeight();
    window.addEventListener('resize', updateCardHeight);
    
    return () => {
      window.removeEventListener('resize', updateCardHeight);
    };
  }, []);

  return (
    <section className="py-12 md:py-20 bg-background-dark text-primary-50 relative overflow-hidden my-16 md:my-24">
      <img
        src="/images/image4.png"
        alt="Decorative Background Top Right"
        className="absolute -top-30 md:-top-40 lg:-top-80 left-8 md:left-16 lg:left-28 w-[40%] md:w-[30%] h-auto max-w-none z-0 pointer-events-none opacity-60 md:opacity-100"
        style={{
          transform: 'scale(1.5)',
          transformOrigin: 'top right',
        }}
      />
      
      <div ref={containerRef} className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20 lg:mb-32">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-primary-300">Our Services</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-50">What We Do</h3>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Virtual]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!pb-10 md:!pb-12 lg:!pb-16"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1300: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div 
                  className="service-card bg-primary-200/20 p-5 md:p-6 rounded-xl group transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-primary-500/20 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: hoveredCard === index ? 'rgba(34, 147, 164, 0.2)' : 'rgba(163, 186, 195, 0.2)',
                    transition: 'all 0.5s ease-in-out',
                    height: cardHeight,
                    minHeight: cardHeight
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-3 md:mb-4 flex-shrink-0 min-h-[4rem] md:min-h-[4.5rem] lg:min-h-[5rem]">
                      <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-50 line-clamp-2 h-full">
                        {service.title}
                      </h4>
                    </div>
                    
                    <div className="flex-grow mb-3 md:mb-4 overflow-hidden">
                      <p className="text-base md:text-lg lg:text-2xl text-primary-50 font-light h-full overflow-y-auto pr-2 custom-scrollbar">
                        {service.desc}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-3 md:pt-4 flex-shrink-0">
                      <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-visible">
                        <button 
                          className={`absolute w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                            hoveredCard === index 
                              ? 'translate-x-2 -translate-y-2 md:translate-x-3 md:-translate-y-3 bg-primary-200' 
                              : 'translate-x-0 translate-y-0 bg-primary-50'
                          }`}
                          aria-label={`Learn more about ${service.title}`}
                        >
                          <IoIosArrowForward 
                            className={`text-lg md:text-xl transition-all duration-300 ${
                              hoveredCard === index 
                                ? 'text-primary-50 -rotate-45 scale-110' 
                                : 'text-black'
                            }`} 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="flex justify-end -mt-4">
          <div 
            className="inline-flex items-center gap-2 cursor-pointer relative group"
            onMouseEnter={() => setHoveredViewMore(true)}
            onMouseLeave={() => setHoveredViewMore(false)}
            onClick={handleViewMore}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleViewMore()}
          >
            <span className="text-base md:text-lg font-medium text-primary-50 group-hover:text-primary-200 transition-colors duration-300">
              View more
            </span>
            
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <div 
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                  hoveredViewMore 
                    ? 'bg-primary-200' 
                    : 'bg-primary-50'
                }`}
              >
                <IoIosArrowForward 
                  className={`text-lg md:text-xl transition-all duration-300 ${
                    hoveredViewMore 
                      ? 'text-white -rotate-45 scale-110' 
                      : 'text-black'
                  }`} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .services-swiper .swiper-wrapper {
          display: flex;
          align-items: stretch !important;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(163, 186, 195, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 147, 164, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 147, 164, 0.5);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 147, 164, 0.3) rgba(163, 186, 195, 0.1);
        }
        
        @media (max-width: 639px) {
          .swiper-slide {
            height: 380px !important;
          }
        }
        
        @media (min-width: 640px) and (max-width: 1023px) {
          .swiper-slide {
            height: 420px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .swiper-slide {
            height: 450px !important;
          }
        }
      `}</style>
    </section>
  );
}