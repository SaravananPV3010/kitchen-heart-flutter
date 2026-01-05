import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Check, Package, Truck, Clock, ChefHat, LogIn, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import stampPaid from '@/assets/stamp-paid.png';
import stampDelivered from '@/assets/stamp-delivered.png';

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  item_name: string;
  item_price: number;
  quantity: number;
  is_veg: boolean;
}

interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  payment_status: string;
  total_amount: number;
  subtotal: number;
  delivery_charge: number;
  service_tax: number;
  delivery_name: string;
  delivery_address: string;
  delivery_city_state: string;
  delivery_pin: string;
  created_at: string;
  order_items: OrderItem[];
}

const statusSteps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'pending', label: 'Placed', icon: <Package size={14} /> },
  { status: 'confirmed', label: 'Confirmed', icon: <Check size={14} /> },
  { status: 'preparing', label: 'Preparing', icon: <ChefHat size={14} /> },
  { status: 'ready', label: 'Ready', icon: <Package size={14} /> },
  { status: 'out_for_delivery', label: 'On The Way', icon: <Truck size={14} /> },
  { status: 'delivered', label: 'Delivered', icon: <Check size={14} /> },
];

const getStatusIndex = (status: OrderStatus): number => {
  const index = statusSteps.findIndex(s => s.status === status);
  return index >= 0 ? index : 0;
};

const ProgressTimeline = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const currentIndex = getStatusIndex(currentStatus);
  
  return (
    <div className="mb-8 px-4">
      <div className="relative flex items-center justify-between">
        {/* Progress Line Background */}
        <div className="absolute left-0 right-0 top-4 h-1 bg-muted rounded-full" />
        
        {/* Progress Line Filled */}
        <div 
          className="absolute left-0 top-4 h-1 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
        />
        
        {/* Timeline Steps */}
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.status} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-background border-muted-foreground/50 text-muted-foreground'
                }`}
              >
                {isCompleted ? <Check size={14} /> : step.icon}
              </div>
              <span className={`mt-2 text-xs font-medium text-center max-w-[50px] ${
                isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusStyles: Record<OrderStatus, string> = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    ready: 'bg-cyan-100 text-cyan-800',
    out_for_delivery: 'bg-orange-100 text-orange-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  
  const statusLabels: Record<OrderStatus, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const showPaidStamp = order.payment_status === 'paid';
  const showDeliveredStamp = order.status === 'delivered';
  
  return (
    <div className="bg-background border border-border rounded-2xl shadow-sm mb-6 overflow-hidden">
      {/* Date/Time Header */}
      <div className="px-6 py-3 text-sm text-muted-foreground bg-muted/30 border-b border-border/50 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {new Date(order.created_at).toLocaleString()}
        </span>
        <StatusBadge status={order.status} />
      </div>

      {/* Order Content */}
      <div className="p-6 relative">
        {/* Title */}
        <h3 className="text-lg font-bold text-center mb-4 text-foreground">
          {order.order_number}
        </h3>

        {/* Progress Timeline */}
        {order.status !== 'cancelled' && (
          <ProgressTimeline currentStatus={order.status} />
        )}

        {/* Items Table */}
        <div className="relative overflow-hidden rounded-lg border border-border">
          {/* Stamp Overlay */}
          {(showPaidStamp || showDeliveredStamp) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <img 
                src={showDeliveredStamp ? stampDelivered : stampPaid}
                alt={showDeliveredStamp ? 'Delivered' : 'Paid'}
                className="w-40 h-40 object-contain transform rotate-[-20deg] opacity-80"
              />
            </div>
          )}

          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="text-foreground font-semibold">Item</TableHead>
                <TableHead className="text-foreground font-semibold text-center w-20">Qty</TableHead>
                <TableHead className="text-foreground font-semibold text-right w-24">Price</TableHead>
                <TableHead className="text-foreground font-semibold text-right w-24">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.order_items.map((item) => (
                <TableRow key={item.id} className="border-border/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 border-2 ${item.is_veg ? 'border-green-600' : 'border-red-600'} rounded-sm flex items-center justify-center`}>
                        <div className={`w-2 h-2 ${item.is_veg ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
                      </div>
                      <span className="text-foreground font-medium">{item.item_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{item.quantity}</TableCell>
                  <TableCell className="text-right text-muted-foreground">₹{item.item_price.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-foreground font-medium">₹{(item.item_price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">₹{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery charge</span>
            <span className="font-semibold text-primary">₹{order.delivery_charge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Tax / GST</span>
            <span className="font-semibold text-primary">₹{order.service_tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base pt-3 border-t border-border mt-3">
            <span className="font-bold text-foreground">Total Cost</span>
            <span className="font-bold text-primary text-lg">₹{order.total_amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-1">Delivering to:</p>
          <p className="text-sm font-medium text-foreground">{order.delivery_name}</p>
          <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
          <p className="text-sm text-muted-foreground">{order.delivery_city_state} - {order.delivery_pin}</p>
        </div>

        {/* Download Invoice */}
        <div className="mt-6 flex justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full shadow-md">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { fetchUserOrders } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        setLoading(true);
        const data = await fetchUserOrders();
        setOrders(data as Order[]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
      loadOrders();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <main className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <LogIn className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Sign in to view orders</h2>
            <p className="text-muted-foreground mb-6">
              Please log in to view your order history.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium"
            >
              Sign In
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <main className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start ordering delicious food from our menu!
            </p>
            <Button
              onClick={() => navigate('/menu')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium"
            >
              Browse Menu
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      <Navbar />

      {/* Orders List */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Orders</h1>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
