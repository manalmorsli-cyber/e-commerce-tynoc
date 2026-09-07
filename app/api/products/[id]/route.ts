import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockProducts } from '@/data/products';

const TABLE_NAME = process.env.DYNAMODB_PRODUCTS_TABLE || 'Products';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await props.params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const response = await db.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (response.Item) {
      return NextResponse.json(response.Item, { status: 200 });
    }

    // Fallback to mock data if product is not in DynamoDB
    const fallbackProduct = mockProducts.find((p) => p.id === id);
    if (fallbackProduct) {
      return NextResponse.json(fallbackProduct, { status: 200 });
    }

    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Error fetching product detail from DynamoDB, serving mock fallback:', error);

    // Fallback mechanism for Vercel deployment
    try {
      const resolvedParams = await props.params;
      const id = resolvedParams?.id;
      const fallbackProduct = mockProducts.find((p) => p.id === id);
      if (fallbackProduct) {
        return NextResponse.json(fallbackProduct, { status: 200 });
      }
    } catch (_) {}

    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}