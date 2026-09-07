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

export async function GET() {
  try {
    const response = await db.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_PRODUCTS_TABLE || 'Products',
      })
    );

    // Return DynamoDB items if available
    if (response.Items && response.Items.length > 0) {
      return NextResponse.json(response.Items, { status: 200 });
    }

    
    return NextResponse.json(mockProducts, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products from DynamoDB, serving mock data:', error);
    return NextResponse.json(mockProducts, { status: 200 });
  }
}