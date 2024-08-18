import bcrypt from 'bcryptjs';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (existingUser) {
      return new NextResponse('User with such name already exists', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
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