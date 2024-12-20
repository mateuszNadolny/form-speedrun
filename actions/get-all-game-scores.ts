'use server';

import prisma from '@/lib/prismadb';

export async function getAllGameScores() {
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
            createdAt: true,
            publicId: true
          }
        }
      },
      orderBy: {
        totalTime: 'asc'
      },
      take: 100
    });

    return scores.map((score) => ({
      id: score.id,
      username: score.user.name ?? 'Anonymous',
      splitTimes: score.splitTimes,
      time: score.totalTime,
      image: score.user.image ?? '/default-avatar.png',
      publicId: score.user.publicId,
      createdAt: score.createdAt.toISOString()
    }));
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw new Error('Failed to fetch scores');
  }
}
