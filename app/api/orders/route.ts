import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'Orders';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, total, shippingAddress } = body;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: userId || 'guest',
      items,
      total,
      shippingAddress,
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };

    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newOrder,
      })
    );

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error('DynamoDB Put Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    const data = await db.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: '#uid = :userId',
        ExpressionAttributeNames: { '#uid': 'userId' },
        ExpressionAttributeValues: { ':userId': userId },
      })
    );

    return NextResponse.json(data.Items || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}