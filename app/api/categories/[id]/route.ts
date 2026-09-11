import { NextResponse } from "next/server";
import { DynamoDBDocumentClient, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug } = body;

    const res = await docClient.send(
      new UpdateCommand({
        TableName: process.env.DYNAMODB_CATEGORIES_TABLE || "Categories",
        Key: { id },
        UpdateExpression: "set #name = :name, slug = :slug",
        ExpressionAttributeNames: {
          "#name": "name", 
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":slug": slug,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return NextResponse.json(res.Attributes);
  } catch (error: any) {
    console.error("PUT Category Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await docClient.send(
      new DeleteCommand({
        TableName: process.env.DYNAMODB_CATEGORIES_TABLE || "Categories",
        Key: { id },
      })
    );

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Category Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}