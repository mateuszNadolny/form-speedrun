'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prismadb';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/lib/password-reset-token';
import { getUserByEmail } from '@/lib/user';

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>) => {
  try {
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'dupa An unexpected error occurred' };
    }

    const { password, confirmPassword, token } = validatedFields.data;

    if (!token) {
      return { error: 'tutaj An unexpected error occurred' };
    }
    if (password !== confirmPassword) {
      return { error: `Passwords do not match` };
    }

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return { error: 'huj An unexpected error occurred' };
    }
    if ('error' in existingToken) {
      return { error: existingToken.error };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: 'Password reset link has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: 'huj2 An unexpected error occurred' };
    }

    if ('error' in existingUser) {
      return { error: existingUser.error };
    }

    if (existingUser.lastPasswordUpdate && new Date(existingUser.lastPasswordUpdate) > new Date()) {
      return { error: 'You can update your password once every 24 hours' };
    }

    if (!existingUser.emailVerified) {
      return { error: 'Please verify your email before updating your password' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        lastPasswordUpdate: new Date(),
        hashedPassword
      }
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    });

    return {
      success: '✅ Password updated successfully! You will now be redirected to signin page'
    };
  } catch (error) {
    return { error: 'trzczina An unexpected error occurred' };
  }
};
