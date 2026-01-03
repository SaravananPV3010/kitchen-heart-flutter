import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { ChevronLeft, ChevronRight, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  progressStep: number;
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
      { sNo: 1, name: 'Idly', quantity: 2, price: 50.00, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Dosa', quantity: 1, price: 70.00, isVeg: true, status: 'Served' },
      { sNo: 3, name: 'Vada', quantity: 3, price: 40.00, isVeg: true, status: 'In-Queue' },
      { sNo: 4, name: 'Pongal', quantity: 1, price: 60.00, isVeg: true, status: 'In-Queue' },
      { sNo: 5, name: 'Upma', quantity: 2, price: 45.00, isVeg: true, status: 'In-Queue' },
    ],
    total: 495.00,
    deliveryCharge: 10.00,
    serviceTax: 24.75,
  },
  {
    id: '2',
    dateTime: '01/07/20 10:30 AM',
    type: 'status',
    status: 'delivered',
    progressStep: 4,
    items: [
      { sNo: 1, name: 'Masala Dosa', quantity: 2, price: 80.00, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Filter Coffee', quantity: 2, price: 30.00, isVeg: true, status: 'Served' },
      { sNo: 3, name: 'Kesari Bath', quantity: 1, price: 50.00, isVeg: true, status: 'Served' },
    ],
    total: 270.00,
    deliveryCharge: 10.00,
    serviceTax: 13.50,
  },
  {
    id: '3',
    dateTime: '01/07/20 9:00 AM',
    type: 'invoice',
    status: 'in-progress',
    progressStep: 4,
    items: [
      { sNo: 1, name: 'Rava Idly', quantity: 4, price: 60.00, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Sambar Vada', quantity: 2, price: 55.00, isVeg: true, status: 'In-Queue' },
      { sNo: 3, name: 'Puri Bhaji', quantity: 1, price: 65.00, isVeg: true, status: 'Served' },
      { sNo: 4, name: 'Badam Milk', quantity: 2, price: 45.00, isVeg: true, status: 'In-Queue' },
    ],
    total: 465.00,
    deliveryCharge: 10.00,
    serviceTax: 23.25,
  },
  {
    id: '4',
    dateTime: '30/06/20 8:30 PM',
    type: 'invoice',
    status: 'paid',
    progressStep: 4,
    items: [
      { sNo: 1, name: 'Thali Special', quantity: 2, price: 150.00, isVeg: true, status: 'Served' },
      { sNo: 2, name: 'Butter Naan', quantity: 4, price: 35.00, isVeg: true, status: 'Served' },
      { sNo: 3, name: 'Paneer Butter Masala', quantity: 1, price: 180.00, isVeg: true, status: 'Served' },
      { sNo: 4, name: 'Gulab Jamun', quantity: 4, price: 30.00, isVeg: true, status: 'Served' },
    ],
    total: 740.00,
    deliveryCharge: 10.00,
    serviceTax: 37.00,
  },
];

const timelineSteps = [
  { id: 0, label: 'Placed' },
  { id: 1, label: 'Prepared' },
  { id: 2, label: 'Picked up' },
  { id: 3, label: 'On The Way' },
  { id: 4, label: 'Delivered' },
];

const ProgressTimeline = ({ step }: { step: number }) => {
  return (
    <div className="mb-8 px-4">
      <div className="relative flex items-center justify-between">
        {/* Progress Line Background */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted rounded-full" />
        
        {/* Progress Line Filled */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
        
        {/* Timeline Steps */}
        {timelineSteps.map((s, index) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= index 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-muted-foreground/50 text-muted-foreground'
              }`}
            >
              {step > index ? (
                <Check size={16} className="text-primary-foreground" />
              ) : (
                <span className="text-xs font-semibold">{index + 1}</span>
              )}
            </div>
            <span className={`mt-2 text-xs font-medium ${
              step >= index ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: 'Served' | 'In-Queue' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
    status === 'Served' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-amber-100 text-amber-700'
  }`}>
    {status}
  </span>
);

const OrderCard = ({ order }: { order: Order }) => {
  const showPaidStamp = order.type === 'invoice' && order.status === 'paid';
  const showDeliveredStamp = order.type === 'status' && order.status === 'delivered';
  const totalCost = order.total + order.deliveryCharge + order.serviceTax;

  return (
    <div className="bg-background border border-border rounded-2xl shadow-sm mb-6 overflow-hidden">
      {/* Date/Time Header */}
      <div className="px-6 py-3 text-sm text-muted-foreground bg-muted/30 border-b border-border/50">
        {order.dateTime}
      </div>

      {/* Order Content */}
      <div className="p-6 relative">
        {/* Title */}
        <h3 className="text-xl font-bold text-center mb-6 text-foreground">
          {order.type === 'invoice' ? 'Invoice' : 'Order Status'}
        </h3>

        {/* Progress Timeline - Only for status type */}
        {order.type === 'status' && (
          <ProgressTimeline step={order.progressStep} />
        )}

        {/* Items Table */}
        <div className="relative overflow-hidden rounded-lg border border-border">
          {/* Stamp Overlay */}
          {(showPaidStamp || showDeliveredStamp) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <img 
                src={showPaidStamp ? stampPaid : stampDelivered}
                alt={showPaidStamp ? 'Paid' : 'Delivered'}
                className="w-40 h-40 object-contain transform rotate-[-20deg] opacity-80"
              />
            </div>
          )}

          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="text-foreground font-semibold w-16">S.No</TableHead>
                <TableHead className="text-foreground font-semibold">Items</TableHead>
                <TableHead className="text-foreground font-semibold text-center w-24">Qty</TableHead>
                <TableHead className="text-foreground font-semibold text-right w-24">Price</TableHead>
                <TableHead className="text-foreground font-semibold text-right w-28">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.sNo} className="border-border/50">
                  <TableCell className="text-muted-foreground font-medium">{item.sNo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} rounded-sm flex items-center justify-center`}>
                        <div className={`w-2 h-2 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
                      </div>
                      <span className="text-foreground font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{item.quantity}</TableCell>
                  <TableCell className="text-right text-foreground font-medium">₹{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
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
          <div className="flex justify-between text-base pt-3 border-t border-border mt-3">
            <span className="font-bold text-foreground">Total Cost</span>
            <span className="font-bold text-primary text-lg">₹{totalCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Invoice Button */}
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
  const [dateFilter, setDateFilter] = useState('Today');

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      {/* Date Navigation */}
      <div className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">{dateFilter}</span>
              <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">in Week</span>
            </div>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
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