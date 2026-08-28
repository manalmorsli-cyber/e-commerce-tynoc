import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Casque Audio Sans Fil Pro',
    description: 'Réduction de bruit active, autonomie de 30h et qualité sonore exceptionnelle.',
    price: 199.99,
    category: 'Électronique',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.8,
    stock: 15,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Montre Connectée Sport',
    description: 'Suivi cardiaque, GPS intégré et étanche jusqu’à 50m.',
    price: 149.50,
    category: 'Électronique',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.5,
    stock: 8,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Sac à Dos Ergonomique',
    description: 'Rangements intelligents, compartiment ordinateur 15 pouces et tissu imperméable.',
    price: 79.00,
    category: 'Accessoires',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    rating: 4.6,
    stock: 20,
    isFeatured: false,
  },
];