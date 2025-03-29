
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

const PaymentSuccessView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pt-16 pb-20 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-serif font-semibold text-cafe-charcoal mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your order has been successfully processed. You will receive a confirmation email.
        </p>
        
        <p className="text-cafe-gold font-medium mb-6">
          Thank you for choosing Café au Coéur!
        </p>
        
        <AnimatedButton
          variant="primary"
          className="w-full"
          onClick={() => navigate('/')}
        >
          Return to Home
        </AnimatedButton>
      </div>
    </div>
  );
};

export default PaymentSuccessView;
