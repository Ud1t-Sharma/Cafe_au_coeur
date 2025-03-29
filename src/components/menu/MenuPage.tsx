
import React, { useState, useEffect, useRef } from 'react';
import { useMenu } from '@/context/MenuContext';
import MenuCategory from './MenuCategory';

const MenuPage = () => {
  const { categories } = useMenu();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isStickyNav, setIsStickyNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [categories]);
  
  useEffect(() => {
    const handleScroll = () => {
      const navElement = navRef.current;
      const headerElement = headerRef.current;
      
      if (navElement && headerElement) {
        const headerBottom = headerElement.getBoundingClientRect().bottom;
        setIsStickyNav(headerBottom <= 80); // Account for navbar height
      }
      
      // Update active category based on scroll position
      categories.forEach(category => {
        const element = document.getElementById(`category-${category.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveCategory(category.id);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);
  
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -120; // Adjust offset as needed
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Header */}
      <div ref={headerRef} className="relative py-20 px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/2ae0399e-d447-4c2c-8547-75342d0edf3b.png" 
            alt="Coffee beans" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-cafe-charcoal bg-opacity-70"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white animate-fade-in">
            Our Menu
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto text-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
            Discover our selection of specialty coffees and dishes prepared with passion
          </p>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div 
        ref={navRef} 
        className={`bg-white py-4 transition-all duration-300 ${
          isStickyNav ? 'sticky top-20 shadow-md z-20' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  scrollToCategory(category.id);
                }}
                className={`px-4 py-2 whitespace-nowrap transition-all rounded-md ${
                  activeCategory === category.id
                    ? 'bg-cafe-gold text-white font-medium'
                    : 'bg-cafe-cream text-cafe-brown hover:bg-cafe-cream/80'
                }`}
              >
                {(() => {
                  switch(category.id) {
                    case 'coffee': return 'Coffee';
                    case 'pastries': return 'Pastries';
                    case 'breakfast': return 'Breakfast';
                    case 'lunch': return 'Lunch';
                    default: return category.name;
                  }
                })()}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu Content */}
      <div className="container mx-auto px-4 py-12">
        {categories.map(category => (
          <MenuCategory key={category.id} categoryId={category.id} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
