'use client';

export default function HeroSection() {
  return (
    <main className="relative  z-10 pt-48 pb-16 flex flex-col items-center justify-center text-center px-6 bg-background-dark overflow-hidden">
      <img
        src="/images/hero-bg-top-right.png"
        alt="Decorative Background Top Right"
        className="absolute top-0 -right-12 w-[50%] h-[80%] max-w-none z-0 pointer-events-none"
        style={{
          transform: 'scale(1.5)',
          transformOrigin: 'top right',
        }}
      />
      <img
        src="/images/hero-bg-bottom.png"
        alt="Decorative Background Bottom"
        className="absolute bottom-36 left-0 w-[20%] h-[65%] max-w-none z-0 pointer-events-none"
        style={{
          transform: 'scale(1.3)',
          transformOrigin: 'bottom left',
        }}
      />

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-50 z-10 py-4">
        Experience That Leads to <br />Your
        <span className="text-primary-300"> Success</span>
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mb-12 opacity-90 text-white z-10 py-4">
        Between idea and impact our expertise delivers creative and practical solutions tailored to achieve your goals.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-12 z-10 py-4">
        <button className="bg-primary-400 hover:bg-primary-600 text-primary-50 font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
          Book a Service
        </button>
        <button className="border border-primary-500 hover:bg-primary-200 text-primary-50 font-medium px-8 py-3 rounded-full transition-all duration-300 cursor-pointer">
          Our Projects
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center pb-10">
        <p className="text-sm mb-2 text-primary-50">Scroll for more</p>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center animate-bounce">
          <div className="w-2 h-3 bg-primary-50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </main>
  );
}