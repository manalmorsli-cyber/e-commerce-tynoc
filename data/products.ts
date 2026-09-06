export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
  rating?: number;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    badge: 'Bestseller',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Minimalist Mechanical Keyboard',
    price: 129.50,
    description: 'Compact 75% layout with tactile switches and customizable RGB backlighting.',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    badge: 'New',
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Ergonomic Wireless Mouse',
    price: 79.99,
    description: 'Designed for comfort with precision tracking and multi-device connectivity.',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    rating: 4.5,
  },
  {
    id: '4',
    title: 'Ultra-Wide Curved Gaming Monitor',
    price: 499.00,
    description: '34-inch QHD display with 144Hz refresh rate for immersive viewing.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    badge: 'Sale',
    rating: 4.9,
  },
  {
    id: '5',
    title: 'Smart Fitness Watch',
    price: 149.95,
    description: 'Track your workouts, heart rate, and sleep with built-in GPS.',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    rating: 4.6,
  },
  {
    id: '6',
    title: 'Leather Desk Mat',
    price: 39.99,
    description: 'Premium PU leather mat protecting your desk while elevating your setup.',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=800&q=80',
    rating: 4.4,
  },
];