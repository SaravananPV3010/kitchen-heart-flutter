import Navbar from '@/components/Navbar';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stampPaid from '@/assets/stamp-paid.png';
import stampDelivered from '@/assets/stamp-delivered.png';

interface OrderItem {
  sNo: number;
  name: string;
  quantity: number;
  price: number;
  status: 'Served' | 'In-Queue';
  isVeg: boolean;
}

interface Order {
  id: string;
  dateTime: string;
  type: 'status' | 'invoice';
  status: 'in-progress' | 'delivered' | 'paid';
  progressStep: number; // 0: Placed, 1: Prepared, 2: Picked up, 3: On The Way, 4: Delivered
  items: OrderItem[];
  total: number;
  deliveryCharge: number;
  serviceTax: number;
}

const sampleOrders: Order[] = [
  {
    id: '1',
    dateTime: '01/07/20 12:30 PM',
    type: 'status',
    status: 'in-progress',
    progressStep: 2,
    items: [
      { sNo: 1, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 3, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 4, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 5, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
    ],
    total: 1000.00,
    deliveryCharge: 10.00,
    serviceTax: 45.00,
  },
  {
    id: '2',
    dateTime: '01/07/20 10:30 PM',
    type: 'status',
    status: 'delivered',
    progressStep: 4,
    items: [
      { sNo: 1, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 3, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 4, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 5, name: 'Idly', quantity: 0, price: 50.00, isVeg: true, status: 'Served' },
    ],
    total: 1000.00,
    deliveryCharge: 10.00,
    serviceTax: 45.00,
  },
  {
    id: '3',
    dateTime: '01/07/20 9:00 AM',
    type: 'invoice',
    status: 'in-progress',
    progressStep: 4,
    items: [
      { sNo: 1, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'In-Queue' },
      { sNo: 3, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'Served' },
      { sNo: 4, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'In-Queue' },
      { sNo: 5, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'In-Queue' },
      { sNo: 6, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'Served' },
    ],
    total: 1000.00,
    deliveryCharge: 10.00,
    serviceTax: 45.00,
  },
  {
    id: '4',
    dateTime: '01/07/20 8:30 PM',
    type: 'invoice',
    status: 'paid',
    progressStep: 4,
    items: [
      { sNo: 1, name: 'Dosa', quantity: 0, price: 50, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Dosa', quantity: 0, price: 50, isVeg: true, status: 'Served' },
      { sNo: 3, name: 'Dosa', quantity: 0, price: 50, isVeg: true, status: 'Served' },
      { sNo: 4, name: 'Dosa', quantity: 0, price: 50, isVeg: true, status: 'Served' },
      { sNo: 5, name: 'Dosa', quantity: 0, price: 50, isVeg: true, status: 'Served' },
      { sNo: 6, name: 'Dosa', quantity: 1, price: 50, isVeg: true, status: 'Served' },
    ],
    total: 1000.00,
    deliveryCharge: 10.00,
    serviceTax: 45.00,
  },
];

const ProgressTracker = ({ step, type }: { step: number; type: 'status' | 'invoice' }) => {
  if (type === 'invoice') return null;

  const steps = ['Placed', 'Prepared', 'Picked up', 'On The Way', 'Delivered'];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Prepared</span>
        <span className="text-sm text-muted-foreground">On The Way</span>
      </div>
      <div className="relative">
        <div className="h-1 bg-muted rounded-full">
          <div 
            className="h-1 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-primary border-2 border-primary" />
        <div className={`absolute top-1/2 -translate-y-1/2 left-1/4 w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary border-primary' : 'bg-background border-muted-foreground'} border-2`} />
        <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary border-primary' : 'bg-background border-muted-foreground'} border-2`} />
        <div className={`absolute top-1/2 -translate-y-1/2 left-3/4 w-3 h-3 rounded-full ${step >= 3 ? 'bg-primary border-primary' : 'bg-background border-muted-foreground'} border-2`} />
        <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 rounded-full ${step >= 4 ? 'bg-primary border-primary' : 'bg-background border-muted-foreground'} border-2`} />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-muted-foreground">Placed</span>
        <span className="text-sm text-muted-foreground">Picked up</span>
        <span className="text-sm text-muted-foreground">Delivered</span>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: 'Served' | 'In-Queue' }) => (
  <span className={`text-sm font-medium ${status === 'Served' ? 'text-green-600' : 'text-primary'}`}>
    {status}
  </span>
);

const OrderCard = ({ order }: { order: Order }) => {
  const showPaidStamp = order.type === 'invoice' && order.status === 'paid';
  const showDeliveredStamp = order.type === 'status' && order.status === 'delivered';
  const totalCost = order.total + order.deliveryCharge + order.serviceTax;

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm mb-6 overflow-hidden">
      {/* Date/Time Header */}
      <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50">
        {order.dateTime}
      </div>

      {/* Order Content */}
      <div className="p-6 relative">
        {/* Title */}
        <h3 className="text-xl font-semibold text-center mb-6">
          {order.type === 'invoice' ? 'Invoice' : 'Order Status'}
        </h3>

        {/* Progress Tracker */}
        <ProgressTracker step={order.progressStep} type={order.type} />

        {/* Items Table */}
        <div className="relative overflow-x-auto">
          {/* Stamp Overlay */}
          {(showPaidStamp || showDeliveredStamp) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <img 
                src={showPaidStamp ? stampPaid : stampDelivered}
                alt={showPaidStamp ? 'Paid' : 'Delivered'}
                className="w-44 h-44 object-contain transform rotate-[-20deg] opacity-90"
              />
            </div>
          )}

          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">S.No</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">Items</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-foreground">Quantity</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-foreground">Price</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.sNo} className="border-b border-border/50">
                  <td className="py-3 px-2 text-sm text-muted-foreground">{item.sNo}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                        <span className={`block w-1.5 h-1.5 m-0.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                      </span>
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center text-sm text-muted-foreground">{item.quantity}</td>
                  <td className="py-3 px-2 text-right text-sm text-foreground">₹{item.price.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold text-foreground">₹{order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery charge</span>
            <span className="font-semibold text-primary">₹{order.deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Tax / GST</span>
            <span className="font-semibold text-primary">₹{order.serviceTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Total Cost</span>
            <span className="font-bold text-primary">₹{totalCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Invoice Button */}
        <div className="mt-6 flex justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Invoice <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      {/* Date Navigation */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            <button className="p-1 hover:bg-muted rounded transition-colors">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="text-sm font-medium text-foreground">Today</span>
            <button className="p-1 hover:bg-muted rounded transition-colors">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="text-sm text-muted-foreground ml-4">in Week</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {sampleOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
