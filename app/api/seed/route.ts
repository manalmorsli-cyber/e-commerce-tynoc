import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const mockCategories = [
  { id: 'cat_1', name: 'Backpacks', description: 'Bags for everyday use and travel' },
  { id: 'cat_2', name: 'Accessories', description: 'Small leather goods and complements' },
  { id: 'cat_3', name: 'Travel', description: 'Luggage and cabin bags' }
];

const mockProducts = [
  {
    id: 'prod_1',
    title: 'Premium Black Veloce Backpack',
    price: 89.99,
    categoryId: 'cat_1',
    category: 'Backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    description: 'This product has been rigorously designed to combine modern style and exceptional durability. High-resistance materials and reinforced finishes.',
    badge: 'Best-Seller'
  },
  {
    id: 'prod_2',
    title: 'Minimalist Storage Pouch',
    price: 24.50,
    categoryId: 'cat_2',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80'
    ],
    description: 'Ideal pouch for organizing your cables, chargers, and everyday small items. Water-repellent fabric.',
    badge: 'New'
  },
  {
    id: 'prod_3',
    title: 'Weekender Travel Bag',
    price: 129.00,
    categoryId: 'cat_3',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1550850839-8dc894ed385a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550850839-8dc894ed385a?w=800&q=80'
    ],
    description: 'Perfect for a few days getaway. Cabin size accepted by most airlines.',
    badge: '-15%'
  }
];

export async function GET() {
  try {
    // Insert categories
    for (const category of mockCategories) {
      await db.send(
        new PutCommand({
          TableName: 'Categories', 
          Item: category,
        })
      );
    }

    // Insert products
    for (const product of mockProducts) {
      await db.send(
        new PutCommand({
          TableName: 'Products', 
          Item: product,
        })
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully! (Categories and Products)' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error during seeding:', error);
    return NextResponse.json({ 
      error: 'Error inserting data', 
      details: error.message 
    }, { status: 500 });
  }
}