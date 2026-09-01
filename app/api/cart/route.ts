import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'Carts';

// Get the user's cart
export async function GET(request: Request) {
  try {
    // Extract userId from the URL query parameters (e.g., /api/cart?userId=123)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch the cart from DynamoDB using the userId as the primary key
    const data = await db.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId },
      })
    );

    // Return the items or an empty array if the cart doesn't exist yet
    return NextResponse.json({ items: data.Item?.items || [] }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to fetch cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update the user's cart (Add, Update quantity, Remove)
export async function POST(request: Request) {
  try {
    const { userId, items } = await request.json();

    if (!userId || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
    }

    // Overwrite the user's cart in DynamoDB with the new items array
    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          userId,
          items,
          updatedAt: new Date().toISOString(),
        },
      })
    );

    return NextResponse.json({ success: true, items }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to update cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}