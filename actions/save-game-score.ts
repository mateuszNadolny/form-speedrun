'use server';

import { z } from 'zod';
import prisma from '@/lib/prismadb';
import { GameScoreSubmissionSchema } from '@/schemas';
import { auth } from '@/auth';

const MAX_ALLOWED_TIME = 300000; // 5 minutes
const MIN_ALLOWED_TIME = 1000; // 1 second

export async function saveGameScore(values: z.infer<typeof GameScoreSubmissionSchema>) {
  try {
    const validatedFields = GameScoreSubmissionSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid score data' };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'User not authenticated' };
    }

    const { sessionId, endTime, splitTimes } = validatedFields.data;

    const gameSession = await prisma.gameSession.findUnique({
      where: {
        id: sessionId,
        expired: false
      }
    });

    if (!gameSession) {
      return { error: 'Invalid or expired game session' };
    }

    const totalTime = endTime - gameSession.startTime;

    if (totalTime > MAX_ALLOWED_TIME || totalTime < MIN_ALLOWED_TIME) {
      return { error: 'Invalid completion time' };
    }

    const splitTimeSum = splitTimes.reduce((sum, split) => sum + split.time, 0);
    if (Math.abs(splitTimeSum - totalTime) > 1000) {
      // 1 second tolerance
      return { error: 'Invalid split times' };
    }

    await prisma.$transaction([
      prisma.userScore.create({
        data: {
          userId: session.user.id,
          totalTime,
          splitTimes: {
            create: splitTimes
          }
        }
      }),
      prisma.gameSession.update({
        where: { id: sessionId },
        data: { expired: true }
      })
    ]);

    return { success: 'Score saved successfully' };
  } catch (error) {
    console.error('Error saving score:', error);
    return { error: 'Failed to save score' };
  }
}
