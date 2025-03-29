
import React from 'react';

const CreditCardForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden p-6 animate-fade-in">
      <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
        Détails de la Carte
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de Carte
          </label>
          <input
            type="text"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'Expiration
            </label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom sur la Carte
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
