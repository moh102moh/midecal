export default function AboutSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-background-dark text-white">
      <img
        src="/images/about.png"
        alt="Decorative Background Top Right"
        className="absolute -top-1 -right-1 sm:-right-18 w-[25%] h-[80%] max-w-none z-0 pointer-events-none"
        style={{
          transform: 'scale(1.5)',
          transformOrigin: 'top right',
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl text-primary-300 font-semibold mb-4 lg:mb-6">About Us</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-50 lg:pb-4">Who we are</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center justify-between lg:pt-2">
          <div className="w-full flex flex-col space-y-3 md:space-y-4">
            <p className="tracking-wider text-xl md:text-2xl lg:text-3xl text-primary-50">
              <span className="text-3xl md:text-4xl lg:text-5xl text-primary-500 font-bold">
                TechnoPro
              </span>
              {" "}is a software company based in Damascus, Syria, founded in June 2025, specializing
              in developing modern software and technology solutions.
            </p>
            <p className="text-primary-50 font-light text-lg md:text-xl lg:text-2xl">
              We provide customized solutions including website and application development,
              system analysis, and data analysis, with a strong focus on quality, security,
              and user-friendliness, helping our clients grow their businesses and achieve their digital goals.
              Our goal is to be a trusted technology partner, delivering practical solutions based on a deep understanding of our clients’ needs.
            </p>
          </div>

          <div className="w-full lg:w-1/3 flex flex-row gap-4 md:gap-6 justify-center items-stretch mt-0 lg:mt-8">
            {[
              { value: '5+', label: 'Projects Completed' },
              { value: '6', label: 'Clients' },
              { value: '∞', label: 'Our Possibilities' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-4 md:p-5 lg:p-7 flex-1 min-h-[120px] sm:min-h-[140px] lg:min-h-auto rounded-xl"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 text-primary-50">{item.value}</span>
                <span className="text-xs sm:text-sm tracking-wide text-primary-100 text-center px-2">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}