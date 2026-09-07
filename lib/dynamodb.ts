import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Detecting environment mode
const isDev = process.env.NODE_ENV === 'development';

// In local development default to local DynamoDB instance if endpoint is not specified
const endpoint =
  process.env.DYNAMODB_ENDPOINT || (isDev ? 'http://localhost:8000' : undefined);

const region = process.env.AWS_REGION || 'us-east-1';

// for local DynamoDB use dummy credentials if environment variables are missing
const accessKeyId =
  process.env.AWS_ACCESS_KEY_ID || (isDev ? 'fakeAccessKeyId' : '');

const secretAccessKey =
  process.env.AWS_SECRET_ACCESS_KEY || (isDev ? 'fakeSecretAccessKey' : '');

const clientConfig: Record<string, unknown> = {
  region,
};


if (endpoint) {
  clientConfig.endpoint = endpoint;
}

if (accessKeyId && secretAccessKey) {
  clientConfig.credentials = {
    accessKeyId,
    secretAccessKey,
  };
}

const client = new DynamoDBClient(clientConfig);

// Export document client with auto-marshalling options
export const db = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: true,
  },
});