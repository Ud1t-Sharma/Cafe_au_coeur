import { Category, MenuItem, PaymentMethod } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Our selection of specialty coffees',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2037&auto=format&fit=crop'
  },
  {
    id: 'pastries',
    name: 'Pastries',
    description: 'Freshly prepared French pastries',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'Morning dishes prepared with care',
    image: 'https://images.unsplash.com/photo-1608649226842-f39257c9085f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'lunch',
    name: 'Lunch',
    description: 'Light dishes for lunch',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop'
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Shot of our signature espresso blend',
    price: 250,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 320,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=2070&auto=format&fit=crop',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'latte',
    name: 'Café Latte',
    description: 'Espresso with steamed milk',
    price: 350,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=2075&auto=format&fit=crop',
    category: 'coffee',
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso diluted with hot water',
    price: 280,
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=2070&auto=format&fit=crop',
    category: 'coffee',
  },
  {
    id: 'croissant',
    name: 'Croissant',
    description: 'Classic buttery French croissant',
    price: 150,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop',
    category: 'pastries',
    featured: true,
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    description: 'Chocolate-filled buttery pastry',
    price: 180,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=2070&auto=format&fit=crop',
    category: 'pastries',
    featured: true,
  },
  {
    id: 'eclair',
    name: 'Chocolate Éclair',
    description: 'Chocolate filled éclair with chocolate glaze',
    price: 200,
    image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?q=80&w=2070&auto=format&fit=crop',
    category: 'pastries',
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Sourdough toast with avocado, radish, and microgreens',
    price: 400,
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10a2e5?q=80&w=1974&auto=format&fit=crop',
    category: 'breakfast',
    featured: true,
  },
  {
    id: 'french-toast',
    name: 'French Toast',
    description: 'Brioche french toast with maple syrup and berries',
    price: 450,
    image: 'https://images.unsplash.com/photo-1639108094328-2b94a49b1c2e?q=80&w=1974&auto=format&fit=crop',
    category: 'breakfast',
  },
  {
    id: 'quiche',
    name: 'Quiche Lorraine',
    description: 'Classic quiche with bacon and Gruyère cheese',
    price: 380,
    image: 'https://images.unsplash.com/photo-1651451904911-df1f7e4aa482?q=80&w=1974&auto=format&fit=crop',
    category: 'lunch',
    featured: true,
  },
  {
    id: 'nicoise-salad',
    name: 'Niçoise Salad',
    description: 'Tuna, egg, olives, and vegetables with Dijon vinaigrette',
    price: 500,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    category: 'lunch',
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'credit-card',
    type: 'card',
    name: 'Credit Card',
    icon: 'credit-card',
  },
  {
    id: 'debit-card',
    type: 'card',
    name: 'Debit Card',
    icon: 'credit-card',
  },
  {
    id: 'upi',
    type: 'upi',
    name: 'UPI Payment',
    icon: 'smartphone',
  },
  {
    id: 'qr-code',
    type: 'qr',
    name: 'Scan QR Code',
    icon: 'qr-code',
  },
  {
    id: 'cash',
    type: 'cash',
    name: 'Cash',
    icon: 'banknote',
  },
];

// UPI details
export const UPI_DETAILS = {
  id: "atulucr100@okhdfcbank",
  qrCodeImage: "/lovable-uploads/12ecf8fe-fb8f-4db4-8a55-a37483247fcc.png",
};

// Service fee in INR
export const SERVICE_FEE = 40;
