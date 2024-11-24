'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import prisma from '@/lib/prismadb';
import { UpdatePasswordSchema } from '@/schemas';
import { getUserByEmail } from '@/lib/user';

export const updatePassword = async (values: z.infer<typeof UpdatePasswordSchema>) => {
  try {
    const validatedFields = UpdatePasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'An unexpected error occurred' };
    }

    const { oldPassword, newPassword, confirmNewPassword, isOAuthAccount } = validatedFields.data;

    if (newPassword !== confirmNewPassword) {
      return { error: `Passwords do not match` };
    }

    const session = await auth();

    const existingUser = await getUserByEmail(session?.user?.email as string);

    if (!existingUser) {
      return { error: 'An unexpected error occurred' };
    }

    if (isOAuthAccount === true) {
      return { error: 'Invalid request' };
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

    if (!existingUser.hashedPassword) {
      return { error: 'An error occured' };
    }

    const isValidPassword = await bcrypt.compare(oldPassword, existingUser.hashedPassword);
    if (!isValidPassword) {
      return { error: 'Current password is incorrect' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        lastPasswordUpdate: new Date(),
        hashedPassword
      }
    });

    return {
      success: '✅ Password updated successfully! You will now be redirected to signin page'
    };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};
