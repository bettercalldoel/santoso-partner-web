import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/backendless';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      { message: 'Name, email, and password are required.' },
      { status: 400 }
    );
  }

  try {
    const result = await registerUser(body.name, body.email, body.password);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Registration failed.';
    return NextResponse.json({ message }, { status: 400 });
  }
}
