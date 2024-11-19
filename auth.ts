import NextAuth from 'next-auth';
import authConfig from './auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismadb';
import { getUserById } from '@/lib/user';
import { generatePublicId } from '@/lib/publicid';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    }
  },
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
          emailVerified: new Date(),
          publicId: generatePublicId(user.name || 'user')
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
