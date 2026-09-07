import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockProducts } from '@/data/products';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://127.0.0.1:8000',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey',
  },
});

const db = DynamoDBDocumentClient.from(client);

// Fallback categories dynamically extracted from mock products
const fallbackCategories = Array.from(
  new Set(mockProducts.map((product) => product.category).filter(Boolean))
).map((categoryName, index) => ({
  id: `cat-${index + 1}`,
  name: categoryName,
}));

export async function GET() {
  try {
    const response = await db.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_CATEGORIES_TABLE || 'Categories',
      })
    );

    if (response.Items && response.Items.length > 0) {
      const categories = response.Items.map((item, idx) => ({
        id: item.id || `db-cat-${idx}`,
        name: item.name || item.category || 'Uncategorized',
      }));
      return NextResponse.json(categories, { status: 200 });
    }

    return NextResponse.json(fallbackCategories, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching categories from DynamoDB, serving mock categories:', error);
    return NextResponse.json(fallbackCategories, { status: 200 });
  }
}