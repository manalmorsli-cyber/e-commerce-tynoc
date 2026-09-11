import { NextResponse } from "next/server";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  ...(process.env.DYNAMODB_ENDPOINT && { endpoint: process.env.DYNAMODB_ENDPOINT }),
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE || "Categories";

// Catégories par défaut si la table DynamoDB est vide
const DEFAULT_CATEGORIES = [
  { id: "1", name: "Travel", slug: "travel" },
  { id: "2", name: "Accessories", slug: "accessories" },
  { id: "3", name: "Backpacks", slug: "backpacks" },
];

export async function GET() {
  try {
    const res = await docClient.send(
      new ScanCommand({ TableName: TABLE_NAME })
    );

    if (res.Items && res.Items.length > 0) {
      return NextResponse.json(res.Items);
    }
    
    return NextResponse.json(DEFAULT_CATEGORIES);
  } catch (error) {
    console.warn("DynamoDB GET Categories fallback active:", error);
    return NextResponse.json(DEFAULT_CATEGORIES);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const categorySlug = (slug && slug.trim() !== "")
      ? slug.trim().toLowerCase().replace(/\s+/g, "-")
      : name.trim().toLowerCase().replace(/\s+/g, "-");

    const newCategory = {
      id: crypto.randomUUID(),
      name: name.trim(),
      slug: categorySlug,
      createdAt: new Date().toISOString(),
    };

    try {
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newCategory,
        })
      );
    } catch (dbErr) {
      console.warn("DynamoDB error on category save:", dbErr);
    }

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("POST Category Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}