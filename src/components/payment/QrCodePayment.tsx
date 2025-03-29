
import React from 'react';
import { UPI_DETAILS } from '@/lib/constants';
import { QrCode } from 'lucide-react';

interface QrCodePaymentProps {
  amount: number;
}

const QrCodePayment = ({ amount }: QrCodePaymentProps) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-8">
      <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
        Scan QR Code
      </h2>
      
      <div className="flex flex-col items-center">
        <p className="text-cafe-charcoal mb-4">Scan this QR code with your UPI app to pay ₹{amount.toFixed(2)}</p>
        
        <div className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-900">
          <img 
            src="/lovable-uploads/12ecf8fe-fb8f-4db4-8a55-a37483247fcc.png"
            alt="UPI QR Code" 
            className="max-w-full h-auto w-64 mx-auto"
          />
        </div>
        
        <p className="text-sm text-gray-500 text-center">
          Scan to pay with any UPI app
        </p>
        <p className="text-sm font-medium mt-2">
          UPI ID: <span className="text-cafe-brown">{UPI_DETAILS.id}</span>
        </p>
      </div>
    </div>
  );
};

export default QrCodePayment;
