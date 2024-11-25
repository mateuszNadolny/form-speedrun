'use server';

import prisma from '@/lib/prismadb';

interface UserProfileData {
  name: string | null;
  image: string | null;
  createdAt: Date;
  scores: {
    id: string;
    totalTime: number;
    createdAt: Date;
    splitTimes: {
      id: string;
      label: string;
      time: number;
    }[];
  }[];
}

export async function getUserProfileData(publicId: string): Promise<UserProfileData | null> {
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
