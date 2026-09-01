import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'Users';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await db.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: '#e = :email',
        ExpressionAttributeNames: { '#e': 'email' },
        ExpressionAttributeValues: { ':email': email.toLowerCase().trim() },
      })
    );

    if (existingUser.Items && existingUser.Items.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const userId = Date.now().toString(); 
    const newUser = {
      id: userId,
      name,
      email: email.toLowerCase().trim(),
      password, 
      role: 'user', 
      createdAt: new Date().toISOString(),
    };

    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newUser,
      })
    );

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ success: true, user: userWithoutPassword }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}