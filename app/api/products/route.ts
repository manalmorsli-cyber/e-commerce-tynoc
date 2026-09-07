import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockProducts } from '@/data/products';

const TABLE_NAME = process.env.DYNAMODB_PRODUCTS_TABLE || 'Products';

export async function GET() {
  try {
    const response = await db.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    // Return DynamoDB items if available
    if (response.Items && response.Items.length > 0) {
      return NextResponse.json(response.Items, { status: 200 });
    }

    // Fallback to mock data if table is empty
    return NextResponse.json(mockProducts, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products from DynamoDB, serving mock data:', error);
    return NextResponse.json(mockProducts, { status: 200 });
  }
}