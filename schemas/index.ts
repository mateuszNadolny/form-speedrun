import { z } from 'zod';

export const GameScoreSchema = z.object({
  totalTime: z.number(),
  splitTimes: z.array(
    z.object({
      label: z.string(),
      time: z.number()
    })
  )
});

export const UsernameSchema = z.object({
  username: z.string().trim().min(3, {
    message: 'Username has to be at least 3 characters'
  })
});
