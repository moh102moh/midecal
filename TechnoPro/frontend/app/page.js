'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PortfolioSection from './components/PortfolioSection';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [headerHeight, setHeaderHeight] = useState(80);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    calculateHeaderHeight();
    window.addEventListener('resize', calculateHeaderHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      const sections = ['hero', 'about', 'services', 'portfolio', 'why', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= headerHeight && rect.bottom >= headerHeight;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeight]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMenuOpen]);

  const scrollToSectionWithOffset = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const offsetTop = section.offsetTop - (sectionId === 'hero' ? 0 : headerHeight);
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  }, [headerHeight]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    setIsMenuOpen(prev => !prev);
  }, []);

  const getTextColor = () => {
    return isScrolled ? 'text-gray-800' : 'text-primary-50';
  };

  const getActiveTextColor = () => {
    return isScrolled ? 'text-primary-600 font-semibold' : 'text-primary-400 font-semibold';
  };

  const getHeaderBackground = () => {
    return isScrolled 
      ? 'bg-white/60 backdrop-blur-md shadow-lg' 
      : 'bg-transparent';
  };

  const getMobileMenuBackground = () => {
    return isScrolled 
      ? 'bg-white/60 backdrop-blur-md border-t border-gray-200' 
      : 'bg-background-dark/95 backdrop-blur-md border-t border-gray-800';
  };

  const getMobileMenuItemColor = (sectionId) => {
    if (isScrolled) {
      return activeSection === sectionId 
        ? 'text-primary-600 font-semibold border-l-4 border-primary-600 pl-4' 
        : 'text-gray-700 hover:text-primary-600 hover:pl-4 hover:border-l-2 hover:border-primary-600';
    }
    return activeSection === sectionId 
      ? 'text-primary-400 font-semibold border-l-4 border-primary-400 pl-4' 
      : 'text-primary-50 hover:text-primary-400 hover:pl-4 hover:border-l-2 hover:border-primary-400';
  };

  return (
    <main className="relative min-h-screen bg-background-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[80vh] h-[80vh] rounded-full bg-primary-400/10 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vh] h-[70vh] rounded-full bg-primary-400/5 blur-3xl"></div>
      </div>

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBackground()}`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo - متجاوب مع جميع الشاشات */}
          <div className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 transition-all duration-300">
            <img
              src="/images/image3.png"
              alt="Logo"
              className="w-full h-auto cursor-pointer transition-opacity hover:opacity-90"
              width={400}
              height={100}
              loading="eager"
              onClick={() => scrollToSectionWithOffset('hero')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('hero')}
              tabIndex={0}
            />
          </div>
          
          {/* Navigation for desktop - محسن للتجاوب */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSectionWithOffset('hero')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('hero')}
              className={`transition-all duration-300 px-2 py-1 rounded-md text-sm lg:text-base ${
                activeSection === 'hero' 
                  ? getActiveTextColor()
                  : `${getTextColor()} hover:text-primary-400 `
              }`}
              aria-label="Go to Home section"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSectionWithOffset('about')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('about')}
              className={`transition-all duration-300 px-2 py-1 rounded-md text-sm lg:text-base ${
                activeSection === 'about' 
                  ? getActiveTextColor()
                  : `${getTextColor()} hover:text-primary-400`
              }`}
              aria-label="Go to About Us section"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSectionWithOffset('services')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('services')}
              className={`transition-all duration-300 px-2 py-1 rounded-md text-sm lg:text-base ${
                activeSection === 'services' 
                  ? getActiveTextColor()
                  : `${getTextColor()} hover:text-primary-400`
              }`}
              aria-label="Go to Services section"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSectionWithOffset('portfolio')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('portfolio')}
              className={`transition-all duration-300 px-2 py-1 rounded-md text-sm lg:text-base ${
                activeSection === 'portfolio' 
                  ? getActiveTextColor()
                  : `${getTextColor()} hover:text-primary-400`
              }`}
              aria-label="Go to Portfolio section"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSectionWithOffset('why')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('why')}
              className={`transition-all duration-300 px-2 py-1 rounded-md text-sm lg:text-base ${
                activeSection === 'why' 
                  ? getActiveTextColor()
                  : `${getTextColor()} hover:text-primary-400`
              }`}
              aria-label="Go to Why Us section"
            >
              Why Us
            </button>
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Contact Button - متجاوب مع جميع الشاشات */}
            <button 
              onClick={() => scrollToSectionWithOffset('contact')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('contact')}
              className="hidden md:inline-flex items-center justify-center
                bg-primary-400 text-primary-50 font-medium sm:font-bold
                px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2
                rounded-full 
                hover:bg-primary-600 
                transition-all duration-300 
                text-xs sm:text-sm lg:text-base
                shadow-[0px_1px_3px_0px_#6BACCC1A]
                hover:shadow-[0px_12px_7px_0px_#6BACCC0D]
                active:shadow-[0px_5px_5px_0px_#6BACCC17]
                focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50
                min-w-[100px] sm:min-w-[120px]"
              aria-label="Contact us"
            >
              <span className="hidden sm:inline">Contact us</span>
              <span className="inline sm:hidden">Contact</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-lg transition ${
                isScrolled 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-primary-50 hover:bg-white/10'
              }`}
              onClick={toggleMobileMenu}
              onKeyDown={(e) => e.key === 'Enter' && toggleMobileMenu()}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - محسن للتجاوب */}
        {isMobileMenuOpen && (
          <div 
            className={`md:hidden animate-fadeIn ${getMobileMenuBackground()}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col space-y-2 sm:space-y-4">
              <button 
                onClick={() => scrollToSectionWithOffset('hero')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('hero')}
                className={`py-2 sm:py-3 text-left transition duration-300 text-sm sm:text-base ${getMobileMenuItemColor('hero')}`}
                aria-label="Go to Home section"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSectionWithOffset('about')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('about')}
                className={`py-2 sm:py-3 text-left transition duration-300 text-sm sm:text-base ${getMobileMenuItemColor('about')}`}
                aria-label="Go to About Us section"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSectionWithOffset('services')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('services')}
                className={`py-2 sm:py-3 text-left transition duration-300 text-sm sm:text-base ${getMobileMenuItemColor('services')}`}
                aria-label="Go to Services section"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSectionWithOffset('portfolio')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('portfolio')}
                className={`py-2 sm:py-3 text-left transition duration-300 text-sm sm:text-base ${getMobileMenuItemColor('portfolio')}`}
                aria-label="Go to Portfolio section"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSectionWithOffset('why')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('why')}
                className={`py-2 sm:py-3 text-left transition duration-300 text-sm sm:text-base ${getMobileMenuItemColor('why')}`}
                aria-label="Go to Why Us section"
              >
                Why Us
              </button>
              <button 
                onClick={() => scrollToSectionWithOffset('contact')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSectionWithOffset('contact')}
                className="mt-4 bg-primary-400 text-primary-50 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-primary-600 transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 text-sm sm:text-base"
                aria-label="Contact us"
              >
                Contact us
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="overflow-x-hidden">
        <section id="hero" aria-label="Hero section" className="pt-0">
          <HeroSection />
        </section>
        <section id="about" aria-label="About us section" className="pt-20 sm:pt-24 md:pt-28">
          <AboutSection />
        </section>
        <section id="services" aria-label="Services section" className="pt-20 sm:pt-24 md:pt-28">
          <ServicesSection />
        </section>
        <section id="portfolio" aria-label="Portfolio section" className="pt-20 sm:pt-24 md:pt-28">
          <PortfolioSection />
        </section>
        <section id="why" aria-label="Why us section" className="pt-20 sm:pt-24 md:pt-28">
          <WhyUsSection />
        </section>
        <section id="contact" aria-label="Contact section" className="pt-20 sm:pt-24 md:pt-28">
          <ContactSection />
        </section>
      </div>

      <Footer />
    </main>
  );
}