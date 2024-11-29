import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';

import AuthContext from '@/providers/auth-provider';
import TanstackContext from '@/providers/tanstack-provider';
import PlausibleProvider from 'next-plausible';

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Form Speedrunner 🏃‍➡️',
  description: 'How fast can you submit a form?'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain="form-speedrunner.com" />
      </head>
      <body className={nunito.className}>
        <Toaster />
        <TanstackContext>
          <AuthContext>{children}</AuthContext>
        </TanstackContext>
      </body>
    </html>
  );
}
