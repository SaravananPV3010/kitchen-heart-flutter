import { Star, Bookmark, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FoodCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
}

const FoodCard = ({ image, name, price, rating, reviewCount, description }: FoodCardProps) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="food-card p-4 animate-fade-in">
      {/* Bookmark & Rating */}
      <div className="flex items-center justify-between mb-3">
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <Bookmark size={18} className="text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1 text-sm">
          <Star size={14} className="fill-gold text-gold" />
          <span className="font-medium text-foreground">{rating}</span>
          <span className="text-muted-foreground">({reviewCount})</span>
        </div>
      </div>

      {/* Food Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Name & Price */}
      <h4 className="font-semibold text-foreground italic">{name}</h4>
      <p className="text-primary font-semibold text-lg">₹ {price.toFixed(2)}</p>

      {/* Description */}
      <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Quantity & Add Button */}
      <div className="flex items-center justify-between mt-4">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setQuantity(q => Math.max(0, q - 1))}
              className="quantity-btn"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="quantity-btn"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <div className="w-20" />
        )}
        
        <Button 
          onClick={() => setQuantity(q => q + 1)}
          variant="default"
          size="sm"
          className="bg-primary hover:bg-coral-dark text-primary-foreground font-medium px-6"
        >
          + ADD
        </Button>
      </div>
    </div>
  );
};

export default FoodCard;
