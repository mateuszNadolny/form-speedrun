'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

import { getUserByEmail } from '@/lib/user';
import { RegisterSchema } from '@/schemas';
import { AuthError } from 'next-auth';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: 'Invalid fields!'
    };
  }

  const { email, name, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    });
    return { success: true, user };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'An error occurred' };
      }
    }
    return { error: 'An unexpected error occurred' };
  }
};
