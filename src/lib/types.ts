
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites?: string[];
  orderHistory?: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  paymentMethod: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'cash' | 'mobile' | 'upi' | 'qr';
  name: string;
  icon: string;
}
