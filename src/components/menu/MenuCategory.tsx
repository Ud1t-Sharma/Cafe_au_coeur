
import React, { useRef, useEffect } from 'react';
import { useMenu } from '@/context/MenuContext';
import MenuItem from './MenuItem';

interface MenuCategoryProps {
  categoryId: string;
}

const MenuCategory = ({ categoryId }: MenuCategoryProps) => {
  const { getItemsByCategory, getCategoryById } = useMenu();
  const items = getItemsByCategory(categoryId);
  const category = getCategoryById(categoryId);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current?.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!category || items.length === 0) return null;

  // Get translated category name
  const getCategoryName = () => {
    switch(categoryId) {
      case 'coffee': return 'Coffee';
      case 'pastries': return 'Pastries';
      case 'breakfast': return 'Breakfast';
      case 'lunch': return 'Lunch';
      default: return category.name;
    }
  };

  // Get translated category description
  const getCategoryDescription = () => {
    switch(categoryId) {
      case 'coffee': return 'Our selection of specialty coffees';
      case 'pastries': return 'Freshly prepared French pastries';
      case 'breakfast': return 'Morning dishes prepared with care';
      case 'lunch': return 'Light dishes for lunch';
      default: return category.description;
    }
  };

  return (
    <div ref={sectionRef} id={`category-${categoryId}`} className="mb-16 opacity-0" style={{ animationDuration: '0.8s' }}>
      <div className="flex items-center space-x-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-cafe-charcoal">{getCategoryName()}</h2>
        <div className="flex-1 h-px bg-cafe-gold/30"></div>
      </div>
      
      {category.description && (
        <p className="text-gray-600 mb-8 max-w-2xl">{getCategoryDescription()}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            delay={index * 100} 
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
