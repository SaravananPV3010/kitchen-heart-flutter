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
    id: 'idly-sambar-1',
    image: idlySambar,
    name: "Idly Sambar",
    price: 50.00,
    rating: 4.5,
    reviewCount: 234,
    description: "Soft and fluffy idlies served with flavorful sambar, complemented by coconut chutney and tangy tomato chutney for a perfect South Indian delight.",
    isVeg: true
  },
  {
    id: 'thali-1',
    image: thali,
    name: "South Indian Thali",
    price: 120.00,
    rating: 4.8,
    reviewCount: 312,
    description: "A complete South Indian meal with rice, sambar, rasam, kootu, poriyal, curd, papad, and pickle served on a traditional banana leaf.",
    isVeg: true
  },
  {
    id: 'dosa-1',
    image: dosa,
    name: "Masala Dosa",
    price: 70.00,
    rating: 4.6,
    reviewCount: 456,
    description: "Crispy golden dosa filled with spiced potato masala, served with coconut chutney and sambar for an authentic South Indian breakfast.",
    isVeg: true
  },
  {
    id: 'idly-sambar-2',
    image: idlySambar,
    name: "Ghee Idly",
    price: 60.00,
    rating: 4.4,
    reviewCount: 189,
    description: "Soft idlies drizzled with aromatic ghee, served with sambar and a variety of chutneys for a rich, flavorful experience.",
    isVeg: true
  },
  {
    id: 'thali-2',
    image: thali,
    name: "Special Thali",
    price: 150.00,
    rating: 4.9,
    reviewCount: 278,
    description: "Premium thali with additional items including sweet, special curry, and unlimited servings of rice and accompaniments.",
    isVeg: true
  },
  {
    id: 'dosa-2',
    image: dosa,
    name: "Chicken Dosa",
    price: 90.00,
    rating: 4.5,
    reviewCount: 342,
    description: "Crispy dosa topped with spiced minced chicken, onions, and herbs. A perfect fusion of South Indian and non-vegetarian flavors.",
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
          {displayedItems.map((item) => (
            <FoodCard 
              key={item.id}
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
