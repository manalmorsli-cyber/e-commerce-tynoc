import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://127.0.0.1:8000',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey',
  },
});

const db = DynamoDBDocumentClient.from(client);

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Résolution asynchrone de params pour Next.js 15
    const resolvedParams = await props.params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const response = await db.send(
      new GetCommand({
        TableName: 'Products',
        Key: { id },
      })
    );

    if (!response.Item) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(response.Item, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching product detail:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}