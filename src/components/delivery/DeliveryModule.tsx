
import React, { useState } from 'react';
import { Check, MapPin, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DeliveryModuleProps {
  onDeliveryOptionSelected: (option: 'delivery' | 'pickup') => void;
  onAddressSubmit: (address: DeliveryAddress) => void;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  instructions?: string;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
];

const DeliveryModule = ({ onDeliveryOptionSelected, onAddressSubmit }: DeliveryModuleProps) => {
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: 'Delhi', // Default state
    pincode: '',
    instructions: ''
  });
  
  const handleOptionChange = (option: 'delivery' | 'pickup') => {
    setDeliveryOption(option);
    onDeliveryOptionSelected(option);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate pincode format (6 digits for India)
    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    
    // Validate phone number (10 digits for India)
    if (!/^\d{10}$/.test(address.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    onAddressSubmit(address);
    toast.success("Delivery address saved successfully");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-serif font-semibold text-cafe-charcoal mb-4">
        Delivery Options
      </h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleOptionChange('delivery')}
          className={`flex-1 p-4 border rounded-md flex flex-col items-center transition-all ${
            deliveryOption === 'delivery' 
              ? 'border-cafe-gold bg-cafe-cream text-cafe-charcoal' 
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Truck className="w-6 h-6 mb-2" />
          <span className="font-medium">Home Delivery</span>
          {deliveryOption === 'delivery' && (
            <div className="mt-2 bg-cafe-gold rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
        
        <button
          onClick={() => handleOptionChange('pickup')}
          className={`flex-1 p-4 border rounded-md flex flex-col items-center transition-all ${
            deliveryOption === 'pickup' 
              ? 'border-cafe-gold bg-cafe-cream text-cafe-charcoal' 
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <MapPin className="w-6 h-6 mb-2" />
          <span className="font-medium">Pickup at Store</span>
          {deliveryOption === 'pickup' && (
            <div className="mt-2 bg-cafe-gold rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
      </div>
      
      {deliveryOption === 'delivery' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <Input
                id="phone"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                required
                placeholder="10-digit mobile number"
                maxLength={10}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">
              Address *
            </label>
            <Input
              id="address"
              name="address"
              value={address.address}
              onChange={handleChange}
              required
              placeholder="House/Flat no., Building, Street, Area"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City *
              </label>
              <Input
                id="city"
                name="city"
                value={address.city}
                onChange={handleChange}
                required
                placeholder="City/Town/Village"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium text-gray-700">
                State *
              </label>
              <select
                id="state"
                name="state"
                value={address.state}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="pincode" className="text-sm font-medium text-gray-700">
              Pincode *
            </label>
            <Input
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              required
              placeholder="6-digit pincode"
              maxLength={6}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="instructions" className="text-sm font-medium text-gray-700">
              Delivery Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={address.instructions}
              onChange={handleChange}
              placeholder="Any specific instructions for delivery"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <Button type="submit" className="w-full bg-cafe-brown hover:bg-cafe-brown/90 text-white">
            Save Delivery Address
          </Button>
        </form>
      )}
      
      {deliveryOption === 'pickup' && (
        <div className="space-y-4">
          <div className="bg-cafe-cream/50 p-4 rounded-md">
            <h3 className="font-medium text-cafe-charcoal mb-2">Pickup Instructions</h3>
            <p className="text-gray-600">Your order will be available for pickup at our store within 30 minutes after placing the order.</p>
            
            <div className="mt-4">
              <h4 className="font-medium text-cafe-charcoal">Café au Coéur</h4>
              <p className="text-gray-600">123 Paris Street</p>
              <p className="text-gray-600">New Delhi, 110001</p>
              <p className="text-gray-600">Open: 7:00 AM - 8:00 PM</p>
            </div>
          </div>
          
          <Button 
            onClick={() => onAddressSubmit({ fullName: 'Pickup', phone: '', address: 'Store Pickup', city: 'New Delhi', state: 'Delhi', pincode: '110001' })}
            className="w-full bg-cafe-brown hover:bg-cafe-brown/90 text-white"
          >
            Confirm Pickup Option
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryModule;
