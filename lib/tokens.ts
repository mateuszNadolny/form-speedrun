import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prismadb';
import { getVerificationTokenByEmail } from './verification-token';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    const isSameDay = new Date(existingToken.expires).getDate() === new Date(expires).getDate();
    if (isSameDay) {
      return { error: 'Verification email has already been sent to this user' };
    }

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return verificationToken;
};
