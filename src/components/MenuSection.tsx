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
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight."
  },
  {
    image: thali,
    name: "Idly Sambar",
    price: 70.00,
    rating: 4.8,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian recipe."
  },
  {
    image: dosa,
    name: "Idly Sambar",
    price: 85.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight."
  },
  {
    image: idlySambar,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 256,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight."
  },
  {
    image: dosa,
    name: "Idly Sambar",
    price: 70.00,
    rating: 4.8,
    reviewCount: 276,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian recipe."
  },
  {
    image: thali,
    name: "Idly Sambar",
    price: 55.00,
    rating: 4.5,
    reviewCount: 256,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight."
  },
];

const MenuSection = ({ title }: MenuSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? menuItems : menuItems.slice(0, 6);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title">{title}</h3>
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            All Items →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedItems.map((item, index) => (
            <FoodCard 
              key={index}
              {...item}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground"
          >
            {showAll ? 'Show Less' : 'View Menu ↓'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
