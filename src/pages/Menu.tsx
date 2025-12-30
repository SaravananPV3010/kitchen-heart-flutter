import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import idlySambar from '@/assets/idly-sambar.png';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  isVeg: boolean;
}

const menuItems: MenuItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: 'Idly Sambar',
  price: 80 + (i % 5) * 10,
  originalPrice: 120 + (i % 5) * 10,
  rating: 4.0 + (i % 10) * 0.1,
  reviews: 100 + i * 23,
  description: 'Rich, creamy korma with aromatic spices. This curry combines tender vegetables in a luxurious cashew and cream sauce, seasoned with cardamom.',
  isVeg: i % 3 !== 0,
}));

const MenuCard = ({ item }: { item: MenuItem }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-300">
      {/* Header with badge and rating */}
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {item.isVeg ? 'Veg' : 'Non-Veg'}
        </span>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-500">★</span>
          <span className="font-medium text-foreground">{item.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({item.reviews})</span>
        </div>
      </div>

      {/* Food Image */}
      <div className="flex justify-center mb-4">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-muted">
          <img 
            src={idlySambar} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Food Details */}
      <h3 className="font-semibold text-foreground text-lg mb-1">{item.name}</h3>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-primary font-bold">₹{item.price}</span>
        <span className="text-muted-foreground text-sm line-through">₹{item.originalPrice}</span>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
        {item.description}
      </p>

      {/* Quantity and Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="quantity-btn text-muted-foreground"
          >
            −
          </button>
          <span className="w-6 text-center font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="quantity-btn text-muted-foreground"
          >
            +
          </button>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-coral-dark transition-colors">
          ADD
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab="Menu" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="search dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md pl-12 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dinner Menu</h1>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm">Sort by</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems
            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
