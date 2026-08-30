import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
import path from 'path';
import { mockProducts } from '../data/products';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const region = process.env.AWS_REGION || 'us-east-1';
const endpoint = process.env.DYNAMODB_ENDPOINT;

const rawClient = new DynamoDBClient({
  region,
  endpoint: endpoint || undefined,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey',
  },
});

const db = DynamoDBDocumentClient.from(rawClient);
const tableName = process.env.DYNAMODB_PRODUCTS_TABLE || 'Products';

async function ensureTableExists() {
  try {
    await rawClient.send(
      new CreateTableCommand({
        TableName: tableName,
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        BillingMode: 'PAY_PER_REQUEST',
      })
    );
    console.log(`✨ Table "${tableName}" created in DynamoDB Local.`);
  } catch (err: any) {
    if (err.name === 'ResourceInUseException') {
      console.log(`the table "${tableName}" exists already.`);
    } else {
      throw err;
    }
  }
}

async function seedDatabase() {
  await ensureTableExists();
  console.log(`seed data into DynamoDB Local (${endpoint})...`);

  for (const product of mockProducts) {
    try {
      await db.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            id: String(product.id),
            title: product.title,
            price: Number(product.price),
            description: product.description || '',
            category: product.category || 'General',
            image: product.image,
            badge: product.badge || '',
            rating: product.rating || 5,
            stock: 25,
            createdAt: new Date().toISOString(),
          },
        })
      );
      console.log(`product added : ${product.title}`);
    } catch (error) {
      console.error(`failed [${product.title}]:`, error);
    }
  }

  console.log('Sucess database initialisation');
}

seedDatabase();