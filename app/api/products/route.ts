import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

export async function GET() {
  try {
    const tableName = process.env.DYNAMODB_PRODUCTS_TABLE || 'Products';
    const response = await db.send(
      new ScanCommand({
        TableName: tableName,
      })
    );

    return NextResponse.json(response.Items || []);
  } catch (error) {
    console.error('Failed to fetch products from DynamoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}