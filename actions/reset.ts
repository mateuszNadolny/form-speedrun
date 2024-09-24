'use server';

import { z } from 'zod';

import prisma from '@/lib/prismadb';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/lib/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  try {
    const validateFields = ResetSchema.safeParse(values);

    if (!validateFields.success) {
      return {
        error: 'Invalid credentials!'
      };
    }

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: 'Invalid credentials' };
    }

    if (existingUser.lastPasswordUpdate && new Date(existingUser.lastPasswordUpdate) > new Date()) {
      return { error: 'You can reset your password once every 24 hours' };
    }

    if (!existingUser.emailVerified) {
      return { error: 'Please verify your email before resetting your password' };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) {
      return { error: 'An unexpected error occurred' };
    }

    if ('error' in passwordResetToken) {
      return { error: passwordResetToken.error };
    }

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return {
      success: 'Check your email for a link to reset your password'
    };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};
