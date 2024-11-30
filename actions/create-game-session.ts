'use server';

import { generateInputs } from '@/types/data';
import prisma from '@/lib/prismadb';

export async function createGameSession() {
  try {
    const startTime = Date.now();
    const inputs = generateInputs().slice(0, 8);

    const gameSession = await prisma.gameSession.create({
      data: {
        startTime,
        inputs: JSON.parse(JSON.stringify(inputs)),
        expired: false
      }
    });

    if (!gameSession) {
      throw new Error('Failed to create game session');
    }

    return {
      sessionId: gameSession.id,
      startTime: gameSession.startTime,
      inputs
    };
  } catch (error) {
    console.error('Error creating game session:', error);
    throw new Error('Failed to initialize game');
  }
}
