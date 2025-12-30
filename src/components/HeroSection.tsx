import fortuneCookie from '@/assets/fortune-cookie.png';

const HeroSection = () => {
  return (
    <section className="mx-4 md:mx-0 my-6">
      <div className="container mx-auto">
        <div 
          className="relative rounded-3xl overflow-hidden px-6 md:px-12 py-8 md:py-12"
          style={{
            background: 'linear-gradient(135deg, hsl(20 100% 85%) 0%, hsl(12 100% 80%) 50%, hsl(25 100% 75%) 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="text-center md:text-left mb-6 md:mb-0 z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-card mb-3">
                Know Your Fortune
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-card mb-4">
                Today
              </h2>
              <p className="text-card/80 text-sm md:text-base max-w-md">
                What do you want to eat? See your fortune today.
              </p>
            </div>

            {/* Fortune Cookie Image */}
            <div className="relative">
              <img 
                src={fortuneCookie} 
                alt="Fortune Cookie" 
                className="w-48 md:w-64 lg:w-80 h-auto animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
