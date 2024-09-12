import prisma from '@/lib/prismadb';

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });

  return user;
};
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
};
