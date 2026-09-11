export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  badge?: string;
  stock?: number;
  inStock?: boolean;
  rating?: number | { rate: number; count: number };
  createdAt?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}