import { NextResponse } from "next/server";
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  ...(process.env.DYNAMODB_ENDPOINT && { endpoint: process.env.DYNAMODB_ENDPOINT }),
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_USERS_TABLE || "Users";

async function getIdParam(params: Promise<{ id: string }> | { id: string }) {
  const resolvedParams = await Promise.resolve(params);
  return resolvedParams.id;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await getIdParam(params);
    const res = await docClient.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } })
    );
    if (!res.Item) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(res.Item);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await getIdParam(params);
    const body = await request.json();
    const { name, email, role, status } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const existing = await docClient.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } })
    );

    const updatedUser = {
      ...(existing.Item || {}),
      id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role || "User",
      status: status || "Active",
      updatedAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: updatedUser,
      })
    );

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("PUT User Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await getIdParam(params);
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("DELETE User Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 });
  }
}