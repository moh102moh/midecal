import React from 'react';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-primary-100 relative overflow-hidden pt-12 pb-8 px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
        <img
          src="/images/image6.png"
          alt="Decorative Background Top Right"
          className="absolute bottom-36 left-62 lg:w-[50%] h-[50%] z-0 pointer-events-none"
          style={{
            transform: 'scale(1.5)',
            transformOrigin: 'top right',
          }}
        />
        <img
          src="/images/footer.png"
          alt="Decorative Background Top Right"
          className="absolute bottom-12 lg:left-62 lg:w-[90%] h-[30%] z-1"
          style={{
            transform: 'scale(1.5)',
            transformOrigin: 'top right',
          }}
        />
      </div>

      <div className="container mx-auto relative z-1">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          <div className="lg:w-[40%]">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">TechnoPro</h2>
            <p className="text-gray-700 mb-6 max-w-xs">
              Creating smart digital solutions that drive growth.
            </p>
            <button className="bg-primary-500 hover:bg-primary-600 text-primary-50 font-medium py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2 shadow-lg cursor-pointer">
              Let's Talk
              <span className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center">
                <IoIosArrowForward className="h-4 w-4 text-primary-500" />
              </span>
            </button>
          </div>
          
          <div className='flex flex-col md:flex-row justify-between lg:w-[55%] gap-8 md:gap-12'>
            
            <div className="md:w-[45%]">
              <h3 className="text-lg font-semibold text-black mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Services', 'Portfolio', 'Why Us', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-700 hover:text-primary-500 transition-colors duration-300 block py-1">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-[45%]">
              <h3 className="text-lg font-semibold text-black mb-4">Contact Us</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">damascus, syria</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaEnvelope className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">support@figma.com</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-black mb-4">Follow us</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'Instagram', Icon: AiFillInstagram },
                  { name: 'Facebook', Icon: FaFacebookSquare },
                  { name: 'LinkedIn', Icon: FaLinkedin }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href="#" 
                    className="text-gray-700 hover:text-primary-500 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <social.Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TechnoPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;