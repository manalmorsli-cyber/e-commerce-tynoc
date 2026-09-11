import { NextResponse } from "next/server";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
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

export async function GET() {
  try {
    const [products, categories, users, carts, wishlists] = await Promise.all([
      docClient.send(new ScanCommand({ TableName: process.env.DYNAMODB_PRODUCTS_TABLE || "Products", Select: "COUNT" })),
      docClient.send(new ScanCommand({ TableName: process.env.DYNAMODB_CATEGORIES_TABLE || "Categories", Select: "COUNT" })),
      docClient.send(new ScanCommand({ TableName: process.env.DYNAMODB_USERS_TABLE || "Users", Select: "COUNT" })),
      docClient.send(new ScanCommand({ TableName: process.env.DYNAMODB_CART_TABLE || "Carts", Select: "COUNT" })),
      docClient.send(new ScanCommand({ TableName: process.env.DYNAMODB_WISHLIST_TABLE || "Wishlists", Select: "COUNT" })),
    ]);

    return NextResponse.json({
      totalProducts: products.Count || 0,
      totalCategories: categories.Count || 0,
      totalUsers: users.Count || 0,
      totalCarts: carts.Count || 0,
      totalWishlists: wishlists.Count || 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },
      { status: 500 }
    );
  }
}