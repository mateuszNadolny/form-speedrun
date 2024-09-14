import NextAuth from 'next-auth';
import authConfig from './auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismadb';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   if (account?.provider === 'google') {
    //     user.username = profile?.email?.split('@')[0]; // Use part of email as username
    //   }
    //   return true;
    // }
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  ...authConfig
});
