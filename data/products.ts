export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Pro Wireless Headphones',
    description: 'Active noise cancellation, 30-hour battery life, and premium spatial sound quality.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Heart rate tracking, built-in GPS, active sleep monitoring, and water-resistant up to 50m.',
    price: 149.50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    badge: 'Speed Edition',
    rating: 4.5,
    reviews: 85,
  },
  {
    id: '3',
    title: 'Ergonomic Laptop Backpack',
    description: 'Smart storage, 15-inch padded laptop compartment, and durable water-resistant fabric.',
    price: 79.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviews: 64,
  },
  {
    id: '4',
    title: 'Minimalist Desk Mat',
    description: 'Premium vegan leather desk pad, waterproof surface, and anti-slip rubber base.',
    price: 35.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 210,
  },
];