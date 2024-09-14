import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { LoginSchema } from './schemas';

import { getUserByEmail } from './lib/user';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(credentials.email as string);

          if (!user || !user?.hashedPassword) {
            throw new Error('Invalid credentials');
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }
    })
  ],

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;
