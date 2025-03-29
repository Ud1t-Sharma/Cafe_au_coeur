
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { menuItem, quantity } = item;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 animate-enter">
      <div className="w-24 h-24 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
        <img 
          src={menuItem.image} 
          alt={menuItem.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-serif font-medium text-cafe-charcoal">{menuItem.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{menuItem.description}</p>
        <p className="text-cafe-gold font-medium">{menuItem.price.toFixed(2)}€</p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-200 rounded-md">
          <button 
            onClick={() => updateQuantity(menuItem.id, quantity - 1)}
            className="p-2 text-gray-500 hover:text-cafe-brown transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="px-4 py-2 text-gray-700">{quantity}</span>
          
          <button 
            onClick={() => updateQuantity(menuItem.id, quantity + 1)}
            className="p-2 text-gray-500 hover:text-cafe-brown transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(menuItem.id)}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
