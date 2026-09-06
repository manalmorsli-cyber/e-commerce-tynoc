import { NextResponse } from 'next/server';
import { db } from '@/lib/dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'Users';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    //Validate incoming data
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    //Search for the user in the DynamoDB table
    const data = await db.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: '#e = :email',
        ExpressionAttributeNames: { '#e': 'email' },
        ExpressionAttributeValues: { ':email': email.toLowerCase().trim() },
      })
    );

    const user = data.Items && data.Items[0];

    //Handle user not found
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email. Please sign up first.' },
        { status: 404 }
      );
    }

    //Verify password matches
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    //Remove password from the response object for security
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({ success: true, user: userWithoutPassword }, { status: 200 });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}