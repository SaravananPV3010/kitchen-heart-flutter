import Navbar from '@/components/Navbar';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

const Cart = () => {
  const cartItems: CartItem[] = [
    { id: 1, name: 'Idly', price: 50.00, quantity: 2, isVeg: true },
    { id: 2, name: 'Dosa', price: 70.00, quantity: 1, isVeg: true },
    { id: 3, name: 'Vada', price: 40.00, quantity: 3, isVeg: true },
    { id: 4, name: 'Pongal', price: 60.00, quantity: 1, isVeg: true },
    { id: 5, name: 'Upma', price: 45.00, quantity: 2, isVeg: true },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = 10.00;
  const serviceTax = 45.00;
  const totalCost = subtotal + deliveryCharge + serviceTax;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - User Details Form */}
          <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Delivery Details</h2>
            
            <div className="space-y-5">
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">Name</label>
                <Input 
                  type="text" 
                  placeholder="Enter your name"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">Mobile Number</label>
                <Input 
                  type="tel" 
                  placeholder="Enter mobile number"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">Email ID</label>
                <Input 
                  type="email" 
                  placeholder="Enter email address"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <label className="text-foreground font-medium text-sm pt-2">Address</label>
                <Textarea 
                  rows={3}
                  placeholder="Enter your address"
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">Landmark</label>
                <Input 
                  type="text" 
                  placeholder="Enter landmark"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">City / State</label>
                <Input 
                  type="text" 
                  placeholder="Enter city and state"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">PIN</label>
                <Input 
                  type="text" 
                  placeholder="Enter PIN code"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-foreground font-medium text-sm">Payment Method</label>
                <Select defaultValue="cod">
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right Side - Cart Items */}
          <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Your Order</h2>
            
            {/* Cart Items List */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    {/* Veg Indicator */}
                    <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} rounded-sm flex items-center justify-center`}>
                      <div className={`w-2 h-2 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
                    </div>
                    <span className="text-foreground font-medium">{item.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="text-foreground font-semibold w-20 text-right">₹{item.price.toFixed(2)}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-muted/50 rounded-lg overflow-hidden border border-border">
                      <button className="px-3 py-2 text-foreground hover:bg-muted transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-2 text-foreground font-medium min-w-[40px] text-center">{item.quantity}</span>
                      <button className="px-3 py-2 text-foreground hover:bg-muted transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    {/* Delete Button */}
                    <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Pricing Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery charge</span>
                <span className="text-primary font-semibold">₹{deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Tax / GST</span>
                <span className="text-primary font-semibold">₹{serviceTax.toFixed(2)}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Total Cost */}
            <div className="flex justify-between mb-8">
              <span className="text-foreground font-semibold text-lg">Total Cost</span>
              <span className="text-primary font-bold text-xl">₹{totalCost.toFixed(2)}</span>
            </div>

            {/* Place Order Button */}
            <div className="flex justify-center">
              <Button className="bg-primary text-primary-foreground px-12 py-6 rounded-full font-semibold text-base hover:bg-primary/90 transition-colors shadow-lg">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;