import { NextResponse } from 'next/server';
import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

// Connect to the local DynamoDB instance (port 8000)
const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://127.0.0.1:8000',
  credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
});

export async function GET() {
  try {
    const tablesToCreate = ['Users', 'Products', 'Carts', 'Wishlists'];

    for (const tableName of tablesToCreate) {
      try {
        await client.send(new CreateTableCommand({
          TableName: tableName,
          // For Carts and Wishlists, we will use userId as the primary key
          AttributeDefinitions: [{ AttributeName: tableName === 'Users' || tableName === 'Products' ? 'id' : 'userId', AttributeType: 'S' }],
          KeySchema: [{ AttributeName: tableName === 'Users' || tableName === 'Products' ? 'id' : 'userId', KeyType: 'HASH' }],
          BillingMode: 'PAY_PER_REQUEST',
        }));
        console.log(`Table ${tableName} created.`);
      } catch (err: any) {
        if (err.name !== 'ResourceInUseException') {
          throw err; // Throw if error is not "Table already exists"
        }
      }
    }

    return NextResponse.json({ success: 'All database tables are ready!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}