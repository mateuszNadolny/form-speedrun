import { nanoid } from 'nanoid';

export function generatePublicId(username: string): string {
  const randomSuffix = nanoid(8);
  const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');

  return `${sanitizedUsername}-${randomSuffix}`;
}
