'use server';

import { db } from '@/lib/dynamodb';
import { ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '@/context/CartContext';

// Récupérer tous les produits
export async function getProducts(): Promise<Product[]> {
  try {
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_PRODUCTS_TABLE || 'Products',
    });
    const response = await db.send(command);
    return (response.Items as Product[]) || [];
  } catch (error) {
    console.error('Erreur getProducts DynamoDB:', error);
    return [];
  }
}

// Récupérer un produit par son ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_PRODUCTS_TABLE || 'Products',
      Key: { id },
    });
    const response = await db.send(command);
    return (response.Item as Product) || null;
  } catch (error) {
    console.error('Erreur getProductById DynamoDB:', error);
    return null;
  }
}