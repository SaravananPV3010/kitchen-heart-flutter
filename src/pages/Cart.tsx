import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

const checkoutSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  mobile: z.string().trim().min(10, 'Enter a valid mobile number').max(15, 'Mobile number too long').regex(/^[0-9+\-\s]+$/, 'Invalid mobile number format'),
  email: z.string().trim().email('Enter a valid email address').max(255, 'Email too long'),
  address: z.string().trim().min(1, 'Address is required').max(500, 'Address too long'),
  landmark: z.string().trim().max(100, 'Landmark too long').optional(),
  cityState: z.string().trim().min(1, 'City/State is required').max(100, 'City/State too long'),
  pin: z.string().trim().min(5, 'Enter a valid PIN code').max(10, 'PIN code too long').regex(/^[0-9]+$/, 'PIN must contain only numbers'),
  paymentMethod: z.enum(['cod', 'upi', 'card'], { required_error: 'Select a payment method' }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Idly', price: 50.00, quantity: 2, isVeg: true },
    { id: 2, name: 'Dosa', price: 70.00, quantity: 1, isVeg: true },
    { id: 3, name: 'Vada', price: 40.00, quantity: 3, isVeg: true },
    { id: 4, name: 'Pongal', price: 60.00, quantity: 1, isVeg: true },
    { id: 5, name: 'Upma', price: 45.00, quantity: 2, isVeg: true },
  ]);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      address: '',
      landmark: '',
      cityState: '',
      pin: '',
      paymentMethod: 'cod',
    },
  });

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = cartItems.length > 0 ? 10.00 : 0;
  const serviceTax = subtotal * 0.05;
  const totalCost = subtotal + deliveryCharge + serviceTax;

  const onSubmit = (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before placing an order.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Order Placed!',
      description: `Thank you ${data.name}! Your order of ₹${totalCost.toFixed(2)} has been placed.`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - User Details Form */}
              <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Delivery Details</h2>
                
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">Name</label>
                        <div>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Enter your name"
                              className="bg-muted/50 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">Mobile Number</label>
                        <div>
                          <FormControl>
                            <Input 
                              {...field}
                              type="tel"
                              placeholder="Enter mobile number"
                              className="bg-muted/50 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">Email ID</label>
                        <div>
                          <FormControl>
                            <Input 
                              {...field}
                              type="email"
                              placeholder="Enter email address"
                              className="bg-muted/50 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">Address</label>
                        <div>
                          <FormControl>
                            <Textarea 
                              {...field}
                              rows={3}
                              placeholder="Enter your address"
                              className="bg-muted/50 border-border focus:border-primary resize-none"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">Landmark</label>
                        <div>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Enter landmark (optional)"
                              className="bg-muted/50 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cityState"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">City / State</label>
                        <div>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Enter city and state"
                              className="bg-muted/50 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">PIN</label>
                        <div>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Enter PIN code"
                              className="bg-muted/50 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[120px_1fr] items-start gap-4">
                        <label className="text-foreground font-medium text-sm pt-2">Payment Method</label>
                        <div>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted/50 border-border">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-background">
                              <SelectItem value="cod">Cash on Delivery</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="card">Credit/Debit Card</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right Side - Cart Items */}
              <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Your Order</h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Your cart is empty
                  </div>
                ) : (
                  <>
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
                            <span className="text-foreground font-semibold w-20 text-right">₹{(item.price * item.quantity).toFixed(2)}</span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-muted/50 rounded-lg overflow-hidden border border-border">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-2 text-foreground font-medium min-w-[40px] text-center">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            {/* Delete Button */}
                            <button 
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            >
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
                        <span className="text-muted-foreground">Service Tax / GST (5%)</span>
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
                  </>
                )}

                {/* Place Order Button */}
                <div className="flex justify-center">
                  <Button 
                    type="submit"
                    disabled={cartItems.length === 0}
                    className="bg-primary text-primary-foreground px-12 py-6 rounded-full font-semibold text-base hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default Cart;