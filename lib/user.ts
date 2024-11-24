import prisma from '@/lib/prismadb';

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isOAuthAccount = async (userId: string) => {
  const account = await prisma.account.findFirst({
    where: {
      userId
    }
  });

  return !!account;
};
