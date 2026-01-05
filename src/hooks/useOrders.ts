import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/contexts/CartContext';

interface OrderData {
  name: string;
  mobile: string;
  email: string;
  address: string;
  landmark?: string;
  cityState: string;
  pin: string;
  paymentMethod: string;
}

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const createOrder = async (orderData: OrderData, cartItems: CartItem[], totals: {
    subtotal: number;
    deliveryCharge: number;
    serviceTax: number;
    totalAmount: number;
  }) => {
    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to place an order.',
        variant: 'destructive',
      });
      return null;
    }

    setLoading(true);
    try {
      // Generate a temporary order number (will be overwritten by trigger)
      const tempOrderNumber = `ORD-${Date.now()}`;
      
      // Create order - cast to any to bypass strict typing since trigger handles order_number
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: tempOrderNumber,
          status: 'pending' as const,
          payment_status: 'pending' as const,
          payment_method: orderData.paymentMethod,
          subtotal: totals.subtotal,
          delivery_charge: totals.deliveryCharge,
          service_tax: totals.serviceTax,
          total_amount: totals.totalAmount,
          delivery_name: orderData.name,
          delivery_phone: orderData.mobile,
          delivery_email: orderData.email,
          delivery_address: orderData.address,
          delivery_landmark: orderData.landmark || null,
          delivery_city_state: orderData.cityState,
          delivery_pin: orderData.pin,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        item_name: item.name,
        item_price: item.price,
        quantity: item.quantity,
        is_veg: item.isVeg,
        image_url: item.image,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Create initial status history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: order.id,
          status: 'pending' as const,
          notes: 'Order placed',
          created_by: user.id,
        });

      if (historyError) throw historyError;

      toast({
        title: 'Order Placed!',
        description: `Your order ${order.order_number} has been placed successfully.`,
      });

      return order;
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: 'Order failed',
        description: error.message || 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          order_status_history (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders.',
        variant: 'destructive',
      });
      return [];
    }
  };

  const fetchOrderById = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          order_status_history (*)
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  return {
    loading,
    createOrder,
    fetchUserOrders,
    fetchOrderById,
  };
};
