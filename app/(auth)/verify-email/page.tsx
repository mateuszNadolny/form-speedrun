'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import VerifyEmailForm from '@/components/auth/verify-email-form';

const VerifyEmailPage = () => {
  const router = useRouter();
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-color-primary overflow-hidden">
      <VerifyEmailForm />
    </main>
  );
};

export default VerifyEmailPage;
