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
  <div className="flex-shrink-0 flex flex-col items-center p-4 cursor-pointer group">
    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 bg-muted shadow-md group-hover:shadow-lg transition-shadow">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <h4 className="font-medium text-foreground text-sm">{name}</h4>
    <div className="flex items-center gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={12} 
          className={i < rating ? "fill-gold text-gold" : "text-muted-foreground"} 
        />
      ))}
    </div>
  </div>
);

const specialItems = [
  { image: idlySambar, name: "Idly Sambar", rating: 5 },
  { image: dosa, name: "Idly Sambar", rating: 4 },
  { image: thali, name: "Idly Sambar", rating: 5 },
  { image: idlySambar, name: "Idly Sambar", rating: 4 },
  { image: dosa, name: "Idly Sambar", rating: 5 },
];

const TodaysSpecial = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Today's Special</h3>
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            All Items →
          </button>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-4 -mx-4 px-4">
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
