import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tableName = process.env.DYNAMODB_PRODUCTS_TABLE || 'Products';
    const { id } = params;

    const response = await db.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );

    if (!response.Item) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(response.Item, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}