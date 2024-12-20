import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthWrapper from '@/components/auth/auth-wrapper';
import BackButton from '@/components/ui/back-button';

export const metadata: Metadata = {
  title: 'Sign in | Form Speedrunner',
  description: 'Sign in to Form Speedrunner'
};

const SigninPage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center p-4">
      <BackButton text="Back to Form Speedrunner" href="/" />
      <Suspense fallback={<div>Loading...</div>}>
        <AuthWrapper />
      </Suspense>
    </section>
  );
};

export default SigninPage;
