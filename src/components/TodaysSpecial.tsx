import { Star } from 'lucide-react';
import idlySambar from '@/assets/idly-sambar.png';
import thali from '@/assets/thali.png';
import dosa from '@/assets/dosa.png';

interface SpecialItemProps {
  image: string;
  name: string;
  rating: number;
}

const SpecialItem = ({ image, name, rating }: SpecialItemProps) => (
  <div className="flex-shrink-0 w-32 bg-peach/50 rounded-xl p-3 cursor-pointer group hover:bg-peach/70 transition-colors">
    <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-white shadow-sm">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h4 className="font-medium text-foreground text-sm text-center italic">{name}</h4>
    <div className="flex items-center justify-center gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={10} 
          className={i < rating ? "fill-primary text-primary" : "text-muted-foreground"} 
        />
      ))}
    </div>
  </div>
);

const specialItems = [
  { image: idlySambar, name: "Idly Sambar", rating: 5 },
  { image: thali, name: "Idly Sambar", rating: 4 },
  { image: dosa, name: "Idly Sambar", rating: 5 },
  { image: idlySambar, name: "Idly Sambar", rating: 4 },
];

const TodaysSpecial = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Today's Special</h3>
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
            View more &gt;
          </button>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide gap-3 pb-2">
          {specialItems.map((item, index) => (
            <SpecialItem 
              key={index} 
              image={item.image} 
              name={item.name} 
              rating={item.rating} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaysSpecial;
