import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/backendless';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json(
      { message: 'Email and password are required.' },
      { status: 400 }
    );
  }

  try {
    const user = await loginUser(body.email, body.password);
    if (!user.userToken) {
      return NextResponse.json(
        { message: 'User token tidak tersedia.' },
        { status: 401 }
      );
    }
    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Login failed. Try again.';
    return NextResponse.json({ message }, { status: 401 });
  }
}
