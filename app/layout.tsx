import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';

import AuthContext from '@/providers/auth-provider';
import TanstackContext from '@/providers/tanstack-provider';
import AuthControl from '@/components/ui/auth-control';

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Form Speedrunner 💨',
  description: 'How fast can you submit a form?'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <Toaster />
        <TanstackContext>
          <AuthContext>
            <AuthControl />
            {children}
          </AuthContext>
        </TanstackContext>
      </body>
    </html>
  );
}
