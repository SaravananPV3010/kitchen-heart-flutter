import Navbar from '@/components/Navbar';
import { Minus, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

const Cart = () => {
  const cartItems: CartItem[] = [
    { id: 1, name: 'Idly', price: 50.00, quantity: 0, isVeg: true },
    { id: 2, name: 'Idly', price: 50.00, quantity: 0, isVeg: true },
    { id: 3, name: 'Idly', price: 50.00, quantity: 0, isVeg: true },
    { id: 4, name: 'Idly', price: 50.00, quantity: 0, isVeg: true },
    { id: 5, name: 'Idly', price: 50.00, quantity: 0, isVeg: true },
  ];

  const total = 1050.00;
  const deliveryCharge = 10.00;
  const serviceTax = 45.00;
  const totalCost = 1050.00;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - User Details Form */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">Name</label>
              <input 
                type="text" 
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">Mobile Number</label>
              <input 
                type="tel" 
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">Email ID</label>
              <input 
                type="email" 
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-start gap-8">
              <label className="w-32 text-foreground font-medium pt-2">Address</label>
              <textarea 
                rows={3}
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">Landmark</label>
              <input 
                type="text" 
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">City / State</label>
              <input 
                type="text" 
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">PIN</label>
              <input 
                type="text" 
                className="flex-1 max-w-md border border-border rounded-md px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="w-32 text-foreground font-medium">Payment Method</label>
              <Select defaultValue="cod">
                <SelectTrigger className="flex-1 max-w-md bg-background">
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

          {/* Right Side - Cart Items */}
          <div className="flex-1 border-l border-border pl-8">
            {/* Cart Items List */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    {/* Veg Indicator */}
                    <div className="w-5 h-5 border-2 border-green-600 rounded flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-foreground font-medium text-lg">{item.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <span className="text-foreground font-semibold text-lg">₹{item.price.toFixed(2)}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-border rounded">
                      <button className="px-3 py-1 text-foreground hover:bg-muted transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 text-foreground font-medium">{item.quantity}</span>
                      <button className="px-3 py-1 text-foreground hover:bg-muted transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Pricing Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-foreground font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery charge</span>
                <span className="text-foreground font-semibold">₹{deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Tax / GST</span>
                <span className="text-foreground font-semibold">₹{serviceTax.toFixed(2)}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Total Cost */}
            <div className="flex justify-between mb-8">
              <span className="text-foreground font-semibold text-lg">Total Cost</span>
              <span className="text-foreground font-bold text-lg">₹{totalCost.toFixed(2)}</span>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Place Order Button */}
            <div className="flex justify-center">
              <button className="bg-primary text-primary-foreground px-12 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
