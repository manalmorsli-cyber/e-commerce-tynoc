import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'Wishlists';

// Fetch the user's wishlist from DynamoDB
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const data = await db.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId },
      })
    );

    return NextResponse.json({ items: data.Item?.items || [] }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to fetch wishlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update the user's wishlist in DynamoDB
export async function POST(request: Request) {
  try {
    const { userId, items } = await request.json();

    if (!userId || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

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
    console.error('Failed to update wishlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}