
import React, { createContext, useContext, useState } from 'react';
import { MenuItem, Category } from '@/lib/types';
import { MENU_ITEMS, CATEGORIES } from '@/lib/constants';

interface MenuContextType {
  menuItems: MenuItem[];
  categories: Category[];
  getFeaturedItems: () => MenuItem[];
  getItemsByCategory: (categoryId: string) => MenuItem[];
  getItemById: (id: string) => MenuItem | undefined;
  getCategoryById: (id: string) => Category | undefined;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, these would likely come from an API
  const [menuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [categories] = useState<Category[]>(CATEGORIES);

  const getFeaturedItems = () => {
    return menuItems.filter(item => item.featured);
  };

  const getItemsByCategory = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId);
  };

  const getItemById = (id: string) => {
    return menuItems.find(item => item.id === id);
  };

  const getCategoryById = (id: string) => {
    return categories.find(category => category.id === id);
  };

  return (
    <MenuContext.Provider value={{
      menuItems,
      categories,
      getFeaturedItems,
      getItemsByCategory,
      getItemById,
      getCategoryById,
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
