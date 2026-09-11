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
    // 1. Récupération des paniers
    const cartsRes = await docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_CARTS_TABLE || "Carts" })
    );
    const carts = cartsRes.Items || [];

    // 2. Récupération des utilisateurs
    const usersRes = await docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_USERS_TABLE || "Users" })
    );
    const users = usersRes.Items || [];
    const userMap = new Map(users.map((u) => [u.id || u.userId, u]));

    // 3. Récupération des produits
    const productsRes = await docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_PRODUCTS_TABLE || "Products" })
    );
    const products = productsRes.Items || [];
    const productMap = new Map(products.map((p) => [p.id || p.productId, p]));

    // 4. Enrichissement des paniers avec les infos User et Product
    const enrichedCarts = carts.map((cart) => {
      const user = userMap.get(cart.userId) || userMap.get(cart.id);
      const rawItems = cart.items || cart.cartItems || cart.products || [];

      const items = rawItems.map((item: any) => {
        const pId = typeof item === "string" ? item : (item.productId || item.id);
        const product = productMap.get(pId);
        return {
          productId: pId,
          title: product?.title || product?.name || item.title || item.name || "Produit inconnu",
          price: Number(product?.price ?? item.price ?? 0),
          quantity: Number(item.quantity ?? 1),
          imageUrl: product?.image || product?.imageUrl || item.image || item.imageUrl || "",
        };
      });

      return {
        id: cart.id || cart.userId,
        userId: cart.userId || cart.id,
        user: user
          ? {
              name: user.name || user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "Utilisateur",
              email: user.email || "",
            }
          : null,
        items,
        itemsCount: items.reduce((acc: number, i: any) => acc + (i.quantity || 1), 0),
        updatedAt: cart.updatedAt || cart.createdAt || new Date().toISOString(),
      };
    });

    return NextResponse.json(enrichedCarts);
  } catch (error: any) {
    console.error("GET Admin Activity Error:", error);
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 });
  }
}