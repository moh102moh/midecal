import React, { useState } from 'react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
        
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 md:py-40 lg:py-48 bg-background-dark text-white relative overflow-hidden">
      <div 
        className="absolute top-[5%] left-[10%] md:top-[10%] md:left-[30%] w-[80%] h-[70%] md:w-[60%] md:h-[80%] z-0 rounded-full blur-3xl"
        style={{
          background: 'linear-gradient(180deg, #A3C3BD 0%, #4E5D5A 100%)',
          opacity: '0.2'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-6 leading-tight">
              <span className="block text-primary-50">
                Let&apos;s Build Your<br className="hidden sm:block" />Next Project
              </span>
              <span className="text-primary-400">Together</span>
            </h2>
            
            <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
              <div className="flex items-start sm:items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/images/phone.svg"
                    alt="Phone Icon"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-primary-50">
                    Phone Number
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-1">
                    +963 3456 789
                  </p>
                </div>
              </div>
              
              <div className="flex items-start sm:items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/images/email.svg"
                    alt="Email Icon"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-primary-50">
                    Email
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-1 break-all">
                    demo@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <div className="bg-background-dark px-4 py-6 sm:px-6 md:px-8 sm:pb-12 md:pb-16 rounded-xl border border-white/10 shadow-lg">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-primary-50">
                Contact Us
              </h3>
              
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full p-3 md:p-4 bg-background-dark border border-white/10 rounded-lg 
                               text-white focus:outline-none focus:ring-2 focus:ring-primary-400 
                               transition-all placeholder:text-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full p-3 md:p-4 bg-background-dark border border-white/10 rounded-lg 
                               text-white focus:outline-none focus:ring-2 focus:ring-primary-400 
                               transition-all placeholder:text-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full p-3 md:p-4 bg-background-dark border border-white/10 rounded-lg 
                               text-white focus:outline-none focus:ring-2 focus:ring-primary-400 
                               transition-all placeholder:text-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full p-3 md:p-4 bg-background-dark border border-white/10 rounded-lg 
                               text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 
                               transition-all text-sm md:text-base appearance-none
                               hover:border-primary-400 transition-colors duration-200"
                      required
                    >
                      <option value="" disabled className="text-gray-400">
                        Select a Service
                      </option>
                      <option value="website" className="bg-background-dark py-3 hover:bg-primary-800">
                        Website Development
                      </option>
                      <option value="mobile" className="bg-background-dark py-3 hover:bg-primary-800">
                        Mobile Applications
                      </option>
                      <option value="system" className="bg-background-dark py-3 hover:bg-primary-800">
                        System Analysis
                      </option>
                    </select>
                    
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" 
                           viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                              strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message..."
                      rows={4}
                      className="w-full p-3 md:p-4 bg-background-dark border border-white/10 rounded-lg 
                               text-white focus:outline-none focus:ring-2 focus:ring-primary-400 
                               transition-all placeholder:text-gray-400 resize-none text-sm md:text-base"
                      required
                    />
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="bg-green-900/20 border border-green-700 text-green-400 
                                  p-3 rounded-lg text-center text-sm animate-pulse">
                      ✓ Message sent successfully!
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-900/20 border border-red-700 text-red-400 
                                  p-3 rounded-lg text-center text-sm">
                      ⚠ Failed to send message
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-fit px-6 sm:px-8 bg-primary-400 text-white font-medium 
                             py-3 rounded-full hover:bg-primary-600 transition-all cursor-pointer
                             text-xl md:text-base disabled:opacity-50 disabled:cursor-not-allowed
                             relative
                             shadow-[0px_1px_3px_0px_#6BACCC1A,0px_5px_5px_0px_#6BACCC17,0px_12px_7px_0px_#6BACCC0D,0px_21px_8px_0px_#6BACCC03,0px_32px_9px_0px_#6BACCC00]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}