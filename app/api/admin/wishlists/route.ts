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
    // 1. Récupération des wishlists
    const wishlistsRes = await docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_WISHLISTS_TABLE || "Wishlists" })
    );
    const wishlists = wishlistsRes.Items || [];

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

    // 4. Enrichissement des wishlists
    const enrichedWishlists = wishlists.map((wishlist) => {
      const user = userMap.get(wishlist.userId) || userMap.get(wishlist.id);
      const rawItems = wishlist.items || wishlist.products || wishlist.productIds || [];

      const items = rawItems.map((item: any) => {
        const pId = typeof item === "string" ? item : (item.productId || item.id);
        const product = productMap.get(pId);
        return {
          productId: pId,
          title: product?.title || product?.name || item.title || item.name || "Produit inconnu",
          price: Number(product?.price ?? item.price ?? 0),
          quantity: 1,
          imageUrl: product?.image || product?.imageUrl || item.image || item.imageUrl || "",
        };
      });

      return {
        id: wishlist.id || wishlist.userId,
        userId: wishlist.userId || wishlist.id,
        user: user
          ? {
              name: user.name || user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "Utilisateur",
              email: user.email || "",
            }
          : null,
        items,
        itemsCount: items.length,
        updatedAt: wishlist.updatedAt || wishlist.createdAt || new Date().toISOString(),
      };
    });

    return NextResponse.json(enrichedWishlists);
  } catch (error: any) {
    console.error("GET Admin Wishlists Error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlists" }, { status: 500 });
  }
}