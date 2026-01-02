import { Star, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FoodCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  isVeg?: boolean;
}

const FoodCard = ({ image, name, price, rating, reviewCount, description, isVeg = true }: FoodCardProps) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Veg Indicator & Rating Row */}
      <div className="flex items-center justify-between mb-3">
        {/* Veg/Non-veg indicator */}
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${isVeg ? 'border-green-600' : 'border-red-600'}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 text-xs">
          <Star size={12} className="fill-primary text-primary" />
          <span className="font-medium text-foreground">{rating}</span>
          <span className="text-muted-foreground">({reviewCount})</span>
        </div>
      </div>

      {/* Food Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name & Price */}
      <h4 className="font-semibold text-foreground italic text-base">{name}</h4>
      <p className="text-primary font-semibold text-sm">+ ₹{price.toFixed(2)}</p>

      {/* Description */}
      <p className="text-[11px] text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Quantity Controls & Add Button */}
      <div className="flex items-center justify-between mt-3">
        {quantity > 0 ? (
          <div className="flex items-center border border-border rounded overflow-hidden">
            <button 
              onClick={() => setQuantity(q => Math.max(0, q - 1))}
              className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
            >
              <Minus size={12} />
            </button>
            <span className="w-7 h-7 flex items-center justify-center text-sm font-medium border-x border-border">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <div className="w-20" />
        )}
        
        <button 
          onClick={() => setQuantity(q => q + 1)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium px-4 py-1.5 rounded transition-colors"
        >
          + ADD
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
