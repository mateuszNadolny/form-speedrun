import bcrypt from 'bcryptjs';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

import { getUserByEmail } from '@/lib/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;

    if (!email || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return new NextResponse('User already exists', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error, 'register error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
