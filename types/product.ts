export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}