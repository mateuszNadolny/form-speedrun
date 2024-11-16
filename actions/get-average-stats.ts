'use server';

import prisma from '@/lib/prismadb';

export async function getAverageStats() {
  try {
    const scores = await prisma.userScore.findMany({
      select: {
        id: true,
        totalTime: true,
        createdAt: true,
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        totalTime: 'asc'
      },
      take: 10
    });

    const topTime = scores[0]?.totalTime ?? 0;
    const averageTime =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score.totalTime, 0) / scores.length
        : 0;

    return {
      topTime,
      averageTime
    };
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw new Error('Failed to fetch scores');
  }
}
