import FoodCard from './FoodCard';
import idlySambar from '@/assets/idly-sambar.png';
import thali from '@/assets/thali.png';
import dosa from '@/assets/dosa.png';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MenuSectionProps {
  title: string;
}

const menuItems = [
  {
    image: idlySambar,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight.",
    isVeg: true
  },
  {
    image: thali,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian recipe.",
    isVeg: true
  },
  {
    image: dosa,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight.",
    isVeg: true
  },
  {
    image: idlySambar,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight.",
    isVeg: false
  },
  {
    image: thali,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian recipe.",
    isVeg: true
  },
  {
    image: dosa,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight.",
    isVeg: false
  },
];

const MenuSection = ({ title }: MenuSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? menuItems : menuItems.slice(0, 6);

  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
            View more &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedItems.map((item, index) => (
            <FoodCard 
              key={index}
              {...item}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="border-muted-foreground/40 text-muted-foreground hover:text-foreground hover:border-foreground text-sm px-6"
          >
            {showAll ? 'Show Less ↑' : 'More Items ↓'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
