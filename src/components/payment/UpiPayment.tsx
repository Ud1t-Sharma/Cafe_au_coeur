
import React from 'react';
import { UPI_DETAILS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { QrCode, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface UpiPaymentProps {
  amount: number;
  onSuccess: () => void;
}

const UpiPayment = ({ amount, onSuccess }: UpiPaymentProps) => {
  const handleUpiRedirect = () => {
    // Create a UPI deep link
    const upiLink = `upi://pay?pa=${UPI_DETAILS.id}&pn=CafeAuCoeur&cu=INR&am=${amount.toFixed(2)}`;
    
    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // If on mobile, redirect to the UPI app
      window.location.href = upiLink;
      
      // Show a toast explaining what happened
      toast.info("Redirecting to your UPI app", {
        description: "Complete the payment in your UPI app and return to this page."
      });
      
      // Set a timeout to check if payment is done
      // In a real app, you'd implement a webhook or callback
      setTimeout(() => {
        if (window.confirm("Did you complete the payment?")) {
          onSuccess();
        }
      }, 5000);
    } else {
      // If on desktop, show a message
      toast.info("Please use a mobile device to pay with UPI", {
        description: "Alternatively, you can scan the QR code with your UPI app."
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-8">
      <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
        UPI Payment
      </h2>
      
      <div className="flex flex-col items-center mb-6">
        <p className="text-cafe-charcoal mb-4">UPI ID: <span className="font-medium">{UPI_DETAILS.id}</span></p>
        
        <Button 
          onClick={handleUpiRedirect}
          className="bg-cafe-brown text-white hover:bg-cafe-darkBrown transition-colors flex items-center w-full md:w-auto mb-4"
        >
          <Smartphone className="w-5 h-5 mr-2" />
          Pay with UPI App
        </Button>
      </div>
    </div>
  );
};

export default UpiPayment;
