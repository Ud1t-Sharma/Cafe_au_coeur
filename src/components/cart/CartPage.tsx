
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import CartItem from './CartItem';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { SERVICE_FEE } from '@/lib/constants';

const CartPage = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const serviceFee = SERVICE_FEE;
  
  if (totalItems === 0) {
    return (
      <div className="min-h-screen pt-16 pb-20 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full">
          <div className="w-20 h-20 bg-cafe-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-cafe-brown" />
          </div>
          
          <h1 className="text-2xl font-serif font-semibold text-cafe-charcoal mb-4">
            Your cart is empty
          </h1>
          
          <p className="text-gray-600 mb-6">
            Add some delicious items from our menu to get started.
          </p>
          
          <Link to="/menu">
            <AnimatedButton
              variant="primary"
              className="w-full"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Browse Menu
            </AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50 pt-16 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="/lovable-uploads/a1edd617-66e1-4041-8de2-8dade0db3261.png" 
          alt="Shopping cart with coffee" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-serif font-semibold text-cafe-charcoal mb-4 md:mb-0">
              Your Cart
            </h1>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/menu')}
                className="text-cafe-brown font-medium flex items-center hover:text-cafe-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Continue Shopping
              </button>
              
              <button 
                onClick={clearCart}
                className="text-gray-500 font-medium hover:text-red-500 transition-colors"
              >
                Empty Cart
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-6">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.menuItem.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Service fee</span>
                <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-medium text-cafe-charcoal">Total</span>
                <span className="text-lg font-medium text-cafe-gold">₹{(totalPrice + serviceFee).toFixed(2)}</span>
              </div>
              
              <AnimatedButton
                variant="primary"
                className="w-full"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                onClick={() => navigate('/payment')}
              >
                Proceed to Checkout
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
