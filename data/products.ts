import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Pro Wireless Headphones',
    description: 'Active noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.8,
    stock: 15,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Heart rate tracking, built-in GPS, and water-resistant up to 50m.',
    price: 149.50,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.5,
    stock: 8,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Ergonomic Laptop Backpack',
    description: 'Smart storage, 15-inch laptop compartment, and water-resistant fabric.',
    price: 79.00,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    rating: 4.6,
    stock: 20,
    isFeatured: false,
  },
];