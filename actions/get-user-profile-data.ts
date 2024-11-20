import prisma from '@/lib/prismadb';

import { auth } from '@/auth';

export async function getUserProfileData(publicId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: 'Invalid user' };
  }

  const user = await prisma.user.findUnique({
    where: {
      publicId
    },
    select: {
      name: true,
      image: true,
      createdAt: true,
      scores: {
        select: {
          id: true,
          totalTime: true,
          createdAt: true,
          splitTimes: {
            select: {
              id: true,
              label: true,
              time: true
            }
          }
        }
      }
    }
  });

  return user;
}
