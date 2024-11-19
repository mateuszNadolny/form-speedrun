'use server';

import SplitTimes from '@/components/stats/split-time';
import prisma from '@/lib/prismadb';

export async function getGameScores() {
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
            image: true
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
      createdAt: score.createdAt.toISOString()
    }));
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw new Error('Failed to fetch scores');
  }
}
