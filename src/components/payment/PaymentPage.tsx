
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import PaymentMethods from './PaymentMethods';
import CreditCardForm from './CreditCardForm';
import UpiPayment from './UpiPayment';
import QrCodePayment from './QrCodePayment';
import OrderSummary from './OrderSummary';
import PaymentSuccessView from './PaymentSuccessView';
import DeliveryModule, { DeliveryAddress } from '../delivery/DeliveryModule';
import { SERVICE_FEE } from '@/lib/constants';

const PaymentPage = () => {
  const { clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(null);
  
  const totalPrice = getTotalPrice();
  const deliveryFee = deliveryOption === 'delivery' ? 40 : 0; // ₹40 for delivery, free for pickup
  const serviceFee = SERVICE_FEE;
  const total = totalPrice + serviceFee + deliveryFee;
  
  const handleDeliveryOptionSelected = (option: 'delivery' | 'pickup') => {
    setDeliveryOption(option);
  };
  
  const handleAddressSubmit = (address: DeliveryAddress) => {
    setDeliveryAddress(address);
  };
  
  const handlePayment = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }
    
    if (!deliveryAddress) {
      toast.error("Please provide delivery or pickup details");
      return;
    }
    
    setOrderProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setOrderProcessing(false);
      setOrderSuccess(true);
      
      // Clear cart and redirect after success
      setTimeout(() => {
        clearCart();
        navigate('/');
        toast.success("Your order has been placed successfully!");
      }, 2000);
    }, 2000);
  };
  
  if (orderSuccess) {
    return <PaymentSuccessView />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/cart')}
              className="text-cafe-brown font-medium flex items-center hover:text-cafe-gold transition-colors mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to cart
            </button>
            
            <h1 className="text-3xl font-serif font-semibold text-cafe-charcoal">
              Checkout
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Delivery Module */}
              <DeliveryModule 
                onDeliveryOptionSelected={handleDeliveryOptionSelected}
                onAddressSubmit={handleAddressSubmit}
              />
              
              {/* Payment Methods */}
              <PaymentMethods 
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              />
              
              {selectedPayment.includes('card') && <CreditCardForm />}
              {selectedPayment === 'upi' && <UpiPayment amount={total} onSuccess={handlePayment} />}
              {selectedPayment === 'qr-code' && <QrCodePayment amount={total} />}
            </div>
            
            <div className="md:col-span-1">
              <OrderSummary 
                onPayment={handlePayment}
                isProcessing={orderProcessing}
                selectedPayment={selectedPayment}
                deliveryFee={deliveryFee}
                deliveryOption={deliveryOption}
                deliveryAddress={deliveryAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
