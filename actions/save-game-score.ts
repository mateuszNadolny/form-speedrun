'use server';

import { z } from 'zod';
import prisma from '@/lib/prismadb';
import { GameScoreSchema } from '@/schemas';
import { auth } from '@/auth';

export async function saveGameScore(values: z.infer<typeof GameScoreSchema>) {
  try {
    const validatedFields = GameScoreSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid score data' };
    }

    const session = await auth();
      if (!session?.user?.id) {
      return { success: 'Score not saved - user not logged in' };
    }

    const { totalTime, splitTimes } = validatedFields.data;

    const savedScore = await prisma.userScore.create({
      data: {
        userId: session.user.id,
        totalTime,
        splitTimes: {
          create: splitTimes.map((split) => ({
            label: split.label,
            time: split.time
          }))
        }
      },
      include: {
        splitTimes: true
      }
    });

    return {
      success: 'Score saved successfully'
    };
  } catch (error) {
    console.error('Error saving score:', error);
    return { error: 'Failed to save score' };
  }
}
