import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TodaysSpecial from '@/components/TodaysSpecial';
import ComboOffers from '@/components/ComboOffers';
import MenuSection from '@/components/MenuSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab="Home" />
      <main>
        <HeroSection />
        <TodaysSpecial />
        <ComboOffers />
        <MenuSection title="Breakfast Menu" />
        <MenuSection title="Lunch Menu" />
        <MenuSection title="Dinner Menu" />
      </main>
    </div>
  );
};

export default Index;
