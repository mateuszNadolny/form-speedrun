'use server';

import prisma from '@/lib/prismadb';

export async function getUserGameScores(publicId: string) {
  try {
    const scores = await prisma.userScore.findMany({
      select: {
        id: true,
        splitTimes: {
          select: {
            label: true,
            time: true
          }
        },
        totalTime: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
            publicId: true
          }
        }
      },
      where: {
        user: {
          publicId
        }
      },
      orderBy: {
        totalTime: 'asc'
      }
    });

    return scores.map((score) => ({
      id: score.id,
      username: score.user.name ?? 'Anonymous',
      splitTimes: score.splitTimes,
      time: score.totalTime,
      image: score.user.image ?? '/default-avatar.png',
      createdAt: score.createdAt.toISOString()
    }));
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw new Error('Failed to fetch scores');
  }
}
