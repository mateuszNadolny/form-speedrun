'use server';

import prisma from '@/lib/prismadb';
import { getUserByEmail } from '@/lib/user';
import { getVerificationTokenByToken } from '@/lib/verification-token';

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return { error: 'Invalid token' };
    }

    if ('error' in existingToken) {
      return { error: existingToken.error };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: 'User not found' };
    }

    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });

    return { success: 'Email verified successfully! You will now be redirected to the login page' };
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
};
