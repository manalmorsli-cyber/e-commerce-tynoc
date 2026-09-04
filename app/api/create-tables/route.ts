import { NextResponse } from 'next/server';
import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

// Initialize the raw client for local DynamoDB
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://127.0.0.1:8000',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey',
  },
});

export async function GET() {
  try {
    // 1. Create Categories Table
    await client.send(
      new CreateTableCommand({
        TableName: 'Categories',
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      })
    );
    console.log('Categories table created successfully.');

    // 2. Create Products Table
    await client.send(
      new CreateTableCommand({
        TableName: 'Products',
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      })
    );
    console.log('Products table created successfully.');

    return NextResponse.json({ 
      success: true, 
      message: 'Tables created successfully in local DynamoDB!' 
    });

  } catch (error: any) {
    // If table already exists, it will throw a ResourceInUseException
    if (error.name === 'ResourceInUseException') {
      return NextResponse.json({ message: 'Tables already exist.' });
    }
    console.error('Error creating tables:', error);
    return NextResponse.json({ error: 'Failed to create tables', details: error.message }, { status: 500 });
  }
}