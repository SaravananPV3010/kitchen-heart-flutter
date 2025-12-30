import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TodaysSpecial from '@/components/TodaysSpecial';
import ComboOffers from '@/components/ComboOffers';
import MenuSection from '@/components/MenuSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TodaysSpecial />
        <ComboOffers />
        <MenuSection title="Breakfast Menu" />
        <MenuSection title="Lunch Menu" />
        <MenuSection title="Dinner Menu" />
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Cibeey. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
