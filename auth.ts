import NextAuth from 'next-auth';
import authConfig from './auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismadb';
import { getUserById } from '@/lib/user';
import { generatePublicId } from '@/lib/publicid';
import useLoadingAuthStore from '@/store/auth-store';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      const user = await getUserById(token.sub as string);

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: user?.name || session.user.name,
          publicId: user?.publicId || null
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
    async signIn({ user }) {
      const existingUser = await getUserById(user.id as string);
      if (existingUser?.publicId) {
        useLoadingAuthStore.getState().setPublicId(existingUser.publicId);
      }
    },
    async linkAccount({ user }) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          publicId: generatePublicId(user.name || 'user')
        }
      });
      useLoadingAuthStore.getState().setPublicId(updatedUser.publicId as string);
    }
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  ...authConfig
});
