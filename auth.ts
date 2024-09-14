import NextAuth from 'next-auth';
import authConfig from './auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismadb';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {},
  pages: {
    signIn: '/signin',
    error: '/error'
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      });
    }
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  ...authConfig
});
