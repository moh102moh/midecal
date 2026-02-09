import { IoIosArrowForward } from "react-icons/io";

export default function WhyUsSection() {
  const points = [
    "Customized solutions tailored to your needs",
    "High quality and on-time delivery",
    "Modern and scalable technologies",
    "Direct communication and continuous support",
    "Deep understanding of business requirements"
  ];

  return (
    <section className="py-14 md:py-20 lg:py-24 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <img
          src="/images/image5.png"
          alt="Decorative Background Top Right"
          className="absolute lg:bottom-20 -right-28 lg:-right-22 w-[45%] md:w-[40%] lg:w-[40%] lg:h-[150%] z-0 pointer-events-none"
          style={{
            transform: 'scale(1.5)',
            transformOrigin: 'top right',
          }}
        />
        <div 
          className="absolute top-[10%] left-[40%] md:left-[50%] w-[80%] md:w-[60%] h-[60%] md:h-[80%] -z-9 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(180deg, #A3C3BD 0%, #4E5D5A 100%)',
            opacity: '0.2'
          }}
        >
        </div>
        <h2 className="text-primary-50 text-4xl md:text-5xl font-bold mb-8 md:mb-12 flex items-center tracking-wider">
          <span className="w-2 h-8 md:h-10 bg-primary-400 mr-4 md:mr-6"></span>
          Why TechnoPro?
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-4 items-start justify-between py-8 md:py-12">
          <div className="">
            <ul className="space-y-2 font-light md:space-y-4 text-lg md:text-2xl lg:text-3xl text-primary-50">
              {points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-[50%] mt-8 lg:mt-0 ">
            <div className="rounded-xl overflow-hidden shadow-lg z-20">
              <img
                src="/images/whyus.png"
                alt="Team working"
                className="w-full h-auto object-cover grayscale"
              />
            </div>
          </div>
        </div>
        <div className="pt-0 md:pt-0 pb-12">
        <button
          className="bg-primary-500 text-primary-50 font-medium px-6 md:px-8 lg:px-10 py-3 md:py-4 
                   rounded-full hover:bg-primary-600 flex items-center gap-2 text-sm md:text-xl
                    group transition-all duration-500 cursor-pointer
                   shadow-[0px_1px_3px_0px_#6BACCC1A,0px_5px_5px_0px_#6BACCC17,0px_12px_7px_0px_#6BACCC0D,0px_21px_8px_0px_#6BACCC03,0px_32px_9px_0px_#6BACCC00]"
        >
          Let's Talk
          <span className="w-6 h-6 md:w-7 md:h-7 bg-primary-50 rounded-full flex items-center justify-center transition-all duration-300">
            <IoIosArrowForward className="text-base md:text-xl text-primary-400 group-hover:text-primary-600" />
          </span>
        </button>
        </div>
      </div>
    </section>
  );
}