'use server';

import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: string) {
  if (!id) {
    throw new Error('Invalid user');
  }

  try {
    await prisma.user.delete({
      where: { id }
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}
