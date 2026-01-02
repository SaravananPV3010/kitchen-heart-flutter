import fortuneCookie from '@/assets/fortune-cookie.png';

const HeroSection = () => {
  return (
    <section className="px-6 py-8">
      <div className="container mx-auto">
        <div 
          className="relative rounded-2xl overflow-hidden px-8 md:px-12 py-8 md:py-10"
          style={{
            background: 'linear-gradient(135deg, hsl(20 100% 85%) 0%, hsl(12 80% 75%) 50%, hsl(12 76% 60%) 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="text-left z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Know Your Fortune
              </h2>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Today
              </h2>
              <p className="text-white/80 text-xs md:text-sm max-w-xs">
                Open Fortune cookie for a fortune forecast.
              </p>
            </div>

            {/* Fortune Cookie Image */}
            <div className="relative mt-4 md:mt-0">
              <img 
                src={fortuneCookie} 
                alt="Fortune Cookie" 
                className="w-40 md:w-52 lg:w-64 h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
