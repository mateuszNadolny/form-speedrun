'use client';
import { useRouter } from 'next/navigation';
import VerifyEmailForm from '@/components/auth/verify-email-form';

const VerifyEmailPage = () => {
  const router = useRouter();
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center overflow-hidden">
      <VerifyEmailForm />
    </section>
  );
};

export default VerifyEmailPage;
