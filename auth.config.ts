import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Discord from 'next-auth/providers/discord';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
    Discord({
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string,
      authorization: {
        url: 'https://discord.com/oauth2/authorize',
        params: {
          scope: 'identify guilds email guilds.join gdm.join connections',
          response_type: 'code',
          redirect_uri: process.env.DISCORD_REDIRECT_URI as string
        }
      }
    })
  ],

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;
