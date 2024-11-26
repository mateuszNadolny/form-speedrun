'use server';

import prisma from '@/lib/prismadb';
import { generatePublicId } from '@/lib/publicid';
import { auth } from '@/auth';
import { UsernameSchema } from '@/schemas';
import { z } from 'zod';

export async function updateUsername(values: z.infer<typeof UsernameSchema>) {
  try {
    const validatedFields = UsernameSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid username' };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { username } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        name: username
      }
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return { error: 'Username already taken' };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        name: username,
        publicId: generatePublicId(username)
      }
    });

    return { success: 'Username updated successfully', user: updatedUser };
  } catch (error) {
    console.error('Error updating username:', error);
    return { error: 'Failed to update username' };
  }
}
