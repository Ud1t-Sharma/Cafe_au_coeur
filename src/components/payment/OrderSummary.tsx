
import React from 'react';
import { useCart } from '@/context/CartContext';
import { MapPin, Truck } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { SERVICE_FEE } from '@/lib/constants';
import { DeliveryAddress } from '../delivery/DeliveryModule';

interface OrderSummaryProps {
  onPayment: () => void;
  isProcessing: boolean;
  selectedPayment: string;
  deliveryFee?: number;
  deliveryOption?: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress | null;
}

const OrderSummary = ({ 
  onPayment, 
  isProcessing, 
  selectedPayment,
  deliveryFee = 0,
  deliveryOption = 'delivery',
  deliveryAddress = null
}: OrderSummaryProps) => {
  const { items, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const serviceFee = SERVICE_FEE;
  const total = totalPrice + serviceFee + (deliveryFee || 0);
  
  const isPaymentDisabled = !selectedPayment || isProcessing || !deliveryAddress;

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden sticky top-24">
      <div className="p-6">
        <h2 className="text-lg font-serif font-semibold text-cafe-charcoal mb-4">
          Order Summary
        </h2>
        
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}× {item.menuItem.name}
              </span>
              <span className="font-medium">
                ₹{(item.menuItem.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-px bg-gray-200 my-4"></div>
        
        {/* Delivery Information */}
        {deliveryAddress && (
          <div className="mb-4">
            <div className="flex items-start mb-2">
              {deliveryOption === 'delivery' ? (
                <Truck className="w-4 h-4 text-cafe-gold mt-1 mr-2 flex-shrink-0" />
              ) : (
                <MapPin className="w-4 h-4 text-cafe-gold mt-1 mr-2 flex-shrink-0" />
              )}
              <div>
                <h3 className="font-medium text-cafe-charcoal text-sm">
                  {deliveryOption === 'delivery' ? 'Delivery Address' : 'Pickup Location'}
                </h3>
                {deliveryOption === 'delivery' ? (
                  <p className="text-xs text-gray-500 mt-1">
                    {deliveryAddress.fullName}, {deliveryAddress.address}, {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Café au Coéur, 123 Paris Street, New Delhi - 110001
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Service fee</span>
            <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {deliveryOption === 'delivery' ? 'Delivery fee' : 'Pickup fee'}
            </span>
            <span className="font-medium">
              {deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'Free'}
            </span>
          </div>
        </div>
        
        <div className="h-px bg-gray-200 my-4"></div>
        
        <div className="flex justify-between mb-6">
          <span className="font-medium text-cafe-charcoal">Total</span>
          <span className="font-medium text-lg text-cafe-gold">₹{total.toFixed(2)}</span>
        </div>
        
        <AnimatedButton
          variant="primary"
          className="w-full"
          onClick={onPayment}
          disabled={isPaymentDisabled}
          isLoading={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Complete Payment'}
        </AnimatedButton>
        
        {!deliveryAddress && (
          <p className="text-amber-600 text-xs mt-2">
            Please provide delivery/pickup details to continue
          </p>
        )}
        
        {!selectedPayment && (
          <p className="text-amber-600 text-xs mt-2">
            Please select a payment method to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
