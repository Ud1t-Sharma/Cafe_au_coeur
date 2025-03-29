
import React, { useRef, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { MenuItem as MenuItemType } from '@/lib/types';
import { Plus } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  delay?: number;
}

const MenuItem = ({ item, delay = 0 }: MenuItemProps) => {
  const { addToCart } = useCart();
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            itemRef.current?.classList.add('animate-slide-up');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={itemRef} 
      className="bg-white rounded-lg shadow-card overflow-hidden transform opacity-0"
      style={{ animationDuration: '0.6s' }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <button 
          onClick={() => addToCart(item)}
          className="absolute bottom-4 right-4 bg-cafe-gold text-white p-2 rounded-full shadow-md hover:bg-cafe-brown transition-colors duration-300"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-medium text-cafe-charcoal">{item.name}</h3>
          <span className="font-medium text-cafe-gold">₹{item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        
        {item.ingredients && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-cafe-charcoal mb-1">Ingredients:</h4>
            <p className="text-sm text-gray-500">{item.ingredients.join(', ')}</p>
          </div>
        )}
        
        {item.allergens && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-cafe-charcoal mb-1">Allergens:</h4>
            <p className="text-sm text-gray-500">{item.allergens.join(', ')}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm px-3 py-1 bg-cafe-cream text-cafe-brown rounded-full">
            {(() => {
              const category = item.category;
              switch(category) {
                case 'coffee': return 'Coffee';
                case 'pastries': return 'Pastry';
                case 'breakfast': return 'Breakfast';
                case 'lunch': return 'Lunch';
                default: return category;
              }
            })()}
          </span>
          <button 
            onClick={() => addToCart(item)}
            className="text-cafe-brown font-medium text-sm hover:text-cafe-gold transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
