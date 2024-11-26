import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Discord from 'next-auth/providers/discord';
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
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        url: 'https://discord.com/oauth2/authorize',
        params: {
          scope: 'identify guilds email guilds.join gdm.join connections',
          response_type: 'code',
          redirect_uri: 'http://localhost:3000/api/auth/callback/discord'
        }
      }
    })
  ],

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;
