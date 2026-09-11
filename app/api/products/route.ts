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

export async function GET() {
  try {
    const res = await docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_PRODUCTS_TABLE || "Products" })
    );
    return NextResponse.json(res.Items || []);
  } catch (error: any) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price, category, inStock, description, image, images } = body;

    if (!title || price === undefined) {
      return NextResponse.json({ error: "Title and price are required" }, { status: 400 });
    }

    const imageList = Array.isArray(images) && images.length > 0
      ? images
      : (image ? [image] : []);

    const newProduct = {
      id: crypto.randomUUID(),
      title,
      price: Number(price),
      category: category || "General",
      inStock: Boolean(inStock),
      description: description || "",
      image: imageList[0] || image || "",
      images: imageList, 
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_PRODUCTS_TABLE || "Products",
        Item: newProduct,
      })
    );

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("POST Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}