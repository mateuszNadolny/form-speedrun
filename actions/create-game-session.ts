'use server';

import { v4 as uuidv4 } from 'uuid';
import { generateInputs } from '@/types/data';
import prisma from '@/lib/prismadb';

export async function createGameSession() {
  const sessionId = uuidv4();
  const startTime = Date.now();
  const inputs = generateInputs().slice(0, 8);

  await prisma.gameSession.create({
    data: {
      id: sessionId,
      startTime,
      inputs: JSON.parse(JSON.stringify(inputs)),
      expired: false
    }
  });

  return {
    sessionId,
    startTime,
    inputs
  };
}
