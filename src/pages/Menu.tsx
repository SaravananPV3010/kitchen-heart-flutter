import { useState } from 'react';
import { Search, ChevronDown, Star, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import idlySambar from '@/assets/idly-sambar.png';
import thali from '@/assets/thali.png';
import dosa from '@/assets/dosa.png';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  isVeg: boolean;
  image: string;
}

const images = [idlySambar, thali, dosa];

const menuItems: MenuItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: 'Idly Sambar',
  price: 50 + (i % 4) * 10,
  rating: 4.0 + (i % 10) * 0.1,
  reviews: 234,
  description: 'Rich, creamy korma with aromatic spices. This curry combines tender vegetables in a luxurious cashew and cream sauce, seasoned with cardamom, cinnamon, and bay leaves for an authentic.',
  isVeg: i % 3 !== 0,
  image: images[i % 3],
}));

const MenuCard = ({ item }: { item: MenuItem }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Veg Indicator & Rating Row */}
      <div className="flex items-center justify-between mb-3">
        {/* Veg/Non-veg indicator */}
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 text-xs">
          <Star size={12} className="fill-primary text-primary" />
          <span className="font-medium text-foreground">{item.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({item.reviews})</span>
        </div>
      </div>

      {/* Food Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted mb-3">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name & Price */}
      <h4 className="font-semibold text-foreground italic text-base">{item.name}</h4>
      <p className="text-primary font-semibold text-sm">+ ₹{item.price.toFixed(2)}</p>

      {/* Description */}
      <p className="text-[11px] text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
        {item.description}
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

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesSearch && matchesVeg;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab="Menu" />
      
      <main className="container mx-auto px-6 py-6">
        {/* Search and Filter Row */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="search dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Veg Filter */}
          <button 
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${
              vegOnly 
                ? 'border-green-600 bg-green-50 text-green-700' 
                : 'border-border bg-card text-muted-foreground hover:border-green-600'
            }`}
          >
            <div className="w-4 h-4 border-2 border-green-600 rounded flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-600" />
            </div>
            <span>Veg</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-foreground">Dinner Menu</h1>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <span>Sort By</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
