import prisma from '@/lib/prismadb';

import { auth } from '@/auth';

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: 'Invalid user' };
  }

  try {
    const user = await prisma.user.delete({
      where: {
        id
      },
      include: {
        scores: true,
        account: true
      }
    });

    if (!user) {
      return { error: 'User not found' };
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error: 'Failed to delete user' };
  }
}
